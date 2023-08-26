import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { blogCheckAPI } from './blog.api';

type AddonStore = { visible: boolean; version?: string; data?: unknown };

const initialState: AddonStore = {
  visible: false,
};

const slice = createSlice({
  name: 'configs',
  initialState,
  reducers: {
    hideBlog: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(blogCheckAPI.fulfilled, (state, action) => {
      state.data = action.payload;
      state.visible = true;
    });
  },
});

export const { hideBlog } = slice.actions;

export const blogSelector = (state: RootState) => state.blog;

export const blogReducer = slice.reducer;
