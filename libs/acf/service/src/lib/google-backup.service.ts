import { AUTO_BACKUP, RUNTIME_MESSAGE_ACF } from '@dhruv-techapps/acf-common';
import { AcfService } from './service';

export class GoogleBackupService extends AcfService {
  static async backup(extensionId: string) {
    return await this.message(extensionId, { messenger: RUNTIME_MESSAGE_ACF.GOOGLE_BACKUP, methodName: 'backup', message: true });
  }

  static async autoBackup(extensionId: string, autoBackup?: AUTO_BACKUP) {
    return await this.message(extensionId, { messenger: RUNTIME_MESSAGE_ACF.GOOGLE_BACKUP, methodName: 'setAlarm', message: autoBackup });
  }
  
  static async restore(extensionId: string) {
    return await this.message(extensionId, { messenger: RUNTIME_MESSAGE_ACF.GOOGLE_BACKUP, methodName: 'restore' });
  }
}
