import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  workers: 1,
  use: {
    baseURL: process.env.HERO_TEST_URL || "http://127.0.0.1:3002",
    viewport: { width: 1440, height: 900 },
    launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH },
  },
  webServer: process.env.HERO_TEST_URL ? undefined : {
    command: "npm run start -- --port 3002",
    url: "http://127.0.0.1:3002",
    timeout: 30_000,
  },
});
