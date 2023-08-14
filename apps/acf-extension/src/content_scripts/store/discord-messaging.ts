import { LOCAL_STORAGE_KEY } from '@dhruv-techapps/acf-common';
import { Logger } from '@dhruv-techapps/core-common';
import { FUNCTION_URL, VARIANT } from '../../common/environments';

export default class DiscordMessaging {
  static async push({ title, fields, color }) {
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
      Logger.colorError(error);
      return error;
    }
    return {};
  }
}
