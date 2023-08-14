import { GOOGLE_SCOPES_KEY, RUNTIME_MESSAGE_ACF } from '@dhruv-techapps/acf-common';
import { AcfService } from './service';

export class GoogleOauthService extends AcfService {
  static async login(extensionId: string) {
    return await this.message(extensionId, { messenger: RUNTIME_MESSAGE_ACF.GOOGLE_OAUTH2, methodName: 'login' });
  }

  static async loginWithScope(extensionId: string, scope: GOOGLE_SCOPES_KEY) {
    return await this.message(extensionId, { messenger: RUNTIME_MESSAGE_ACF.GOOGLE_OAUTH2, methodName: 'login', message: scope });
  }
  static async remove(extensionId: string) {
    return await this.message(extensionId, { messenger: RUNTIME_MESSAGE_ACF.GOOGLE_OAUTH2, methodName: 'remove' });
  }
}
