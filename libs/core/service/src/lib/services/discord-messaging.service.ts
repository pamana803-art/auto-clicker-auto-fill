import { RUNTIME_MESSAGE } from '@dhruv-techapps/core-common'
import { Service } from './service'

export class DiscordMessagingService extends Service {
  static async push(extensionId:string, notification) {
    return await this.message(extensionId, { action: RUNTIME_MESSAGE.DISCORD_MESSAGING, notification })
  }
}
