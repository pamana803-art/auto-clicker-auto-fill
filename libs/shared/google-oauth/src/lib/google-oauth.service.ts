import { RuntimeMessageRequest } from '@dhruv-techapps/core-common';
import { CoreService } from '@dhruv-techapps/core-service';
import { RUNTIME_MESSAGE_GOOGLE_OAUTH } from './google-oauth.constant';
import { GOOGLE_SCOPES, GoogleOauth2LoginResponse, GoogleOauth2RemoveResponse } from './google-oauth.types';

export class GoogleOauthService extends CoreService {
  static async login(additionalScopes: GOOGLE_SCOPES[]) {
    return await this.message<RuntimeMessageRequest<Array<GOOGLE_SCOPES>>, GoogleOauth2LoginResponse>({
      messenger: RUNTIME_MESSAGE_GOOGLE_OAUTH,
      methodName: 'login',
      message: additionalScopes,
    });
  }
  static async logout(additionalScopes: GOOGLE_SCOPES[]) {
    return await this.message<RuntimeMessageRequest<Array<GOOGLE_SCOPES>>, GoogleOauth2RemoveResponse>({
      messenger: RUNTIME_MESSAGE_GOOGLE_OAUTH,
      methodName: 'logout',
      message: additionalScopes,
    });
  }
  static async getAuthToken(additionalScopes: Array<GOOGLE_SCOPES>) {
    return await this.message<RuntimeMessageRequest<Array<GOOGLE_SCOPES>>, string>({ messenger: RUNTIME_MESSAGE_GOOGLE_OAUTH, methodName: 'getAuthToken', message: additionalScopes });
  }

  static async userInfo() {
    return await this.message<RuntimeMessageRequest<undefined>, GoogleOauth2RemoveResponse>({ messenger: RUNTIME_MESSAGE_GOOGLE_OAUTH, methodName: 'userInfo' });
  }
}
