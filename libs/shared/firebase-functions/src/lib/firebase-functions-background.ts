import { FirebaseOauth2Background } from '@dhruv-techapps/firebase-oauth';
import { Auth } from 'firebase/auth';

export class FirebaseFunctionsBackground extends FirebaseOauth2Background {
  constructor(auth: Auth) {
    super(auth);
  }

  ocr = async () => {
    const token = await this.auth.currentUser?.getIdToken();
    const headers = new Headers({ Authorization: `Bearer ${token}` });
    const data = await fetch(' https://ocr-txzspjcsqq-uc.a.run.app', { headers }).then((r) => r.text());
    return data;
  };
}
