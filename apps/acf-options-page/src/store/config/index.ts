import { actionReducers } from './action';
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
  config: configReducer,
  configRemove: configRemoveReducer,
  configReorder: configReorderReducer,
  configSettings: configSettingsReducer,
  ...actionReducers,
};
