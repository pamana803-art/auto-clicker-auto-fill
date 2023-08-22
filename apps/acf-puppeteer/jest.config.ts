/* eslint-disable */
export default {
  displayName: 'acf-puppeteer',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/apps/acf-puppeteer',
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  globalSetup: './setup.js',
  globalTeardown: './teardown.js',
  testEnvironment: './puppeteer_environment.js',
};
