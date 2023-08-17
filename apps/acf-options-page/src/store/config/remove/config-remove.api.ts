import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { LOCAL_STORAGE_KEY } from '@dhruv-techapps/acf-common';
import { StorageService } from '@dhruv-techapps/core-service';
import { ConfigurationRemoveType } from './config-remove.slice';

export const configRemoveGetAPI = createAsyncThunk('configRemove/get', async () => {
  const result = await StorageService.get<{ [LOCAL_STORAGE_KEY.CONFIGS]: Array<ConfigurationRemoveType> }>(window.EXTENSION_ID, LOCAL_STORAGE_KEY.CONFIGS);
  return result.configs;
});

export const configRemoveUpdateAPI = createAsyncThunk<ConfigurationRemoveType[], void, { state: RootState }>('configRemove/update', async (_, { getState }) => {
  const filteredConfigs = getState()
    .configRemove.configs.filter((config) => !config.checked)
    .map((config) => {
      delete config.checked;
      return config;
    });
  const result = await StorageService.set(window.EXTENSION_ID, { [LOCAL_STORAGE_KEY.CONFIGS]: filteredConfigs });
  if (result) {
    window.location.reload();
  }
  return result;
});
