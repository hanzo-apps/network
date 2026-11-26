import { readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'
import { MODELS_URL, axeViolations, failModels, serveModels } from './helpers'

for (const colorScheme of ['light', 'dark'] as const) {
  test(`pricing is readable everywhere in ${colorScheme} (axe, WCAG 2.2 AA)`, async ({ page }) => {
    await page.emulateMedia({ colorScheme })
    await serveModels(page)
    await page.goto('/pricing')
    expect(await axeViolations(page)).toEqual([])
  })
}

test('pricing shows the live model catalog', async ({ page }) => {
  await serveModels(page)
  await page.goto('/pricing')
  await expect(page.getByText('Claude Opus 5.5').first()).toBeVisible()
  await expect(page.getByText('$4.45').first()).toBeVisible()
  await expect(page.getByText('$22.26').first()).toBeVisible()
  await expect(page.getByText('Claude Sonnet 5.5').first()).toBeVisible()
  await expect(page.getByText('Claude Opus 3')).toHaveCount(0)
  await expect(page.getByText('Sonnet 3.7')).toHaveCount(0)
})

test('pricing fails honestly when the catalog is down', async ({ page }) => {
  await failModels(page)
  await page.goto('/pricing')
  await expect(page.getByRole('alert').first()).toBeVisible()
  await expect(page.getByRole('button', { name: /retry/i })).toBeVisible()
  await expect(page.getByText('Claude')).toHaveCount(0)
})

const CURL = `curl https://api.hanzo.ai/v1/chat/completions \\
  -H "Authorization: Bearer $HANZO_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"hanzo/zen","messages":[{"role":"user","content":"Hello"}]}'`

test('a free Zen shows as the $0 stat card only; the headline stays true without data', async ({ page }) => {
  await serveModels(page)
  await page.goto('/pricing')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Pay per token.')
  await expect(page.getByText('to call Zen')).toBeVisible() // data is in, so the absence below is real
  await expect(page.getByText('Zen is free to call')).toHaveCount(0)
  await expect(page.getByText('$0', { exact: true })).toHaveCount(1)
})

test('without a free Zen the stat card slot stays a same-size spacer', async ({ page }) => {
  const body = JSON.parse(readFileSync('e2e/fixtures/models.json', 'utf8'))
  body.data = body.data.filter((m: { id: string }) => m.id !== 'hanzo/zen')
  await page.route(MODELS_URL, (route) => route.fulfill({ json: body }))
  await page.goto('/pricing')
  await expect(page.getByText('models, live')).toBeVisible()
  const cards = page.locator('header ul > li')
  await expect(cards).toHaveCount(2)
  const [a, b] = [(await cards.nth(0).boundingBox())!, (await cards.nth(1).boundingBox())!]
  expect(Math.abs(a.height - b.height)).toBeLessThanOrEqual(1)
  expect(Math.abs(a.width - b.width)).toBeLessThanOrEqual(1)
  await expect(cards.nth(1)).toBeHidden()
})

test('without a free Zen the page claims nothing free', async ({ page }) => {
  const body = JSON.parse(readFileSync('e2e/fixtures/models.json', 'utf8'))
  body.data = body.data.filter((m: { id: string }) => m.id !== 'hanzo/zen')
  await page.route(MODELS_URL, (route) => route.fulfill({ json: body }))
  await page.goto('/pricing')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Pay per token.')
  await expect(page.getByText('Claude Opus 5.5').first()).toBeVisible()
  await expect(page.getByText('$0', { exact: true })).toHaveCount(0)
  await expect(page.getByText('to call Zen')).toHaveCount(0)
  await expect(page.getByText('Zen is free to call')).toHaveCount(0)
})

test('get started works without the catalog and never claims free', async ({ page }) => {
  await failModels(page)
  await page.goto('/pricing')
  await expect(page.locator('#start').getByRole('link', { name: 'Get an API key' })).toHaveAttribute('href', /^https:\/\/platform\.hanzo\.ai\/api-keys\?hz_aid=/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Pay per token.')
  await expect(page.getByText('to call Zen')).toHaveCount(0)
  await expect(page.getByText('Zen is free to call')).toHaveCount(0)
})

test('Copy puts the curl command on the clipboard', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await serveModels(page)
  await page.goto('/pricing')
  await page.getByRole('button', { name: 'Copy' }).click()
  await expect(page.getByRole('button', { name: 'Copied' })).toBeVisible()
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(CURL)
})

test('filter chips narrow the list and empty search can be cleared', async ({ page }) => {
  await serveModels(page)
  await page.goto('/pricing')
  const chip = page.getByRole('button', { name: 'OpenAI', exact: true })
  await chip.click()
  await expect(chip).toHaveAttribute('aria-pressed', 'true')
  await page.getByRole('searchbox').fill('zzzz')
  await expect(page.getByText('No models match "zzzz".')).toBeVisible()
  await page.getByRole('button', { name: 'Clear' }).click()
  await expect(page.getByText('GPT-5.4').first()).toBeVisible()
})

test('at phone width nothing scrolls sideways', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await serveModels(page)
  await page.goto('/pricing')
  await expect(page.getByText('Claude Opus 5.5').first()).toBeVisible()
  const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  expect(over).toBeLessThanOrEqual(0)
})

