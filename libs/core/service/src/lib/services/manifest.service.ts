import { CoreService } from './service';

export class ManifestService extends CoreService {
  static async values(extensionId: string, keys: string[]) {
    return await this.message(extensionId, { messenger: 'manifest', methodName: 'values', message: keys });
  }

  static async value(extensionId: string, key: string) {
    return await this.message(extensionId, { messenger: 'manifest', methodName: 'value', message: key });
  }
}
