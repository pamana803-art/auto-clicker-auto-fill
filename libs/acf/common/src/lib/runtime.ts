export enum RUNTIME_MESSAGE_ACF {
  CONFIG = 'config',
  SAVE_CONFIG = 'save-config',
  DISCORD_MESSAGING = 'discord-messaging',
  DISCORD_LOGIN = 'discord-login',
  GOOGLE_SHEETS = 'google-sheets',
  GOOGLE_OAUTH2 = 'google-oauth',
  GOOGLE_BACKUP = 'google-backup',
}

export type RuntimeMessageRequest = {
  messenger: RUNTIME_MESSAGE_ACF;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};
