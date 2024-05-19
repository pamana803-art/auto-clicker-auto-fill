import { FirebaseOauth2Background } from '@dhruv-techapps/firebase-oauth';
import { Auth } from 'firebase/auth';
import { Functions, getFunctions, httpsCallable } from 'firebase/functions';

export class FirebaseFunctionsBackground extends FirebaseOauth2Background {
  functions: Functions;
  constructor(auth: Auth) {
    super(auth);
    this.functions = getFunctions(auth.app, 'us-central1');
  }

  helloWorld = async () => {
    console.log('functions', this.functions);
    const httpsCallableFunc = httpsCallable(this.functions, 'helloWorld');
    console.log('httpsCallableFunc', httpsCallableFunc);
    const { data } = await httpsCallableFunc({ returnUrl: window.location.origin });
    console.log('data', data);
    return data;
  };
}
