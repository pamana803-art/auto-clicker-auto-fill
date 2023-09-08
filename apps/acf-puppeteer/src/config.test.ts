import { LOAD_TYPES, START_TYPES } from '@dhruv-techapps/acf-common';
import { TestPage, TestWorker, containsInvalidClass, getPageAndWorker } from './util';
import { Page, WebWorker } from 'puppeteer';

let worker: WebWorker;
let page: Page;
let testPage: TestPage;

beforeAll(async () => {
  ({ page, worker, testPage } = await getPageAndWorker());
});

describe('Config', () => {
  test('Add Configuration', async () => {
    await page.click('#add-configuration');
  });

  test('url', async () => {
    await testPage.fill('input[name=url]', 'https://test.getautoclicker.com/');
    const configs = await worker.evaluate(TestWorker.getConfigs);
    expect(configs[0].url).toEqual('https://test.getautoclicker.com/');
    expect(configs[0].name).toEqual('getautoclicker.com');
    expect(configs[0].enable).toBeTruthy();
    expect(configs[0].startType).toEqual(START_TYPES.AUTO);
    expect(configs[0].loadType).toEqual(LOAD_TYPES.WINDOW);
    expect(configs[0].actions.length).toBeGreaterThanOrEqual(1);
    expect(configs[0].actions[0].elementFinder).toEqual('');
  });
  test('name', async () => {
    await testPage.fill('input[name=name]', 'Testing');
    const configs = await worker.evaluate(TestWorker.getConfigs);
    expect(configs[0].name).toEqual('Testing');
  });
  describe('initWait', () => {
    const selector = 'input[name=initWait]';
    test('-1', async () => {
      await testPage.fill(selector, '-1');
      const isInvalid = await page.$eval(selector, containsInvalidClass);
      const configs = await worker.evaluate(TestWorker.getConfigs);
      expect(isInvalid).toBeTruthy();
      expect(configs[0].initWait).toBeUndefined();
    });
    test('0', async () => {
      await testPage.fill(selector, '0');
      const isInvalid = await page.$eval(selector, containsInvalidClass);
      expect(isInvalid).toBeFalsy();
      const configs = await worker.evaluate(TestWorker.getConfigs);
      expect(configs[0].initWait).toEqual(0);
    });
    test('2', async () => {
      await testPage.fill(selector, '2');
      const isInvalid = await page.$eval(selector, containsInvalidClass);
      expect(isInvalid).toBeFalsy();
      const configs = await worker.evaluate(TestWorker.getConfigs);
      expect(configs[0].initWait).toEqual(2);
    });
    test('a', async () => {
      await testPage.fill(selector, 'a');
      const isInvalid = await page.$eval(selector, containsInvalidClass);
      expect(isInvalid).toBeTruthy();
      const configs = await worker.evaluate(TestWorker.getConfigs);
      expect(configs[0].initWait).toEqual(2);
    });
    test('0.25', async () => {
      await testPage.fill(selector, '0.25');
      const isInvalid = await page.$eval(selector, containsInvalidClass);
      expect(isInvalid).toBeFalsy();
      const configs = await worker.evaluate(TestWorker.getConfigs);
      expect(configs[0].initWait).toEqual(0.25);
      expect(typeof configs[0].initWait).toEqual('number');
    });
    test('0.25e1.25', async () => {
      await testPage.fill(selector, '0.25e1.25');
      const isInvalid = await page.$eval(selector, containsInvalidClass);
      expect(isInvalid).toBeFalsy();
      const configs = await worker.evaluate(TestWorker.getConfigs);
      expect(configs[0].initWait).toEqual('0.25e1.25');
      expect(typeof configs[0].initWait).toEqual('string');
    });
  });
  test('enable', async () => {
    await page.click('input[name=enable]');
    const configs = await worker.evaluate(TestWorker.getConfigs);
    expect(configs[0].enable).toBeFalsy();
  });
  test('Duplicate', async () => {
    const beforeOptionsLength = await await page.$eval('#configuration-list', (e) => (e as HTMLSelectElement).options.length);
    await page.click('#config-dropdown');
    await page.click('::-p-text(Duplicate Configuration)');
    const text = await page.$eval('input[name=name]', (el) => el.value);
    const afterOptionsLength = await await page.$eval('#configuration-list', (e) => (e as HTMLSelectElement).options.length);
    expect(text).toMatch('(Duplicate)');
    expect(afterOptionsLength).toEqual(beforeOptionsLength + 1);
  });
  describe('Remove', () => {
    test('no', async () => {
      const beforeOptionsLength = await page.$eval('#configuration-list', (e) => (e as HTMLSelectElement).options.length);
      await page.click('#config-dropdown');
      await page.click('::-p-text(Remove Configuration)');
      const modal = await page.evaluate(() => document.querySelector('[data-testid=confirm-modal]') !== null);
      expect(modal).toBeTruthy();
      await page.click('[data-testid=confirm-modal-no]');
      const text = await page.$eval('input[name=name]', (el) => el.value);
      const afterOptionsLength = await page.$eval('#configuration-list', (e) => (e as HTMLSelectElement).options.length);
      expect(text).toMatch('(Duplicate)');
      expect(afterOptionsLength).toEqual(beforeOptionsLength);
    });
    test('yes', async () => {
      const beforeOptionsLength = await page.$eval('#configuration-list', (e) => (e as HTMLSelectElement).options.length);
      await page.click('#config-dropdown');
      await page.click('::-p-text(Remove Configuration)');
      const modal = await page.evaluate(() => document.querySelector('[data-testid=confirm-modal]') !== null);
      expect(modal).toBeTruthy();
      await page.click('[data-testid=confirm-modal-yes]');
      const text = await page.$eval('input[name=name]', (el) => el.value);
      const afterOptionsLength = await page.$eval('#configuration-list', (e) => (e as HTMLSelectElement).options.length);
      expect(text).not.toMatch('(Duplicate)');
      expect(afterOptionsLength).toEqual(beforeOptionsLength - 1);
    });
  });
});
