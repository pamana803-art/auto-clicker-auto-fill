import { createSlice } from '@reduxjs/toolkit';
import * as Sentry from '@sentry/react';
import { RootState } from '.';
import { NO_EXTENSION_ERROR } from '../utils/constants';
import { getManifest } from './app.api';

type AppStore = {
  manifest?: Partial<chrome.runtime.Manifest>;
  error?: string;
  loading: boolean;
  extensionNotFound: boolean;
};

const initialState: AppStore = {
  loading: true,
  extensionNotFound: false
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setManifest: (state, action) => {
      state.manifest = action.payload;
      state.loading = false;
    },
    setAppError: (state, action) => {
      state.error = action.payload;
      Sentry.captureException(state.error);
      state.loading = false;
    }
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
        Sentry.captureException(state.error);
        if (NO_EXTENSION_ERROR.includes(error)) {
          state.error = "Kindly download the extension first. If it's already installed, please refresh the page to proceed.";
          state.extensionNotFound = true;
          window.dataLayer.push({ event: 'extension_not_found', name: 'extension_not_found' });
        }
      }
    });
  }
});

export const { setAppError, setManifest } = slice.actions;

export const appSelector = (state: RootState) => state.app;

export default slice.reducer;
