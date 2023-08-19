import { actionAddonReducer } from './action/addon';
import { actionSettingsReducer } from './action/settings';
import { actionStatementReducer } from './action/statement';
import { configReducer } from './config.slice';
import { configRemoveReducer } from './remove';
import { configReorderReducer } from './reorder';
import { configSettingsReducer } from './settings';

export * from './config.slice';
export * from './config.middleware';
export * from './remove';
export * from './reorder';
export * from './settings';
export const configReducers = {
  actionSettings: actionSettingsReducer,
  actionStatement: actionStatementReducer,
  actionAddon: actionAddonReducer,
  configRemove: configRemoveReducer,
  configReorder: configReorderReducer,
  configSettings: configSettingsReducer,
  configuration: configReducer,
};
