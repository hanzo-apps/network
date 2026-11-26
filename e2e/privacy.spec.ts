import { expect, test } from '@playwright/test'
import { serveChain, serveModels } from './helpers'

// Nothing here may depend on the live internet: models and chain are mocked, and the
// analytics calls are refused, so the cookie rule falls back to the opt-in (eu) bar.
test.beforeEach(async ({ page }) => {
  await serveChain(page)
  await serveModels(page)
  await page.route(/api\.hanzo\.ai\/v1\/(event|project\/tags)/, (route) => route.abort())
})

for (const path of ['/', '/pricing']) {
  test(`${path} has Your Privacy Choices in the footer, and it opens the cookie sheet`, async ({ page }) => {
    await page.goto(path)
    const link = page.getByRole('contentinfo').getByRole('link', { name: 'Your Privacy Choices' })
    await expect(link).toHaveAttribute('href', '#choices')
    await link.click()
    await expect(page.getByRole('dialog', { name: /cookie|privacy/i })).toBeVisible()
  })

  test(`${path} links nowhere to hanzo.id`, async ({ page }) => {
    await page.goto(path)
    await page.waitForLoadState('networkidle')
    const hrefs = await page.$$eval('a[href], form[action]', (els) =>
      els.map((e) => e.getAttribute('href') ?? e.getAttribute('action') ?? ''),
    )
    expect(hrefs.length).toBeGreaterThan(0)
    expect(hrefs.filter((h) => /(^|[/.@])hanzo\.id\b/.test(h))).toEqual([])
  })
}

test('with no answer from cloud, the opt-in cookie bar appears', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('button', { name: 'Accept all' })).toBeVisible({ timeout: 5_000 })
})

for (const path of ['/login', '/signup']) {
  test(`${path} goes to hanzo.ai/login carrying the visitor's id`, async ({ page }) => {
    await page.route('https://hanzo.ai/**', (route) => route.fulfill({ body: 'hanzo.ai', contentType: 'text/html' }))
    const handoff = page.waitForRequest((r) => r.isNavigationRequest() && r.url().startsWith('https://hanzo.ai/'))
    await page.goto(path)
    const url = new URL((await handoff).url())
    expect(url.pathname).toBe('/login')
    expect(url.searchParams.get('hz_aid')).toBeTruthy()
  })
}
