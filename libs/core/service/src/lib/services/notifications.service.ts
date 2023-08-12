import { Service } from './service';

export class NotificationsService extends Service {
  static async create(extensionId: string, options: chrome.notifications.NotificationOptions<true>, notificationId = crypto.randomUUID()) {
    return await this.message(extensionId, { messenger: 'notifications', notificationId, options, methodName: 'create' });
  }

  static async update(extensionId: string, options: chrome.notifications.NotificationOptions<false>, notificationId = crypto.randomUUID()) {
    return await this.message(extensionId, { messenger: 'notifications', notificationId, options, methodName: 'update' });
  }

  static async clear(extensionId: string, notificationId = crypto.randomUUID()) {
    return await this.message(extensionId, { messenger: 'notifications', notificationId, methodName: 'clear' });
  }
}
