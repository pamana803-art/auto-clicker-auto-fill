import { IAddon, defaultAddon } from './addon-model';
import { RETRY_OPTIONS } from './setting-model';

export enum ACTION_RUNNING {
  SKIP = 'skip',
  GOTO = 'goto',
  PROCEED = 'proceed',
}

export enum ELEMENT_TYPE {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  SELECT = 'select',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
}

export enum ACTION_STATUS {
  '~~ Select STATUS ~~' = '',
  SKIPPED = 'skipped',
  DONE = 'done',
}

export enum ACTION_CONDITION_OPR {
  AND = 'and',
  OR = 'or',
}
export type IAction = {
  name: string;
  initWait: number;
  elementFinder: string;
  enable: true;
  value: string;
  repeat: number;
  repeatInterval: number;
  elementType: string;
  addon: IAddon;
};
export const defaultAction: IAction = {
  name: '',
  initWait: 0,
  elementFinder: '',
  enable: true,
  value: '',
  repeat: 0,
  repeatInterval: 0,
  elementType: '',
  addon: { ...defaultAddon },
};
export type IActionSetting = {
  retry: number;
  retryInterval: number;
  retryOption: RETRY_OPTIONS;
};

export const defaultActionSetting: IActionSetting = {
  retry: 5,
  retryInterval: 1,
  retryOption: RETRY_OPTIONS.STOP,
};

export const defaultActionCondition = {
  actionIndex: -1,
  status: ACTION_STATUS['~~ Select STATUS ~~'],
};
