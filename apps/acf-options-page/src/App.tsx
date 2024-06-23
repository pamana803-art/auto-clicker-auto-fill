import { Suspense, useEffect } from 'react';
import ConfirmationModalContextProvider from './_providers/confirm.provider';
import Configs from './app/configs/configs';
import Header from './app/header';
import { DataList, Loading, ToastHandler } from './components';
import { useAppDispatch, useAppSelector } from './hooks';
import { BlogModal, ExtensionNotFoundModal } from './modal';
import { LoginModal } from './modal/login.modal';
import { SubscribeModal } from './modal/subscribe.modal';
import { getManifest } from './store/app.api';
import { appSelector } from './store/app.slice';
import { firebaseIsLoginAPI } from './store/firebase';

function App() {
  const { loading, error } = useAppSelector(appSelector);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getManifest());
    dispatch(firebaseIsLoginAPI());
  }, [dispatch]);

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
