import { MessengerConfig } from '../background/chrome/runtime';

export class Custom implements MessengerConfig {
  async processPortMessage(request:any) {
    // eslint-disable-next-line no-console
    console.log(request);
  }
}
