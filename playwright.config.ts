import { defineConfig, devices } from '@playwright/test';

const baseURL = 'http://127.0.0.1:4178';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: 2,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL, trace: 'retain-on-failure', screenshot: 'only-on-failure' },
  projects: [
    {
      name: 'Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],
  webServer: {
    command: 'pnpm dev --host 127.0.0.1 --port 4178',
    url: baseURL,
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
