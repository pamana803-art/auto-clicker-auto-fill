import { MANIFEST_ACTIONS, RUNTIME_MESSAGE } from '@dhruv-techapps/core-common'
import { Service } from './service'

export class ManifestService extends Service {
  static async values(extensionId:string, keys) {
    return await this.message(extensionId, { action: RUNTIME_MESSAGE.MANIFEST, manifestAction: MANIFEST_ACTIONS.VALUES, keys })
  }

  static async value(extensionId:string, key) {
    return await this.message(extensionId, { action: RUNTIME_MESSAGE.MANIFEST, manifestAction: MANIFEST_ACTIONS.VALUE, key })
  }
}
