import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { addConfig, duplicateConfig, removeConfig, setConfigError, updateConfig, updateConfigMessage, updateConfigSettings } from './config.slice';
import { RootState } from '../../store';
import { addToast } from '../toast.slice';
import { StorageService } from '@dhruv-techapps/core-service';
import { LOCAL_STORAGE_KEY } from '@dhruv-techapps/acf-common';
import { configImportAPI, configImportAllAPI } from './config.api';
import { updateConfigSettingsMessage } from './settings';

const configsToastListenerMiddleware = createListenerMiddleware();
configsToastListenerMiddleware.startListening({
  matcher: isAnyOf(addConfig, removeConfig, duplicateConfig),
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    const [type, method] = action.type.split('/');
    const header = state.i18n.toast[type][method].header?.replace('{{name}}', 'Configuration');
    const body = state.i18n.toast[type][method].body?.replace('{{name}}', 'Configuration');
    if (header) {
      listenerApi.dispatch(addToast({ header, body }));
    }
  },
});

const configsListenerMiddleware = createListenerMiddleware();
configsListenerMiddleware.startListening({
  matcher: isAnyOf(configImportAllAPI.fulfilled, configImportAPI.fulfilled, updateConfig, updateConfigSettings, removeConfig),
  effect: async (action, listenerApi) => {
    // Run whatever additional side-effect-y logic you want here
    const state = listenerApi.getState() as RootState;

    await StorageService.set(window.EXTENSION_ID, { [LOCAL_STORAGE_KEY.CONFIGS]: state.configuration.configs })
      .then(async () => {
        if (action.type === updateConfig.type) {
          listenerApi.dispatch(updateConfigMessage(state.i18n.configuration.saveMessage));
          await listenerApi.delay(1500);
          listenerApi.dispatch(updateConfigMessage());
        } else if (action.type === updateConfigSettings.type) {
          listenerApi.dispatch(updateConfigSettingsMessage(state.i18n.modal.configSettings.saveMessage));
          await listenerApi.delay(1500);
          listenerApi.dispatch(updateConfigSettingsMessage());
        }
      })
      .catch((error) => listenerApi.dispatch(setConfigError(error.message)));
  },
});

export { configsToastListenerMiddleware, configsListenerMiddleware };
