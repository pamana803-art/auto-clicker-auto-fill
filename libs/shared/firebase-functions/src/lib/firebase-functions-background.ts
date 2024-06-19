import { FirebaseOauth2Background } from '@dhruv-techapps/firebase-oauth';
import { GOOGLE_SCOPES } from '@dhruv-techapps/google-oauth';
import { Auth } from 'firebase/auth';

export class FirebaseFunctionsBackground extends FirebaseOauth2Background {
  cloudFunctionUrl: string;

  constructor(auth: Auth, edgeClientId?: string | undefined) {
    super(auth, edgeClientId);
    this.cloudFunctionUrl = 'https://us-central1-auto-clicker-autofill.cloudfunctions.net';
  }

  async visionImagesAnnotate<Res = unknown>(content: string) {
    const headers = await this.getFirebaseHeaders();
    const data = {
      requests: [{ image: { content }, features: [{ type: 'TEXT_DETECTION' }] }],
    };

    const response: Res = await fetch(this.cloudFunctionUrl + 'visionImagesAnnotate', { headers, method: 'POST', body: JSON.stringify(data) }).then((r) => r.json());
    return response;
  }

  async getValues<Req = unknown, Res = unknown>(data: Req) {
    const headers = await this.getFirebaseHeaders([GOOGLE_SCOPES.SHEETS]);
    const url = new URL(this.cloudFunctionUrl + '/sheetValues');
    const response = await fetch(url.href, { headers, method: 'POST', body: JSON.stringify(data) });
    const result: Res = await response.json();
    return result;
  }

  async discordNotify<Req = unknown, Res = unknown>(data: Req): Promise<Res> {
    const headers = await this.getFirebaseHeaders();
    const url = new URL(this.cloudFunctionUrl + '/discordNotify');
    const response = await fetch(url.href, { headers, method: 'POST', body: JSON.stringify(data) });
    const result: Res = await response.json();
    return result;
  }

  async discordUser<Res = unknown>(token: string): Promise<Res> {
    const headers = await this.getFirebaseHeaders(undefined, token); // Cast the token argument to string
    const url = new URL(this.cloudFunctionUrl + '/discordUser');
    const response = await fetch(url.href, { headers, method: 'POST' });
    const result: Res = await response.json();
    return result;
  }

  async driveList<Res = unknown>() {
    const headers = await this.getFirebaseHeaders([GOOGLE_SCOPES.DRIVE]);
    const url = new URL(this.cloudFunctionUrl + '/driveList');
    const response = await fetch(url.href, { headers, method: 'POST' });
    const result: Res = await response.json();
    return result;
  }

  async driveGet<Req = unknown, Res = unknown>(data: Req) {
    const headers = await this.getFirebaseHeaders([GOOGLE_SCOPES.DRIVE]);
    const url = new URL(this.cloudFunctionUrl + '/driveGet');
    const response: Res = await fetch(url.href, { headers, method: 'POST', body: JSON.stringify(data) }).then((r) => r.json());
    return response;
  }

  async driveDelete<Req = unknown, Res = unknown>(data: Req) {
    const headers = await this.getFirebaseHeaders([GOOGLE_SCOPES.DRIVE]);
    const url = new URL(this.cloudFunctionUrl + '/driveDelete');
    const response: Res = await fetch(url.href, { headers, method: 'POST', body: JSON.stringify(data) }).then((r) => r.json());
    return response;
  }

  async driveCreateOrUpdate<Req = unknown, Res = unknown>(data: Req) {
    const headers = await this.getFirebaseHeaders([GOOGLE_SCOPES.DRIVE]);
    const url = new URL(this.cloudFunctionUrl + '/driveCreateOrUpdate');
    const response: Res = await fetch(url.href, { headers, method: 'POST', body: JSON.stringify(data) }).then((r) => r.json());
    return response;
  }
}
