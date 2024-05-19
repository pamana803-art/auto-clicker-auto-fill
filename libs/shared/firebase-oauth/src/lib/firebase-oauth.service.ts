import { RuntimeMessageRequest } from '@dhruv-techapps/core-common';
import { CoreService } from '@dhruv-techapps/core-service';
import { User } from 'firebase/auth';
import { RUNTIME_MESSAGE_FIREBASE_OAUTH } from './firebase-oauth.constant';

export class FirebaseOauthService extends CoreService {
  static async isLogin(extensionId: string) {
    return await this.message<RuntimeMessageRequest, User>(extensionId, { messenger: RUNTIME_MESSAGE_FIREBASE_OAUTH, methodName: 'isLogin' });
  }
  static async login(extensionId: string) {
    return await this.message<RuntimeMessageRequest, User>(extensionId, { messenger: RUNTIME_MESSAGE_FIREBASE_OAUTH, methodName: 'firebaseLogin' });
  }
  static async signInWithEmailAndPassword(extensionId: string, email: string, password: string) {
    return await this.message<RuntimeMessageRequest<{ email: string; password: string }>, User>(extensionId, {
      messenger: RUNTIME_MESSAGE_FIREBASE_OAUTH,
      methodName: 'signInWithEmailAndPassword',
      message: { email, password },
    });
  }
  static async logout(extensionId: string) {
    return await this.message(extensionId, { messenger: RUNTIME_MESSAGE_FIREBASE_OAUTH, methodName: 'logout' });
  }
}
