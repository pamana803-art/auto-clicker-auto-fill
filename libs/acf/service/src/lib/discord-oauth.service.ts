import { RUNTIME_MESSAGE_ACF } from "@dhruv-techapps/acf-common";
import { AcfService } from "./service";

export class DiscordOauthService extends AcfService {
  static async login(extensionId: string) {
    return await this.message(extensionId, { messenger: RUNTIME_MESSAGE_ACF.DISCORD_LOGIN, login:true });
  }
  static async remove(extensionId: string) {
    return await this.message(extensionId, { messenger: RUNTIME_MESSAGE_ACF.DISCORD_LOGIN, remove:true });
  }
}
