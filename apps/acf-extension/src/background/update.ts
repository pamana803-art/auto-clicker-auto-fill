import { FirebaseDatabaseBackground } from '@dhruv-techapps/firebase-database';
import { FirebaseOauth2Background } from '@dhruv-techapps/firebase-oauth';
import { NotificationHandler } from '@dhruv-techapps/notifications';
import { auth } from './firebase';
export const NOTIFICATIONS_TITLE = 'Update';
export const NOTIFICATIONS_ID = 'update';

export class Update {
  static async login(firebaseOauth2Background: FirebaseOauth2Background) {
    try {
      await auth.authStateReady();
      if (!auth.currentUser) {
        await firebaseOauth2Background.firebaseLogin(false);
      }
    } catch (error) {
      console.debug('Error in login', error);
    }
  }
  static async discord(firebaseDatabaseBackground: FirebaseDatabaseBackground) {
    const { discord } = await chrome.storage.local.get('discord');
    if (discord) {
      await auth.authStateReady();
      if (auth.currentUser) {
        firebaseDatabaseBackground.setDiscord(discord).then((response: any) => {
          if (!response?.error) chrome.storage.local.remove('discord');
        });
      } else {
        NotificationHandler.notify(NOTIFICATIONS_ID, NOTIFICATIONS_TITLE, 'Login and connect discord to continue receiving discord notifications');
      }
    }
  }
}
