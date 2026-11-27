import { readFileSync } from 'node:fs'
import { expect, test, type Page } from '@playwright/test'
import { MODELS_URL, RPC_URL, axeViolations, serveChain, serveModels } from './helpers'

// No test here may depend on the live chain or the live catalog: every one starts with a mocked answer.
test.beforeEach(async ({ page }) => {
  await serveChain(page)
  await serveModels(page)
})

type Raw = { id: string; name?: string | null; owned_by?: string | null; context_window?: number; free?: boolean; pricing?: { input_per_million?: number; output_per_million?: number; variable?: boolean } }

/** What the Models cell must say, worked out from the raw catalog here and not by the site's own code:
 *  distinct models billed per token (ids that share name, lab, prices and context are one model), and how many of those have a Zen id. */
function counts(data: Raw[]) {
  const perToken = data.filter(
    (r) => !r.id.endsWith(':batch') && r.pricing?.variable !== true && typeof r.pricing?.input_per_million === 'number' && typeof r.pricing?.output_per_million === 'number',
  )
  const rows = new Map<string, string[]>()
  for (const r of perToken) {
    const key = JSON.stringify([r.name ?? r.id, r.owned_by, r.pricing!.input_per_million, r.pricing!.output_per_million, r.context_window, r.free === true])
    rows.set(key, [...(rows.get(key) ?? []), r.id])
  }
  const zen = [...rows.values()].filter((ids) => ids.some((id) => /zen/i.test(id))).length
  return { models: rows.size, zen }
}
const fixture = (JSON.parse(readFileSync('e2e/fixtures/models.json', 'utf8')) as { data: Raw[] }).data

const telemetry = (page: Page) => page.getByRole('group', { name: 'Network telemetry' })
/** The value beside a label, by the label's text. */
const cell = (page: Page, label: string) => telemetry(page).locator('dt', { hasText: label }).locator('xpath=..')

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
  for (const width of [1440, 375]) {
    test.describe(`${scheme} mode, ${width}px`, () => {
      test.beforeEach(({ page }) => page.setViewportSize({ width, height: width === 375 ? 812 : 900 }))

      test('home is readable everywhere with reduced motion (axe, WCAG 2.2 AA)', async ({ page }) => {
        await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' })
        await page.goto('/')
        await scrollThrough(page)
        expect(await axeViolations(page)).toEqual([])
      })

      test('home is readable after scrolling through it with motion on (axe)', async ({ page }) => {
        await page.emulateMedia({ colorScheme: scheme })
        await page.goto('/')
        await scrollThrough(page)
        await page.evaluate(() => window.scrollTo(0, 0))
        expect(await axeViolations(page)).toEqual([])
      })
    })
  }

  test(`home with the phone menu open is readable (axe, 375px, ${scheme})`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme })
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    await page.getByRole('button', { name: 'Open menu' }).click()
    await expect(page.getByRole('navigation', { name: 'Menu' })).toBeVisible()
    expect(await axeViolations(page)).toEqual([])
  })
}

test('the nav: Solutions, Build, Economics, Ecosystem, Pricing, Docs, in that order, and the invite button', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  const nav = page.getByRole('navigation', { name: 'Main' })
  await expect(nav.getByRole('link')).toHaveText(['Solutions', 'Build', 'Economics', 'Ecosystem', 'Pricing', 'Docs'])
  const hrefs = await nav.getByRole('link').evaluateAll((as) => as.map((a) => a.getAttribute('href')))
  expect(hrefs).toEqual(['/#solutions', '/build', '/economics', '/ecosystem', '/pricing', 'https://docs.hanzo.ai'])
  await expect(page.locator('header, footer').getByText(/How it works|Providers/)).toHaveCount(0)
  const invite = page.locator('header').getByRole('link', { name: 'Enter invite code' })
  await expect(invite).toHaveAttribute('href', '/early')
  await expect(page.locator('header').getByRole('link', { name: 'Get an API key' })).toHaveCount(0)
})

test('the nav link Solutions lands on the Solutions section', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/pricing')
  await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Solutions' }).click()
  await expect(page).toHaveURL(/\/#solutions$/)
  await expect(page.locator('#solutions')).toBeInViewport()
})

test('the header button reads "Invite code" from 768px and "Enter invite code" from 1024px, with one stable accessible name', async ({ page }) => {
  for (const [width, text] of [[768, 'Invite code'], [900, 'Invite code'], [1023, 'Invite code'], [1024, 'Enter invite code'], [1440, 'Enter invite code']] as const) {
    await page.setViewportSize({ width, height: 800 })
    await page.goto('/')
    const link = page.locator('header').getByRole('link', { name: 'Enter invite code' })
    await expect(link, `accessible name at ${width}`).toHaveAttribute('aria-label', 'Enter invite code')
    expect((await link.innerText()).trim(), `visible text at ${width}`).toBe(text)
  }
})

