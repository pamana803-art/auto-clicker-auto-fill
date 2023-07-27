export enum ADDON_CONDITIONS {
  '~~ Select Condition ~~' = '',
  '= Equals' = 'Equals',
  '!= Not Equals' = 'NotEquals',
  '~ Contains' = 'Contains',
  '!~ Not Contains' = 'NotContains',
  '> Greater Than' = 'GreaterThan',
  '< Less Than' = 'LessThan',
  '>= Greater Than Equals' = 'GreaterThanEquals',
  '<= Less Than Equals' = 'LessThanEquals',
}

export enum RECHECK_OPTIONS {
  STOP = 'stop',
  SKIP = 'skip',
  RELOAD = 'reload',
}
export type IAddon = {
  elementFinder: string;
  value: string;
  condition: ADDON_CONDITIONS;
  valueExtractor: string;
  recheck: number;
  recheckInterval: number;
  recheckOption: RECHECK_OPTIONS;
};

export const defaultAddon: IAddon = {
  elementFinder: '',
  value: '',
  condition: ADDON_CONDITIONS['~~ Select Condition ~~'],
  valueExtractor: '',
  recheck: 0,
  recheckInterval: 0,
  recheckOption: RECHECK_OPTIONS.STOP,
};
