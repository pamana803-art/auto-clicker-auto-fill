/* eslint-disable */
export default {
  displayName: 'acf-puppeteer',
  preset: '../../jest.preset.js',
  moduleFileExtensions: ['js', 'html'],
  coverageDirectory: '../../coverage/apps/acf-puppeteer',
  //testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.js'],
  globalSetup: './setup.js',
  globalTeardown: './teardown.js',
  testEnvironment: './puppeteer_environment.js',
};
