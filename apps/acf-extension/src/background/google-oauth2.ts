import { GOOGLE_SCOPES, GOOGLE_SCOPES_KEY, LOCAL_STORAGE_KEY, RESPONSE_CODE } from '@dhruv-techapps/acf-common';
import { NotificationHandler } from './notifications';

const NOTIFICATIONS_TITLE = 'Google OAuth';
const NOTIFICATIONS_ID = 'authentication';

export default class GoogleOauth2 {
  static async removeCachedAuthToken() {
    const { token } = await chrome.identity.getAuthToken({ interactive: false });
    await chrome.identity.removeCachedAuthToken({ token });
    return true;
  }

  async login(scope: GOOGLE_SCOPES_KEY) {
    try {
      await GoogleOauth2.addScope(GOOGLE_SCOPES[GOOGLE_SCOPES_KEY.PROFILE]);
      if (scope) {
        await GoogleOauth2.addScope(GOOGLE_SCOPES[scope]);
      } else {
        await GoogleOauth2.addScope(GOOGLE_SCOPES[GOOGLE_SCOPES_KEY.SHEETS]);
      }
      const headers = await GoogleOauth2.getHeaders();
      return await this.getCurrentUser(headers);
    } catch (error) {
      NotificationHandler.notify(NOTIFICATIONS_ID, NOTIFICATIONS_TITLE, error.message);
      await GoogleOauth2.removeCachedAuthToken();
      return RESPONSE_CODE.ERROR;
    }
  }

  async getCurrentUser(headers) {
    let response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, { headers });
    response = await response.json();
    chrome.storage.local.set({ [LOCAL_STORAGE_KEY.GOOGLE]: response });
    return response;
  }

  async remove() {
    await GoogleOauth2.removeCachedAuthToken();
    await chrome.storage.local.remove(LOCAL_STORAGE_KEY.GOOGLE);
    return RESPONSE_CODE.REMOVED;
  }

  static async getAuthToken() {
    const { [LOCAL_STORAGE_KEY.GOOGLE_SCOPES]: scopes } = await chrome.storage.local.get(LOCAL_STORAGE_KEY.GOOGLE_SCOPES);
    if (!scopes) {
      throw new Error('Scopes not defined');
    }
    const { token } = await chrome.identity.getAuthToken({ interactive: true, scopes });
    return token;
  }

  static async getHeaders() {
    const token = await GoogleOauth2.getAuthToken();
    return new Headers({ Authorization: `Bearer ${token}` });
  }

  static async addScope(scope: GOOGLE_SCOPES) {
    if (!scope) {
      throw new Error('Scope is null | undefined');
    }
    const { [LOCAL_STORAGE_KEY.GOOGLE_SCOPES]: scopes = [] } = await chrome.storage.local.get(LOCAL_STORAGE_KEY.GOOGLE_SCOPES);
    if (!scopes.includes(scope)) {
      scopes.push(scope);
      await chrome.storage.local.set({ [LOCAL_STORAGE_KEY.GOOGLE_SCOPES]: scopes });
    }
  }
}
