/// <reference types="chrome"/>

import { init } from '@dhruv-techapps/utils';

describe('Chrome Extension', () => {
  let browser: Browser;
  let worker: Worker;

  beforeAll(async () => {
    const response = await init();
    browser = response.browser;
    worker = response.worker;
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Extension loads without errors', async () => {
    const { install_date: installDate } = await worker.evaluate(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const result = await chrome.storage.local.get('install_date');
      return result;
    });
    console.log(installDate);
    expect(installDate).toBeDefined();
  });
});
