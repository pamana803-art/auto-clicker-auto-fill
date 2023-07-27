import { ActionMessenger, ManifestMessenger, NotificationsMessenger, StorageMessenger } from './messenger';
import { MessengerConfig, Runtime, messageListener } from './runtime';

jest.mock('../../../src/background/chrome/messenger');

class Custom implements MessengerConfig {
  async processPortMessage(request:any) {
    // eslint-disable-next-line no-console
    console.log(request);
  }
}

const message = {};
const actions = { with: 'CUSTOM WITH'};
const configs = { [actions.with]: new Custom() };
const cb = jest.fn();




describe('Runtime', () => {
  test('onMessage', () => {
    expect(chrome.runtime.onMessage.hasListeners()).toBe(false);
    Runtime.onMessage(configs);
    expect(chrome.runtime.onMessage.hasListeners()).toBe(true);
  });
  test('onMessageExternal', () => {
    expect(chrome.runtime.onMessageExternal.hasListeners()).toBe(false);
    Runtime.onMessageExternal(configs);
    expect(chrome.runtime.onMessageExternal.hasListeners()).toBe(true);
  });
  test('sendMessage', () => {
    Runtime.sendMessage(message, cb);
    expect(chrome.runtime.sendMessage).toBeCalled();
    expect(chrome.runtime.sendMessage).toBeCalledWith(message, cb);
  });
  describe('messageListener', () => {
    test('no request', () => {
      const request = {};
      messageListener(request, configs, cb);
      expect(cb).toBeCalled();
      expect(cb).toBeCalledWith(expect.any(Error));
    });
    test('unknown action', () => {
      const request = { action: 'undefined' };
      messageListener(request, configs, cb);
      expect(cb).toBeCalled();
      expect(cb).toBeCalledWith(expect.any(Error));
    });
    test('NOTIFICATIONS', () => {
      const request = { action: 'notifications' };
      messageListener(request, configs, cb);
      expect(NotificationsMessenger).toHaveBeenCalledTimes(1);
    });
    test('STORAGE', () => {
      const request = { action: 'storage' };
      messageListener(request, configs, cb);
      expect(StorageMessenger).toHaveBeenCalledTimes(1);
    });
    test('MANIFEST', () => {
      const request = { action: 'manifest' };
      messageListener(request, configs, cb);
      expect(ManifestMessenger).toHaveBeenCalledTimes(1);
    });
    test('ACTION', () => {
      const request = { action: 'action' };
      messageListener(request, configs, cb);
      expect(ActionMessenger).toHaveBeenCalledTimes(1);
    });
    describe('custom', () => {
      test('with processPortMessage', () => {
        const request = { action: actions.with };
        messageListener(request, configs, cb);
        expect(configs[actions.with].processPortMessage).toBeCalled();
      });
    });
  });
});
