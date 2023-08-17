import { actionStatementActions, actionStatementReducer } from './statement';
import { actionSettingsActions, actionSettingsReducer } from './settings';
import { actionAddonActions, actionAddonReducer } from './addon';

export * from './action.slice';
export * from './settings';

export const actionReducers = {
  actionSettings: actionSettingsReducer,
  actionStatement: actionStatementReducer,
  actionAddon: actionAddonReducer,
};

export const actions = {
  ...actionSettingsActions,
  ...actionStatementActions,
  ...actionAddonActions,
};
