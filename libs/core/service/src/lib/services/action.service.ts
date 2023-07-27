import { Actions, RuntimeMessage } from '@dhruv-techapps/core-common';
import { Service } from './service';

export class ActionService extends Service {
  static async setBadgeBackgroundColor(extensionId: string, details) {
    return await this.message(extensionId, {
      action: RuntimeMessage.ACTION,
      actionAction: Actions.SET_BADGE_BACKGROUND_COLOR,
      details,
    });
  }

  static async setBadgeText(extensionId: string, details) {
    return await this.message(extensionId, {
      action: RuntimeMessage.ACTION,
      actionAction: Actions.SET_BADGE_TEXT,
      details,
    });
  }

  static async setIcon(extensionId: string, details) {
    return await this.message(extensionId, {
      action: RuntimeMessage.ACTION,
      actionAction: Actions.SET_ICON,
      details,
    });
  }

  static async setTitle(extensionId: string, details) {
    return await this.message(extensionId, {
      action: RuntimeMessage.ACTION,
      actionAction: Actions.SET_TITLE,
      details,
    });
  }
}