test('phone menu: Escape closes it and returns focus to the toggle; the links are the same and the last is the invite', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')
  const toggle = page.getByRole('button', { name: 'Open menu' })
  await toggle.click()
  const menu = page.getByRole('navigation', { name: 'Menu' })
  await expect(menu.getByRole('link')).toHaveText(['Solutions', 'Build', 'Economics', 'Ecosystem', 'Pricing', 'Docs', 'Enter invite code'])
  await expect(menu.getByRole('link').last()).toHaveAttribute('href', '/early')
  for (const link of await menu.getByRole('link').all()) expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44)
  await page.keyboard.press('Escape')
  await expect(menu).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused()
})

test('the hero: the new h1, sub and two buttons', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('The blockchain for global intelligence.')
  const hero = page.locator('main section').first()
  await expect(hero.getByText('Run real AI workloads through one API today. Proof of AI is designed to verify open-model work on ordinary CPUs and settle it with post-quantum finality.')).toBeVisible()
  await expect(hero.getByRole('link', { name: 'Enter invite code' })).toHaveAttribute('href', '/early')
  await expect(hero.getByRole('link', { name: 'Start building' })).toHaveAttribute('href', '/build')
  await expect(page.getByText('Provable AI compute.')).toHaveCount(0)
})

test('home claims only what is live', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText(/proved and paid|Every job is provable/)).toHaveCount(0)
  await expect(page.getByText(/operational/i)).toHaveCount(0)
})

test('the telemetry strip has four cells with the right labels', async ({ page }) => {
  await page.goto('/')
  await expect(telemetry(page).locator('dt')).toHaveText(['Chain 36963', 'Models', 'Supply cap', 'Platform status'])
})

test('telemetry, live: block height, model counts from the catalog, supply cap tagged Designed, status link', async ({ page }) => {
  await page.goto('/')
  await expect(cell(page, 'Chain 36963')).toContainText('block 1,052,729')
  const { models, zen } = counts(fixture)
  await expect(cell(page, 'Models')).toHaveText(new RegExp(`${models}\\s*·\\s*${zen} Zen`))
  const supply = cell(page, 'Supply cap')
  await expect(supply).toContainText('2T AI · 500B era 1')
  await expect(supply.getByText('Designed', { exact: true })).toBeVisible()
  await expect(supply.getByRole('link')).toHaveAttribute('href', '/economics')
  await expect(cell(page, 'Platform status').getByRole('link', { name: 'status.hanzo.network' })).toHaveAttribute('href', 'https://status.hanzo.network')
})

test('the Models cell merges aliases and drops per-second and batch ids', async ({ page }) => {
  const m = (id: string, name: string, extra: object = {}) => ({ id, name, owned_by: 'hanzo', context_window: 1000, free: false, pricing: { input_per_million: 1, output_per_million: 2 }, ...extra })
  const data = [
    m('enso', 'Enso'),
    m('hanzo/enso', 'Enso'), // alias of the line above
    m('zen6-max', 'Zen6 Max'),
    m('zenlm/zen6-max', 'Zen6 Max'), // alias: still one Zen model
    m('anthropic/opus', 'Opus', { owned_by: 'anthropic' }),
    m('enso:batch', 'Enso'),
    m('fal/video', 'Video', { pricing: { input_per_million: 0, output_per_million: 0, variable: true } }),
  ]
  await page.unroute(MODELS_URL)
  await page.route(MODELS_URL, (route) => route.fulfill({ json: { data } }))
  await page.goto('/')
  await expect(cell(page, 'Models')).toHaveText(/3\s*·\s*1 Zen/)
})

test('telemetry, loading: empty reserved boxes, no "Live", nothing unavailable, and nothing jumps when the answers come', async ({ page }) => {
  await page.unroute(RPC_URL)
  await page.unroute(MODELS_URL)
  let answer!: () => void
  const held = new Promise<void>((r) => (answer = r))
  await page.route(RPC_URL, async (route) => { await held; await route.fulfill({ json: { jsonrpc: '2.0', id: 1, result: '0x101039' } }) })
  await page.route(MODELS_URL, async (route) => { await held; await route.fulfill({ path: 'e2e/fixtures/models.json', contentType: 'application/json' }) })
  await page.goto('/')
  const strip = telemetry(page)
  await expect(strip.locator('dt')).toHaveCount(4)
  await expect(cell(page, 'Chain 36963').locator('dd')).toHaveText('')
  await expect(cell(page, 'Models').locator('dd')).toHaveText('')
  await expect(strip.getByText(/unavailable|Live/)).toHaveCount(0)
  // Measured from the headline, which has its own entrance animation.
  const h1 = page.getByRole('heading', { level: 1 })
  const place = async () => ({ box: (await strip.boundingBox())!, below: (await strip.boundingBox())!.y - (await h1.boundingBox())!.y })
  await page.waitForTimeout(1200)
  const before = await place()
  expect(before.box.height).toBeGreaterThan(40)
  answer()
  await expect(cell(page, 'Chain 36963')).toContainText('block 1,052,729')
  await expect(cell(page, 'Models')).toContainText('Zen')
  const after = await place()
  expect(after.box.height).toBe(before.box.height)
  expect(after.below).toBe(before.below)
})

