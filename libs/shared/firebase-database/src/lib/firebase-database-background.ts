import { FirebaseOauth2Background } from '@dhruv-techapps/firebase-oauth';
import { Auth } from 'firebase/auth';
import { Database, child, get, getDatabase, ref, remove } from 'firebase/database';

export class FirebaseDatabaseBackground extends FirebaseOauth2Background {
  db: Database;

  constructor(auth: Auth, edgeClientId?: string) {
    super(auth, edgeClientId);
    this.db = getDatabase();
  }

  async getDiscord() {
    const dbRef = ref(this.db);
    return get(child(dbRef, `users/${this.auth.currentUser?.uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val().discord;
      } else {
        return undefined;
      }
    });
  }

  async deleteDiscord() {
    const dbRef = ref(this.db, `users/${this.auth.currentUser?.uid}`);
    return remove(dbRef);
  }
}
