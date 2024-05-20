import { FirebaseFunctionsBackground } from '@dhruv-techapps/firebase-functions';
import { GOOGLE_LOCAL_STORAGE_KEY, GOOGLE_SCOPES } from '@dhruv-techapps/google-oauth';
import { NotificationHandler } from '@dhruv-techapps/notifications';
import { GoogleSheetsRequest, GoogleSheetsResponse } from './google-sheets.types';

const NOTIFICATIONS_TITLE = 'Google Sheets';
const NOTIFICATIONS_ID = 'sheets';

export class GoogleSheetsBackground extends FirebaseFunctionsBackground {
  scopes = [GOOGLE_SCOPES.SHEETS];
  async getSheets({ spreadsheetId, ranges }: GoogleSheetsRequest): Promise<GoogleSheetsResponse> {
    if (!spreadsheetId || !ranges) {
      throw new Error('spreadsheetId or ranges is not defined');
    }

    //const response = await this.getValues({ spreadsheetId, ranges });
    const response = await this.getValues<GoogleSheetsRequest, GoogleSheetsResponse>({ spreadsheetId, ranges });
    return response.filter((result) => {
      if (result.error) {
        NotificationHandler.notify(NOTIFICATIONS_ID, NOTIFICATIONS_TITLE, result.error.message);
        return false;
      }
      return true;
    });
  }

  async checkUser() {
    const { [GOOGLE_LOCAL_STORAGE_KEY.GOOGLE]: user } = await chrome.storage.local.get(GOOGLE_LOCAL_STORAGE_KEY.GOOGLE);
    return user;
  }

  async #getValues({ spreadsheetId, ranges }: GoogleSheetsRequest) {
    const user = await this.checkUser();
    if (!user) {
      throw new Error('Login into Google Sheets from Global Settings');
    }
    try {
      const headers = await this.getHeaders(this.scopes);
      const response = await Promise.all(ranges.map((range) => fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`, { headers }).then((r) => r.json())));
      return response.filter((result) => {
        if (result.error) {
          NotificationHandler.notify(NOTIFICATIONS_ID, NOTIFICATIONS_TITLE, result.error.message);
          return false;
        }
        return true;
      });
    } catch (error) {
      if (error instanceof Error) {
        NotificationHandler.notify(NOTIFICATIONS_ID, NOTIFICATIONS_TITLE, error.message);
      }
      await this.removeCachedAuthToken();
      throw error;
    }
  }
}
