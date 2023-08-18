import { actionStatementReducer } from './statement';
import { actionSettingsReducer } from './settings';
import { actionAddonReducer } from './addon';

export * from './action.slice';
export * from './settings';
export * from './statement';
export * from './addon'

export const actionReducers = {
  actionSettings: actionSettingsReducer,
  actionStatement: actionStatementReducer,
  actionAddon: actionAddonReducer,
};
