import { GOOGLE_SCOPES, LOCAL_STORAGE_KEY, RESPONSE_CODE } from '@dhruv-techapps/acf-common';
import GoogleOauth2 from './google-oauth2';
import { NotificationHandler } from './notifications';

const NOTIFICATIONS_TITLE = 'Google Sheets';
const NOTIFICATIONS_ID = 'sheets';

type GoogleSheetsType = {
  spreadsheetId: string;
  ranges: Array<string>;
};

export default class GoogleSheets extends GoogleOauth2 {
  scopes = [GOOGLE_SCOPES.DRIVE, GOOGLE_SCOPES.PROFILE];
  async getSheets({ spreadsheetId, ranges }: GoogleSheetsType) {
    let response;
    if (!spreadsheetId || !ranges) {
      NotificationHandler.notify(NOTIFICATIONS_ID, NOTIFICATIONS_TITLE, 'spreadsheetId or ranges is not defined');
      response = RESPONSE_CODE.ERROR;
    } else {
      response = await this.getValues({ spreadsheetId, ranges });
    }
    return response;
  }

  async checkUser() {
    const { [LOCAL_STORAGE_KEY.GOOGLE]: user } = await chrome.storage.local.get(LOCAL_STORAGE_KEY.GOOGLE);
    return user;
  }

  async getValues({ spreadsheetId, ranges }: GoogleSheetsType) {
    const user = await this.checkUser();
    if (!user) {
      NotificationHandler.notify(NOTIFICATIONS_ID, NOTIFICATIONS_TITLE, 'Login into Google Sheets from Global Settings');
      return null;
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
      return RESPONSE_CODE.ERROR;
    }
  }
}
