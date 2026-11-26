import { expect, test } from '@playwright/test'
import { axeViolations, failModels, serveModels } from './helpers'

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
