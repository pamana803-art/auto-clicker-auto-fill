import { Configuration } from '@dhruv-techapps/acf-common';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import * as Sentry from '@sentry/react';
import { RootState } from '../..';
import { configReorderGetAPI, configReorderUpdateAPI } from './config-reorder.api';

type ConfigReorderStore = {
  error?: string;
  message?: string;
  loading: boolean;
  configs: Array<Configuration>;
};

const initialState: ConfigReorderStore = { loading: true, configs: [] };

const slice = createSlice({
  name: 'configReorder',
  initialState,
  reducers: {
    updateConfigReorder: (state, action: PayloadAction<Array<Configuration>>) => {
      state.configs = action.payload;
    },
    setConfigReorderMessage: (state, action: PayloadAction<string | undefined>) => {
      state.error = undefined;
      state.message = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(configReorderUpdateAPI.rejected, (state, action) => {
      state.error = action.error.message;
      Sentry.captureException(state.error);
      state.message = undefined;
    });
    builder.addCase(configReorderUpdateAPI.fulfilled, (state) => {
      state.message = 'Configurations reordered successfully!';
    });
    builder.addCase(configReorderGetAPI.fulfilled, (state, action) => {
      state.configs = action.payload;
      state.loading = false;
    });
    builder.addCase(configReorderGetAPI.rejected, (state, action) => {
      state.error = action.error.message;
      Sentry.captureException(state.error);
      state.message = undefined;
      state.loading = false;
    });
  }
});

export const { updateConfigReorder, setConfigReorderMessage } = slice.actions;

export const configReorderSelector = (state: RootState) => state.configReorder;
export const configReorderReducer = slice.reducer;
