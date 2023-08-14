import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type modeType = 'light' | 'pro'

const initialState = localStorage.getItem('mode') || 'light';

const slice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    switchMode: (state) => {
      const mode:modeType = state === 'light' ? 'pro' : 'light'
      localStorage.setItem('mode', mode)
      return mode
    }
  },
});

export const { switchMode } = slice.actions;

export const modeSelector = (state:RootState) => state.mode

export default slice.reducer;
