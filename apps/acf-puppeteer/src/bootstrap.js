const puppeteer = require("puppeteer");
const path = require("path");

const init = async () => {
  
  const pathToExtension = path.join(process.cwd(), "/dist/apps/acf-extension");
  const browser = await puppeteer.launch({
    headless: false, //"new",
    args: [
      `--disable-extensions-except=${pathToExtension}`, // Path to the extension directory
      `--load-extension=${pathToExtension}`,
      '--user-data-dir=%userprofile%\\AppData\\Local\\Chrome\\User Data',
      '--profile-directory=Profile 2'
    ],
  });
  // Navigate to a page where the extension is active
  const backgroundPageTarget = await browser.waitForTarget(
    (target) => target.type() === "service_worker"
  );
  const worker = await backgroundPageTarget.worker();
  return { browser, worker };
};

module.exports = { init };
