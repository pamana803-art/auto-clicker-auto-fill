import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../../store';

type ActionStatementStore = {
  visible: boolean;
  loading: boolean;
  error?: string;
  message?: string;
};

const initialState: ActionStatementStore = { visible: false, loading: true };

const slice = createSlice({
  name: 'actionStatement',
  initialState,
  reducers: {
    switchActionStatementModal: (state) => {
      state.visible = !state.visible;
    },
  },
});

export const { switchActionStatementModal } = slice.actions;

export const actionStatementSelector = (state: RootState) => state.actionStatement;
export const actionStatementReducer = slice.reducer;
