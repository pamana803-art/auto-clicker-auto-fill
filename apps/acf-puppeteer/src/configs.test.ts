import { Configuration } from '@dhruv-techapps/acf-common';
import { TestBrowser, TestWorker, delay } from './util';

const config1 = {
  url: 'https://developer.mozilla.org/',
  name: 'mozilla.org',
};

const config2 = {
  url: 'https://test.getautoclicker.com/',
  name: 'getautoclicker.com',
};

describe('Configs', () => {
  let browser;
  let worker;

  beforeAll(async () => {
    browser = new TestBrowser();
    worker = new TestWorker();
    await browser.setPage();
  });

  test('No Configs', async () => {
    const configs: Array<Configuration> = await worker.getConfigs();
    expect(configs).toBeUndefined();
  });

  test('updated Config 1', async () => {
    await browser.type('input[name=url]', config1.url);
    const configs: Array<Configuration> = await worker.getConfigs();
    expect(configs.length).toEqual(1);
    expect(configs[0].url).toEqual(config1.url);
    expect(configs[0].name).toEqual(config1.name);
  });

  test('Add Configuration', async () => {
    const beforeOptionsLength = await browser.evaluate(() => (document.getElementById('configuration-list') as HTMLSelectElement).options.length);
    await browser.click('#add-configuration');
    //Frontend
    const optionsLength = await browser.evaluate(() => (document.getElementById('configuration-list') as HTMLSelectElement).options.length);
    const selected = await browser.evaluate(() => (document.getElementById('configuration-list') as HTMLSelectElement).value);
    expect(optionsLength).toEqual(beforeOptionsLength + 1);
    expect(selected).toEqual('0');
    //Backend
    const configs: Array<Configuration> = await worker.getConfigs();
    expect(configs.length).toEqual(1);
  });

  test('updated Config 2', async () => {
    await browser.type('input[name=url]', config2.url);
    const configs: Array<Configuration> = await worker.getConfigs();
    expect(configs.length).toEqual(2);
    expect(configs[0].url).toEqual(config2.url);
    expect(configs[0].name).toEqual(config2.name);
  });

  test('beforeSwitch', async () => {
    const url = await browser.$eval('input[name=url]', (el) => el.value);
    const name = await browser.$eval('input[name=name]', (el) => el.value);
    expect(url).toEqual(config2.url);
    expect(name).toEqual(config2.name);
  });

  test('switch Config', async () => {
    await browser.select('#configuration-list', '1');
    const afterSelected = await browser.evaluate(() => (document.getElementById('configuration-list') as HTMLSelectElement).value);
    expect(afterSelected).toEqual('1');
  });

  test('afterSwitch', async () => {
    const url = await browser.$eval('input[name=url]', (el) => el.value);
    const name = await browser.$eval('input[name=name]', (el) => el.value);
    expect(url).toEqual(config1.url);
    expect(name).toEqual(config1.name);
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
      expect(configs).toEqual(2);
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
        expect(configs).toEqual(2);
      });
      test('remove config', async () => {
        await browser.click('.list-group-item input');
        await browser.click('[data-testid="configurations-remove-save"]');
        await delay(1000);
        const modal = await browser.evaluate(() => document.querySelector('#remove-configs') !== null);
        const configs: Array<Configuration> = await worker.getConfigs();
        expect(modal).toBeFalsy();
        expect(configs.length).toEqual(1);
        const optionsLength = await browser.evaluate(() => (document.getElementById('configuration-list') as HTMLSelectElement).options.length);
        expect(optionsLength).toEqual(1);
      });
    });
  });
});
