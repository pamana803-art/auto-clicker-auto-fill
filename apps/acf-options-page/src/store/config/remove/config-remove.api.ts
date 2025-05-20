import { Configuration, LOCAL_STORAGE_KEY } from '@dhruv-techapps/acf-common';
import { StorageService } from '@dhruv-techapps/core-service';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ConfigurationRemoveType, RootState } from '../..';

export const configRemoveGetAPI = createAsyncThunk('configRemove/getAll', async () => {
  const result = await StorageService.get<LOCAL_STORAGE_KEY.CONFIGS, Array<Configuration>>(LOCAL_STORAGE_KEY.CONFIGS);
  const configurations = result.configs ?? [];
  return configurations;
});

export const configRemoveUpdateAPI = createAsyncThunk<Array<ConfigurationRemoveType>, Array<ConfigurationRemoveType>, { state: RootState }>('configRemove/update', async (configs) => {
  const filteredConfigs = configs
    ?.filter((config) => !config.checked)
    .map((config) => {
      delete config.checked;
      return config;
    });
  await StorageService.set({ [LOCAL_STORAGE_KEY.CONFIGS]: filteredConfigs });
  return filteredConfigs;
});
