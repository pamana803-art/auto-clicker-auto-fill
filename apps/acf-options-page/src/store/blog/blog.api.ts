import { createAsyncThunk } from '@reduxjs/toolkit';

export const blogCheckAPI = createAsyncThunk('blog/check', async (version: string) => {
  const response = await fetch(`https://blog.getautoclicker.com/${version}/`);
  if (response.status === 200) {
    const html = await response.text();
    const div = document.createElement('div');
    div.innerHTML = html;
    const content = div.querySelector('.post');
    if (content) {
      content.querySelectorAll('table').forEach((table) => {
        table.classList.add('table');
        table.classList.add('table-sm');
      });
      const title = content.querySelector('.post-title');
      const authorInfo = content.querySelector('.author-info');
      if (title) {
        content.removeChild(title);
      }
      if (authorInfo) {
        content.removeChild(authorInfo);
      }
      return { content: content.innerHTML, version, title: title?.innerHTML };
    }
  }
  throw new Error('Blog not found');
});
