import { createSlice } from '@reduxjs/toolkit';

const initialState:any = {};

const slice = createSlice({
  name: 'i18n',
  initialState,
  reducers: {
    updateI18n: (state, action) => action.payload.web,
  },
});

export const { updateI18n } = slice.actions;

export default slice.reducer;
