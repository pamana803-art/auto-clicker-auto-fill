import { DataList, Loading, ToastHandler } from '../components';
import { SubscribeModal } from '../modal/subscribe.modal';
import { appSelector } from '../store/app.slice';
import { useAppSelector } from '../store/hooks';

function App() {
  const { loading, error, extensionNotFound } = useAppSelector(appSelector);

  return (
    <>
      {loading && <Loading message='Connecting with extension...' />}
      {/*<Configs error={error} errorButton={extensionNotFound} />*/}
      <ToastHandler />
      <SubscribeModal />
      <DataList />
    </>
  );
}

export default App;
