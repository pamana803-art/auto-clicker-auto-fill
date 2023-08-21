import { Addon } from './addon-model';
import { RETRY_OPTIONS } from './setting-model';


// Action Condition
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

export enum ACTION_CONDITION_OPR {
  AND = 'and',
  OR = 'or',
}

export type ActionCondition = {
  actionIndex: number;
  status: ACTION_STATUS;
  operator: ACTION_CONDITION_OPR;
};

export const defaultActionCondition = {
  actionIndex: -1,
  status: ACTION_STATUS['~~ Select STATUS ~~'],
  operator: ACTION_CONDITION_OPR.AND,
};


// Action Statement

export type ActionStatement = {
  conditions: Array<ActionCondition>;
  then: ACTION_RUNNING;
  goto?: number;
};

export const defaultActionStatement = {
  conditions: [{ ...defaultActionCondition }],
  then: ACTION_RUNNING.PROCEED,
};

// Action Setting
export type ActionSettings = {
  iframeFirst?: boolean;
  retry?: number;
  retryInterval?: number;
  retryOption?: RETRY_OPTIONS;
};

export const defaultActionSettings = {}

// Action
export enum ELEMENT_TYPE {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  SELECT = 'select',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
}

export type Action = {
  elementFinder: string;
  elementType?: ELEMENT_TYPE;
  actionId?: number;
  name?: string;
  error?: string;
  initWait?: number;
  value?: string;
  repeat?: number;
  repeatInterval?: number;
  addon?: Addon;
  statement?: ActionStatement;
  settings?: ActionSettings;
};

export const defaultAction: Action = {
  elementFinder: '',
};
