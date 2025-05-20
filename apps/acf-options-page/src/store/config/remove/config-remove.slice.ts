import { Configuration } from '@dhruv-techapps/acf-common';
import { RANDOM_UUID } from '@dhruv-techapps/core-common';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import * as Sentry from '@sentry/react';
import { RootState } from '../..';
import { configRemoveGetAPI, configRemoveUpdateAPI } from './config-remove.api';

export type ConfigurationRemoveType = Configuration & { checked?: boolean };

type ConfigRemoveStore = {
  error?: string;
  message?: string;
  loading: boolean;
  configs: Array<ConfigurationRemoveType>;
};

const initialState: ConfigRemoveStore = { loading: true, configs: [] };

const slice = createSlice({
  name: 'configRemove',
  initialState,
  reducers: {
    setConfigRemoveMessage: (state, action: PayloadAction<string | undefined>) => {
      state.error = undefined;
      state.message = action.payload;
    },
    updateRemoveConfiguration: (state, action) => {
      state.configs = action.payload;
    },
    switchConfigRemoveSelection: (state, action: PayloadAction<RANDOM_UUID>) => {
      const config = state.configs.find((config) => config.id === action.payload);
      if (!config) {
        state.error = 'Invalid Config';
        Sentry.captureException(state.error);
        return;
      }
      config.checked = !config.checked;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(configRemoveUpdateAPI.rejected, (state, action) => {
      state.error = action.error.message;
      Sentry.captureException(state.error);
      state.message = undefined;
    });

    builder.addCase(configRemoveUpdateAPI.fulfilled, (state, action) => {
      state.message = 'Configurations removed successfully!';
      state.configs = action.payload;
    });
    builder.addCase(configRemoveGetAPI.fulfilled, (state, action) => {
      state.configs = action.payload;
      state.loading = false;
    });
    builder.addCase(configRemoveGetAPI.rejected, (state, action) => {
      state.error = action.error.message;
      Sentry.captureException(state.error);
      state.message = undefined;
      state.loading = false;
    });
  }
});

export const { switchConfigRemoveSelection, updateRemoveConfiguration, setConfigRemoveMessage } = slice.actions;

export const configRemoveSelector = (state: RootState) => state.configRemove;
export const configRemoveReducer = slice.reducer;
