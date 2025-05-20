import { RootState } from '@acf-options-page/store';
import { Configuration, LOCAL_STORAGE_KEY } from '@dhruv-techapps/acf-common';
import { StorageService } from '@dhruv-techapps/core-service';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const configReorderGetAPI = createAsyncThunk('configReorder/getAll', async () => {
  const result = await StorageService.get<LOCAL_STORAGE_KEY.CONFIGS, Array<Configuration>>(LOCAL_STORAGE_KEY.CONFIGS);
  const configurations = result.configs ?? [];
  return configurations;
});

export const configReorderUpdateAPI = createAsyncThunk<void, Array<Configuration>, { state: RootState }>('configReorder/update', async (configs) => {
  await StorageService.set({ [LOCAL_STORAGE_KEY.CONFIGS]: configs });
});
