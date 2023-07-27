import { NOTIFICATIONS_ACTIONS, RUNTIME_MESSAGE } from '@dhruv-techapps/core-common'
import { Service } from './service'

export class NotificationsService extends Service {
  static async create(extensionId:string, notificationOptions, notificationId = crypto.randomUUID()) {
    return await this.message(extensionId, { action: RUNTIME_MESSAGE.NOTIFICATIONS, notificationId, notificationOptions, notificationAction: NOTIFICATIONS_ACTIONS.CREATE })
  }

  static async update(extensionId:string, notificationOptions, notificationId = crypto.randomUUID()) {
    return await this.message(extensionId, { action: RUNTIME_MESSAGE.NOTIFICATIONS, notificationId, notificationOptions, notificationAction: NOTIFICATIONS_ACTIONS.UPDATE })
  }

  static async clear(extensionId:string, notificationOptions, notificationId = crypto.randomUUID()) {
    return await this.message(extensionId, { action: RUNTIME_MESSAGE.NOTIFICATIONS, notificationId, notificationOptions, notificationAction: NOTIFICATIONS_ACTIONS.CLEAR })
  }
}
