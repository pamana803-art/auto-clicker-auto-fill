import { RUNTIME_MESSAGE_ACF } from '@dhruv-techapps/acf-common';
import { AcfService } from './service';

export class FirebaseOauthService extends AcfService {
  static async isLogin(extensionId: string) {
    return await this.message(extensionId, { messenger: RUNTIME_MESSAGE_ACF.FIREBASE_AUTH, methodName: 'isLogin' });
  }
  static async login(extensionId: string) {
    return await this.message(extensionId, { messenger: RUNTIME_MESSAGE_ACF.FIREBASE_AUTH, methodName: 'login' });
  }
  static async logout(extensionId: string) {
    return await this.message(extensionId, { messenger: RUNTIME_MESSAGE_ACF.FIREBASE_AUTH, methodName: 'logout' });
  }
}
