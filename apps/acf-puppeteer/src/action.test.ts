import { Page, WebWorker } from 'puppeteer';
import { TestPage, TestWorker, containsInvalidClass, delay, getPageAndWorker } from './util';

let worker: WebWorker;
let page: Page;
let testPage: TestPage;

beforeAll(async () => {
  ({ page, worker, testPage } = await getPageAndWorker());
});

describe('Action', () => {
  test('default', async () => {
    const configs = await worker.evaluate(TestWorker.getConfigs);
    const columnVisibility = await page.evaluate(() => localStorage.getItem('columnVisibility'));
    expect(columnVisibility).toBeNull();
    expect(configs).toBeUndefined();
  });
  test.each(['name', 'initWait', 'repeat', 'repeatInterval'])('%s Invisible', async (column) => {
    const element = await page.$(`#actions input[name=${column}]`);
    expect(element).toBeNull();
  });
  describe('columnVisibility', () => {
    test.each(['name', 'initWait', 'repeat', 'repeatInterval'])('%s Visible', async (column) => {
      await page.click('#action-dropdown');
      await page.click(`[aria-labelledBy="action-dropdown"] [data-column=${column}]`);
      const columnVisibility = await page.evaluate(() => localStorage.getItem('columnVisibility'));
      expect(columnVisibility).not.toBeNull();
      const columnVisibilityJson = JSON.parse(columnVisibility);
      const element = await page.$(`#actions input[name=${column}]`);
      expect(columnVisibilityJson[column]).toBeTruthy();
      console.log(element);
      expect(element).not.toBeNull();
    });
    test.each(['name', 'initWait', 'repeat', 'repeatInterval'])('%s Invisible', async (column) => {
      await page.click('#action-dropdown');
      await page.click(`[aria-labelledBy="action-dropdown"] [data-column=${column}]`);
      const columnVisibility = await page.evaluate(() => localStorage.getItem('columnVisibility'));
      expect(columnVisibility).not.toBeNull();
      const element = await page.$(`#actions input[name=${column}]`);
      const columnVisibilityJson = JSON.parse(columnVisibility);
      expect(columnVisibilityJson[column]).toBeFalsy();
      console.log(element);
      expect(element).toBeNull();
    });
  });
  test('Element Finder', async () => {
    const elementFinderSelector = '#actions input[name=elementFinder]';
    const isInvalidBefore = await page.$eval(elementFinderSelector, containsInvalidClass);
    expect(isInvalidBefore).toBeTruthy();
    await testPage.fill(elementFinderSelector, 'TEST');
    const configs = await worker.evaluate(TestWorker.getConfigs);
    expect(configs[0].actions[0].elementFinder).toEqual('TEST');
    const isInvalidAfter = await page.$eval(elementFinderSelector, containsInvalidClass);
    expect(isInvalidAfter).toBeFalsy();
  });
  test('Value', async () => {
    const elementFinderSelector = '#actions input[name=value]';
    await testPage.fill(elementFinderSelector, 'TEST');
    const configs = await worker.evaluate(TestWorker.getConfigs);
    expect(configs[0].actions[0].value).toEqual('TEST');
  });
  describe('initWait', () => {
    const selector = '#actions input[name=initWait]';
    test('switch initWait', async () => {
      await page.click('#action-dropdown');
      await page.click(`[aria-labelledBy="action-dropdown"] [data-column=initWait]`);
    });
    test('-1', async () => {
      await testPage.fill(selector, '-1');
      const isInvalid = await page.$eval(selector, containsInvalidClass);
      const configs = await worker.evaluate(TestWorker.getConfigs);
      expect(isInvalid).toBeTruthy();
      expect(configs[0].actions[0].initWait).toBeUndefined();
    });
    test('0', async () => {
      await testPage.fill(selector, '0');
      const isInvalid = await page.$eval(selector, containsInvalidClass);
      expect(isInvalid).toBeFalsy();
      const configs = await worker.evaluate(TestWorker.getConfigs);
      expect(configs[0].actions[0].initWait).toEqual(0);
    });
    test('2', async () => {
      await testPage.fill(selector, '2');
      const isInvalid = await page.$eval(selector, containsInvalidClass);
      expect(isInvalid).toBeFalsy();
      const configs = await worker.evaluate(TestWorker.getConfigs);
      expect(configs[0].actions[0].initWait).toEqual(2);
    });
    test('a', async () => {
      await testPage.fill(selector, 'a');
      const isInvalid = await page.$eval(selector, containsInvalidClass);
      expect(isInvalid).toBeTruthy();
      const configs = await worker.evaluate(TestWorker.getConfigs);
      expect(configs[0].actions[0].initWait).toEqual(2);
    });
    test('0.25', async () => {
      await testPage.fill(selector, '0.25');
      const isInvalid = await page.$eval(selector, containsInvalidClass);
      expect(isInvalid).toBeFalsy();
      const configs = await worker.evaluate(TestWorker.getConfigs);
      expect(configs[0].actions[0].initWait).toEqual(0.25);
      expect(typeof configs[0].actions[0].initWait).toEqual('number');
    });
    test('0.25e1.25', async () => {
      await testPage.fill(selector, '0.25e1.25');
      const isInvalid = await page.$eval(selector, containsInvalidClass);
      expect(isInvalid).toBeFalsy();
      const configs = await worker.evaluate(TestWorker.getConfigs);
      expect(configs[0].actions[0].initWait).toEqual('0.25e1.25');
      expect(typeof configs[0].actions[0].initWait).toEqual('string');
    });
  });
  test('name', async () => {
    await page.click('#action-dropdown');
    await page.click(`[aria-labelledBy="action-dropdown"] [data-column=name]`);
    const nameSelector = '#actions input[name=name]';
    await testPage.fill(nameSelector, 'TEST');
    const configs = await worker.evaluate(TestWorker.getConfigs);
    expect(configs?.[0].actions[0].name).toEqual('TEST');
  });
});
