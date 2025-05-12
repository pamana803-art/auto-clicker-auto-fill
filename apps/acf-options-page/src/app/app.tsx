import ConfirmationModalContextProvider from '@acf-options-page/_providers/confirm.provider';
import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { DataList, Loading, ToastHandler } from '../components';
import { BlogModal } from '../modal';
import { SubscribeModal } from '../modal/subscribe.modal';
import { appSelector } from '../store/app.slice';
import { firebaseSelector } from '../store/firebase';
import { useAppSelector } from '../store/hooks';
import Configs from './configs/configs';
import Header from './header';

function App() {
  const { loading, error, errorButton } = useAppSelector(appSelector);
  const [show, setShow] = useState(localStorage.getItem('login') !== 'true');
  const { user } = useAppSelector(firebaseSelector);

  const onCloseAlert = () => {
    setShow(false);
    localStorage.setItem('login', 'true');
  };

  return (
    <>
      <ConfirmationModalContextProvider>
        <Header />
        {show && !user && (
          <Alert variant='warning' onClose={onCloseAlert} dismissible>
            Please log in to Auto Clicker Auto Fill to access Discord and Google Sheets features.
          </Alert>
        )}
        {loading && <Loading message='Connecting with extension...' className='m-5 p-5' />}
        <Configs error={error} errorButton={errorButton} />
        <ToastHandler />
        <BlogModal />
        <SubscribeModal />
      </ConfirmationModalContextProvider>
      <DataList />
    </>
  );
}

export default App;
