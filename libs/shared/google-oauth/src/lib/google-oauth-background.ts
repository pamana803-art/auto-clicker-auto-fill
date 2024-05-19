import { BROWSER } from '@dhruv-techapps/core-common';
import { NotificationHandler } from '@dhruv-techapps/notifications';
import { GOOGLE_LOCAL_STORAGE_KEY, GOOGLE_SCOPES, GoogleOauth2LoginResponse } from './google-oauth.types';

const NOTIFICATIONS_TITLE = 'Google OAuth';
const NOTIFICATIONS_ID = 'authentication';

export class GoogleOauth2Background {
  edgeClientId: string | undefined;
  constructor(edgeClientId?: string) {
    this.edgeClientId = edgeClientId;
  }
  async removeCachedAuthToken() {
    const { token } = await chrome.identity.getAuthToken({ interactive: false });
    if (token) {
      await chrome.identity.removeCachedAuthToken({ token });
    }
    return true;
  }

  async login(scope: GOOGLE_SCOPES): Promise<GoogleOauth2LoginResponse | null> {
    if (!scope) {
      throw new Error('Scopes not defined');
    }
    try {
      const headers = await this.getHeaders([GOOGLE_SCOPES.PROFILE, scope]);
      const google = await this.getCurrentUser(headers);
      return { [GOOGLE_LOCAL_STORAGE_KEY.GOOGLE]: google };
    } catch (error) {
      if (error instanceof Error) {
        NotificationHandler.notify(NOTIFICATIONS_ID, NOTIFICATIONS_TITLE, error.message);
      }
      await this.removeCachedAuthToken();
      throw error;
    }
  }

  async getCurrentUser(headers: HeadersInit) {
    let response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, { headers });
    response = await response.json();
    chrome.storage.local.set({ [GOOGLE_LOCAL_STORAGE_KEY.GOOGLE]: response });
    return response;
  }

  async getAuthTokenEdge(scopes: string[]) {
    if (this.edgeClientId === undefined) {
      throw new Error('Edge client id not found');
    }

    const url = new URL('https://accounts.google.com/o/oauth2/auth');
    url.searchParams.append('client_id', this.edgeClientId);
    url.searchParams.append('redirect_uri', chrome.identity.getRedirectURL());
    url.searchParams.append('response_type', 'token');
    if (scopes && scopes?.length !== 0) {
      url.searchParams.append('scope', scopes.join(' '));
    }

    const result = await chrome.identity.launchWebAuthFlow({ url: url.href, interactive: true });
    if (result) {
      const url = new URL(result);
      const token = url?.hash
        ?.split('&')
        .find((param) => param.startsWith('#access_token='))
        ?.split('=')[1];
      if (token) {
        return token;
      }
      NotificationHandler.notify(NOTIFICATIONS_ID, NOTIFICATIONS_TITLE, 'Token not found');
      throw new Error('Token not found');
    }
    NotificationHandler.notify(NOTIFICATIONS_ID, NOTIFICATIONS_TITLE, 'Error while retrieving token');
    throw new Error('Error while retrieving token');
  }

  async getAuthToken(additionalScopes?: Array<GOOGLE_SCOPES>) {
    const scopes = chrome.runtime.getManifest().oauth2?.scopes || [];
    if (additionalScopes) {
      scopes.push(...additionalScopes);
    }
    if (BROWSER === 'EDGE') {
      const token = this.getAuthTokenEdge(scopes);
      return token;
    } else {
      const { token } = await chrome.identity.getAuthToken({ interactive: true, scopes });
      return token;
    }
  }

  async getHeaders(scopes?: Array<GOOGLE_SCOPES>) {
    const token = await this.getAuthToken(scopes);
    return new Headers({ Authorization: `Bearer ${token}` });
  }
}
