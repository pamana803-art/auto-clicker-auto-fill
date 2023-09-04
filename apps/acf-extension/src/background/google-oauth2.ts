import { GOOGLE_SCOPES, LOCAL_STORAGE_KEY, RESPONSE_CODE } from '@dhruv-techapps/acf-common';
import { NotificationHandler } from './notifications';

const NOTIFICATIONS_TITLE = 'Google OAuth';
const NOTIFICATIONS_ID = 'authentication';

export default class GoogleOauth2 {
  async removeCachedAuthToken() {
    const { token } = await chrome.identity.getAuthToken({ interactive: false });
    if (token) {
      await chrome.identity.removeCachedAuthToken({ token });
    }
    return true;
  }

  async login(scope: GOOGLE_SCOPES) {
    if (!scope) {
      throw new Error('Scopes not defined');
    }
    try {
      const headers = await this.getHeaders([GOOGLE_SCOPES.PROFILE, scope]);
      const google = await this.getCurrentUser(headers);
      const googleScopes = await this.#getScopes();
      return { googleScopes, google };
    } catch (error) {
      if (error instanceof Error) {
        NotificationHandler.notify(NOTIFICATIONS_ID, NOTIFICATIONS_TITLE, error.message);
      }
      await this.removeCachedAuthToken();
      return RESPONSE_CODE.ERROR;
    }
  }

  async getCurrentUser(headers: HeadersInit) {
    let response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, { headers });
    response = await response.json();
    chrome.storage.local.set({ [LOCAL_STORAGE_KEY.GOOGLE]: response });
    return response;
  }

  async remove(scope: GOOGLE_SCOPES) {
    const scopes = await this.#removeScope(scope);
    if (scopes.length === 1) {
      await chrome.storage.local.remove(LOCAL_STORAGE_KEY.GOOGLE);
      await this.removeCachedAuthToken();
    }
    return RESPONSE_CODE.REMOVED;
  }

  async getAuthToken(scopes: Array<GOOGLE_SCOPES>) {
    const { token } = await chrome.identity.getAuthToken({ interactive: true, scopes });
    for (const scope of scopes) {
      await this.#addScope(scope);
    }
    return token;
  }

  async getHeaders(scopes: Array<GOOGLE_SCOPES>) {
    const token = await this.getAuthToken(scopes);
    return new Headers({ Authorization: `Bearer ${token}` });
  }

  async #addScope(scope: GOOGLE_SCOPES) {
    const { [LOCAL_STORAGE_KEY.GOOGLE_SCOPES]: scopes = [] } = await chrome.storage.local.get(LOCAL_STORAGE_KEY.GOOGLE_SCOPES);
    if (!scopes.includes(scope)) {
      scopes.push(scope);
      await chrome.storage.local.set({ [LOCAL_STORAGE_KEY.GOOGLE_SCOPES]: scopes });
    }
    return scopes;
  }

  async #getScopes() {
    const { [LOCAL_STORAGE_KEY.GOOGLE_SCOPES]: scopes = [] } = await chrome.storage.local.get(LOCAL_STORAGE_KEY.GOOGLE_SCOPES);
    return scopes;
  }

  async #removeScope(scope: GOOGLE_SCOPES) {
    const { [LOCAL_STORAGE_KEY.GOOGLE_SCOPES]: scopes = [] } = await chrome.storage.local.get(LOCAL_STORAGE_KEY.GOOGLE_SCOPES);
    const index = scopes.findIndex(scope);
    if (index !== -1) {
      scopes.splice(index, 1);
      await chrome.storage.local.set({ [LOCAL_STORAGE_KEY.GOOGLE_SCOPES]: scopes });
    }
    return scopes;
  }
}
