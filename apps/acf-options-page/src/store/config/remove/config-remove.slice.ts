import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { Configuration } from '@dhruv-techapps/acf-common';
import { configRemoveGetAPI, configRemoveUpdateAPI } from './config-remove.api';

export type ConfigurationRemoveType = Configuration & { checked?: boolean };

type ConfigRemoveStore = {
  visible: boolean;
  loading: boolean;
  error?: string;
  configs: Array<ConfigurationRemoveType>;
};

const initialState: ConfigRemoveStore = { visible: false, loading: true, configs: [] };

const slice = createSlice({
  name: 'configRemove',
  initialState,
  reducers: {
    switchConfigRemoveModal: (state) => {
      state.visible = !state.visible;
    },
    switchConfigRemoveSelection: (state, action: PayloadAction<number>) => {
      state.configs[action.payload].checked = !state.configs[action.payload].checked;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(configRemoveGetAPI.fulfilled, (state, action) => {
      if (action.payload) {
        const configurations = action.payload;
        state.configs = configurations.map((config) => {
          config.checked = false;
          return config;
        });
      }
      state.loading = false;
    });
    builder.addCase(configRemoveGetAPI.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
    builder.addCase(configRemoveUpdateAPI.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const { switchConfigRemoveSelection, switchConfigRemoveModal } = slice.actions;

export const configRemoveSelector = (state: RootState) => state.configRemove;
export const configRemoveReducer = slice.reducer;
