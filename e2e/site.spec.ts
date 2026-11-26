import { expect, test } from '@playwright/test'
import { CHAT_URL, MODELS_URL, RPC_TESTNET_URL, serveChain, serveModels } from './helpers'

// Nothing here may depend on the live chain or the live catalog (the link check below is the one @network test).
test.beforeEach(async ({ page }) => {
  await serveChain(page)
  await serveModels(page)
})

const PAGES = ['/', '/build', '/economics', '/ecosystem', '/pricing', '/early']

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

for (const path of ['/team', '/zen', '/contact', '/dashboard']) {
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

// The chain paths hanzo.ai never had stay with the chain: status and explorer go to their own sites, the old chain pages to our home.
for (const [path, to] of [['/status', 'https://status.hanzo.network/'], ['/explorer', 'https://explore.hanzo.network/']] as const) {
  test(`${path} goes to ${to}, not to hanzo.ai`, async ({ page }) => {
    await page.route(`${to}**`, (route) => route.fulfill({ body: 'there', contentType: 'text/html' }))
    const handoff = page.waitForRequest((r) => r.isNavigationRequest() && r.url().startsWith(to))
    await page.goto(path)
    await handoff
  })
}

for (const path of ['/blockchain', '/blockchain/anything/at/all', '/web3']) {
  test(`${path} lands on this site's home`, async ({ page }) => {
    await page.goto(path)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('The blockchain for global intelligence.')
    expect(new URL(page.url()).pathname).toBe('/')
  })
}

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
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('The blockchain for global intelligence.')
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

test('title and description say what the network is, in the page, the share tags and the twitter tags', async ({ page }) => {
  await page.goto('/')
  const title = 'Hanzo Network: the blockchain for global intelligence'
  const description = 'Run real AI workloads through one API today. Proof of AI is designed to verify open-model work on ordinary CPUs and settle it with post-quantum finality.'
  const meta = (k: string) => page.locator(`head meta[property="${k}"], head meta[name="${k}"]`).getAttribute('content')
  await expect(page).toHaveTitle(title)
  expect(await meta('description')).toBe(description)
  expect(await meta('og:title')).toBe(title)
  expect(await meta('og:description')).toBe(description)
  expect(await meta('twitter:title')).toBe(title)
  expect(await meta('twitter:description')).toBe(description)
})

test('the footer links Build, Economics, Ecosystem and Pricing, and keeps the privacy choices', async ({ page }) => {
  await page.goto('/')
  const footer = page.getByRole('contentinfo')
  await expect(footer.getByRole('link', { name: 'Build', exact: true })).toHaveAttribute('href', '/build')
  await expect(footer.getByRole('link', { name: 'Economics', exact: true })).toHaveAttribute('href', '/economics')
  await expect(footer.getByRole('link', { name: 'Ecosystem', exact: true })).toHaveAttribute('href', '/ecosystem')
  await expect(footer.getByRole('link', { name: 'Pricing', exact: true })).toHaveAttribute('href', '/pricing')
  await expect(footer.getByRole('link', { name: 'Your Privacy Choices' })).toHaveAttribute('href', '#choices')
})

// Routes the other builders write: each must draw a page with one h1 inside the shared frame.
for (const [path, h1] of [['/build', 'Start building.'], ['/economics', 'A hard cap of two trillion AI.'], ['/ecosystem', 'The ecosystem.'], ['/early', 'Early access is invite-only.']] as const) {
  test(`${path} is a page of this site with the h1 "${h1}"`, async ({ page }) => {
    await page.goto(path)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(h1)
    await expect(page.getByRole('navigation', { name: 'Main' })).toBeVisible()
    expect(new URL(page.url()).pathname).toBe(path)
  })
}

test('/pricing is still there', async ({ page }) => {
  await page.goto('/pricing')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  expect(new URL(page.url()).pathname).toBe('/pricing')
})

test('home and pricing share one models request and show the same count', async ({ page }) => {
  let asked = 0
  await page.unroute(MODELS_URL)
  await page.route(MODELS_URL, (route) => {
    asked++
    return route.fulfill({ path: 'e2e/fixtures/models.json', contentType: 'application/json' })
  })
  await page.goto('/')
  const models = page.getByRole('group', { name: 'Network telemetry' }).locator('div', { hasText: 'Models' }).locator('dd').first()
  await expect(models).toContainText('Zen')
  const onHome = Number((await models.innerText()).split('·')[0].replace(/,/g, ''))
  await page.getByRole('link', { name: 'Pricing', exact: true }).first().click() // in-app: the page does not reload
  await expect(page).toHaveURL(/\/pricing$/)
  await expect(page.getByText('models, live')).toBeVisible()
  const onPricing = Number((await page.getByText('models, live').locator('xpath=preceding-sibling::p').innerText()).replace(/,/g, ''))
  await page.waitForLoadState('networkidle')
  expect(asked).toBe(1)
  expect(onPricing).toBe(onHome)
})

const TITLES = {
  '/': 'Hanzo Network: the blockchain for global intelligence',
  '/build': 'Build on Hanzo Network',
  '/economics': 'Economics of the AI token · Hanzo Network',
  '/ecosystem': 'Ecosystem · Hanzo Network',
  '/pricing': 'Pricing · Hanzo Network',
  '/early': 'Early access · Hanzo Network',
} as const

for (const [path, title] of Object.entries(TITLES)) {
  test(`${path} has its own browser title`, async ({ page }) => {
    await page.goto(path)
    await expect(page).toHaveTitle(title)
  })
}

test('the browser title follows an in-app move between pages', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Build', exact: true }).first().click()
  await expect(page).toHaveTitle(TITLES['/build'])
  await page.getByRole('link', { name: 'Economics', exact: true }).first().click()
  await expect(page).toHaveTitle(TITLES['/economics'])
})

