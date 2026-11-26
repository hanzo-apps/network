import { expect, test } from '@playwright/test'
import { axeViolations, serveChain } from './helpers'

test('home is readable everywhere (axe, WCAG 2.2 AA)', async ({ page }) => {
  await page.goto('/')
  expect(await axeViolations(page)).toEqual([])
})

test('home has one primary action and a compute path', async ({ page }) => {
  await page.goto('/')
  const key = page.getByRole('link', { name: 'Get an API key', exact: true })
  await expect(key.first()).toHaveAttribute('href', 'https://platform.hanzo.ai/api-keys')
  await expect(page.getByRole('link', { name: 'Provide compute' }).or(page.getByRole('button', { name: 'Provide compute' })).first()).toBeVisible()
})

test('home shows the live network heartbeat', async ({ page }) => {
  await serveChain(page)
  await page.goto('/')
  await expect(page.getByText('1,052,729').first()).toBeVisible()
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
  await expect(page.locator('canvas')).toHaveCount(0)
})
