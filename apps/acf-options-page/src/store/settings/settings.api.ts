import { LOCAL_STORAGE_KEY, Settings } from '@dhruv-techapps/acf-common';
import { StorageService } from '@dhruv-techapps/core-service';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const settingsGetAPI = createAsyncThunk('settings/get', async () => {
  const result = await StorageService.get<{ [LOCAL_STORAGE_KEY.SETTINGS]: Settings }>(window.EXTENSION_ID, LOCAL_STORAGE_KEY.SETTINGS);
  return result.settings;
});
