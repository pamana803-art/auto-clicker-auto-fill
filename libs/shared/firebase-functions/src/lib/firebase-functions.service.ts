import { RuntimeMessageRequest } from '@dhruv-techapps/core-common';
import { CoreService } from '@dhruv-techapps/core-service';
import { RUNTIME_MESSAGE_FIREBASE_FUNCTIONS } from './firebase-functions.constant';

export class FirebaseFunctionsService extends CoreService {
  static async helloWorld(extensionId: string) {
    return await this.message<RuntimeMessageRequest, any>(extensionId, { messenger: RUNTIME_MESSAGE_FIREBASE_FUNCTIONS, methodName: 'helloWorld' });
  }
}
