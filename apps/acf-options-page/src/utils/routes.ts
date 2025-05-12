import App from '@acf-options-page/app/app';
import { Layout } from '@acf-options-page/app/layout';
import { DownloadExtension } from '@acf-options-page/components/download-extension.components';
import Login from '@acf-options-page/components/login.components';
import { getManifest } from '@acf-options-page/store/app.api';
import { firebaseIsLoginAPI } from '@acf-options-page/store/firebase';
import { store } from '@acf-options-page/store/store';
import { createBrowserRouter, LoaderFunctionArgs, redirect } from 'react-router-dom';

const protectedLoader = async ({ request }: LoaderFunctionArgs) => {
  window.EXTENSION_ID = import.meta.env[`VITE_PUBLIC_CHROME_EXTENSION_ID`];
  const extResult = await store.dispatch(getManifest());
  if (getManifest.rejected.match(extResult)) {
    return redirect('/download');
  }

  const loginResult = await store.dispatch(firebaseIsLoginAPI());
  if (firebaseIsLoginAPI.rejected.match(loginResult)) {
    return redirect('/login');
  }
  return null;
};

const loginLoader = async () => {
  const { firebase, app } = store.getState();
  if (app?.extensionNotFound) {
    return redirect('/download');
  }
  if (firebase?.user) {
    return redirect('/');
  }
  return null;
};

export const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        loader: protectedLoader,
        Component: App
      }
    ]
  },

  {
    path: '/login',
    loader: loginLoader,
    Component: Login
  },
  {
    path: '/download',
    Component: DownloadExtension
  }
]);
