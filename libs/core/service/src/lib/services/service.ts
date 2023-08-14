import { RuntimeMessageRequest } from '@dhruv-techapps/core-extension';

export class CoreService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static messageChrome<T = any>(extensionId: string, message: RuntimeMessageRequest): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      chrome.runtime.sendMessage(extensionId, message, (response) => {
        if (chrome.runtime.lastError || response?.error) {
          reject(chrome.runtime.lastError?.message || response?.error);
        } else {
          resolve(response);
        }
      });
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async message<T = any>(extensionId: string, message: RuntimeMessageRequest): Promise<T> {
    if (extensionId && typeof extensionId !== 'string') {
      return Promise.reject(new Error('extensionId is not undefined neither string'));
    }
    return await this.messageChrome<T>(extensionId, message);
  }
}
