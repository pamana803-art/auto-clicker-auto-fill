import { TestBrowser, delay } from './util';

describe('Configs', () => {
  let browser;

  beforeAll(async () => {
    browser = new TestBrowser();
    await browser.setPage();
  });

  test('Add Configuration', async () => {
    const beforeOptionsLength = await browser.evaluate(() => (document.getElementById('configuration-list') as HTMLSelectElement).options.length);
    await browser.click('#add-configuration');
    const optionsLength = await browser.evaluate(() => (document.getElementById('configuration-list') as HTMLSelectElement).options.length);
    expect(optionsLength).toEqual(beforeOptionsLength + 1);
  });

  describe('Bulk Reorder Configuration', () => {
    test('open', async () => {
      await browser.click('[data-testid="configurations-more-option"]');
      await browser.click('[data-testid="configurations-reorder-config"]');
      const modal = await browser.evaluate(() => document.querySelector('#reorder-configs') !== null);
      expect(modal).toBeTruthy();
    });
    test('check No of configs', async () => {
      const configs = await browser.evaluate(() => document.querySelector('#reorder-configs').querySelectorAll('.list-group-item').length);
      expect(configs).toBeDefined();
      expect(configs).toBeGreaterThan(1);
    });
    test('close', async () => {
      await browser.click('[data-testid="configurations-reorder-close"]');
      await delay(1000);
      const modal = await browser.evaluate(() => document.querySelector('#reorder-configs') !== null);
      expect(modal).toBeFalsy();
    });
  });

  describe('Bulk Remove Configuration', () => {
    test('open', async () => {
      await browser.click('[data-testid="configurations-more-option"]');
      await browser.click('[data-testid="configurations-remove-config"]');
      const modal = await browser.evaluate(() => document.querySelector('#remove-configs') !== null);
      expect(modal).toBeTruthy();
    });
    describe('select', () => {
      test('check No of configs', async () => {
        const configs = await browser.evaluate(() => document.querySelector('#remove-configs').querySelectorAll('.list-group-item').length);
        expect(configs).toBeDefined();
        expect(configs).toBeGreaterThan(1);
      });
      test('remove', async () => {
        await browser.click('.list-group-item input');
        await browser.click('[data-testid="configurations-remove-save"]');
        await delay(1000);
        const modal = await browser.evaluate(() => document.querySelector('#remove-configs') !== null);
        expect(modal).toBeFalsy();
      });
      test('check No of configs', async () => {
        const optionsLength = await browser.evaluate(() => (document.getElementById('configuration-list') as HTMLSelectElement).options.length);
        expect(optionsLength).toEqual(1);
      });
    });
  });
});
