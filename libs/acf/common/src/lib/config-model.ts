import { Batch } from './batch-model';
import { Action } from './action-model';

export enum LOAD_TYPES {
  WINDOW = 'window',
  DOCUMENT = 'document',
}

export enum START_TYPES {
  AUTO = 'auto',
  MANUAL = 'manual',
}

export const defaultHotkey = 'Ctrl + Shift + A';

export type Configuration = {
  configId: number;
  url: string;
  enable: boolean;
  startType: START_TYPES;
  loadType: LOAD_TYPES;
  name?: string;
  initWait?: number;
  startTime?: string;
  spreadsheetId?: string;
  hotkey?: string;
  batch?: Batch;
  actions: Array<Action>;
  new?:boolean
};

export const defaultConfig: Configuration = {
  configId: -1,
  url: '',
  enable: true,
  startType: START_TYPES.AUTO,
  loadType: LOAD_TYPES.WINDOW,
  actions: [],
};
