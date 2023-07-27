import { IBatch, defaultBatch } from './batch-model'
import { IAction, defaultAction } from './action-model'

export enum LOAD_TYPES {
  WINDOW= 'window',
  DOCUMENT= 'document'
}

export enum START_TYPES  {
  AUTO= 'auto',
  MANUAL= 'manual'
}

const defaultHotkey = 'Ctrl + Shift + A'

export type IConfig = {
  name: '',
  url: '',
  initWait: 0,
  startTime: '',
  enable: true,
  spreadsheetId: '',
  startType: START_TYPES.AUTO,
  loadType: LOAD_TYPES.WINDOW,
  hotkey: string,
  batch: IBatch,
  actions: Array<IAction>
}

export const defaultConfig:IConfig = {
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
