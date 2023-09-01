import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../../store';
import { Addon } from '@dhruv-techapps/acf-common';

export const openActionAddonModalAPI = createAsyncThunk<{ addon: Addon | undefined; index: number }, number, { state: RootState }>('action-addon/open', async (index, thunkAPI) => {
  const { configuration } = thunkAPI.getState() as RootState;
  const { selectedConfigIndex, configs } = configuration;
  return { addon: configs[selectedConfigIndex].actions[index].addon, index };
});
