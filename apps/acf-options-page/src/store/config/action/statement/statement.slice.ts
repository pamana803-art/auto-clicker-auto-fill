import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../../store';
import { ACTION_RUNNING, ActionCondition, ActionStatement, defaultActionStatement } from '@dhruv-techapps/acf-common';

type ActionStatementStore = {
  visible: boolean;
  error?: string;
  message?: string;
  statement: ActionStatement;
};

const initialState: ActionStatementStore = { visible: false, statement: { ...defaultActionStatement } };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StatementCondition = { name: string; value: any; index: number };

const slice = createSlice({
  name: 'actionStatement',
  initialState,
  reducers: {
    updateActionStatementCondition: (state, action: PayloadAction<StatementCondition>) => {
      const { name, value, index } = action.payload;
      state.statement.conditions[index][name] = value;
    },
    addActionStatementCondition: (state, action: PayloadAction<ActionCondition>) => {
      state.statement.conditions.push(action.payload);
    },
    removeActionStatementCondition: (state, action: PayloadAction<number>) => {
      state.statement.conditions.splice(action.payload, 1);
    },
    updateActionStatementThen: (state, action: PayloadAction<ACTION_RUNNING>) => {
      state.statement.then = action.payload;
      if (action.payload === ACTION_RUNNING.GOTO) {
        state.statement.goto = 0;
      }
    },
    updateActionStatementGoto: (state, action: PayloadAction<number>) => {
      state.statement.goto = action.payload;
    },
    switchActionStatementModal: (state, action: PayloadAction<ActionStatement | undefined>) => {
      state.statement = action.payload || { ...defaultActionStatement };
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

export const {
  addActionStatementCondition,
  removeActionStatementCondition,
  setActionStatementError,
  setActionStatementMessage,
  switchActionStatementModal,
  updateActionStatementCondition,
  updateActionStatementGoto,
  updateActionStatementThen,
} = slice.actions;

export const actionStatementSelector = (state: RootState) => state.actionStatement;
export const actionStatementReducer = slice.reducer;
