import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../../store';

type ActionStatementStore = {
  visible: boolean;
  error?: string;
  message?: string;
};

const initialState: ActionStatementStore = { visible: false };

const slice = createSlice({
  name: 'actionStatement',
  initialState,
  reducers: {
    switchActionStatementModal: (state) => {
      state.visible = !state.visible;
    },
    setActionStatementMessage: (state, action: PayloadAction<string | undefined>) => {
      state.message = action.payload;
      state.error = undefined;
    },
    setActionStatementError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.message = undefined;
    },
  },
});

export const { switchActionStatementModal, setActionStatementMessage, setActionStatementError } = slice.actions;

export const actionStatementSelector = (state: RootState) => state.actionStatement;
export const actionStatementReducer = slice.reducer;
