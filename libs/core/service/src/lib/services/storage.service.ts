import { Service } from './service';
import { StorageMessengerGetProps, StorageMessengerRemoveProps, StorageMessengerSetProps } from '@dhruv-techapps/core-extension';

export class StorageService extends Service {
  static async get<T = any>(extensionId: string, keys: StorageMessengerGetProps): Promise<T> {
    return await this.message<T>(extensionId, { messenger: 'storage', methodName: 'get', keys });
  }

  static async set(extensionId: string, items: StorageMessengerSetProps) {
    return await this.message(extensionId, { messenger: 'storage', methodName: 'set', items });
  }

  static async remove(extensionId: string, keys: StorageMessengerRemoveProps) {
    return await this.message(extensionId, { messenger: 'storage', methodName: 'remove', keys });
  }
}