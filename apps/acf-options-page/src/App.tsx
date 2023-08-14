import React, { Suspense, useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ManifestService } from '@dhruv-techapps/core-service';
import Header from './app/header';
import Footer from './app/footer';
import { ToastHandler, ErrorAlert, DataList, Loading, ToastHandlerRef } from './components';
import { AdsBlockerModal, AdsBlockerModalRef, BlogModal, BlogModelRef, ConfirmModal, ConfirmModalRef, ExtensionNotFound } from './modal';
import { APP_NAME, NO_EXTENSION_ERROR } from './constants';
import { useAppDispatch, useAppSelector } from './hooks';
import { configsSelector, setConfigsError, setManifest, switchAdsBlocker, switchExtensionNotFound } from './store/config.slice';
import { ErrorBoundary } from './_helpers/error-boundary';

function App() {
  const toastRef = useRef<ToastHandlerRef>(null);
  const blogRef = useRef<BlogModelRef>(null);
  const confirmRef = useRef<ConfirmModalRef>(null);
  const { loading, manifest, error } = useAppSelector(configsSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (chrome.runtime) {
      ManifestService.values(window.EXTENSION_ID, ['name', 'version']).then(
        (manifest) => dispatch(setManifest(manifest)),
        (_error) => dispatch(setConfigsError(_error))
      );
    } else {
      dispatch(setConfigsError('Extension not found'));
    }
  }, [dispatch]);

  useEffect(() => {
    if (/(DEV|BETA)/.test(process.env.NX_VARIANT || '')) {
      window.document.title = `${APP_NAME} [${process.env.NX_VARIANT}]`;
    } else {
      window.document.title = APP_NAME;
    }
  }, []);

  if (loading) {
    return <Loading message='Connecting with extension...' className='m-5 p-5' />;
  }
  console.log('App');

  return (
    <Suspense fallback={<Loading message='Connecting with extension...' className='m-5 p-5' />}>
      <ErrorBoundary fallback={<ErrorAlert error={{ message: 'fallback' }} />}>
        <Header confirmRef={confirmRef} />
        <ErrorAlert error={error} />
        {/*<Configs toastRef={toastRef} blogRef={blogRef} confirmRef={confirmRef} />*/}
        <Footer version={manifest?.version} />
        <ToastHandler ref={toastRef} />
        <ConfirmModal ref={confirmRef} />
        <BlogModal ref={blogRef} />

        <ExtensionNotFound />
        <AdsBlockerModal />
        <DataList />
      </ErrorBoundary>
    </Suspense>
  );
}

export default App;
