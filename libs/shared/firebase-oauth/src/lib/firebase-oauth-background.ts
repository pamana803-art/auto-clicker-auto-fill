import { GOOGLE_SCOPES, GoogleOauth2Background } from '@dhruv-techapps/google-oauth';
import { Auth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

export class FirebaseOauth2Background extends GoogleOauth2Background {
  auth;
  constructor(auth: Auth, edgeClientId?: string) {
    super(edgeClientId);
    this.auth = auth;
  }

  async firebaseLogin() {
    const token = await this.getAuthToken([GOOGLE_SCOPES.PROFILE, GOOGLE_SCOPES.EMAIL]);
    if (token) {
      const credential = GoogleAuthProvider.credential(null, token);
      if (credential) {
        const userCredential = await signInWithCredential(this.auth, credential);
        const { uid, displayName, email, emailVerified, photoURL } = userCredential.user;
        return { uid, displayName, email, emailVerified, photoURL };
      }
    }
    throw new Error('Error getting token');
  }

  async logout() {
    const token = await this.getAuthToken([GOOGLE_SCOPES.PROFILE, GOOGLE_SCOPES.EMAIL]);
    if (token) {
      chrome.identity.removeCachedAuthToken({ token });
    }
    return this.auth.signOut();
  }

  async isLogin() {
    return await this.auth.authStateReady().then(() => {
      return this.auth.currentUser;
    });
  }
}
