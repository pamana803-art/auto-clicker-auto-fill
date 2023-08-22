const { init } = require('./bootstrap');

describe('Chrome Extension', () => {
  let browser;
  let worker;

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
      const result = await chrome.storage.local.get('install_date');
      return result;
    });
    expect(installDate).toBeDefined();
  });
});
