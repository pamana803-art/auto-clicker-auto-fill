import { Addon } from './addon-model';
import { RETRY_OPTIONS } from './setting-model';

export enum ACTION_STATUS {
  '~~ Select STATUS ~~' = '',
  SKIPPED = 'skipped',
  DONE = 'done',
}

export enum ACTION_RUNNING {
  SKIP = 'skip',
  GOTO = 'goto',
  PROCEED = 'proceed',
}

export type ActionCondition = {
  actionIndex: number;
  status: ACTION_STATUS;
  operator?: ACTION_CONDITION_OPR;
};

export enum ACTION_CONDITION_OPR {
  AND = 'and',
  OR = 'or',
}

export type ActionStatement = {
  conditions: Array<ActionCondition>;
  then: ACTION_RUNNING;
  goto?: number;
};

export enum ELEMENT_TYPE {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  SELECT = 'select',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
}

export type Action = {
  actionId: number;
  elementFinder: string;
  elementType: ELEMENT_TYPE;
  enable: boolean;
  name?: string;
  initWait?: number;
  value?: string;
  repeat?: number;
  repeatInterval?: number;
  addon?: Addon;
  statement?: ActionStatement;
};

export type ActionSetting = {
  retry: number;
  retryInterval: number;
  retryOption: RETRY_OPTIONS;
};
