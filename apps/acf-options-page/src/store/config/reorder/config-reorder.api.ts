import { Configuration, LOCAL_STORAGE_KEY } from "@dhruv-techapps/acf-common";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { StorageService } from "@dhruv-techapps/core-service";

export const configReorderGetAPI = createAsyncThunk('configReorder/get', async () => {
  const result = await StorageService.get<{ [LOCAL_STORAGE_KEY.CONFIGS]: Array<Configuration> }>(window.EXTENSION_ID, LOCAL_STORAGE_KEY.CONFIGS);
  return result.configs;
});

export const configReorderUpdateAPI = createAsyncThunk<Configuration[], void, { state: RootState }>('configReorder/update', async (_, { getState }) => {
  const configReorder = getState().configReorder.configs;
  const result = await StorageService.set(window.EXTENSION_ID, { [LOCAL_STORAGE_KEY.CONFIGS]: configReorder });
  if (result) {
    window.location.reload();
  }
  return result;
});
