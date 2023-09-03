import { LOCAL_STORAGE_KEY } from '@dhruv-techapps/acf-common';
import { Logger } from '@dhruv-techapps/core-common';
import { FUNCTION_URL, VARIANT } from '../common/environments';

type DiscordMessagingType = {
  title: string;
  fields: Array<{ name: string; value: any }>;
  color: string;
};

export default class DiscordMessaging {
  async push({ title, fields, color }: DiscordMessagingType) {
    if (!FUNCTION_URL) {
      return {};
    }
    try {
      const url = new URL(FUNCTION_URL);
      const { discord } = await chrome.storage.local.get(LOCAL_STORAGE_KEY.DISCORD);
      const data = {
        variant: VARIANT,
        title,
        id: discord.id,
        fields,
        color,
      };
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      if (error instanceof Error) {
        Logger.colorError(error.message);
        return error;
      }
      Logger.colorError(JSON.stringify(error));
      return error;
    }
    return {};
  }
}
