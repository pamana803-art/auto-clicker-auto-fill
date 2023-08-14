import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { AUTO_BACKUP, LOCAL_STORAGE_KEY, Settings, SettingsNotifications, defaultSettings } from '@dhruv-techapps/acf-common';
import { dataLayerInput, dataLayerModel } from '../util/data-layer';

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
    setSettings: (state, action:PayloadAction<Settings | null>) => {
      if (action.payload && Object.keys(action.payload).length) {
        state.settings = action.payload;
      }
      state.loading = false;
    },
    setSettingsMessage: (state, action:PayloadAction<string>) => {
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
});

export const { switchSettings, setSettings, setSettingsError, updateSettings, setSettingsMessage, updateSettingsNotification, updateSettingsBackup } = slice.actions;

export const settingsSelector = (state: RootState) => state.settings;

export default slice.reducer;
