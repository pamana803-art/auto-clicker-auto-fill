import { FirebaseFunctionsBackground } from '@dhruv-techapps/firebase-functions';
import { NotificationHandler } from '@dhruv-techapps/notifications';
import { Auth } from 'firebase/auth';
import { NOTIFICATIONS_ID, NOTIFICATIONS_TITLE } from './discord-messaging.constant';

type DiscordMessagingType = {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: Array<{ name: string; value: any }>;
  color: string;
  variant?: string;
};

export class DiscordMessagingBackground extends FirebaseFunctionsBackground {
  constructor(
    auth: Auth,
    edgeClientId?: string,
    private VARIANT?: string
  ) {
    super(auth, edgeClientId);
    this.VARIANT = VARIANT;
  }

  async push(data: DiscordMessagingType) {
    try {
      data.variant = this.VARIANT;
      await this.discordNotify(data);
    } catch (error) {
      if (error instanceof Error) {
        NotificationHandler.notify(NOTIFICATIONS_ID, NOTIFICATIONS_TITLE, error.message);
      }
      throw error;
    }
  }
}
