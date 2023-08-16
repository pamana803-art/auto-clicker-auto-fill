import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { dataLayerModel } from '../util/data-layer';
import { RootState } from '../store';

type AddonStore = { visible: boolean; version?: string; data?: unknown };

const initialState: AddonStore = {
  visible: false,
};

export const checkBlog = createAsyncThunk('blog/check', async (version: string, thunkAPI) => {
  const response = await fetch(`https://blog.getautoclicker.com/${version}/`);
  if (response.status === 200) {
    const html = await response.text();
    const div = document.createElement('div');
    div.innerHTML = html;
    const content = div.querySelector('main.content');
    if (content) {
      return { data: content.innerHTML, version };
    }
  }
  throw new Error('Blog not found');
});

const slice = createSlice({
  name: 'configs',
  initialState,
  reducers: {
    hideBlog: () => {
      dataLayerModel('blog', 'close');
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkBlog.fulfilled, (state, action) => {
      state.data = action.payload;
      state.visible = true;
    });
  },
});

export const { hideBlog } = slice.actions;

export const blogSelector = (state: RootState) => state.blog;

export default slice.reducer;
