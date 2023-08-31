type RegexType = {
  [index: string]: string;
};

const REGEX: RegexType = {
  NUMBER: '^-?\\d+$',
  INTERVAL: '^(([\\d]+[.])?[\\d]+e)?([\\d]+[.])?[\\d]+$',
  START_TIME: '^\\d{2}:\\d{2}:\\d{2}:\\d{3}$',
  HOT_KEY: '^(Ctrl \\+ |Alt \\+ |Shift \\+ )+\\D$',
};
export { REGEX };
