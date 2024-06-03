/*global chrome*/

import { FirebaseFunctionsBackground } from '@dhruv-techapps/firebase-functions';
import { GOOGLE_SCOPES } from '@dhruv-techapps/google-oauth';
import { NotificationHandler } from '@dhruv-techapps/notifications';
import { BACKUP_ALARM, MINUTES_IN_DAY, NOTIFICATIONS_ID, NOTIFICATIONS_TITLE } from './google-drive.constant';
import { AUTO_BACKUP, DriveFile, GoogleDriveFile } from './google-drive.types';

export class GoogleDriveBackground extends FirebaseFunctionsBackground {
  scopes = [GOOGLE_SCOPES.DRIVE];

  async setAlarm(autoBackup: AUTO_BACKUP) {
    const alarmInfo: chrome.alarms.AlarmCreateInfo = { when: Date.now() + 500 };
    await chrome.alarms.clear(BACKUP_ALARM);
    switch (autoBackup) {
      case AUTO_BACKUP.DAILY:
        alarmInfo.periodInMinutes = MINUTES_IN_DAY;
        break;
      case AUTO_BACKUP.WEEKLY:
        alarmInfo.periodInMinutes = MINUTES_IN_DAY * 7;
        break;
      case AUTO_BACKUP.MONTHLY:
        alarmInfo.periodInMinutes = MINUTES_IN_DAY * 30;
        break;
      case AUTO_BACKUP.OFF:
        NotificationHandler.notify(NOTIFICATIONS_ID, NOTIFICATIONS_TITLE, 'Auto backup off', false);
        return;
      default:
        break;
    }
    NotificationHandler.notify(NOTIFICATIONS_ID, NOTIFICATIONS_TITLE, `Auto backup set ${autoBackup}`, false);
    chrome.alarms.create(BACKUP_ALARM, alarmInfo);
  }

  async checkInvalidCredentials(message: string) {
    if (message === 'Invalid Credentials' || message.includes('invalid authentication credentials')) {
      await this.removeCachedAuthToken();
      NotificationHandler.notify(NOTIFICATIONS_ID, NOTIFICATIONS_TITLE, 'Token expired reauthenticate!');
      return true;
    }
    NotificationHandler.notify(NOTIFICATIONS_ID, NOTIFICATIONS_TITLE, message);
    return false;
  }

  async createOrUpdate(name: string, data: string, fileId?: string) {
    const result = await this.getGoogleDriveCreateOrUpdate({ name, data, fileId });
    return result;
  }

  async listWithContent(): Promise<Array<DriveFile>> {
    const { files } = await this.getGoogleDriveList<GoogleDriveFile>();
    for (const file of files) {
      file.content = await this.getGoogleDriveGet(file);
    }
    return files;
  }
}