test('Copy never sits on top of the command, and the code scrolls inside its own box', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await serveModels(page)
  await page.goto('/pricing')
  const copy = (await page.getByRole('button', { name: 'Copy' }).boundingBox())!
  const code = (await page.getByLabel('curl command').boundingBox())!
  expect(copy.y + copy.height).toBeLessThanOrEqual(code.y)
  const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  expect(over).toBeLessThanOrEqual(0)
})

test('when the clipboard is blocked, Copy selects the command so it can be copied by hand', async ({ page }) => {
  await serveModels(page)
  await page.goto('/pricing')
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: () => Promise.reject(new Error('blocked')) } })
  })
  await page.getByRole('button', { name: 'Copy' }).click()
  await expect.poll(() => page.evaluate(() => getSelection()!.toString())).toContain('api.hanzo.ai')
})

test('paid per-second models are never listed or called Free', async ({ page }) => {
  await serveModels(page)
  await page.goto('/pricing')
  await expect(page.getByText('Claude Opus 5.5').first()).toBeVisible()
  await expect(page.getByText('FLUX 3 Video')).toHaveCount(0)
  await expect(page.getByText('Kai', { exact: true })).toHaveCount(0)
  await expect(page.getByText('2 more models are priced per second, per image, or are not billed per token; see docs.hanzo.ai.')).toBeVisible()
  await expect(page.getByRole('link', { name: 'docs.hanzo.ai' })).toHaveAttribute('href', 'https://docs.hanzo.ai')
})

// Claims audit, 26 Nov: no source says there is no minimum; 27 of the listed models are not chat models.
test('pricing makes no claim the sources do not back', async ({ page }) => {
  await page.goto('/pricing')
  await expect(page.getByText(/no minimum/i)).toHaveCount(0)
  await expect(page.getByText(/use any model below/i)).toHaveCount(0)
  await expect(page.getByText(/any chat model below/i)).toBeVisible()
  await expect(page.getByText(/in a minute/i)).toHaveCount(0)
  await expect(page.getByText('billed by use')).toHaveCount(0)
})

test('the providers card sends people to the node guide', async ({ page }) => {
  await page.goto('/pricing')
  await expect(page.getByRole('link', { name: 'Run a node' })).toHaveAttribute('href', 'https://docs.hanzo.ai/docs/proof-of-ai/node-operator')
})

