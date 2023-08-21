import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Configuration, defaultConfig } from '@dhruv-techapps/acf-common';
import { configGetAllAPI } from './config.api';
import { actionActions } from './action';
import { batchActions } from './batch';
import { actionAddonActions } from './action/addon';
import { actionSettingsActions } from './action/settings';
import { actionStatementActions } from './action/statement';

export type ConfigStore = {
  loading: boolean;
  selectedConfigIndex: number;
  selectedActionIndex: number;
  error?: string;
  configs: Array<Configuration>;
  message?: string;
};

type ConfigAction = { name: string; value: any };

const initialState: ConfigStore = {loading: true, configs: [{ ...defaultConfig }], selectedConfigIndex: 0, selectedActionIndex: 0 };

const slice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {
    setConfigError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.message = undefined;
    },
    setConfigMessage: (state, action: PayloadAction<string | undefined>) => {
      state.message = action.payload;
      state.error = undefined;
    },
    addConfig: (state) => {
      state.configs.push({ ...defaultConfig });
      state.selectedConfigIndex = 0;
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
    removeConfig: (state) => {
      const { configs, selectedConfigIndex } = state;
      configs.splice(selectedConfigIndex, 1);
      if (configs.length === 2) {
        state.selectedConfigIndex = 0;
      }
      state.selectedConfigIndex = selectedConfigIndex === 0 ? selectedConfigIndex : selectedConfigIndex - 1;
    },
    setConfigs:(state, action:PayloadAction<Array<Configuration>>) => {
      state.configs = action.payload;
      state.selectedConfigIndex = 0;
    },
    importAll: (state, action:PayloadAction<Array<Configuration>>) => {
      state.configs = action.payload;
      state.selectedConfigIndex = 0;
    },
    importConfig: (state, action:PayloadAction<Configuration>) => {
      state.configs.push(action.payload);
      state.selectedConfigIndex = state.configs.length - 1;
    },
    duplicateConfig: (state) => {
      const { configs, selectedConfigIndex } = state;
      const config = configs[selectedConfigIndex];
      config.name = "(Duplicate) " + config.name
      state.configs.push(configs[selectedConfigIndex]);
      state.selectedConfigIndex = state.configs.length - 1;

    },
    selectConfig: (state, action: PayloadAction<number>) => {
      state.selectedConfigIndex = action.payload;
    },
    selectAction: (state, action: PayloadAction<number>) => {
      state.selectedActionIndex = action.payload;
    },
    ...actionActions,
    ...actionAddonActions,
    ...actionSettingsActions,
    ...actionStatementActions,
    ...batchActions,
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
  },
});

export const {
  setConfigMessage,
  setConfigError,
  addConfig,
  setConfigs,
  selectConfig,
  updateConfig,
  updateConfigSettings,
  removeConfig,
  duplicateConfig,
  importAll,
  importConfig,
  updateBatch,
  selectAction,
  addAction,
  reorderActions,
  removeAction,
  updateAction,
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
} = slice.actions;

export const configSelector = (state: RootState) => state.configuration;

const configsSelector = (state: RootState) => state.configuration.configs;
const selectedConfigIndexSelector = (state: RootState) => state.configuration.selectedConfigIndex;
const selectedActionIndexSelector = (state: RootState) => state.configuration.selectedActionIndex;

export const selectedConfigSelector = createSelector(configsSelector, selectedConfigIndexSelector, (configs, selectedConfigIndex) => configs[selectedConfigIndex]);

export const selectedActionSelector = createSelector(selectedConfigSelector, selectedActionIndexSelector, (config, selectedActionIndex) => config.actions[selectedActionIndex]);

export const selectedActionSettingsSelector = createSelector(selectedActionSelector, (action) => action.settings);

export const selectedActionStatementSelector = createSelector(selectedActionSelector, (action) => action.statement);

export const selectedActionAddonSelector = createSelector(selectedActionSelector, (action) => action.addon);

export const selectedActionStatementConditionsSelector = createSelector(selectedActionSelector, (action) => action.statement?.conditions);

export const configReducer = slice.reducer;
