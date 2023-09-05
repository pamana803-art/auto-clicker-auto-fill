import { Configuration, LOAD_TYPES, START_TYPES } from '@dhruv-techapps/acf-common';
import { TestBrowser, TestWorker, containsInvalidClass } from './util';

describe('Config', () => {
  let worker;
  let browser;

  beforeAll(async () => {
    browser = new TestBrowser();
    worker = new TestWorker();
    await browser.setPage();
  });

  describe('Config', () => {
    test('url', async () => {
      await browser.type('input[name=url]', 'https://test.getautoclicker.com/');
      const configs: Array<Configuration> = await worker.getConfigs();
      expect(configs[0].url).toEqual('https://test.getautoclicker.com/');
      expect(configs[0].name).toEqual('getautoclicker.com');
      expect(configs[0].enable).toBeTruthy();
      expect(configs[0].startType).toEqual(START_TYPES.AUTO);
      expect(configs[0].loadType).toEqual(LOAD_TYPES.WINDOW);
      expect(configs[0].actions.length).toBeGreaterThanOrEqual(1);
      expect(configs[0].actions[0].elementFinder).toEqual('');
    });
    test('name', async () => {
      await browser.type('input[name=name]', 'Testing');
      const configs: Array<Configuration> = await worker.getConfigs();
      expect(configs[0].name).toEqual('Testing');
    });
    describe('initWait', () => {
      test('error', async () => {
        await browser.type('input[name=initWait]', 'init wait');
        const configs: Array<Configuration> = await worker.getConfigs();
        const isInvalid = await browser.$eval(`input[name=initWait]`, containsInvalidClass);
        expect(isInvalid).toBeTruthy();
        expect(configs[0].initWait).not.toBeDefined();
      });
      test('success', async () => {
        await browser.type('input[name=initWait]', '1.2e1.3');
        const configs: Array<Configuration> = await worker.getConfigs();
        const isInvalid = await browser.$eval(`input[name=initWait]`, containsInvalidClass);
        expect(isInvalid).toBeFalsy();
        expect(configs[0].initWait).toEqual('1.2e1.3');
      });
    });
    test('enable', async () => {
      await browser.click('input[name=enable]');
      const configs: Array<Configuration> = await worker.getConfigs();
      expect(configs[0].enable).toBeFalsy();
    });
  });
});
