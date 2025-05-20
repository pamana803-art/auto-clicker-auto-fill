import { DataList, Loading, ToastHandler } from '../components';
import { BlogModal } from '../modal';
import { SubscribeModal } from '../modal/subscribe.modal';
import { appSelector } from '../store/app.slice';
import { useAppSelector } from '../store/hooks';
import Configs from './configs/configs';

function App() {
  const { loading, error, extensionNotFound } = useAppSelector(appSelector);

  return (
    <>
      {loading && <Loading message='Connecting with extension...' className='m-5 p-5' />}
      <Configs error={error} errorButton={extensionNotFound} />
      <ToastHandler />
      <BlogModal />
      <SubscribeModal />
      <DataList />
    </>
  );
}

export default App;
