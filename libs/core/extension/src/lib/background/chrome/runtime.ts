import { ActionMessenger, ActionRequest, ManifestMessenger, ManifestRequest, NotificationsMessenger, NotificationsRequest, StorageMessenger, StorageRequest } from './messenger';

export interface MessengerConfig {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  processPortMessage: (request: any) => Promise<void>;
}

export type MessengerConfigObject = {
  [key: string]: MessengerConfig;
};

export type RuntimeMessageRequest = (ActionRequest | ManifestRequest | NotificationsRequest | StorageRequest) | {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const messageListener = (request: any, configs: MessengerConfigObject, sendResponse: (response?: any) => void) => {
  const { action, methodName } = request;

  try {
    switch (action) {
      case 'notifications':
        {
          const instance = new NotificationsMessenger();
          instance[(methodName as keyof NotificationsMessenger) || 'create'](request, sendResponse);
        }
        break;
      case 'storage':
        {
          const instance = new StorageMessenger();
          instance[(methodName as keyof StorageMessenger) || 'get'](request).then(sendResponse).catch(sendResponse);
        }
        break;
      case 'manifest':
        {
          const instance = new ManifestMessenger();
          instance[(methodName as keyof ManifestMessenger) || 'values'](request).then(sendResponse).catch(sendResponse);
        }
        break;
      case 'action':
        {
          const instance = new ActionMessenger();
          instance[(methodName as keyof ActionMessenger) || 'setIcon'](request, sendResponse);
        }
        break;
      default:
        if (configs[action]) {
          if (typeof configs[action].processPortMessage === 'function') {
            configs[action].processPortMessage(request).then(sendResponse).catch(sendResponse);
          } else {
            sendResponse(new Error(`${request.action} ${chrome.i18n.getMessage('@PORT__method_not_found')}`));
          }
        } else {
          sendResponse(new Error(`${request.action} ${chrome.i18n.getMessage('@PORT__action_not_found')}`));
        }
    }
  } catch (error) {
    if (error instanceof Error) {
      sendResponse(new Error(`${request.action} ${error.message}`));
    } else {
      console.error('Unexpected error', error);
    }
  }
};

export class Runtime {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static sendMessage(message: any, callback: (response: any) => void) {
    chrome.runtime.sendMessage(message, callback);
  }

  static onMessage(configs: MessengerConfigObject) {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      messageListener(request, configs, sendResponse);
      return true;
    });
  }

  static onMessageExternal(configs: MessengerConfigObject) {
    chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
      messageListener(request, configs, sendResponse);
      return true;
    });
  }
}
