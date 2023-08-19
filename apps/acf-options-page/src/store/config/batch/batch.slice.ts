import { RootState } from '@apps/acf-options-page/src/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type BatchStore = {
  error?: string;
  message?: string;
};

const initialState: BatchStore = {};

const slice = createSlice({
  name: 'batch',
  initialState,
  reducers: {
    setBatchMessage: (state, action: PayloadAction<string | undefined>) => {
      state.message = action.payload;
      state.error = undefined;
    },
    setBatchError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.message = undefined;
    },
  },
});

export const { setBatchMessage, setBatchError } = slice.actions;

export const batchSelector = (state: RootState) => state.batch;
export const batchReducer = slice.reducer;
