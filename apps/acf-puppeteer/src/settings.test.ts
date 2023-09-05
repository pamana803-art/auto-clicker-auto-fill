import { Settings, defaultSettings } from '@dhruv-techapps/acf-common';
import { TestBrowser, TestWorker, containsInvalidClass } from './util';

describe('Settings', () => {
  let worker;
  let browser;

  beforeAll(async () => {
    browser = new TestBrowser();
    worker = new TestWorker();
    await browser.setPage();
  });

  describe('Settings', () => {
    test('open', async () => {
      await browser.click('[data-testid="switch-settings"]');
      await browser.getPage().waitForSelector('[data-testid="settings-modal"]');
    });
    describe('checkiFrames', () => {
      test('click', async () => {
        await browser.click('#settings-checkiFrames');
        const settings: Settings = await worker.getSettings();
        expect(settings.checkiFrames).toBeTruthy();
      });
    });
    describe('notification', () => {
      const notificationCheckbox = ['onError', 'onAction', 'onBatch', 'onConfig', 'sound'];
      test('toggle', async () => {
        await browser.click('[data-testid="settings-notification"]');
        for (const element of notificationCheckbox) {
          const checked = await browser.$eval(`[name="${element}"]`, (el) => el.checked);
          expect(checked).toBeFalsy();
        }
      });
      test.each(notificationCheckbox)('%s', async (notification) => {
        await browser.click(`[name="${notification}"]`);
        const settings: Settings = await worker.getSettings();
        expect(settings.notifications).toBeDefined();
        expect(settings.notifications[notification]).toBeTruthy();
      });
      test('back', async () => {
        for (const element of notificationCheckbox) {
          const checked = await browser.$eval(`[name="${element}"]`, (el) => el.checked);
          expect(checked).toBeTruthy();
        }
        await browser.click('[data-testid="settings-back-button"]');
      });
    });
    describe('retry', () => {
      test('toggle', async () => {
        await browser.click('[data-testid="settings-retry"]');
        const settings: Settings = await worker.getSettings();
        expect(settings.retry).toEqual(defaultSettings.retry);
        expect(settings.retryInterval).toEqual(defaultSettings.retryInterval);
        expect(settings.retryOption).toEqual(defaultSettings.retryOption);
      });
      describe('retry', () => {
        test('default', async () => {
          const settings: Settings = await worker.getSettings();
          expect(settings.retry).toEqual(defaultSettings.retry);
        });
        test('-2', async () => {
          await browser.type('input[id=retry]', '-2');
          const isInvalid = await browser.$eval(`input[id=retry]`, containsInvalidClass);
          expect(isInvalid).toBeFalsy();
          const settings: Settings = await worker.getSettings();
          expect(settings.retry).toEqual(-2);
        });
        test('0', async () => {
          await browser.type('input[id=retry]', '0');
          const isInvalid = await browser.$eval(`input[id=retry]`, containsInvalidClass);
          expect(isInvalid).toBeFalsy();
          const settings: Settings = await worker.getSettings();
          expect(settings.retry).toEqual(0);
        });
        test('0.25', async () => {
          await browser.type('input[id=retry]', '0.25');
          const isInvalid = await browser.$eval(`input[id=retry]`, containsInvalidClass);
          expect(isInvalid).toBeTruthy();
          const settings: Settings = await worker.getSettings();
          expect(settings.retry).toEqual(0);
        });
        test('e', async () => {
          await browser.type('input[id=retry]', 'e');
          const isInvalid = await browser.$eval(`input[id=retry]`, containsInvalidClass);
          expect(isInvalid).toBeTruthy();
          const settings: Settings = await worker.getSettings();
          expect(settings.retry).toEqual(0);
        });
        test('a', async () => {
          await browser.type('input[id=retry]', 'a');
          const isInvalid = await browser.$eval(`input[id=retry]`, containsInvalidClass);
          expect(isInvalid).toBeTruthy();
          const settings: Settings = await worker.getSettings();
          expect(settings.retry).toEqual(0);
        });
        test('1', async () => {
          await browser.type('input[id=retry]', '1');
          const isInvalid = await browser.$eval(`input[id=retry]`, containsInvalidClass);
          expect(isInvalid).toBeFalsy();
          const settings: Settings = await worker.getSettings();
          expect(settings.retry).toEqual(1);
        });
      });
      describe('retryInterval', () => {
        test('default', async () => {
          const settings: Settings = await worker.getSettings();
          expect(settings.retryInterval).toEqual(defaultSettings.retryInterval);
        });
        test('-1', async () => {
          await browser.type('input[id=retryInterval]', '-1');
          const isInvalid = await browser.$eval(`input[id=retryInterval]`, containsInvalidClass);
          expect(isInvalid).toBeTruthy();
          const settings: Settings = await worker.getSettings();
          expect(settings.retryInterval).toEqual(defaultSettings.retryInterval);
        });
        test('0', async () => {
          await browser.type('input[id=retryInterval]', '0');
          const isInvalid = await browser.$eval(`input[id=retryInterval]`, containsInvalidClass);
          expect(isInvalid).toBeFalsy();
          const settings: Settings = await worker.getSettings();
          expect(settings.retryInterval).toEqual(0);
        });
        test('2', async () => {
          await browser.type('input[id=retryInterval]', '2');
          const isInvalid = await browser.$eval(`input[id=retryInterval]`, containsInvalidClass);
          expect(isInvalid).toBeFalsy();
          const settings: Settings = await worker.getSettings();
          expect(settings.retryInterval).toEqual(2);
        });
        test('a', async () => {
          await browser.type('input[id=retryInterval]', 'a');
          const isInvalid = await browser.$eval(`input[id=retryInterval]`, containsInvalidClass);
          expect(isInvalid).toBeTruthy();
          const settings: Settings = await worker.getSettings();
          expect(settings.retryInterval).toEqual(2);
        });

        test('0.25', async () => {
          await browser.type('input[id=retryInterval]', '0.25');
          const isInvalid = await browser.$eval(`input[id=retryInterval]`, containsInvalidClass);
          expect(isInvalid).toBeFalsy();
          const settings: Settings = await worker.getSettings();
          expect(settings.retryInterval).toEqual(0.25);
          expect(typeof settings.retryInterval).toEqual('number');
        });
        test('0.25e1.25', async () => {
          await browser.type('input[id=retryInterval]', '0.25e1.25');
          const isInvalid = await browser.$eval(`input[id=retryInterval]`, containsInvalidClass);
          expect(isInvalid).toBeFalsy();
          const settings: Settings = await worker.getSettings();
          expect(settings.retryInterval).toEqual('0.25e1.25');
          expect(typeof settings.retryInterval).toEqual('string');
        });
      });
      describe('retryOption', () => {
        test('default', async () => {
          const settings: Settings = await worker.getSettings();
          expect(settings.retryOption).toEqual(defaultSettings.retryOption);
        });
        const retryOptions = ['stop', 'skip', 'reload'];
        test.each(retryOptions)('%s', async (retryOption) => {
          await browser.click(`input[name=retryOption][value=${retryOption}]`);
          const settings: Settings = await worker.getSettings();
          expect(settings.retryOption).toEqual(retryOption);
        });
      });
      test('back', async () => {
        await browser.click('[data-testid="settings-back-button"]');
      });
    });
    describe('backup', () => {
      test('toggle', async () => {
        await browser.click('[data-testid="settings-backup"]');
      });
      /*test.each(Object.values(AUTO_BACKUP))('%s', async (autoBackup) => {
        await browser.click(`a[href="#backup-${autoBackup}"]`);
        const settings: Settings = await worker.getSettings();
        expect(settings.backup.autoBackup).toEqual(autoBackup);
      });*/
      test('toggle', async () => {
        await browser.click('[data-testid="settings-back-button"]');
      });
    });
    test('close', async () => {
      await browser.click('.btn-close');
    });
  });
});
