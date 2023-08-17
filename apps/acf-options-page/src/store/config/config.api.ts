import { createAsyncThunk } from '@reduxjs/toolkit';
import { addToast } from '../toast.slice';
import { RootState } from '../../store';
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

export const configImportAPI = createAsyncThunk<Configuration, FileReader | null>('config/import', (target) => {
  if (target === null || target.result === null) {
    throw new Error('No Files Selected');
  }
  const importedConfig: Configuration = JSON.parse(target.result as string);
  if (Array.isArray(importedConfig)) {
    throw new Error('JSON File error');
  }
  return importedConfig;
});

export const configImportAllAPI = createAsyncThunk<Array<Configuration>, FileReader | null>('config/importAll', (target) => {
  if (target === null || target.result === null) {
    throw new Error('No files selected');
  }
  const importedConfigs: Array<Configuration> = JSON.parse(target.result as string);
  if (!Array.isArray(importedConfigs)) {
    throw new Error('JSON File error');
  }
  return importedConfigs;
});
