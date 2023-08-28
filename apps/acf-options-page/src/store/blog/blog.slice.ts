import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { blogCheckAPI } from './blog.api';

type AddonStore = { visible: boolean; title?: string; content?: string };

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
      state.content = action.payload.content;
      state.title = action.payload.title;
      state.visible = true;
    });
  },
});

export const { hideBlog } = slice.actions;

export const blogSelector = (state: RootState) => state.blog;

export const blogReducer = slice.reducer;
