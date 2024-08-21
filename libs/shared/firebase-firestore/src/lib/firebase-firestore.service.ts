import { RuntimeMessageRequest } from '@dhruv-techapps/core-common';
import { CoreService } from '@dhruv-techapps/core-service';
import { RUNTIME_MESSAGE_FIREBASE_FIRESTORE } from './firebase-firestore.constant';
import { Product, Subscription } from './firebase-firestore.types';

export class FirebaseFirestoreService extends CoreService {
  static async getProducts() {
    return await this.message<RuntimeMessageRequest, Product[]>({ messenger: RUNTIME_MESSAGE_FIREBASE_FIRESTORE, methodName: 'getProducts' });
  }
  static async getSubscriptions() {
    return await this.message<RuntimeMessageRequest, Subscription[]>({ messenger: RUNTIME_MESSAGE_FIREBASE_FIRESTORE, methodName: 'getSubscriptions' });
  }
  static async subscribe(priceId: string) {
    return await this.message<RuntimeMessageRequest<string>, string>({ messenger: RUNTIME_MESSAGE_FIREBASE_FIRESTORE, methodName: 'subscribe', message: priceId });
  }
}
