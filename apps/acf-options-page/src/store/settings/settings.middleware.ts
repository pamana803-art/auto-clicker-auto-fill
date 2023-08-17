import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { setSettingsError, setSettingsMessage, updateSettings, updateSettingsBackup, updateSettingsNotification } from "./settings.slice";
import { RootState } from "../../store";
import { LOCAL_STORAGE_KEY } from "@dhruv-techapps/acf-common";
import { StorageService } from "@dhruv-techapps/core-service";

const settingsListenerMiddleware = createListenerMiddleware();

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
settingsListenerMiddleware.startListening({
  matcher: isAnyOf(updateSettings, updateSettingsBackup, updateSettingsNotification),
  effect: async (action, listenerApi) => {
    // Run whatever additional side-effect-y logic you want here
    const state = listenerApi.getState() as RootState;

    StorageService.set(window.EXTENSION_ID, { [LOCAL_STORAGE_KEY.SETTINGS]: state.settings.settings }).then(
      () => {
        listenerApi.dispatch(setSettingsMessage('saved'));
        setTimeout(() => {
          listenerApi.dispatch(setSettingsMessage(''));
        }, 1000);
      },
      (error) => listenerApi.dispatch(setSettingsError(error))
    );
  },
});

export { settingsListenerMiddleware };

