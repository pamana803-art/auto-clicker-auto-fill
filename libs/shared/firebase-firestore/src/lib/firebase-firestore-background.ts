import { FirebaseOauth2Background } from '@dhruv-techapps/firebase-oauth';
import { NotificationHandler } from '@dhruv-techapps/notifications';
import { Auth, User } from 'firebase/auth';
import { Firestore, addDoc, collection, getDocs, getFirestore, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { NOTIFICATIONS_ID, NOTIFICATIONS_TITLE } from './firebase-firestore.constant';

export class FirebaseFirestoreBackground extends FirebaseOauth2Background {
  db: Firestore;
  publicUrl: string;
  user: User | null = null;

  constructor(auth: Auth, publicUrl: string) {
    super(auth);
    this.db = getFirestore(auth.app);
    this.publicUrl = publicUrl;
  }

  async getProducts() {
    const productsQuery = query(collection(this.db, 'products'), where('active', '==', true), orderBy('metadata.order'));

    const querySnapshot = await getDocs(productsQuery);
    const products: { prices: { id: string }[]; id: string }[] = [];

    await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const product = { id: doc.id, ...doc.data(), prices: [] as { id: string }[] };
        const priceQuery = query(collection(doc.ref, 'prices'), where('active', '==', true));
        const priceSnap = await getDocs(priceQuery);
        priceSnap.docs.forEach((doc) => {
          product.prices.push({ id: doc.id, ...doc.data() });
        });
        products.push(product);
      })
    );

    return products;
  }

  async getSubscriptions() {
    const user = this.auth.currentUser;
    if (!user) {
      return null;
    }
    const subscriptionsRef = query(collection(this.db, 'customers', user.uid, 'subscriptions'), where('status', 'in', ['trialing', 'active']));
    const subscriptionsSnapshot = await getDocs(subscriptionsRef);
    const subscriptions: { id: string }[] = [];
    if (!subscriptionsSnapshot.empty) {
      subscriptionsSnapshot.forEach((doc) => {
        const subscription = { id: doc.id, ...doc.data() };
        subscriptions.push(subscription);
      });
      return subscriptions;
    }
    return null;
  }

  async subscribe(priceId: string) {
    const user = this.auth.currentUser;
    if (!user) {
      NotificationHandler.notify(NOTIFICATIONS_ID, NOTIFICATIONS_TITLE, 'Please login to subscribe');
      return;
    }
    const subscriptions = await this.getSubscriptions();
    if (subscriptions) {
      NotificationHandler.notify(NOTIFICATIONS_ID, NOTIFICATIONS_TITLE, 'You already have a subscription');
      return;
    }

    const checkoutSessionsRef = query(collection(this.db, 'customers', user.uid, 'checkout_sessions'), where('price', '==', priceId));
    const checkoutSessions = await getDocs(checkoutSessionsRef);
    if (!checkoutSessions.empty) {
      checkoutSessions.forEach((doc) => {
        const data = doc.data();
        if (data?.['url']) {
          chrome.tabs.create({ url: data?.['url'] });
        }
      });
      return;
    }

    const checkoutSessionRef = await addDoc(collection(this.db, 'customers', user.uid, 'checkout_sessions'), {
      mode: 'subscription',
      price: priceId,
      allow_promotion_codes: true,
      success_url: this.publicUrl,
      cancel_url: this.publicUrl,
    });

    const unsubscribe = onSnapshot(
      checkoutSessionRef,
      (doc) => {
        const data = doc.data();
        if (data?.['error']) {
          NotificationHandler.notify(NOTIFICATIONS_ID, NOTIFICATIONS_TITLE, `Error subscribing to product ${data['error'].message}`);
          unsubscribe();
        }
        if (data?.['url']) {
          chrome.tabs.create({ url: data?.['url'] });
          unsubscribe();
        }
      },
      (error) => NotificationHandler.notify(NOTIFICATIONS_ID, NOTIFICATIONS_TITLE, `Error subscribing to product ${error.message}`)
    );
  }
}
