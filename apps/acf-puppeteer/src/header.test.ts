import { Page } from 'puppeteer';
import { delay, getPageAndWorker } from './util';

let page: Page;

beforeAll(async () => {
  ({ page } = await getPageAndWorker());
});

describe('Header', () => {
  test('Default Theme', async () => {
    const htmlTheme = await page.evaluate(() => document.documentElement.getAttribute('data-bs-theme'));
    expect(htmlTheme).toEqual('light');
  });
  test('Theme Switch', async () => {
    await page.click(`[data-testid="switch-theme"]`);
    await delay(1000);
    const htmlTheme = await page.evaluate(() => document.documentElement.getAttribute('data-bs-theme'));
    expect(htmlTheme).toEqual('dark');
    const theme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(theme).toEqual('dark');
  });
});
