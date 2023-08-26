import { Settings, defaultSettings } from '@dhruv-techapps/acf-common';
import { TestBrowser, TestWorker } from './util';

describe('Settings', () => {
  let worker;
  let browser;

  beforeAll(async () => {
    browser = new TestBrowser();
    worker = new TestWorker();
    await browser.setPage();
  });

  describe('Settings', () => {
    test('checkiFrames', async () => {
      await browser.click('[data-testid="switch-settings"]');
      await browser.click('#settings-checkiFrames');
      const settings: Settings = await worker.getSettings();
      expect(settings.checkiFrames).toBeTruthy();
    });
    describe('notification', () => {
      const notificationCheckbox = ['onError', 'onAction', 'onBatch', 'onConfig', 'sound'];
      test('toggle', async () => {
        await browser.click('[data-testid="settings-notification"]');
        for (const element of notificationCheckbox) {
          const checked = await browser.getPage().$eval(`[name="${element}"]`, (el) => el.checked);
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
          const checked = await browser.getPage().$eval(`[name="${element}"]`, (el) => el.checked);
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
      test('retry', async () => {
        await browser.type('input[id=retry]', '-2');
        const settings: Settings = await worker.getSettings();
        expect(settings.retry).toEqual(-2);
      });
      test('retryInterval', async () => {
        await browser.type('input[id=retryInterval]', '1e5');
        const settings: Settings = await worker.getSettings();
        expect(settings.retryInterval).toEqual('1e5');
      });
      describe('retryOption', () => {
        const retryOptions = ['stop', 'skip', 'reload'];
        test.each(retryOptions)('%s', async (retryOption) => {
          await browser.click(`input[name=retryOption][value=${retryOption}]`);
          const settings: Settings = await worker.getSettings();
          expect(settings.retryOption).toEqual(retryOption);
        });
        test('reload', async () => {
          await browser.click('input[name=retryOption][value=reload]');
          const settings: Settings = await worker.getSettings();
          expect(settings.retryOption).toEqual('reload');
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
  });
});
