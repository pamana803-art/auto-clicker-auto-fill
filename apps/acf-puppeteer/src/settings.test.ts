/// <reference types="chrome"/>

import { Settings } from "@dhruv-techapps/acf-common";

describe('Settings', () => {
  let page;
  let worker;

  beforeAll(async () => {
    const browser = globalThis.__BROWSER_GLOBAL__.browser
    worker = globalThis.__BROWSER_GLOBAL__.worker;
    const pages = await browser.pages();
    page = pages.find(page => page.url() === "http://localhost:3000/")
  });

  describe('Settings', () => {
    test('checkiFrames', async () => {
      const element = await page.waitForSelector('[data-testid="switch-settings"]');
      await element.click(); // Just an example.
      const checkiFrames = await page.waitForSelector('#settings-checkiFrames');
      await checkiFrames.click();
      const settings:Settings= await worker.evaluate(async () => {
        const result = await chrome.storage.local.get('settings');
        return result.settings;
      });
      expect(settings.checkiFrames).toBeTruthy();
      expect(settings.retry).toEqual(5);
      expect(settings.retryInterval).toEqual(1);
      expect(settings.retryOption).toEqual('stop');
    },5000);
    test('notification', async () => {
      const notification = await page.waitForSelector('[data-testid="settings-notification"]');
      await notification.click();
      const onError = await page.waitForSelector('[name="onError"]');
      await onError.click();
      const settings:Settings = await worker.evaluate(async () => {
        const result = await chrome.storage.local.get('settings');
        return result.settings;
      });
      expect(settings.notifications).toBeDefined()
      expect(settings.notifications.onError).toBeTruthy();
    },5000);
  });
});
