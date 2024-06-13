import { RuntimeMessageRequest } from '@dhruv-techapps/core-common';
import { CoreService } from '@dhruv-techapps/core-service';
import { RUNTIME_MESSAGE_FIREBASE_OAUTH } from './firebase-oauth.constant';
import { FirebaseLoginResponse } from './firebase-oauth.types';

export class FirebaseOauthService extends CoreService {
  static async isLogin(extensionId: string) {
    return await this.message<RuntimeMessageRequest, FirebaseLoginResponse>(extensionId, { messenger: RUNTIME_MESSAGE_FIREBASE_OAUTH, methodName: 'isLogin' });
  }
  static async login(extensionId: string) {
    return await this.message<RuntimeMessageRequest, FirebaseLoginResponse>(extensionId, { messenger: RUNTIME_MESSAGE_FIREBASE_OAUTH, methodName: 'firebaseLogin' });
  }

  static async logout(extensionId: string) {
    return await this.message(extensionId, { messenger: RUNTIME_MESSAGE_FIREBASE_OAUTH, methodName: 'firebaseLogout' });
  }
}
