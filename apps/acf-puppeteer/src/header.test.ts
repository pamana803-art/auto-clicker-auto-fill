import { TestBrowser, delay } from './util';

describe('Settings', () => {
  let browser;

  beforeAll(async () => {
    browser = new TestBrowser();
    await browser.setPage();
  });

  describe('Header', () => {
    test('Default Theme', async () => {
      const htmlTheme = await browser.evaluate(() => document.documentElement.getAttribute('data-bs-theme'));
      expect(htmlTheme).toEqual('light');
    });
    test('Theme Switch', async () => {
      await browser.click(`[data-testid="switch-theme"]`);
      await delay(1000);
      const htmlTheme = await browser.evaluate(() => document.documentElement.getAttribute('data-bs-theme'));
      expect(htmlTheme).toEqual('dark');
      const theme = await browser.evaluate(() => localStorage.getItem('theme'));
      expect(theme).toEqual('dark');
    });
  });
});
