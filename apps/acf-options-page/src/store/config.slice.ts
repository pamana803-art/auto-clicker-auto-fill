import { Configuration } from '@dhruv-techapps/acf-common';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

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
    switchExtensionNotFound: (state) => {
      state.extensionNotFound = !state.extensionNotFound;
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
});

export const { switchExtensionNotFound, switchAdsBlocker, setConfigsError, setManifest } = slice.actions;

export const configsSelector = (state: RootState) => state.configs;

export default slice.reducer;
