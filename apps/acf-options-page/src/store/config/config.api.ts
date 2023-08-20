import { createAsyncThunk } from '@reduxjs/toolkit';
import { Configuration, LOCAL_STORAGE_KEY } from '@dhruv-techapps/acf-common';
import { StorageService } from '@dhruv-techapps/core-service';
import { checkQueryParams } from './config.slice.util';

export const configGetAllAPI = createAsyncThunk('config/getAll', async (_, thunkAPI) => {
  const result = await StorageService.get<{ [LOCAL_STORAGE_KEY.CONFIGS]: Array<Configuration> }>(window.EXTENSION_ID, LOCAL_STORAGE_KEY.CONFIGS);
  const configurations = result.configs;
  if (configurations) {
    const selectedConfigIndex = checkQueryParams(configurations, thunkAPI);
    return { configurations, selectedConfigIndex };
  }
});