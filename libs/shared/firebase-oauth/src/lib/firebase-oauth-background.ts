import { GoogleOauth2Background } from '@dhruv-techapps/google-oauth';
import { Auth, GoogleAuthProvider, User, signInWithCredential } from 'firebase/auth';
import { FirebaseLoginResponse, FirebaseRole } from './firebase-oauth.types';

export class FirebaseOauth2Background extends GoogleOauth2Background {
  auth;
  constructor(auth: Auth, edgeClientId?: string) {
    super(edgeClientId);
    this.auth = auth;
  }

  async getFirebaseHeaders(scopes?: string[], gToken?: string) {
    const user = this.auth.currentUser;
    if (!user) {
      throw new Error('User not logged in');
    }
    const decodedToken = await user.getIdTokenResult();
    const role = decodedToken.claims['stripeRole'] as FirebaseRole;
    if (role !== 'pro') {
      throw new Error('Pro subscription required');
    }
    const token = await this.auth.currentUser?.getIdToken();
    const headers = new Headers({ Authorization: `Bearer ${token}` });
    if (!gToken) {
      gToken = await this.getAuthToken(scopes);
    }
    if (gToken) {
      headers.append('X-Auth-Token', gToken);
    }
    return headers;
  }

  async firebaseLogin(): Promise<FirebaseLoginResponse> {
    const token = await this.getAuthToken();
    if (token) {
      const credential = GoogleAuthProvider.credential(null, token);
      if (credential) {
        const { user } = await signInWithCredential(this.auth, credential);
        return await this.getUserAndRole(user);
      }
      throw new Error('Error getting credential');
    }
    throw new Error('Error getting token');
  }

  async getUserAndRole(user: User | null): Promise<FirebaseLoginResponse> {
    if (user !== null) {
      const decodedToken = await user.getIdTokenResult();
      return { user, role: decodedToken.claims['stripeRole'] as FirebaseRole };
    }
    return { user };
  }

  async isLogin(): Promise<FirebaseLoginResponse> {
    return await this.auth.authStateReady().then(async () => {
      return await this.getUserAndRole(this.auth.currentUser);
    });
  }
}
