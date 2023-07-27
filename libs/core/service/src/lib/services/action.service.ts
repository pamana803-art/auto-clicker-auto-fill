import { Service } from './service';

export class ActionService extends Service {
  static async setBadgeBackgroundColor(extensionId: string, details: chrome.action.BadgeColorDetails) {
    return await this.message(extensionId, { class: 'action', methodName: 'setBadgeBackgroundColor', details });
  }

  static async setBadgeText(extensionId: string, details: chrome.action.BadgeTextDetails) {
    return await this.message(extensionId, { class: 'action', methodName: 'setBadgeText', details });
  }

  static async setIcon(extensionId: string, details: chrome.action.TabIconDetails) {
    return await this.message(extensionId, { class: 'action', methodName: 'setIcon', details });
  }

  static async setTitle(extensionId: string, details: chrome.action.TitleDetails) {
    return await this.message(extensionId, { class: 'action', methodName: 'setTitle', details });
  }
}
