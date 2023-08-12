import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = 'light';

const slice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    switchTheme: (state) => (state === 'light' ? 'dark' : 'light'),
  },
});
//window.dataLayer.push({ event: 'theme', conversionValue: theme === 'light' ? 'dark' : 'light' })
export const { switchTheme } = slice.actions;
export const themeSelector = (state:RootState) => state.theme
export default slice.reducer;
