import { Suspense, useEffect } from 'react';
import ConfirmationModalContextProvider from './_providers/confirm.provider';
import Configs from './app/configs/configs';
import Header from './app/header';
import { DataList, Loading, ToastHandler } from './components';
import { APP_NAME } from './constants';
import { useAppDispatch, useAppSelector } from './hooks';
import { BlogModal, ExtensionNotFoundModal } from './modal';
import { LoginModal } from './modal/login.modal';
import { SubscribeModal } from './modal/subscribe.modal';
import { appSelector, getManifest, isLogin } from './store/app.slice';

function App() {
  const { loading, error } = useAppSelector(appSelector);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getManifest());
  }, []);

  useEffect(() => {
    if (/(DEV|BETA|LOCAL)/.test(process.env.NX_VARIANT || '')) {
      window.document.title = `${APP_NAME} [${process.env.NX_VARIANT}]`;
    } else {
      window.document.title = APP_NAME;
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(isLogin());
  }, []);

  return (
    <Suspense fallback={<Loading message='Loading localization...' className='m-5 p-5' />}>
      <ConfirmationModalContextProvider>
        <Header />
        {loading && <Loading message='Connecting with extension...' className='m-5 p-5' />}
        <Configs error={error} />
        <ToastHandler />
        <BlogModal />
        <SubscribeModal />
        <LoginModal />
        <ExtensionNotFoundModal />
      </ConfirmationModalContextProvider>
      <DataList />
    </Suspense>
  );
}

export default App;
