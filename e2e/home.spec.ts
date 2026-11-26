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
  await expect(page.getByText('AI rewards follow once Proof of AI passes its audits.')).toBeVisible()
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

// The globe's horizon is 60% down its 16:9 picture; the hero's last text element (the chain chip) must sit on clear sky above it (James, 26 Nov).
for (const [w, h] of [[1280, 720], [1366, 768], [1440, 900], [1920, 1080], [375, 812]]) {
  test(`hero text clears the globe's rim at ${w}x${h}`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: h })
    await page.goto('/')
    const gap = await page.evaluate(() => {
      const art = document.querySelector('.hero-art')!.getBoundingClientRect()
      const last = [...document.querySelectorAll('main section:first-of-type p')].pop()!.getBoundingClientRect()
      return art.top + 0.6 * art.height - last.bottom
    })
    expect(gap).toBeGreaterThanOrEqual(16)
  })
}

// Claims audit, 26 Nov: hanzoai/node is under the "Hanzo Ecosystem License … All rights reserved" (not open source);
// Zoo is building on the network, not proven to run on it today.
test('home makes no claim the sources do not back', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText(/open[- ]source/i)).toHaveCount(0)
  await expect(page.getByText(/run on the network/i)).toHaveCount(0)
  await expect(page.getByText(/any chain/i)).toHaveCount(0) // the old 'Any chain' token card and present-tense payout claims
  await expect(page.getByText(/paid only for work/i)).toHaveCount(0)
  await expect(page.getByText(/any model through one API/i)).toHaveCount(0)
  await expect(page.getByText('How Proof of AI is designed to work.', { exact: false })).toBeVisible()
})

test('the hero says one thing: no eyebrow, no strip, a live chain chip', async ({ page }) => {
  await page.goto('/')
  const hero = page.locator('main section').first()
  await expect(hero.getByText('Run Zen and leading models through one API today. Proof of AI is designed to reward providers only for work that is proved.')).toBeVisible()
  await expect(hero.getByText('Proof of AI', { exact: true })).toHaveCount(0)
  await expect(hero.locator('ul')).toHaveCount(0)
  await expect(hero.locator('p').filter({ hasText: 'Hanzo chain' })).toHaveText(/Live\s*·\s*Hanzo chain · block 1,052,729/)
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

test('the provider path is a real next step', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('link', { name: 'Run a node' })).toHaveAttribute('href', 'https://docs.hanzo.ai/docs/proof-of-ai/node-operator')
  await expect(page.getByRole('link', { name: 'Running a GPU fleet? Talk to us' })).toHaveAttribute('href', 'https://hanzo.ai/contact')
  await expect(page.getByText(/payout to the chain/i)).toHaveCount(0)
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

test('the stack is one quiet row of links, not four cards', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText(/four parts/i)).toHaveCount(0)
  await expect(page.getByRole('link', { name: /Lux Network/ })).toHaveAttribute('href', 'https://lux.network')
  await expect(page.getByRole('link', { name: /Zoo Labs/ })).toHaveAttribute('href', 'https://zoo.ngo')
})

test('the Token section explains "Earn twice" and keeps the spec link', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Providers keep the customer fee and, once Proof of AI is live, also earn AI.')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Read the spec' }).first()).toBeVisible()
})

test('the stack strip is named "The Hanzo ecosystem"', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('The Hanzo ecosystem', { exact: true })).toBeVisible()
  await expect(page.getByText('Part of the Hanzo stack')).toHaveCount(0)
})

// The nav is 57px; one scroll-padding on <html> must clear it for every anchor.
for (const hash of ['how', 'provide']) {
  test(`#${hash} lands its content below the sticky nav`, async ({ page }) => {
    await page.goto('/')
    await page.evaluate((h) => { location.hash = h }, hash)
    const target = page.locator('#' + hash)
    const nav = (await page.locator('header').first().boundingBox())!
    await expect.poll(async () => (await target.boundingBox())!.y).toBeGreaterThanOrEqual(nav.y + nav.height - 1)
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollPaddingTop)).toBe('64px')
  })
}
