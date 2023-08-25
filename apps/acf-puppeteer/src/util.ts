/// <reference types="chrome"/>

import { Settings } from '@dhruv-techapps/acf-common';

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
  click = async (querySelector, options) => {
    await this.page.click(querySelector, options);
  };
  type = async (querySelector, value) => {
    await this.click(querySelector, { clickCount: 3 });
    await this.page.type(querySelector, value);
    await this.page.$eval(querySelector, e => e.blur());
  };
  getPage = () => this.page
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
}

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
