import { LOCAL_STORAGE_KEY } from '@dhruv-techapps/acf-common';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { StorageService } from '@dhruv-techapps/core-service';
import { setConfigs } from '../config.slice';
import { RootState } from '@apps/acf-options-page/src/store';
import { addToast } from '../../toast.slice';

export const configReorderUpdateAPI = createAsyncThunk<boolean, void, { state: RootState }>('configReorder/update', async (_, thunkAPI) => {
  const configReorder = thunkAPI.getState().configReorder.configs;
  if (configReorder) {
    await StorageService.set(window.EXTENSION_ID, { [LOCAL_STORAGE_KEY.CONFIGS]: configReorder });
    thunkAPI.dispatch(setConfigs(configReorder));
    thunkAPI.dispatch(addToast({ header: 'Configurations reordered successfully!' }));
  }
  return true;
});
