import { PayloadAction, createAsyncThunk, createListenerMiddleware, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { AUTO_BACKUP, LOCAL_STORAGE_KEY, Settings, defaultSettings } from '@dhruv-techapps/acf-common';
import { StorageService } from '@dhruv-techapps/core-service';
import { settingsGetAPI } from './settings.api';

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
};



const initialState: SettingsStore = { visible: false, loading: true, settings: defaultSettings };

const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    switchSettingsModal: (state) => {
      state.visible = !state.visible;
    },
    setSettingsMessage: (state, action: PayloadAction<string | undefined>) => {
      state.message = action.payload;
      state.error = undefined;
    },
    updateSettings: (state, action: PayloadAction<SettingsAction>) => {
      const { name, value } = action.payload;
      state.settings[name] = value;
    },
    updateSettingsNotification: (state, action: PayloadAction<SettingsAction>) => {
      const { name, value } = action.payload;
      state.settings.notifications[name] = value;
    },
    updateSettingsBackup: (state, action: PayloadAction<AUTO_BACKUP>) => {

        state.settings.backup.autoBackup = action.payload;
      
    },
    setSettingsError: (state, action) => {
      state.error = action.payload;
      state.message = undefined;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(settingsGetAPI.fulfilled, (state, action) => {
      if (action.payload && Object.keys(action.payload).length) {
        state.settings = action.payload;
      }
      state.loading = false;
    });
    builder.addCase(settingsGetAPI.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
  },
});

export const { switchSettingsModal, setSettingsError, updateSettings, setSettingsMessage, updateSettingsNotification, updateSettingsBackup } = slice.actions;

export const settingsSelector = (state: RootState) => state.settings;

export const settingsReducer = slice.reducer;
