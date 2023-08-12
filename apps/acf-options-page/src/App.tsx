import React, { Suspense, useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ManifestService } from '@dhruv-techapps/core-service';
import Header from './app/header';
import Footer from './app/footer';
import { ToastHandler, ErrorAlert, DataList, Loading, ToastHandlerRef } from './components';
import { AdsBlockerModal, AdsBlockerModalRef, BlogModal, BlogModelRef, ConfirmModal, ConfirmModalRef, ExtensionNotFound, ExtensionNotFoundRef } from './modal';
import { APP_NAME, NO_EXTENSION_ERROR } from './constants';

function App() {
  const toastRef = useRef<ToastHandlerRef>(null);
  const blogRef = useRef<BlogModelRef>(null);
  const confirmRef = useRef<ConfirmModalRef>(null);
  const adsBlockerRef = useRef<AdsBlockerModalRef>(null);
  const extensionNotFoundRef = useRef<ExtensionNotFoundRef>(null);
  const [loading, setLoading] = useState<boolean>();
  const [manifest, setManifest] = useState<chrome.runtime.Manifest>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (chrome.runtime) {
      setLoading(true);
      ManifestService.values(window.EXTENSION_ID, ['name', 'version'])
        .then(setManifest)
        .catch((_error) => {
          if (NO_EXTENSION_ERROR.includes(_error.message)) {
            setTimeout(() => {
              extensionNotFoundRef.current?.show();
            }, 1000);
          }
          setError(_error);
        })
        .finally(() => setLoading(false));
    } else {
      setError('Extension not found');
      setTimeout(() => {
        extensionNotFoundRef.current?.show();
      }, 1000);
    }
  }, []);

  useEffect(() => {
    if (/(DEV|BETA)/.test(process.env.NX_VARIANT || '')) {
      window.document.title = `${APP_NAME} [${process.env.NX_VARIANT}]`;
    } else {
      window.document.title = APP_NAME;
    }
  }, []);

  console.log(manifest, error);

  return (
    <Router>
      <Suspense fallback='loading'>
        <Header error={error} confirmRef={confirmRef} />
        {loading && <Loading />}
        <ErrorAlert error={error} />
        {/*<Configs toastRef={toastRef} blogRef={blogRef} confirmRef={confirmRef} />*/}
        <Footer version={manifest?.version} />
        {/* <ToastHandler ref={toastRef} />
        <ConfirmModal ref={confirmRef} />
        <BlogModal ref={blogRef} />
        <ExtensionNotFound ref={extensionNotFoundRef} version={manifest?.version} />
  <AdsBlockerModal ref={adsBlockerRef} version={manifest?.version} />*/}
      </Suspense>
      <DataList />
    </Router>
  );
}

export default App;
