import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../../store';
import { ActionSettings } from '@dhruv-techapps/acf-common';

export const openActionSettingsModalAPI = createAsyncThunk<{ settings: ActionSettings | undefined; index: number }, number, { state: RootState }>('action-setting/open', async (index, thunkAPI) => {
  const { configuration } = thunkAPI.getState() as RootState;
  const { selectedConfigIndex, configs } = configuration;
  return { settings: configs[selectedConfigIndex].actions[index].settings, index };
});
