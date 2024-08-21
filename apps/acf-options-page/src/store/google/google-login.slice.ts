import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { googleHasAccessAPI, googleLoginAPI } from './google-login.api';

type GoogleStore = {
  error?: string;
  grantedScopes: string[];
};

const initialState: GoogleStore = { grantedScopes: [] };

const slice = createSlice({
  name: 'google',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(googleLoginAPI.fulfilled, (state, action) => {
      if (action.payload.grantedScopes) {
        state.grantedScopes?.push(...action.payload.grantedScopes);
      }
    });
    builder.addCase(googleLoginAPI.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(googleHasAccessAPI.fulfilled, (state, action) => {
      if (action.payload.grantedScopes) {
        state.grantedScopes?.push(...action.payload.grantedScopes);
      }
    });
    builder.addCase(googleHasAccessAPI.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const googleSelector = (state: RootState) => state.google;
export const googleReducer = slice.reducer;
