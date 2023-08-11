export const REGEX_NUM = /^-?\d+$/;
export const REGEX_FLOAT = /^([\d]+[.])?[\d]+$/;
export const REGEX_INTERVAL = /^(([\d]+[.])?[\d]+e)?([\d]+[.])?[\d]+$/;
export const REGEX_START_TIME = /^\d{2}:\d{2}:\d{2}:\d{3}$/;

type RegexType = {
    [index:string]: RegExp
}

const REGEX:RegexType = {
  NUMBER: /^-?\d+$/,
  FLOAT: /^([\d]+[.])?[\d]+$/,
  INTERVAL: /^(([\d]+[.])?[\d]+e)?([\d]+[.])?[\d]+$/,
  START_TIME: /^\d{2}:\d{2}:\d{2}:\d{3}$/,
  HOT_KEY: /^(Ctrl \+ |Alt \+ |Shift \+ )+\D$/,
};
export { REGEX };
