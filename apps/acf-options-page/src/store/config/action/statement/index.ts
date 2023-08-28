import { PayloadAction } from '@reduxjs/toolkit';
import { ConfigStore } from '../../config.slice';
import { ACTION_RUNNING, ActionCondition, ActionStatement, defaultActionCondition, defaultActionStatement } from '@dhruv-techapps/acf-common';

export * from './action-statement.slice';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StatementCondition = { name: string; value: any; index: number };

export const actionStatementActions = {
  updateActionStatementCondition: (state: ConfigStore, action: PayloadAction<StatementCondition>) => {
    const { configs, selectedActionIndex, selectedConfigIndex } = state;
    const { name, value, index } = action.payload;
    const statement = configs[selectedConfigIndex].actions[selectedActionIndex].statement;
    if (statement) {
      if (statement.conditions) {
        statement.conditions[index][name] = value;
      } else {
        statement.conditions = [{ ...defaultActionCondition, [name]: value, operator: undefined }];
      }
    } else {
      configs[selectedConfigIndex].actions[selectedActionIndex].statement = { ...defaultActionStatement, conditions: [{ ...defaultActionCondition, [name]: value, operator: undefined }] };
    }
  },
  addActionStatementCondition: (state: ConfigStore, action: PayloadAction<ActionCondition>) => {
    const { configs, selectedActionIndex, selectedConfigIndex } = state;
    const statement = configs[selectedConfigIndex].actions[selectedActionIndex].statement;
    if (statement) {
      statement.conditions.push(action.payload);
    } else {
      configs[selectedConfigIndex].actions[selectedActionIndex].statement = { ...defaultActionStatement, conditions: [{ ...defaultActionCondition, operator: undefined }, action.payload] };
    }
  },
  removeActionStatementCondition: (state: ConfigStore, action: PayloadAction<number>) => {
    const { configs, selectedActionIndex, selectedConfigIndex } = state;
    const statement = configs[selectedConfigIndex].actions[selectedActionIndex].statement;
    statement?.conditions.splice(action.payload, 1);
  },
  updateActionStatementThen: (state: ConfigStore, action: PayloadAction<ACTION_RUNNING>) => {
    const { configs, selectedActionIndex, selectedConfigIndex } = state;
    const statement = configs[selectedConfigIndex].actions[selectedActionIndex].statement;
    if (statement) {
      statement.then = action.payload;
      if (action.payload === ACTION_RUNNING.GOTO) {
        statement.goto = 0;
      }
    } else {
      const request: ActionStatement = { ...defaultActionStatement, then: action.payload };
      if (action.payload === ACTION_RUNNING.GOTO) {
        request.goto = 0;
      }
      configs[selectedConfigIndex].actions[selectedActionIndex].statement = request;
    }
  },
  updateActionStatementGoto: (state: ConfigStore, action: PayloadAction<number>) => {
    const { configs, selectedActionIndex, selectedConfigIndex } = state;
    const statement = configs[selectedConfigIndex].actions[selectedActionIndex].statement;
    if (statement) {
      statement.goto = action.payload;
    } else {
      configs[selectedConfigIndex].actions[selectedActionIndex].statement = { ...defaultActionStatement, goto: action.payload };
    }
  },
  resetActionStatement: (state: ConfigStore) => {
    const { configs, selectedActionIndex, selectedConfigIndex } = state;
    delete configs[selectedConfigIndex].actions[selectedActionIndex].statement;
  },
};
