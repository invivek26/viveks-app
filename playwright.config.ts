import { defineConfig, devices } from "@playwright/test";

const externalBaseUrl = process.env.PLAYWRIGHT_BASE_URL;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  timeout: 20_000,
  use: {
    baseURL: externalBaseUrl ?? "http://127.0.0.1:4175",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  webServer: externalBaseUrl
    ? undefined
    : {
        command: "bun run build && bunx vite preview --host 127.0.0.1 --port 4175",
        reuseExistingServer: false,
        timeout: 30_000,
        url: "http://127.0.0.1:4175",
      },
  projects: [
    {
      name: "chromium-desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
    {
      name: "firefox-desktop",
      use: { ...devices["Desktop Firefox"], viewport: { width: 1440, height: 900 } },
    },
    {
      name: "webkit-desktop",
      use: { ...devices["Desktop Safari"], viewport: { width: 1440, height: 900 } },
    },
    { name: "android-pixel-7", use: { ...devices["Pixel 7"] } },
    { name: "ios-iphone-13", use: { ...devices["iPhone 13"] } },
  ],
});