test('aliases of one model are one row with all their ids, and the count is of distinct models', async ({ page }) => {
  const body = JSON.parse(readFileSync('e2e/fixtures/models.json', 'utf8'))
  const base = body.data.find((m: { id: string }) => m.id === 'openai/gpt-5.4')
  body.data.push({ ...base, id: 'gpt-5.4-alias' }, { ...base, id: 'openai/gpt-5.4-copy' })
  await page.route(MODELS_URL, (route) => route.fulfill({ json: body }))
  await page.goto('/pricing')
  const rows = page.getByRole('listitem').filter({ hasText: 'openai/gpt-5.4, gpt-5.4-alias, openai/gpt-5.4-copy' })
  await expect(rows).toHaveCount(1)
  await expect(page.getByText('models, live').locator('xpath=preceding-sibling::p')).toHaveText('5')
})

for (const [width, height] of [[1440, 900], [375, 812]]) {
  test(`See all prices lands the Featured models heading below the sticky nav at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height })
    await serveModels(page)
    await page.goto('/pricing')
    await page.getByRole('link', { name: 'See all prices' }).click()
    const heading = page.getByRole('heading', { name: 'Featured models' })
    await expect(heading).toBeVisible()
    const nav = (await page.locator('header').first().boundingBox())!
    await expect.poll(async () => (await heading.boundingBox())!.y).toBeGreaterThanOrEqual(nav.y + nav.height)
  })
}

for (const [width, height] of [[375, 812], [1440, 900]]) {
  test(`the layout does not move when the catalog arrives at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height })
    await page.addInitScript(() => {
      const w = window as unknown as { cls: number }
      w.cls = 0
      new PerformanceObserver((list) => {
        for (const e of list.getEntries() as unknown as { value: number; hadRecentInput: boolean }[]) if (!e.hadRecentInput) w.cls += e.value
      }).observe({ type: 'layout-shift', buffered: true })
    })
    await page.route(MODELS_URL, async (route) => {
      await new Promise((r) => setTimeout(r, 600))
      await route.fulfill({ path: 'e2e/fixtures/models.json', contentType: 'application/json' })
    })
    await page.goto('/pricing')
    await expect(page.getByText('Claude Opus 5.5').first()).toBeVisible()
    await page.waitForTimeout(1500)
    expect(await page.evaluate(() => (window as unknown as { cls: number }).cls)).toBeLessThan(0.01)
  })
}

test('a featured placeholder card and a loaded one are the same height', async ({ page }) => {
  let release!: () => void
  const gate = new Promise<void>((r) => (release = r))
  await page.route(MODELS_URL, async (route) => {
    await gate
    await route.fulfill({ path: 'e2e/fixtures/models.json', contentType: 'application/json' })
  })
  await page.goto('/pricing')
  const card = page.locator('#models li').first()
  await expect(card).toBeVisible()
  const before = (await card.boundingBox())!.height
  release()
  await expect(page.getByText('Claude Opus 5.5').first()).toBeVisible()
  const after = (await page.locator('#models li').first().boundingBox())!.height
  expect(Math.abs(before - after)).toBeLessThanOrEqual(1)
})

test('loading is announced while the catalog is delayed, and cleared after', async ({ page }) => {
  let release!: () => void
  const gate = new Promise<void>((r) => (release = r))
  await page.route(MODELS_URL, async (route) => {
    await gate
    await route.fulfill({ path: 'e2e/fixtures/models.json', contentType: 'application/json' })
  })
  await page.goto('/pricing')
  const status = page.getByRole('status')
  // Screen readers hold back announcements inside a busy region, so the line sits outside it (review, 26 Nov).
  expect(await status.evaluate((el) => el.closest('[aria-busy]') === null)).toBe(true)
  await expect(status).toHaveText("Loading today's prices from api.hanzo.ai…")
  release()
  await expect(page.getByText('Claude Opus 5.5').first()).toBeVisible()
  await expect(status).toHaveText('')
})

test('pricing says AI rewards, not GPU rewards (CPUs are paid too)', async ({ page }) => {
  await page.goto('/pricing')
  await expect(page.getByText(/AI rewards stay off until the launch gates pass/)).toBeVisible()
  await expect(page.getByRole('link', { name: 'Read the whitepaper' })).toHaveAttribute('href', 'https://papers.hanzo.ai/hanzo-ai-chain/')
  await expect(page.getByText(/GPU rewards/)).toHaveCount(0)
})
