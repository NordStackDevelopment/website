import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  webServer: {
    command: 'npx astro preview --port 4321 --ignore-lock',
    port: 4321,
    reuseExistingServer: false,
  },
  use: {
    baseURL: 'http://localhost:4321',
    launchOptions: process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
  },
});
