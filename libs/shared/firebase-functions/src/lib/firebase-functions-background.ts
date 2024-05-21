import { FirebaseOauth2Background } from '@dhruv-techapps/firebase-oauth';
import { GOOGLE_SCOPES } from '@dhruv-techapps/google-oauth';

const NOTIFICATIONS_TITLE = 'Firebase Functions';
const NOTIFICATIONS_ID = 'firebase-functions';

export class FirebaseFunctionsBackground extends FirebaseOauth2Background {
  ocr = async () => {
    const headers = await this.getFirebaseHeaders();
    const data = await fetch(' https://ocr-txzspjcsqq-uc.a.run.app', { headers }).then((r) => r.text());
    return data;
  };

  async getValues<Req = unknown, Res = unknown>(data: Req) {
    const headers = await this.getFirebaseHeaders([GOOGLE_SCOPES.SHEETS]);
    const url = new URL(`https://us-central1-auto-clicker-autofill.cloudfunctions.net/getGoogleSheetValues`);
    const response: Res = await fetch(url.href, { headers, method: 'POST', body: JSON.stringify(data) }).then((r) => r.json());
    return response;
  }
}
