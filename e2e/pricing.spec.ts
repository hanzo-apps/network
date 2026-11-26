import { readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'
import { MODELS_URL, axeViolations, failModels, serveModels } from './helpers'

test('pricing is readable everywhere (axe, WCAG 2.2 AA)', async ({ page }) => {
  await serveModels(page)
  await page.goto('/pricing')
  expect(await axeViolations(page)).toEqual([])
})

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

test('a free Zen puts "free" in the headline and a $0 card', async ({ page }) => {
  await serveModels(page)
  await page.goto('/pricing')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Start free. Pay per token.')
  await expect(page.getByText('to call Zen')).toBeVisible()
  await expect(page.getByText('$0', { exact: true })).toBeVisible()
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
})

test('get started works without the catalog and never claims free', async ({ page }) => {
  await failModels(page)
  await page.goto('/pricing')
  await expect(page.locator('#start').getByRole('link', { name: 'Get an API key' })).toHaveAttribute('href', 'https://platform.hanzo.ai/api-keys')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Pay per token.')
  await expect(page.getByText('to call Zen')).toHaveCount(0)
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
  await expect(page.getByText('2 image, audio and video models are priced per second or per image; see docs.hanzo.ai.')).toBeVisible()
  await expect(page.getByRole('link', { name: 'docs.hanzo.ai' })).toHaveAttribute('href', 'https://docs.hanzo.ai')
})
