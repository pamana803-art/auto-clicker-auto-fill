import { RUNTIME_MESSAGE_ACF } from '@dhruv-techapps/acf-common';
import { AcfService } from './service';

export class DiscordMessagingService extends AcfService {
  static async push(extensionId: string, title: string, fields: Array<{ name: string; value: any }>, color: string) {
    return await this.message(extensionId, { messenger: RUNTIME_MESSAGE_ACF.DISCORD_MESSAGING, methodName: 'push', message: { title, fields, color } });
  }
}
