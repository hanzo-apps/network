import { expect, test, type Page } from '@playwright/test'
import { GROUPS } from '../src/lib/ecosystem'
import { axeViolations } from './helpers'

const open = async (page: Page, size?: { width: number; height: number }) => {
  if (size) await page.setViewportSize(size)
  await page.goto('/ecosystem')
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

test('the head: "The ecosystem." and what it is', async ({ page }) => {
  await open(page)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('The ecosystem.')
  await expect(page.locator('main header')).toContainText('What exists today, and what is designed.')
  await expect(page).toHaveTitle('Ecosystem · Hanzo Network')
})

test('three groups, each a list of cards: a status, a name, one sentence and one link', async ({ page }) => {
  await open(page)
  await expect(page.locator('main h2')).toHaveText(GROUPS.map((g) => g.title))
  for (const g of GROUPS) {
    const group = page.locator('main section').filter({ has: page.getByRole('heading', { level: 2, name: g.title, exact: true }) })
    const cards = group.getByRole('listitem')
    await expect(cards).toHaveCount(g.entries.length)
    for (const [i, e] of g.entries.entries()) {
      const card = cards.nth(i)
      await expect(card.getByRole('heading', { level: 3 })).toHaveText(e.name)
      await expect(card.getByText(e.tag, { exact: true })).toBeVisible()
      await expect(card).toContainText(e.text)
      await expect(card.getByRole('link')).toHaveCount(1)
      await expect(card.getByRole('link')).toHaveAttribute('href', e.href)
      await expect(card.getByRole('link')).toContainText(e.host)
    }
  }
})

test('only the three status words, and no sale, stake, reward, era or hidden organisation', async ({ page }) => {
  await open(page)
  const tags = await page.locator('main span.font-mono.uppercase.rounded-full').allTextContents()
  expect(tags.length).toBeGreaterThan(10)
  for (const t of tags) expect(['Live', 'In progress', 'Designed']).toContain(t)
  const text = await page.locator('main').innerText()
  expect(text).not.toMatch(/staking|\bsale\b|mining|reward|Era 1|subnet|finalizes|invest|airdrop/i)
  expect(await page.content()).not.toMatch(/github\.com\/luxfi/i)
})

test('the nav and the footer both lead here, between Economics and Pricing', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Ecosystem' }).click()
  await expect(page).toHaveURL(/\/ecosystem$/)
  const links = await page.getByRole('contentinfo').getByRole('link').allTextContents()
  expect(links.indexOf('Ecosystem')).toBe(links.indexOf('Economics') + 1)
  expect(links.indexOf('Pricing')).toBe(links.indexOf('Ecosystem') + 1)
})

for (const colorScheme of ['dark', 'light'] as const) {
  for (const size of [{ width: 1440, height: 900 }, { width: 375, height: 812 }]) {
    test(`ecosystem is readable in ${colorScheme} at ${size.width} (axe, WCAG 2.2 AA) and does not scroll sideways`, async ({ page }) => {
      await page.emulateMedia({ colorScheme })
      await open(page, size)
      await scrollThrough(page)
      expect(await axeViolations(page)).toEqual([])
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    })
  }
}

test('cards on one row are the same height, so the page scans', async ({ page }) => {
  await open(page, { width: 1440, height: 900 })
  const cards = page.locator('main section').first().getByRole('listitem')
  const boxes = await Promise.all([0, 1, 2].map((i) => cards.nth(i).boundingBox().then((b) => b!)))
  for (const b of boxes) expect(Math.abs(b.height - boxes[0].height)).toBeLessThanOrEqual(1)
})
