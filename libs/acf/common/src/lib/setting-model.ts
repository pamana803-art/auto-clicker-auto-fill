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

export type SettingsNotifications = {
  onAction: boolean;
  onBatch: boolean;
  onConfig: boolean;
  onError: boolean;
  sound: boolean;
  discord: boolean;
};

export type SettingsBackup = {
  autoBackup: AUTO_BACKUP;
  lastBackup?: string;
};

export type Settings = {
  retry: number;
  retryInterval: number;
  retryOption: RETRY_OPTIONS;
  checkiFrames: boolean;
  backup: SettingsBackup;
  notifications: SettingsNotifications;
};


export const defaultSettings: Settings = {
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

export type Discord = {
  accent_color: number;
  avatar: string;
  banner_color: string;
  discriminator: string;
  displayName?: string;
  email: string;
  flags: number;
  id: string;
  locale: string;
  mfa_enabled: boolean;
  premium_type: number;
  public_flags: number;
  username: string;
  verified: boolean;
};

export type Google = {
  family_name: string;
  given_name: string;
  locale: string;
  name: string;
  picture: string;
  sub: string;
};