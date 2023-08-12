import { Service } from './service';

export class ManifestService extends Service {
  static async values(extensionId: string, keys: string[]) {
    return await this.message(extensionId, { messenger: 'manifest', methodName: 'values', keys });
  }

  static async value(extensionId: string, key: string) {
    return await this.message(extensionId, { messenger: 'manifest', methodName: 'value', key });
  }
}