const heights = (page: Page) => telemetry(page).locator('dt').locator('xpath=..').evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().height)))

for (const width of [1440, 700]) {
  test(`telemetry at ${width}: the Designed tag sits after the supply value on one line`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    const link = cell(page, 'Supply cap').getByRole('link')
    const text = (await link.evaluate((e) => { const r = document.createRange(); r.selectNodeContents(e.firstChild!); const b = r.getBoundingClientRect(); return { x: b.right, y: b.top + b.height / 2 } }))
    const tag = (await link.getByText('Designed', { exact: true }).boundingBox())!
    expect(tag.x).toBeGreaterThanOrEqual(text.x)
    expect(Math.abs(tag.y + tag.height / 2 - text.y)).toBeLessThan(6)
  })
}

test('telemetry: the four cells are the same height, and the same in loading, live and down states', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.unroute(RPC_URL)
  await page.unroute(MODELS_URL)
  let answer!: () => void
  const held = new Promise<void>((r) => (answer = r))
  await page.route(RPC_URL, async (route) => { await held; await route.fulfill({ json: { jsonrpc: '2.0', id: 1, result: '0x101039' } }) })
  await page.route(MODELS_URL, async (route) => { await held; await route.fulfill({ path: 'e2e/fixtures/models.json', contentType: 'application/json' }) })
  await page.goto('/')
  await page.waitForTimeout(800)
  const loading = await heights(page)
  expect(new Set(loading).size).toBe(1)
  answer()
  await expect(cell(page, 'Models')).toContainText('Zen')
  expect(await heights(page)).toEqual(loading)

  await page.unroute(RPC_URL)
  await page.unroute(MODELS_URL)
  await page.route(RPC_URL, (route) => route.fulfill({ status: 503, body: 'down' }))
  await page.route(MODELS_URL, (route) => route.fulfill({ status: 500, body: 'down' }))
  await page.reload()
  await expect(cell(page, 'Models')).toContainText('unavailable')
  await expect(cell(page, 'Chain 36963')).toContainText('unavailable')
  expect(await heights(page)).toEqual(loading)
})

test('telemetry, chain never answers: after 5 s the chain cell says unavailable', async ({ page }) => {
  await page.unroute(RPC_URL)
  await page.route(RPC_URL, () => {}) // never answers
  await page.goto('/')
  await expect(cell(page, 'Chain 36963')).not.toContainText('unavailable')
  await expect(cell(page, 'Chain 36963')).toContainText('unavailable', { timeout: 8000 })
  await expect(cell(page, 'Models')).toContainText('Zen') // the other cells are independent
})

test('telemetry, chain down: the chain cell says unavailable and the rest still work', async ({ page }) => {
  await page.unroute(RPC_URL)
  await page.route(RPC_URL, (route) => route.fulfill({ status: 503, body: 'down' }))
  await page.goto('/')
  await expect(cell(page, 'Chain 36963')).toContainText('unavailable')
  await expect(cell(page, 'Supply cap')).toContainText('2T AI')
  await expect(cell(page, 'Platform status').getByRole('link')).toBeVisible()
})

test('telemetry, catalog down: the Models cell says unavailable and the chain cell still works', async ({ page }) => {
  await page.unroute(MODELS_URL)
  await page.route(MODELS_URL, (route) => route.fulfill({ status: 500, body: 'down' }))
  await page.goto('/')
  await expect(cell(page, 'Models')).toContainText('unavailable')
  await expect(cell(page, 'Chain 36963')).toContainText('block 1,052,729')
})

test('the catalog is fetched once for the whole page', async ({ page }) => {
  let asked = 0
  await page.unroute(MODELS_URL)
  await page.route(MODELS_URL, (route) => { asked++; return route.fulfill({ path: 'e2e/fixtures/models.json', contentType: 'application/json' }) })
  await page.goto('/')
  await expect(cell(page, 'Models')).toContainText('Zen')
  await page.waitForLoadState('networkidle')
  expect(asked).toBe(1)
})

test('the telemetry strip is one row at 1440 and a 2x2 grid at 375', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  const tops = async () => (await telemetry(page).locator('dt').evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().top))))
  expect(new Set(await tops()).size).toBe(1)
  await page.setViewportSize({ width: 375, height: 812 })
  await page.waitForTimeout(200)
  expect(new Set(await tops()).size).toBe(2)
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375)
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

