export class CoreService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static messageChrome<K, T = void>(message: K): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      try {
        if (!chrome.runtime?.sendMessage) {
          reject(new Error('Extension context invalidated'));
          return;
        }

        const id = chrome.runtime.id || window.EXTENSION_ID;
        if (!id || typeof id !== 'string') {
          reject(new Error('extensionId is not undefined neither string'));
          return;
        }
        chrome.runtime.sendMessage(id, message, (response) => {
          if (chrome.runtime.lastError || response?.error) {
            reject(new Error(chrome.runtime.lastError?.message || response?.error));
          } else {
            resolve(response);
          }
        });
      } catch (error) {
        console.warn(error);
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async message<K, T = void>(message: K): Promise<T> {
    return await this.messageChrome<K, T>(message);
  }
}
