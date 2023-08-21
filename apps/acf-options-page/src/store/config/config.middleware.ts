import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import {
  addConfig,
  duplicateConfig,
  removeConfig,
  setConfigError,
  updateBatch,
  updateConfig,
  setConfigMessage,
  updateConfigSettings,
  importAll,
  importConfig,
  updateAction,
  reorderActions,
  removeAction,
  updateActionAddon,
} from './config.slice';
import { RootState } from '../../store';
import { addToast } from '../toast.slice';
import { StorageService } from '@dhruv-techapps/core-service';
import { LOCAL_STORAGE_KEY } from '@dhruv-techapps/acf-common';
import { setConfigSettingsError, setConfigSettingsMessage } from './settings';
import { setBatchError, setBatchMessage } from './batch';
import { getI18n } from 'react-i18next';
import { setActionError, setActionMessage } from './action/action.slice';
import { setActionAddonError, setActionAddonMessage } from './action/addon';

const configsToastListenerMiddleware = createListenerMiddleware();
configsToastListenerMiddleware.startListening({
  matcher: isAnyOf(addConfig, removeConfig, duplicateConfig),
  effect: async (action, listenerApi) => {
    const [type, method] = action.type.split('/');
    const i18n = getI18n();
    const language: any = i18n.getDataByLanguage(i18n.language)?.web;

    const header = language.toast[type][method]?.header?.replace('{{name}}', type);
    const body = language.toast[type][method]?.body?.replace('{{name}}', type);
    if (header) {
      listenerApi.dispatch(addToast({ header, body }));
    }
  },
});

const getMessageFunc = (action) => {
  switch (action.type) {
    case updateConfigSettings.type:
      return { success: setConfigSettingsMessage, failure: setConfigSettingsError };
    case updateBatch.type:
      return { success: setBatchMessage, failure: setBatchError };
    case updateActionAddon.type:
      return { success: setActionAddonMessage, failure: setActionAddonError };
    case updateAction.type:
    case reorderActions.type:
    case removeAction.type:
      return { success: setActionMessage, failure: setActionError };
    default:
      return { success: setConfigMessage, failure: setConfigError };
  }
};

const configsListenerMiddleware = createListenerMiddleware();
configsListenerMiddleware.startListening({
  matcher: isAnyOf(importAll, importConfig, updateConfig, updateConfigSettings, removeConfig, updateBatch, updateAction, reorderActions, removeAction, updateActionAddon),
  effect: async (action, listenerApi) => {
    // Run whatever additional side-effect-y logic you want here
    const state = listenerApi.getState() as RootState;
    const i18n = getI18n();
    const language: any = i18n.getDataByLanguage(i18n.language)?.web;

    const { success, failure } = getMessageFunc(action);
    await StorageService.set(window.EXTENSION_ID, { [LOCAL_STORAGE_KEY.CONFIGS]: state.configuration.configs })
      .then(async () => {
        if (success) {
          const [type, method] = action.type.split('/');
          if (language[type][method]) {
            listenerApi.dispatch(success(language[type][method]));
            await listenerApi.delay(1500);
            listenerApi.dispatch(success());
          }
        }
      })
      .catch((error) => {
        if (failure) {
          if (error instanceof Error) {
            listenerApi.dispatch(failure(error.message));
          } else if (typeof error === 'string') {
            listenerApi.dispatch(failure(error));
          } else {
            listenerApi.dispatch(failure(JSON.stringify(error)));
          }
        }
      });
  },
});

export { configsToastListenerMiddleware, configsListenerMiddleware };
