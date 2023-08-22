function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

describe('Chrome Extension', () => {
  let page;
  let browser;
  let worker;

  beforeAll(async () => {
    browser = globalThis.__BROWSER_GLOBAL__.browser;
    worker = globalThis.__BROWSER_GLOBAL__.worker;
    page = (await browser.pages())[0];
  });

  describe('Settings', () => {
    test('checkiFrames', async () => {
      const element = await page.waitForSelector('[data-testid="switch-settings"]');
      await element.click(); // Just an example.
      const checkiFrames = await page.waitForSelector('#settings-checkiFrames');
      await checkiFrames.click();
      let { settings } = await worker.evaluate(async () => {
        const result = await chrome.storage.local.get('settings');
        return result;
      });
      expect(settings.checkiFrames).toBeTruthy();
      expect(settings.retry).toEqual(5);
      expect(settings.retryInterval).toEqual(1);
      expect(settings.retryOption).toEqual('stop');
    });
    test('notification', async () => {
      const notification = await page.waitForSelector('#settings-checkiFrames');
      await notification.click();
      const { settings } = await worker.evaluate(async () => {
        const result = await chrome.storage.local.get('settings');
        return result;
      });
      expect(settings.checkiFrames).toBeFalsy();
    });
  });
});
