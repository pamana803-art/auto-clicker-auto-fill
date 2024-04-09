import { RUNTIME_MESSAGE_ACF } from '@dhruv-techapps/acf-common';
import { AcfService } from './service';

export class FirebaseFirestoreService extends AcfService {
  static async getProducts(extensionId: string) {
    return await this.message(extensionId, { messenger: RUNTIME_MESSAGE_ACF.FIREBASE_FIRESTORE, methodName: 'getProducts' });
  }
  static async getSubscriptions(extensionId: string) {
    return await this.message(extensionId, { messenger: RUNTIME_MESSAGE_ACF.FIREBASE_FIRESTORE, methodName: 'getSubscriptions' });
  }
  static async subscribe(extensionId: string, priceId: string) {
    return await this.message(extensionId, { messenger: RUNTIME_MESSAGE_ACF.FIREBASE_FIRESTORE, methodName: 'subscribe', message: priceId });
  }
}
