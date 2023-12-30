import { RUNTIME_MESSAGE_ACF } from '@dhruv-techapps/acf-common';
import { AcfService } from './service';

export class GoogleSheetsService extends AcfService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async getSheets(extensionId: string, spreadsheetId: string, ranges: Array<any>) {
    return await this.message(extensionId, { messenger: RUNTIME_MESSAGE_ACF.GOOGLE_SHEETS, methodName: 'getSheets', message: { spreadsheetId, ranges } });
  }
}
