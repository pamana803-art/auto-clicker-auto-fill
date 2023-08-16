import { Configuration } from '@dhruv-techapps/acf-common';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ManifestService } from '@dhruv-techapps/core-service';
import { NO_EXTENSION_ERROR } from '../constants';

export const getManifest = createAsyncThunk('getManifest', async (): Promise<chrome.runtime.Manifest> => {
  if (chrome.runtime) {
    const manifest = await ManifestService.values(window.EXTENSION_ID, ['name', 'version']);
    return manifest;
  }
  throw new Error(NO_EXTENSION_ERROR[0]);
});

type ConfigurationsStore = {
  manifest?: chrome.runtime.Manifest;
  error?: string;
  loading: boolean;
  selectedConfig: number;
  selectedAction: number;
  configs: Array<Configuration>;
  extensionNotFound: boolean;
  adsBlocker: boolean;
};

const initialState: ConfigurationsStore = {
  loading: true,
  adsBlocker: false,
  extensionNotFound: false,
  selectedConfig: -1,
  selectedAction: -1,
  configs: [],
};

const slice = createSlice({
  name: 'configs',
  initialState,
  reducers: {
    setManifest: (state, action) => {
      state.manifest = action.payload;
      state.loading = false;
    },
    setConfigsError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    selectConfig: (state, action) => {
      state.selectedConfig = action.payload;
    },
    selectAction: (state, action) => {
      state.selectedAction = action.payload;
    },
    updateConfig: (state, action) => {
      const { configs, selectedConfig } = state;
      if (selectedConfig) {
        const config = configs[selectedConfig];
        const { field, value } = action.payload;
        config[field] = value;
      }
    },
    switchExtensionNotFound: (state, action: PayloadAction<string | undefined>) => {
      state.loading = false;
      state.extensionNotFound = !state.extensionNotFound;
      if (action.payload) {
        state.error = action.payload;
      }
    },
    switchAdsBlocker: (state) => {
      state.adsBlocker = !state.adsBlocker;
    },
    updateAction: (state, action) => {
      const { configs, selectedConfig } = state;
      if (selectedConfig) {
        const config = configs[selectedConfig];
        if (config.actions) {
          config.actions.push(action.payload);
        }
      }
    },
    updateAddon: (state, action) => {
      const { configs, selectedConfig, selectedAction } = state;
      if (selectedConfig) {
        const config = configs[selectedConfig];
        if (config.actions && selectedAction) {
          config.actions[selectedAction].addon = action.payload;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getManifest.fulfilled, (state, action) => {
      state.manifest = action.payload;
      state.loading = false;
    });
    builder.addCase(getManifest.rejected, (state, action) => {
      state.loading = false;
      const error = action.error.message;
      if (error) {
        state.error = error;
        if (NO_EXTENSION_ERROR.includes(error)) {
          state.extensionNotFound = !state.extensionNotFound;
        }
      }
    });
  },
});

export const { switchExtensionNotFound, switchAdsBlocker, setConfigsError, setManifest } = slice.actions;

export const configsSelector = (state: RootState) => state.configs;

export default slice.reducer;
