import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { addConfig, setConfigError, updateConfig } from './config.slice';
import { RootState } from '../../store';
import { addToast } from '../toast.slice';
import { StorageService } from '@dhruv-techapps/core-service';
import { LOCAL_STORAGE_KEY } from '@dhruv-techapps/acf-common';
import { configImportAPI, configImportAllAPI } from './config.api';

const configsToastListenerMiddleware = createListenerMiddleware();

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
configsToastListenerMiddleware.startListening({
  matcher: isAnyOf(addConfig, updateConfig),
  effect: async (action, listenerApi) => {
    // Run whatever additional side-effect-y logic you want here
    const state = listenerApi.getState() as RootState;
    listenerApi.dispatch(
      addToast({
        header: 'Configuration',
        body: state.config.configs[0].name, // t('toast.configuration.add.body', { name: state.config.configs[0].name }),
      })
    );
  },
});

const configsListenerMiddleware = createListenerMiddleware();

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
configsListenerMiddleware.startListening({
  matcher: isAnyOf(configImportAllAPI.fulfilled, configImportAPI.fulfilled),
  effect: async (action, listenerApi) => {
    // Run whatever additional side-effect-y logic you want here
    const state = listenerApi.getState() as RootState;

    StorageService.set(window.EXTENSION_ID, { [LOCAL_STORAGE_KEY.CONFIGS]: state.config.configs })
    .catch((error) => listenerApi.dispatch(setConfigError(error)));
  },
});

export { configsListenerMiddleware };
