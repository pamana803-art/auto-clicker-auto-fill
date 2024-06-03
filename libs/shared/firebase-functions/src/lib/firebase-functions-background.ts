import { FirebaseOauth2Background } from '@dhruv-techapps/firebase-oauth';
import { GOOGLE_SCOPES } from '@dhruv-techapps/google-oauth';

export class FirebaseFunctionsBackground extends FirebaseOauth2Background {
  async vision<Res = unknown>() {
    const headers = await this.getFirebaseHeaders();
    const data = {
      requests: [
        {
          image: {
            content:
              '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',
          },
          features: [
            {
              type: 'TEXT_DETECTION',
            },
          ],
        },
      ],
    };

    const response: Res = await fetch('https://vision-txzspjcsqq-uc.a.run.app', { headers, method: 'POST', body: JSON.stringify(data) }).then((r) => r.json());
    return response;
  }

  async getValues<Req = unknown, Res = unknown>(data: Req) {
    const headers = await this.getFirebaseHeaders([GOOGLE_SCOPES.SHEETS]);
    const url = new URL(`https://us-central1-auto-clicker-autofill.cloudfunctions.net/getGoogleSheetValues`);
    const response: Res = await fetch(url.href, { headers, method: 'POST', body: JSON.stringify(data) }).then((r) => r.json());
    return response;
  }

  async discordNotify<Req = unknown, Res = unknown>(data: Req) {
    const headers = await this.getFirebaseHeaders();
    const url = new URL(`https://us-central1-auto-clicker-autofill.cloudfunctions.net/discordNotify`);
    const response: Res = await fetch(url.href, { headers, method: 'POST', body: JSON.stringify(data) }).then((r) => r.json());
    return response;
  }

  async discordUser<Res = unknown>(token: string): Promise<Res> {
    const headers = await this.getFirebaseHeaders(undefined, token); // Cast the token argument to string
    const url = new URL(`https://us-central1-auto-clicker-autofill.cloudfunctions.net/discordUser`);
    const response: Res = await fetch(url.href, { headers }).then((r) => r.json());
    return response;
  }

  async getGoogleDriveList<Res = unknown>() {
    const headers = await this.getFirebaseHeaders([GOOGLE_SCOPES.DRIVE]);
    const url = new URL(`https://us-central1-auto-clicker-autofill.cloudfunctions.net/getGoogleDriveList`);
    const response: Res = await fetch(url.href, { headers, method: 'POST' }).then((r) => r.json());
    return response;
  }

  async getGoogleDriveGet<Req = unknown, Res = unknown>(data: Req) {
    const headers = await this.getFirebaseHeaders([GOOGLE_SCOPES.DRIVE]);
    const url = new URL(`https://us-central1-auto-clicker-autofill.cloudfunctions.net/getGoogleDriveGet`);
    const response: Res = await fetch(url.href, { headers, method: 'POST', body: JSON.stringify(data) }).then((r) => r.json());
    return response;
  }

  async getGoogleDriveDelete<Req = unknown, Res = unknown>(data: Req) {
    const headers = await this.getFirebaseHeaders([GOOGLE_SCOPES.DRIVE]);
    const url = new URL(`https://us-central1-auto-clicker-autofill.cloudfunctions.net/getGoogleDriveDelete`);
    const response: Res = await fetch(url.href, { headers, method: 'POST', body: JSON.stringify(data) }).then((r) => r.json());
    return response;
  }

  async getGoogleDriveCreateOrUpdate<Req = unknown, Res = unknown>(data: Req) {
    const headers = await this.getFirebaseHeaders([GOOGLE_SCOPES.DRIVE]);
    const url = new URL(`https://us-central1-auto-clicker-autofill.cloudfunctions.net/getGoogleDriveCreateOrUpdate`);
    const response: Res = await fetch(url.href, { headers, method: 'POST', body: JSON.stringify(data) }).then((r) => r.json());
    return response;
  }
}
