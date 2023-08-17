import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Configuration, defaultConfig } from '@dhruv-techapps/acf-common';
import { getConfigName } from './config.slice.util';
import { configGetAllAPI, configImportAPI, configImportAllAPI } from './config.api';
import { actions } from './action';

export type ConfigStore = {
  visible: boolean;
  loading: boolean;
  selectedConfigIndex: number;
  selectedActionIndex: number;
  error?: string;
  configs: Array<Configuration>;
  message?: string;
};

type ConfigAction = { name: string; value: boolean } | null;

const initialState: ConfigStore = { visible: false, loading: true, configs: [], selectedConfigIndex: 0, selectedActionIndex: 0 };

const slice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    addConfig: (state) => {
      const name = getConfigName(state.configs.length);
      state.configs.push({ ...defaultConfig, name });
      state.selectedConfigIndex = 0;
    },
    setConfigError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    updateConfig: (state, action: PayloadAction<ConfigAction>) => {
      if (action.payload) {
        const { name, value } = action.payload;
        const { configs, selectedConfigIndex } = state;
        configs[selectedConfigIndex][name] = value;
      }
    },
    removeConfig: (state) => {
      const { configs, selectedConfigIndex } = state;
      configs.splice(selectedConfigIndex, 1);
      if (configs.length === 2) {
        state.selectedConfigIndex = 0;
      }
      state.selectedConfigIndex = selectedConfigIndex === 0 ? selectedConfigIndex : selectedConfigIndex - 1;
    },
    duplicateConfig: (state) => {
      const { configs, selectedConfigIndex } = state;
      state.configs.push(configs[selectedConfigIndex]);
      state.selectedConfigIndex = 0;
    },
    selectConfig: (state, action: PayloadAction<number>) => {
      state.selectedConfigIndex = action.payload;
      window.dataLayer.push({ event: 'select', conversionName: 'configurations', section: 'configurations' });
    },
    ...actions,
  },
  extraReducers: (builder) => {
    builder.addCase(configGetAllAPI.fulfilled, (state, action) => {
      if (action.payload) {
        const { configurations, selectedConfigIndex } = action.payload;
        state.configs = configurations;
        state.selectedConfigIndex = selectedConfigIndex;
      }
      state.loading = false;
    });
    builder.addCase(configGetAllAPI.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
    builder.addCase(configImportAPI.fulfilled, (state, action) => {
      if (action.payload) {
        const { configurations, selectedConfigIndex } = action.payload;
        state.configs = configurations;
        state.selectedConfigIndex = selectedConfigIndex;
      }
      state.loading = false;
    });
    builder.addCase(configImportAllAPI.fulfilled, (state, action) => {
      state.configs = action.payload;
      state.selectedConfigIndex = 0;
    });
  },
});

export const {
  addConfig,
  selectConfig,
  setConfigError,
  updateConfig,
  removeConfig,
  duplicateConfig,
  updateActionSettings,
  resetActionSetting,
  updateActionStatementCondition,
  resetActionStatement,
  updateActionStatementGoto,
  updateActionStatementThen,
  removeActionStatementCondition,
  addActionStatementCondition,
  updateActionAddon,
  resetActionAddon
} = slice.actions;

export const configSelector = (state: RootState) => state.config;

const selectedConfigIndexSelector = (state: RootState) => state.config.selectedConfigIndex;
const configsSelector = (state: RootState) => state.config.configs;

export const selectedConfigSelector = createSelector(configsSelector, selectedConfigIndexSelector, (configs, selectedConfigIndex) => configs[selectedConfigIndex]);

export const configReducer = slice.reducer;
