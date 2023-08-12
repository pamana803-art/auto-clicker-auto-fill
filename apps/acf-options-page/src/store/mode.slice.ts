import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = 'light';

// dataLayerInput({ mode: mode === 'light' ? 'pro' : 'light' }, LOCAL_STORAGE_KEY.SETTINGS);

const slice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    switchMode: (state) => (state === 'light' ? 'pro' : 'light'),
  },
});

export const { switchMode } = slice.actions;

export const modeSelector = (state:RootState) => state.mode

export default slice.reducer;
