import { RuntimeMessageRequest } from '@dhruv-techapps/core-extension';

export class Service {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static messageChrome(extensionId: string, message: RuntimeMessageRequest) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(extensionId, message, (response) => {
        if (chrome.runtime.lastError || response?.error) {
          reject(chrome.runtime.lastError || response?.error);
        } else {
          resolve(response);
        }
      });
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async message(extensionId: string, message: RuntimeMessageRequest) {
    if (extensionId && typeof extensionId !== 'string') {
      return Promise.reject(new Error('extensionId is not undefined neither string'));
    }
    return await this.messageChrome(extensionId, message);
  }
}
