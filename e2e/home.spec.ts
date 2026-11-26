import { expect, test, type Page } from '@playwright/test'
import { RPC_URL, axeViolations, serveChain } from './helpers'

// No test here may depend on the live chain: every one starts with a mocked answer.
test.beforeEach(({ page }) => serveChain(page))

/** Scroll the whole page in steps so every reveal fires, then let the animations end. */
async function scrollThrough(page: Page) {
  const h = await page.evaluate(() => document.scrollingElement!.scrollHeight)
  for (let y = 0; y <= h; y += 400) {
    await page.evaluate((top) => window.scrollTo(0, top), y)
    await page.waitForTimeout(60)
  }
  await page.waitForTimeout(1200)
}

for (const scheme of ['light', 'dark'] as const) {
  test.describe(`${scheme} mode`, () => {
    test.beforeEach(({ page }) => page.emulateMedia({ colorScheme: scheme }))

    test('home is readable everywhere with reduced motion (axe, WCAG 2.2 AA)', async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' })
      await page.goto('/')
      expect(await axeViolations(page)).toEqual([])
    })

    test('home is readable after scrolling through it with motion on (axe)', async ({ page }) => {
      await page.goto('/')
      await scrollThrough(page)
      expect(await axeViolations(page)).toEqual([])
    })

    test('home with the phone menu open is readable (axe, 375px)', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 })
      await page.goto('/')
      await page.getByRole('button', { name: 'Open menu' }).click()
      await expect(page.getByRole('navigation', { name: 'Menu' })).toBeVisible()
      expect(await axeViolations(page)).toEqual([])
    })
  })
}

test('phone menu: Escape closes it and returns focus to the toggle; the last item is the API key', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')
  const toggle = page.getByRole('button', { name: 'Open menu' })
  await toggle.click()
  const menu = page.getByRole('navigation', { name: 'Menu' })
  await expect(menu.getByRole('link').last()).toHaveText('Get an API key')
  await expect(menu.getByRole('link').last()).toHaveAttribute('href', 'https://platform.hanzo.ai/api-keys')
  await page.keyboard.press('Escape')
  await expect(menu).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused()
})

test('home has one primary action and a compute path', async ({ page }) => {
  await page.goto('/')
  const key = page.getByRole('link', { name: 'Get an API key', exact: true })
  await expect(key.first()).toHaveAttribute('href', 'https://platform.hanzo.ai/api-keys')
  await expect(page.getByRole('link', { name: 'Provide compute' }).or(page.getByRole('button', { name: 'Provide compute' })).first()).toBeVisible()
})

test('home claims only what is live', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Provable AI compute.')
  await expect(page.getByText('Rewards switch on after Proof of AI passes its audits.')).toBeVisible()
  await expect(page.getByText(/proved and paid|Every job is provable/)).toHaveCount(0)
})

test('home shows the live network heartbeat', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('1,052,729').first()).toBeVisible()
})

test('while the chain has not answered there is no "Live"; after the timeout it says unavailable', async ({ page }) => {
  await page.unroute(RPC_URL)
  await page.route(RPC_URL, () => {}) // never answers
  await page.goto('/')
  await expect(page.getByText('Live', { exact: true })).toHaveCount(0)
  await expect(page.getByText('Network status unavailable')).toHaveCount(0)
  await expect(page.getByText('Network status unavailable')).toBeVisible({ timeout: 8000 })
  await expect(page.getByText('Live', { exact: true })).toHaveCount(0)
})

test('when the chain is down, the chip says so', async ({ page }) => {
  await page.unroute(RPC_URL)
  await page.route(RPC_URL, (route) => route.fulfill({ status: 503, body: 'down' }))
  await page.goto('/')
  await expect(page.getByText('Network status unavailable')).toBeVisible()
})


test('home is calm under reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.waitForLoadState('load')
  await page.waitForTimeout(1500) // let anything that would start, start
  const running = await page.evaluate(
    () => document.getAnimations().filter((a) => a.playState === 'running').length,
  )
  expect(running).toBe(0)
  await expect(page.locator('video')).toHaveCount(0)
})

test('the hero picture stays still under the mouse (James, 26 Nov)', async ({ page }) => {
  await page.goto('/')
  const art = page.locator('.hero-art')
  const before = await art.evaluate((el) => getComputedStyle(el).transform)
  await page.mouse.move(10, 10)
  await page.mouse.move(1200, 700, { steps: 8 })
  await page.waitForTimeout(800)
  expect(await art.evaluate((el) => getComputedStyle(el).transform)).toBe(before)
  expect(before).toBe('none')
})
