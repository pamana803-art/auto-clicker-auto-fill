import { GOOGLE_SCOPES } from '@dhruv-techapps/acf-common';
import { auth } from './firebase';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import GoogleOauth2 from './google-oauth2';

export default class FirebaseAuth {
  async login() {
    const token = await new GoogleOauth2().getAuthToken([GOOGLE_SCOPES.PROFILE, GOOGLE_SCOPES.EMAIL]);
    if (token) {
      const credential = GoogleAuthProvider.credential(null, token);
      if (credential) {
        const userCredential = await signInWithCredential(auth, credential);
        const { uid, displayName, email, emailVerified, photoURL } = userCredential.user;
        return { uid, displayName, email, emailVerified, photoURL };
      }
    }
    throw new Error('Error getting token');
  }

  async logout() {
    const token = await new GoogleOauth2().getAuthToken([GOOGLE_SCOPES.PROFILE, GOOGLE_SCOPES.EMAIL]);
    if (token) {
      chrome.identity.removeCachedAuthToken({ token });
    }
    return auth.signOut();
  }

  async isLogin() {
    return auth.currentUser;
  }
}
