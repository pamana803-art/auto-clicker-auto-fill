import { RUNTIME_MESSAGE_ACF } from '@dhruv-techapps/acf-common';
import { AcfService } from './service';

export class GoogleSheetsService extends AcfService {
  static async login(extensionId: string) {
    return await this.message(extensionId, { messenger: RUNTIME_MESSAGE_ACF.GOOGLE_SHEETS, login: true });
  }
  static async remove(extensionId: string) {
    return await this.message(extensionId, { messenger: RUNTIME_MESSAGE_ACF.GOOGLE_SHEETS, remove: true });
  }
  static async getSheets(extensionId: string, spreadsheetId: string, ranges: Array<any>) {
    return await this.message(extensionId, { messenger: RUNTIME_MESSAGE_ACF.GOOGLE_SHEETS, spreadsheetId, ranges });
  }
}
