import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['allure-playwright',{outputFolder: 'test-results'}],['html']],
  // here the allure report will be generated in the test-results folder and we can use 
  // allure command line to generate the report and then we can open the report in the browser
  // ( in github workflow file e2e.yml file we have added the command to generate the allure report 
  // and then we can upload the report as an artifact and then we can download the report and open
  //  it in the browser)
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  
  // for global setup
  globalSetup : require.resolve("./utils/globalsetup.ts"),
  
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
    baseURL: 'https://practice.sdetunicorns.com',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    //trace: 'on-first-retry',
    trace: 'retain-on-failure',
    
    /* Run tests in headed mode by default */
    headless: false,

    storageState : "Logginstate.json"
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], headless: !!process.env.CI },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] ,  headless : false },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'],  headless : false  },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
