import { PayloadAction, createAsyncThunk, createListenerMiddleware, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { AUTO_BACKUP, LOCAL_STORAGE_KEY, Settings, defaultSettings } from '@dhruv-techapps/acf-common';
import { dataLayerInput, dataLayerModel } from '../util/data-layer';
import { StorageService } from '@dhruv-techapps/core-service';

type SettingsStore = {
  visible: boolean;
  loading: boolean;
  error?: string;
  settings: Settings;
  message?: string;
};

type SettingsAction = {
  name: string;
  value: boolean;
} | null;

export const getSettings = createAsyncThunk('settings/get', async () => {
  const result = await StorageService.get<{ settings: Settings }>(window.EXTENSION_ID, LOCAL_STORAGE_KEY.SETTINGS);
  return result.settings;
});

const initialState: SettingsStore = { visible: false, loading: true, settings: defaultSettings };

const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    switchSettings: (state) => {
      state.visible = !state.visible;
      //:TODO
      dataLayerModel(LOCAL_STORAGE_KEY.SETTINGS, state.visible ? 'close' : 'open');
    },
    setSettings: (state, action: PayloadAction<Settings | null>) => {
      if (action.payload && Object.keys(action.payload).length) {
        state.settings = action.payload;
      }
      state.loading = false;
    },
    setSettingsMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    updateSettings: (state, action: PayloadAction<SettingsAction | null>) => {
      if (action.payload) {
        const { name, value } = action.payload;
        state.settings[name] = value;
        dataLayerInput(action.payload, LOCAL_STORAGE_KEY.SETTINGS);
      }
    },
    updateSettingsNotification: (state, action: PayloadAction<SettingsAction | null>) => {
      if (action.payload) {
        const { name, value } = action.payload;
        state.settings.notifications[name] = value;
        dataLayerInput(action.payload, LOCAL_STORAGE_KEY.SETTINGS);
      }
    },
    updateSettingsBackup: (state, action: PayloadAction<AUTO_BACKUP>) => {
      if (action.payload) {
        state.settings.backup.autoBackup = action.payload;
        dataLayerInput(action.payload, LOCAL_STORAGE_KEY.SETTINGS);
      }
    },
    setSettingsError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSettings.fulfilled, (state, action) => {
      state.settings = action.payload;
      state.loading = false;
    });
    builder.addCase(getSettings.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
  },
});

export const { switchSettings, setSettings, setSettingsError, updateSettings, setSettingsMessage, updateSettingsNotification, updateSettingsBackup } = slice.actions;

export const settingsSelector = (state: RootState) => state.settings;

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

export default slice.reducer;
