import { expect, test, type Page } from '@playwright/test'
import { axeViolations, serveChain } from './helpers'

const DISCORD = 'https://discord.gg/CJCyAsm9Vr'
const X = 'https://x.com/hanzoai'
const NODE_GUIDE = 'https://docs.hanzo.ai/docs/proof-of-ai/node-operator'

const open = async (page: Page, size?: { width: number; height: number }) => {
  if (size) await page.setViewportSize(size)
  await serveChain(page)
  await page.goto('/early')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
}

const scrollThrough = async (page: Page) => {
  await page.evaluate(async () => {
    for (let y = 0; y <= document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 30))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(500)
}

const sizes = [
  { width: 1440, height: 900 },
  { width: 375, height: 812 },
]

for (const colorScheme of ['dark', 'light'] as const) {
  for (const size of sizes) {
    test(`early is readable in ${colorScheme} at ${size.width} (axe, WCAG 2.2 AA)`, async ({ page }) => {
      await page.emulateMedia({ colorScheme })
      await open(page, size)
      await scrollThrough(page)
      expect(await axeViolations(page)).toEqual([])
    })
  }
}

test('early is readable with reduced motion (axe)', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await open(page)
  await scrollThrough(page)
  expect(await axeViolations(page)).toEqual([])
})

test('the heading and the plain promise: invite-only, codes not issued yet', async ({ page }) => {
  await open(page)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Invites are opening soon.')
  await expect(page.locator('main')).toContainText('Early access to the network will be invite-only. Codes are not being issued yet.')
})

test('where invites will appear: Discord and X, with their addresses', async ({ page }) => {
  await open(page)
  await expect(page.getByRole('heading', { level: 2, name: 'Where invites will appear.' })).toBeVisible()
  const main = page.locator('main')
  await expect(main.getByRole('link', { name: 'Join the Hanzo server.' })).toHaveAttribute('href', DISCORD)
  await expect(main.getByRole('link', { name: 'Follow @hanzoai.' })).toHaveAttribute('href', X)
  await expect(page.getByRole('heading', { level: 3, name: 'Discord', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { level: 3, name: 'X', exact: true })).toBeVisible()
})

test('what you can do today: build, or run a node', async ({ page }) => {
  await open(page)
  await expect(page.getByRole('heading', { level: 2, name: 'What you can do today.' })).toBeVisible()
  const main = page.locator('main')
  await expect(main.getByRole('link', { name: 'Start building' })).toHaveAttribute('href', '/build')
  await expect(main).toContainText('Enroll a node, run tools and agents, get paid per job.')
  await expect(main.getByRole('link', { name: 'Run a node' })).toHaveAttribute('href', NODE_GUIDE)
})

test('Start building is the one filled button in the page content', async ({ page }) => {
  await open(page)
  const filled = page.locator('main a.bg-primary, main button.bg-primary')
  await expect(filled).toHaveCount(1)
  await expect(filled).toHaveText('Start building')
})

test('there is nothing to type into: no input, form, textarea, select or editable text', async ({ page }) => {
  await open(page)
  // The page, not the site frame: the chat widget and the cookie bar are not this page.
  for (const tag of ['input', 'form', 'textarea', 'select', '[contenteditable]']) await expect(page.locator(`main ${tag}`)).toHaveCount(0)
})

test('no sale, offer, staking, points, leaderboard, balance, email capture or date', async ({ page }) => {
  await open(page)
  const body = await page.locator('body').innerText()
  expect(body).not.toMatch(/sale|presale|investment|yield|APY|Bittensor/i)
  const main = await page.locator('main').innerText()
  expect(main).not.toMatch(/stak(e|ing)|token sale|points|leaderboard|balance|price|return|offer|airdrop|reward|email|waitlist|sign.?up|enter invite code|countdown/i)
  expect(main).not.toMatch(/20\d\d/)
  expect(main).not.toMatch(/\d+\s*(days?|hours?|weeks?)/i)
})

test('at phone width nothing scrolls sideways', async ({ page }) => {
  await open(page, { width: 375, height: 812 })
  await scrollThrough(page)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
})

test('every link in the page is at least 44px tall at phone width', async ({ page }) => {
  await open(page, { width: 375, height: 812 })
  for (const el of await page.locator('main a').all()) {
    const box = (await el.boundingBox())!
    expect(box.height, await el.innerText()).toBeGreaterThanOrEqual(44)
  }
})
