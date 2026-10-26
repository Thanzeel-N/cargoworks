import { defineConfig } from "@playwright/test";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  workers: 1,
  use: {
    baseURL: process.env.HERO_TEST_URL || "http://127.0.0.1:3008",
    viewport: { width: 1440, height: 900 },
    launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || CHROME_PATH },
  },
  webServer: process.env.HERO_TEST_URL ? undefined : {
    command: "npm run start -- --port 3008",
    url: "http://127.0.0.1:3008",
    timeout: 30_000,
    reuseExistingServer: true,
  },
});