test('no page logs a console error or throws, with the network mocked', async ({ page }) => {
  const problems: string[] = []
  page.on('console', (m) => m.type() === 'error' && problems.push(`console.error: ${m.text()}`))
  page.on('pageerror', (e) => problems.push(`uncaught: ${e.message}`))
  await page.route((url) => url.hostname !== 'localhost', (route) => route.fulfill({ status: 204 }))
  await serveChain(page)
  await serveChain(page, RPC_TESTNET_URL)
  await serveModels(page)
  await page.route(CHAT_URL, (route) => route.fulfill({ json: { choices: [{ message: { content: 'Hello.' } }] } }))
  for (const path of Object.keys(TITLES)) {
    await page.goto(path)
    await page.waitForLoadState('networkidle')
  }
  expect(problems).toEqual([])
})

for (const path of ['/pricing', '/build']) {
  test(`${path}: Get an API key carries the visitor's id, as the /login hand-off does`, async ({ page }) => {
    await page.goto(path)
    const href = await page.getByRole('link', { name: 'Get an API key' }).last().getAttribute('href')
    const url = new URL(href!)
    expect(`${url.origin}${url.pathname}`).toBe('https://platform.hanzo.ai/api-keys')
    expect(url.searchParams.get('hz_aid')).toBeTruthy()
  })
}

// A page head must paint in the first frame: LCP on a throttled phone waited on a fade-in (26 Nov 2026).
for (const path of ['/build', '/economics', '/ecosystem', '/early', '/pricing']) {
  test(`the head of ${path} has no entrance animation`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto(path)
    await page.locator('h1').waitFor()
    // Every element the first screen shows, and every ancestor of it, is fully opaque the moment it exists.
    const faint = await page.evaluate(() => {
      const first = [document.querySelector('h1'), document.querySelector('h1 + p'), document.querySelector('main section h2')].filter(Boolean) as Element[]
      return first.flatMap((el) => {
        const bad: string[] = []
        for (let e: Element | null = el; e; e = e.parentElement) if (Number(getComputedStyle(e).opacity) < 1) bad.push(`${el.tagName} inside ${e.tagName}.${e.className}`)
        return bad
      })
    })
    expect(faint).toEqual([])
  })
}

test('the header fits at every width: a menu button below 768px, the links from 768px, and nothing touches or scrolls sideways', async ({ page }) => {
  for (const width of [640, 700, 768, 900, 1024]) {
    await page.setViewportSize({ width, height: 800 })
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    const header = page.locator('header')
    const main = header.getByRole('navigation', { name: 'Main' })
    const menu = header.getByRole('button', { name: 'Open menu' })
    const home = (await header.getByRole('link', { name: 'Hanzo Network home' }).boundingBox())!
    expect(home.height, `the name stays on one line at ${width}`).toBeLessThan(40)
    if (width < 768) {
      await expect(menu, `menu button at ${width}`).toBeVisible()
      await expect(main, `no row of links at ${width}`).toBeHidden()
    } else {
      await expect(menu, `no menu button at ${width}`).toBeHidden()
      const links = main.getByRole('link')
      const first = (await links.first().boundingBox())!
      const last = (await links.last().boundingBox())!
      const invite = (await header.getByRole('link', { name: 'Early access' }).boundingBox())!
      expect(first.x - (home.x + home.width), `room after the name at ${width}`).toBeGreaterThanOrEqual(16)
      expect(invite.x - (last.x + last.width), `room before the button at ${width}`).toBeGreaterThanOrEqual(16)
      expect(invite.x + invite.width, `the button keeps its gutter at ${width}`).toBeLessThanOrEqual(width - 32)
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth), `sideways scroll at ${width}`).toBeLessThanOrEqual(width)
  }
})
