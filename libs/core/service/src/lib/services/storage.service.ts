import { RUNTIME_MESSAGE, STORAGE_ACTIONS } from '@dhruv-techapps/core-common'
import { Service } from './service'

export class StorageService extends Service {
  static async get(extensionId:string, keys) {
    return await this.message(extensionId, { action: RUNTIME_MESSAGE.STORAGE, localStorageAction: STORAGE_ACTIONS.GET, keys })
  }

  static async set(extensionId:string, items) {
    return await this.message(extensionId, { action: RUNTIME_MESSAGE.STORAGE, localStorageAction: STORAGE_ACTIONS.SET, items })
  }

  static async remove(extensionId:string, keys) {
    return await this.message(extensionId, { action: RUNTIME_MESSAGE.STORAGE, localStorageAction: STORAGE_ACTIONS.REMOVE, keys })
  }
}
