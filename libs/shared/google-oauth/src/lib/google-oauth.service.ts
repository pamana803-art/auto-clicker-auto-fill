import { RuntimeMessageRequest } from '@dhruv-techapps/core-common';
import { CoreService } from '@dhruv-techapps/core-service';
import { RUNTIME_MESSAGE_GOOGLE_OAUTH } from './google-oauth.constant';
import { GOOGLE_SCOPES, GoogleOauth2LoginResponse, GoogleOauth2RemoveResponse } from './google-oauth.types';

export class GoogleOauthService extends CoreService {
  static async login(extensionId: string, scope: GOOGLE_SCOPES) {
    return await this.message<RuntimeMessageRequest<GOOGLE_SCOPES>, GoogleOauth2LoginResponse>(extensionId, { messenger: RUNTIME_MESSAGE_GOOGLE_OAUTH, methodName: 'login', message: scope });
  }
  static async remove(extensionId: string, scope: GOOGLE_SCOPES) {
    return await this.message<RuntimeMessageRequest<GOOGLE_SCOPES>, GoogleOauth2RemoveResponse>(extensionId, { messenger: RUNTIME_MESSAGE_GOOGLE_OAUTH, methodName: 'remove', message: scope });
  }
  static async getAuthToken(extensionId: string, scopes: Array<GOOGLE_SCOPES>) {
    return await this.message<RuntimeMessageRequest<Array<GOOGLE_SCOPES>>, string>(extensionId, { messenger: RUNTIME_MESSAGE_GOOGLE_OAUTH, methodName: 'getAuthToken', message: scopes });
  }
}
