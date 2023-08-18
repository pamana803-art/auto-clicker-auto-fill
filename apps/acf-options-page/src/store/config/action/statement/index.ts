import { PayloadAction } from '@reduxjs/toolkit';
import { ConfigStore } from '../../config.slice';
import { ACTION_RUNNING, ActionCondition } from '@dhruv-techapps/acf-common';

export * from './action-statement.slice';

type StatementCondition = { name: string; value: any; index: number } | null;

export const actionStatementActions = {
  updateActionStatementCondition: (state: ConfigStore, action: PayloadAction<StatementCondition>) => {
    if (action.payload) {
      const { configs, selectedActionIndex, selectedConfigIndex } = state;
      const { name, value, index } = action.payload;
      const statement = configs[selectedConfigIndex].actions[selectedActionIndex].statement;
      if (statement) {
        statement.conditions[index][name] = value;
      }
    }
  },
  addActionStatementCondition:(state:ConfigStore,action:PayloadAction<ActionCondition>)=>{
    const { configs, selectedActionIndex, selectedConfigIndex } = state;
    const statement = configs[selectedConfigIndex].actions[selectedActionIndex].statement;
    if (statement) {
      statement.conditions.push(action.payload);
    }
  },
  removeActionStatementCondition:(state:ConfigStore,action:PayloadAction<number>)=>{
    const { configs, selectedActionIndex, selectedConfigIndex } = state;
    const statement = configs[selectedConfigIndex].actions[selectedActionIndex].statement;
    if (statement) {
      delete statement.conditions[action.payload];
    }
  },
  updateActionStatementThen: (state: ConfigStore, action: PayloadAction<ACTION_RUNNING>) => {
    if (action.payload) {
      const { configs, selectedActionIndex, selectedConfigIndex } = state;
      const statement = configs[selectedConfigIndex].actions[selectedActionIndex].statement;
      if (statement) {
        statement.then = action.payload;
      }
    }
  },
  updateActionStatementGoto: (state: ConfigStore, action: PayloadAction<number>) => {
    if (action.payload) {
      const { configs, selectedActionIndex, selectedConfigIndex } = state;
      const statement = configs[selectedConfigIndex].actions[selectedActionIndex].statement;
      if (statement) {
        statement.goto = action.payload;
      }
    }
  },
  resetActionStatement: (state: ConfigStore) => {
    const { configs, selectedActionIndex, selectedConfigIndex } = state;
    delete configs[selectedConfigIndex].actions[selectedActionIndex].statement;
  },
};
