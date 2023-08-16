import { Suspense, useEffect } from 'react';
import Header from './app/header';
import Footer from './app/footer';
import { ToastHandler, ErrorAlert, DataList, Loading } from './components';
import { AdsBlockerModal, BlogModal, ConfirmModal, ExtensionNotFound } from './modal';
import { APP_NAME } from './constants';
import { useAppDispatch, useAppSelector } from './hooks';
import { configsSelector, getManifest } from './store/config.slice';

function App() {
  const { loading, error } = useAppSelector(configsSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getManifest());
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

  return (
    <Suspense fallback={<Loading message='Connecting with extension...' className='m-5 p-5' />}>
      <Header />
      <ErrorAlert error={error} />
      {/*<Configs toastRef={toastRef} blogRef={blogRef} confirmRef={confirmRef} />*/}
      <Footer />
      <ToastHandler />
      <ConfirmModal />
      <BlogModal />
      <ExtensionNotFound />
      <AdsBlockerModal />
      <DataList />
    </Suspense>
  );
}

export default App;
