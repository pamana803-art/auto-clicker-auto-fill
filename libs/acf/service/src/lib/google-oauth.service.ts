import { GOOGLE_SCOPES, RUNTIME_MESSAGE_ACF } from '@dhruv-techapps/acf-common';
import { AcfService } from './service';

export class GoogleOauthService extends AcfService {
  static async login(extensionId: string, scope: GOOGLE_SCOPES) {
    return await this.message(extensionId, { messenger: RUNTIME_MESSAGE_ACF.GOOGLE_OAUTH2, methodName: 'login', message: scope });
  }
  static async remove(extensionId: string, scope: GOOGLE_SCOPES) {
    return await this.message(extensionId, { messenger: RUNTIME_MESSAGE_ACF.GOOGLE_OAUTH2, methodName: 'remove', message: scope });
  }
  static async getAuthToken(extensionId: string, scopes: Array<GOOGLE_SCOPES>) {
    return await this.message(extensionId, { messenger: RUNTIME_MESSAGE_ACF.GOOGLE_OAUTH2, methodName: 'getAuthToken', message: scopes });
  }
}
