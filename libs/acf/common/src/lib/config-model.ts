import { Batch, defaultBatch } from './batch-model'
import { Action, defaultAction } from './action-model'

export enum LOAD_TYPES {
  WINDOW= 'window',
  DOCUMENT= 'document'
}

export enum START_TYPES  {
  AUTO= 'auto',
  MANUAL= 'manual'
}

const defaultHotkey = 'Ctrl + Shift + A'

export type Configuration = {
  name: '',
  url: '',
  initWait: 0,
  startTime: '',
  enable: true,
  spreadsheetId: '',
  startType: START_TYPES.AUTO,
  loadType: LOAD_TYPES.WINDOW,
  hotkey: string,
  batch: Batch,
  actions: Array<Action>
}

export const defaultConfig:Configuration = {
  name: '',
  url: '',
  initWait: 0,
  startTime: '',
  enable: true,
  spreadsheetId: '',
  startType: START_TYPES.AUTO,
  loadType: LOAD_TYPES.WINDOW,
  hotkey: defaultHotkey,
  batch: { ...defaultBatch },
  actions: [{ ...defaultAction }]
}
