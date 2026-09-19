import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  timeout: 60_000,
  expect: { timeout: 15_000 },
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: "http://localhost:3000",
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm start",
    url: "http://localhost:3000/zh-CN/",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
