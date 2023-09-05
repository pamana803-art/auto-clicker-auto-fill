/// <reference types="chrome"/>

import { Configuration, Settings } from '@dhruv-techapps/acf-common';

export class TestBrowser {
  page;
  browser;
  constructor() {
    this.browser = globalThis.__BROWSER_GLOBAL__.browser;
  }
  setPage = async () => {
    await delay(1000);
    const pages = await this.browser.pages();
    this.page = pages.find((page) => {
      return page.url() === 'http://localhost:3000/';
    });
  };
  select = async (querySelector, value) => {
    await this.page.select(querySelector, value);
  };
  click = async (querySelector, options) => {
    await this.page.click(querySelector, options);
  };
  $eval = async (querySelector, func) => await this.page.$eval(querySelector, func);
  evaluate = async (callback) => await this.page.evaluate(callback);
  type = async (querySelector, value) => {
    await this.click(querySelector, { clickCount: 3 });
    await this.page.type(querySelector, value);
    await this.page.$eval(querySelector, (e) => e.blur());
  };
  getPage = () => this.page;
}

export class TestWorker {
  getSettings = async () => {
    await delay(500);
    const settings: Settings = await globalThis.__BROWSER_GLOBAL__.worker.evaluate(async () => {
      const result = await chrome.storage.local.get('settings');
      return result.settings;
    });
    return settings;
  };
  getConfigs = async () => {
    await delay(500);
    const configs: Array<Configuration> = await globalThis.__BROWSER_GLOBAL__.worker.evaluate(async () => {
      const result = await chrome.storage.local.get('configs');
      return result.configs;
    });
    return configs;
  };
}

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