// The globe's horizon is 60% down its 16:9 picture; the hero's last text element (the telemetry strip) must sit on clear sky above it (James, 26 Nov).
for (const [w, h] of [[1280, 720], [1366, 768], [1440, 900], [1920, 1080], [375, 812]]) {
  test(`hero text clears the globe's rim at ${w}x${h}`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: h })
    await page.goto('/')
    const gap = await page.evaluate(() => {
      const art = document.querySelector('.hero-art')!.getBoundingClientRect()
      const last = document.querySelector('[role="group"][aria-label="Network telemetry"]')!.getBoundingClientRect()
      return art.top + 0.6 * art.height - last.bottom
    })
    expect(gap).toBeGreaterThanOrEqual(16)
  })
}

// Claims audit, 26 Nov: hanzoai/node is under the "Hanzo Ecosystem License ... All rights reserved" (not open source);
// Zoo is building on the network, not proven to run on it today.
test('home makes no claim the sources do not back', async ({ page }) => {
  await page.goto('/')
  const main = page.locator('main')
  await expect(main.getByText(/open[- ]source/i)).toHaveCount(0)
  await expect(main.getByText(/run on the network/i)).toHaveCount(0)
  await expect(main.getByText(/any chain/i)).toHaveCount(0)
  await expect(main.getByText(/paid only for work/i)).toHaveCount(0)
  await expect(main.getByText(/any model through one API/i)).toHaveCount(0)
  await expect(main.getByText(/bittensor/i)).toHaveCount(1) // only in the Compare block (sections.spec holds it there)
})

test('the headline enters without blur', async ({ page }) => {
  await page.clock.install() // time stands still, so we see the very first frame of the entrance
  await page.goto('/')
  const h1 = page.getByRole('heading', { level: 1 })
  await expect(h1).toBeVisible()
  // The blur sat on the block around the headline, so check the headline and every box it sits in.
  const blur = await h1.evaluate((el) => {
    for (let e: Element | null = el; e; e = e.parentElement) if (getComputedStyle(e).filter !== 'none') return getComputedStyle(e).filter
    return 'none'
  })
  expect(blur).toBe('none')
})

// Page buttons only: the floating chat launcher is a filled H mark by design, like hanzo.ai's (James liked it).
test('one filled button in the first viewport at 1440 light', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  const filled = await page.evaluate(() => {
    const probe = document.createElement('i')
    probe.className = 'bg-primary'
    document.body.append(probe)
    const primary = getComputedStyle(probe).backgroundColor
    probe.remove()
    return [...document.querySelectorAll('header a, header button, main a, main button')].filter((el) => {
      const r = el.getBoundingClientRect()
      return r.width > 0 && r.top < innerHeight && r.bottom > 0 && getComputedStyle(el).backgroundColor === primary
    }).length
  })
  expect(filled).toBe(1)
})

test('the ecosystem stack strip and third-party ecosystem links are removed from home', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('The Hanzo ecosystem', { exact: true })).toHaveCount(0)
  await expect(page.getByRole('link', { name: /Lux Network/ })).toHaveCount(0)
  await expect(page.getByRole('link', { name: /Zoo Labs/ })).toHaveCount(0)
})

test('top-left navbar uses lowercase hanzo wordmark only', async ({ page }) => {
  await page.goto('/')
  const wm = page.locator('header [data-slot="wordmark"]')
  await expect(wm).toHaveText('hanzo')
  await expect(wm.locator('svg')).toHaveCount(0)
})

// The sections the SECTIONS builder writes: they must exist, in this order, and clear the sticky nav.
const ANCHORS = ['solutions', 'network', 'how', 'phases', 'latest']

test('the sections come in the agreed order', async ({ page }) => {
  await page.goto('/')
  const order = await page.evaluate((ids) => ids.map((id) => document.getElementById(id)).map((el, i, all) => (el ? (i === 0 ? true : !!(all[i - 1]!.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING)) : false)), ANCHORS)
  expect(order).toEqual(ANCHORS.map(() => true))
})

// The nav is 57px; one scroll-padding on <html> must clear it for every anchor.
for (const hash of ANCHORS) {
  test(`#${hash} lands its content below the sticky nav`, async ({ page }) => {
    await page.goto('/')
    await page.evaluate((h) => { location.hash = h }, hash)
    const target = page.locator('#' + hash)
    const nav = (await page.locator('header').first().boundingBox())!
    await expect.poll(async () => (await target.boundingBox())!.y).toBeGreaterThanOrEqual(nav.y + nav.height - 1)
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollPaddingTop)).toBe('64px')
  })
}
