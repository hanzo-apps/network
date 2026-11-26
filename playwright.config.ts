import { defineConfig, devices } from '@playwright/test'

const external = process.env.BASE_URL

export default defineConfig({
  testDir: 'e2e',
  workers: 1,
  retries: 0,
  use: { baseURL: external ?? 'http://localhost:4173' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: external
    ? undefined
    : {
        command: 'pnpm build && pnpm preview --port 4173 --strictPort',
        url: 'http://localhost:4173',
        reuseExistingServer: true,
        timeout: 180_000,
      },
})
