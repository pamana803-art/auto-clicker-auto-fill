import { Service } from './service';
import { StorageMessengerGetProps, StorageMessengerRemoveProps, StorageMessengerSetProps } from '@dhruv-techapps/core-extension';

export class StorageService extends Service {
  static async get(extensionId: string, keys: StorageMessengerGetProps) {
    return await this.message(extensionId, { class: 'storage', methodName: 'get', keys });
  }

  static async set(extensionId: string, items: StorageMessengerSetProps) {
    return await this.message(extensionId, { class: 'storage', methodName: 'set', items });
  }

  static async remove(extensionId: string, keys: StorageMessengerRemoveProps) {
    return await this.message(extensionId, { class: 'storage', methodName: 'remove', keys });
  }
}
