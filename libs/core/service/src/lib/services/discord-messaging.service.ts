import { Service } from './service';

export class DiscordMessagingService extends Service {
  static async push(extensionId: string, notification: any) {
    return await this.message(extensionId, { messenger: 'discord-messaging', notification });
  }
}
