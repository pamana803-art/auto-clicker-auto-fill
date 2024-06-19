import { BROWSER } from '@dhruv-techapps/core-common';
import { NotificationHandler } from '@dhruv-techapps/notifications';
import { GOOGLE_SCOPES, GoogleOauth2LoginResponse } from './google-oauth.types';

const NOTIFICATIONS_TITLE = 'Google OAuth';
const NOTIFICATIONS_ID = 'authentication';

export class GoogleOauth2Background {
  edgeClientId: string | undefined;
  constructor(edgeClientId?: string) {
    this.edgeClientId = edgeClientId;
  }

  async login(additionalScopes?: Array<GOOGLE_SCOPES>): Promise<GoogleOauth2LoginResponse | null> {
    try {
      const result = await this.getAuthToken(additionalScopes);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        NotificationHandler.notify(NOTIFICATIONS_ID, NOTIFICATIONS_TITLE, error.message);
      }
      await this.logout(additionalScopes);
      throw error;
    }
  }

  async logout(additionalScopes?: Array<GOOGLE_SCOPES>) {
    const { token } = await this.getAuthToken(additionalScopes);
    if (token) {
      await chrome.identity.removeCachedAuthToken({ token });
    }
    return true;
  }

  async userInfo() {
    const headers = await this._getHeaders();
    let response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, { headers });
    response = await response.json();
    return response;
  }

  async getAuthToken(additionalScopes?: Array<string>) {
    const scopes = chrome.runtime.getManifest().oauth2?.scopes || [];
    if (additionalScopes) {
      scopes.push(...additionalScopes);
    }
    try {
      const result = BROWSER === 'EDGE' ? await this._launchWebAuthFlow(scopes) : await chrome.identity.getAuthToken({ interactive: true, scopes });
      return result;
    } catch (error) {
      if (error instanceof Error) {
        NotificationHandler.notify(NOTIFICATIONS_ID, NOTIFICATIONS_TITLE, error.message);
      }
      throw error;
    }
  }

  async _launchWebAuthFlow(scopes: string[]) {
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
        return { token, grantedScopes: scopes };
      }
      NotificationHandler.notify(NOTIFICATIONS_ID, NOTIFICATIONS_TITLE, 'Token not found');
      throw new Error('Token not found');
    }
    NotificationHandler.notify(NOTIFICATIONS_ID, NOTIFICATIONS_TITLE, 'Error while retrieving token');
    throw new Error('Error while retrieving token');
  }

  async _getHeaders(additionalScopes?: Array<string>) {
    const { token } = await this.getAuthToken(additionalScopes);
    return new Headers({ Authorization: `Bearer ${token}` });
  }

  async _checkInvalidCredentials(message: string) {
    if (message === 'Invalid Credentials' || message.includes('invalid authentication credentials')) {
      await this.logout();
      NotificationHandler.notify(NOTIFICATIONS_ID, NOTIFICATIONS_TITLE, 'Token expired reauthenticate!');
      return true;
    }
    NotificationHandler.notify(NOTIFICATIONS_ID, NOTIFICATIONS_TITLE, message);
    return false;
  }
}
