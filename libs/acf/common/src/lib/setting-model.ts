export enum RETRY_OPTIONS {
  STOP = 'stop',
  SKIP = 'skip',
  RELOAD = 'reload',
}

export enum AUTO_BACKUP {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  OFF = 'off',
}

export type ISettings = {
  retry: number;
  retryInterval: number;
  retryOption: RETRY_OPTIONS;
  checkiFrames: boolean;
  backup: {
    autoBackup: AUTO_BACKUP;
  };
  notifications: {
    onAction: boolean;
    onBatch: boolean;
    onConfig: boolean;
    onError: boolean;
    sound: boolean;
    discord: boolean;
  };
};

export const defaultSettings: ISettings = {
  retry: 5,
  retryInterval: 1,
  retryOption: RETRY_OPTIONS.STOP,
  checkiFrames: false,
  backup: {
    autoBackup: AUTO_BACKUP.OFF,
  },
  notifications: {
    onAction: false,
    onBatch: false,
    onConfig: false,
    onError: false,
    sound: false,
    discord: false,
  },
};
