import App from '@acf-options-page/app/app';
import { Layout } from '@acf-options-page/app/layout';
import { Loading } from '@acf-options-page/components';
import { NotFound } from '@acf-options-page/components/not-found.components';
import { CommonSettings } from '@acf-options-page/components/settings/common-settings.component';
import { SettingsGoogleBackup } from '@acf-options-page/components/settings/google-backup.component';
import { SettingGoogleSheets } from '@acf-options-page/components/settings/google-sheets.component';
import { SettingNotifications } from '@acf-options-page/components/settings/notifications.component';
import { SettingRetry } from '@acf-options-page/components/settings/retry.component';
import { store } from '@acf-options-page/store';
import { getManifest } from '@acf-options-page/store/app.api';
import { firebaseIsLoginAPI } from '@acf-options-page/store/firebase';
import { createBrowserRouter, redirect } from 'react-router-dom';

const protectedLoader = async () => {
  window.EXTENSION_ID = import.meta.env[`VITE_PUBLIC_CHROME_EXTENSION_ID`];
  const extResult = await store.dispatch(getManifest());
  if (getManifest.rejected.match(extResult)) {
    return redirect('/download');
  }

  const loginResult = await store.dispatch(firebaseIsLoginAPI());
  if (firebaseIsLoginAPI.rejected.match(loginResult) || loginResult.payload === null) {
    return redirect('/login');
  }
  return null;
};

const loginLoader = async () => {
  window.EXTENSION_ID = import.meta.env[`VITE_PUBLIC_CHROME_EXTENSION_ID`];
  const extResult = await store.dispatch(getManifest());
  if (getManifest.rejected.match(extResult)) {
    return redirect('/download');
  }
  const { firebase } = store.getState();
  if (firebase?.user) {
    return redirect('/');
  }
  return null;
};

const downloadLoader = async () => {
  window.EXTENSION_ID = import.meta.env[`VITE_PUBLIC_CHROME_EXTENSION_ID`];
  const extResult = await store.dispatch(getManifest());
  if (getManifest.fulfilled.match(extResult)) {
    return redirect('/');
  }
  return null;
};

export const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    loader: protectedLoader,
    HydrateFallback: Loading,
    Component: Layout,
    children: [
      {
        index: true,
        handle: { title: 'Man' },
        Component: App
      },
      {
        path: 'settings',
        HydrateFallback: Loading,
        lazy: async () => {
          const SettingsLayout = await import('@acf-options-page/components/settings.layout');
          return { Component: SettingsLayout.default };
        },
        children: [
          {
            index: true,
            Component: CommonSettings
          },
          {
            path: 'notifications',
            Component: SettingNotifications
          },

          {
            path: 'retry',
            Component: SettingRetry
          },
          {
            path: 'google-sheets',
            Component: SettingGoogleSheets
          },
          {
            path: 'google-backup',
            Component: SettingsGoogleBackup
          }
        ]
      },
      {
        path: '/reorder',
        HydrateFallback: Loading,
        lazy: async () => {
          const ReorderConfigs = await import('@acf-options-page/components/reorder-configs.components');
          return { Component: ReorderConfigs.default };
        }
      },
      {
        path: '/remove',
        HydrateFallback: Loading,
        lazy: async () => {
          const RemoveConfigs = await import('@acf-options-page/components/remove-configs.components');
          return { Component: RemoveConfigs.default };
        }
      }
    ]
  },
  {
    path: '/login',
    loader: loginLoader,
    HydrateFallback: Loading,
    lazy: async () => {
      const Login = await import('@acf-options-page/components/login.components');
      return { Component: Login.default };
    }
  },
  {
    path: '/download',
    loader: downloadLoader,
    HydrateFallback: Loading,
    lazy: async () => {
      const DownloadExtension = await import('@acf-options-page/components/download-extension.components');
      return { Component: DownloadExtension.default };
    }
  },
  {
    path: '*',
    Component: NotFound
  }
]);
