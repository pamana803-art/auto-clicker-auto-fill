import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Configuration, defaultConfig } from '@dhruv-techapps/acf-common';
import { configGetAllAPI, configImportAPI, configImportAllAPI } from './config.api';
import { actionAddonActions, actionSettingsActions, actionStatementActions } from './action';
import { batchActions } from './batch';

export type ConfigStore = {
  visible: boolean;
  loading: boolean;
  selectedConfigIndex: number;
  selectedActionIndex: number;
  error?: string;
  configs: Array<Configuration>;
  message?: string;
};

type ConfigAction = { name: string; value: any };

const initialState: ConfigStore = { visible: false, loading: true, configs: [{ ...defaultConfig }], selectedConfigIndex: 0, selectedActionIndex: 0 };

const slice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {
    addConfig: (state) => {
      state.configs.push({ ...defaultConfig });
      state.selectedConfigIndex = 0;
    },
    setConfigError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    updateConfig: (state, action: PayloadAction<ConfigAction>) => {
      const { name, value } = action.payload;
      const { configs, selectedConfigIndex } = state;
      configs[selectedConfigIndex][name] = value;
    },
    updateConfigSettings: (state, action: PayloadAction<ConfigAction>) => {
      const { name, value } = action.payload;
      const { configs, selectedConfigIndex } = state;
      configs[selectedConfigIndex][name] = value;
    },
    updateConfigMessage: (state, action: PayloadAction<string | undefined>) => {
      state.message = action.payload;
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
    ...actionAddonActions,
    ...actionSettingsActions,
    ...actionStatementActions,
    ...batchActions
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
        state.configs.push(action.payload);
        state.selectedConfigIndex = 0;
      }
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
  updateConfigSettings,
  updateConfigMessage,
  removeConfig,
  duplicateConfig,
  addActionStatementCondition,
  updateActionAddon,
  updateActionSettings,
  updateActionStatementCondition,
  updateActionStatementGoto,
  updateActionStatementThen,
  removeActionStatementCondition,
  resetActionAddon,
  resetActionSetting,
  resetActionStatement,
  updateBatch
} = slice.actions;

export const configSelector = (state: RootState) => state.configuration;

const selectedConfigIndexSelector = (state: RootState) => state.configuration.selectedConfigIndex;
const configsSelector = (state: RootState) => state.configuration.configs;

export const selectedConfigSelector = createSelector(configsSelector, selectedConfigIndexSelector, (configs, selectedConfigIndex) => configs[selectedConfigIndex]);

export const configReducer = slice.reducer;
