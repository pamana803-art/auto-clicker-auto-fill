import { RuntimeMessageRequest } from '@dhruv-techapps/core-common';
import { CoreService } from '@dhruv-techapps/core-service';
import { RUNTIME_MESSAGE_FIREBASE_FUNCTIONS } from './firebase-functions.constant';

export class FirebaseFunctionsService extends CoreService {
  static async ocr(extensionId: string) {
    return await this.message<RuntimeMessageRequest, string>(extensionId, { messenger: RUNTIME_MESSAGE_FIREBASE_FUNCTIONS, methodName: 'ocr' });
  }

  static async getValues<Req, Res>(extensionId: string, message: Req) {
    return await this.message<RuntimeMessageRequest<Req>, Res>(extensionId, { messenger: RUNTIME_MESSAGE_FIREBASE_FUNCTIONS, methodName: 'getValues', message });
  }
}
