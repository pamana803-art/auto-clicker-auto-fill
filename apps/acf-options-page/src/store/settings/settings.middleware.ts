import { LOCAL_STORAGE_KEY } from '@dhruv-techapps/acf-common';
import { StorageService } from '@dhruv-techapps/core-service';
import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import i18next from 'i18next';
import { RootState } from '..';
import { setSettingsError, setSettingsMessage, updateSettings, updateSettingsBackup, updateSettingsNotification } from './settings.slice';

const settingsListenerMiddleware = createListenerMiddleware();

settingsListenerMiddleware.startListening({
  matcher: isAnyOf(updateSettings, updateSettingsBackup, updateSettingsNotification),
  effect: async (_, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    const message = i18next.t(`modal.settings.saveMessage`);
    await StorageService.set({ [LOCAL_STORAGE_KEY.SETTINGS]: state.settings.settings }).then(
      () => listenerApi.dispatch(setSettingsMessage(message)),
      (error) => listenerApi.dispatch(setSettingsError(error))
    );
  }
});

export { settingsListenerMiddleware };
