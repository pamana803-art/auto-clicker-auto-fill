import { createAsyncThunk } from '@reduxjs/toolkit';

export const blogCheckAPI = createAsyncThunk('blog/check', async (version: string) => {
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
