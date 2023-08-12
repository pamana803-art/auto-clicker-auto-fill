import { Configuration } from '@dhruv-techapps/acf-common';
import {  createSlice } from '@reduxjs/toolkit';

type ConfigurationsStore = { selectedConfig: number; selectedAction: number; configs: Array<Configuration> };

const initialState: ConfigurationsStore = {
  selectedConfig: -1,
  selectedAction: -1,
  configs: [],
};

const configsSlice = createSlice({
  name: 'configs',
  initialState,
  reducers: {
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

export default configsSlice.reducer;
