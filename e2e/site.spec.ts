import { expect, test } from '@playwright/test'

const PAGES = ['/', '/pricing']

// Hosts that answer automated requests with 403/429 although a person gets in.
// Add one only after seeing it block a bot, and say which host and why.
const BLOCKS_BOTS = [
  'x.com', // answers 403 to non-browser clients (checked 2026-11-26)
  'twitter.com', // same wall as x.com
]

for (const path of PAGES) {
  test(`every link on ${path} goes somewhere real @network`, async ({ page, request }) => {
    await page.goto(path)
    const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => (a as HTMLAnchorElement).href))
    const rawHrefs = await page.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href') ?? ''))

    const banned = [...hrefs, ...rawHrefs].filter((h) => /github\.com\/hanzoai\/network(?![.-])/.test(h))
    expect(banned, 'links to the wrong repo').toEqual([])

    const urls = [...new Set(hrefs.filter((h) => /^https?:/.test(h)))].filter(
      (h) => !BLOCKS_BOTS.includes(new URL(h).host),
    )
    const dead: string[] = []
    for (const url of urls) {
      const res = await request.get(url, { timeout: 15_000 }).catch(() => null)
      // 429 is a rate limit (github.com answers it to repeated bot requests), not a dead link.
      if (!res || (res.status() >= 400 && res.status() !== 429)) dead.push(`${res?.status() ?? 'no answer'} ${url}`)
    }
    expect(dead, 'dead links').toEqual([])
  })

  test(`${path} fits a phone (375px)`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto(path)
    await page.waitForLoadState('networkidle')
    const width = await page.evaluate(() => document.scrollingElement!.scrollWidth)
    expect(width).toBeLessThanOrEqual(375)
  })
}

for (const path of ['/team', '/zen', '/contact', '/blockchain', '/dashboard']) {
  test(`${path} redirects to hanzo.ai`, async ({ page }) => {
    // Our job ends at the hand-off: hanzo.ai may send on (e.g. /dashboard → /signup when signed out).
    const handoff = page.waitForRequest((r) => r.isNavigationRequest() && r.url().startsWith('https://hanzo.ai/'))
    await page.goto(path)
    expect(new URL((await handoff).url()).pathname.replace(/\/$/, '')).toBe(path)
  })
}

test('an unknown path hands off to hanzo.ai without drawing our page frame', async ({ page }) => {
  let drawn = false
  await page.exposeFunction('frameDrawn', () => (drawn = true))
  await page.addInitScript(() => {
    if (location.hostname !== 'localhost') return
    new MutationObserver(() => {
      if (document.querySelector('header, footer, main')) (window as unknown as { frameDrawn(): void }).frameDrawn()
    }).observe(document, { childList: true, subtree: true })
  })
  await page.route('https://hanzo.ai/**', (route) => route.fulfill({ body: 'hanzo.ai', contentType: 'text/html' }))
  const handoff = page.waitForRequest((r) => r.isNavigationRequest() && r.url().startsWith('https://hanzo.ai/'))
  await page.goto('/team')
  await handoff
  expect(drawn, 'page frame drawn before the jump').toBe(false)
})

test('footer year is current', async ({ page }) => {
  await page.goto('/')
  const footer = (await page.getByRole('contentinfo').first().innerText())
  const year = String(new Date().getFullYear())
  expect(footer).toContain(year)
  const stale = [...footer.matchAll(/©\s*(20\d\d)/g)].map((m) => m[1]).filter((y) => y !== year)
  expect(stale).toEqual([])
})

test('the Zen font ships and is used', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  expect(await page.evaluate(() => document.fonts.check('16px Zen'))).toBe(true)
  expect(await page.evaluate(() => getComputedStyle(document.body).fontFamily)).toMatch(/^"?Zen/)
})

for (const scheme of ['light', 'dark'] as const) {
  test(`the page follows the device: ${scheme}`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: scheme })
    await page.goto('/')
    const html = await page.evaluate(() => document.documentElement.classList.contains('light'))
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor)
    expect(html).toBe(scheme === 'light')
    expect(bg === 'rgb(0, 0, 0)').toBe(scheme === 'dark')
  })
}

test('the page switches when the device does', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto('/')
  await page.emulateMedia({ colorScheme: 'light' })
  await expect(page.locator('html')).toHaveClass(/light/)
})

// Route audit, 26 Nov: /original was an old copy of the home page and hanzo.ai has no such page (404), so the old home aliases stay here.
for (const path of ['/original', '/index', '/home2']) {
  test(`${path} lands on this site's home, not a hanzo.ai 404`, async ({ page }) => {
    await page.goto(path)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Provable AI compute.')
    expect(new URL(page.url()).pathname).toBe('/')
  })
}

test('share tags are absolute so link previews work off-site', async ({ page }) => {
  await page.goto('/')
  const meta = (k: string) => page.locator(`head meta[property="${k}"], head meta[name="${k}"]`).getAttribute('content')
  expect(await meta('og:image')).toBe('https://hanzo.network/og-image.png')
  expect(await meta('twitter:image')).toBe('https://hanzo.network/og-image.png')
  expect(await meta('og:url')).toBe('https://hanzo.network/')
})
