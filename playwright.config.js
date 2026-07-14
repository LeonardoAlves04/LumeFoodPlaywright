// @ts-check
const { defineConfig, devices } = require('@playwright/test');
<<<<<<< HEAD
const { defineBddConfig } = require('playwright-bdd');

const testDir = defineBddConfig({
  features: 'features/**/*.feature',
  steps: 'features/steps/**/*.js',
  outputDir: '.features-gen',
  language: 'pt',
  tags: 'not @known-bug',
  missingSteps: 'fail-on-gen',
});
=======
>>>>>>> 8c7a2e915c8dedcd0243a4f03a25bf54bdfd3fb2

const baseURL =
  process.env.BASE_URL ||
  'https://lumefood-git-master-henriquemanieris-projects.vercel.app';

module.exports = defineConfig({
<<<<<<< HEAD
  testDir,
=======
  testDir: './tests',
>>>>>>> 8c7a2e915c8dedcd0243a4f03a25bf54bdfd3fb2
  timeout: 45_000,
  expect: {
    timeout: 8_000,
  },
  fullyParallel: false,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 2 : 1,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],
  use: {
    baseURL,
    actionTimeout: 10_000,
    navigationTimeout: 20_000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'desktop-chrome',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
