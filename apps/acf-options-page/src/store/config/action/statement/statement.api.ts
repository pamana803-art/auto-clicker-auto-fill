import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../../store';
import { ActionStatement } from '@dhruv-techapps/acf-common';

export const openActionStatementModalAPI = createAsyncThunk<{ statement: ActionStatement | undefined; index: number }, number, { state: RootState }>(
  'action-statement/open',
  async (index, thunkAPI) => {
    const { configuration } = thunkAPI.getState() as RootState;
    const { selectedConfigIndex, configs } = configuration;
    return { statement: configs[selectedConfigIndex].actions[index].statement, index };
  }
);
