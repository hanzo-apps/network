import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { CHAT_URL } from './helpers'

test('chat hands the question to hanzo.chat and never pretends', async ({ page }) => {
  const question = 'What is Proof of AI?'
  const apiCalls: string[] = []
  page.on('request', (r) => r.url().startsWith(CHAT_URL) && apiCalls.push(r.url()))

  await page.goto('/')
  await page.getByRole('button', { name: 'Open chat' }).click()
  const box = page.getByRole('textbox', { name: 'Message' })
  await box.fill(question)
  await box.press('Enter')

  const handoff = page.locator(`a[href^="https://hanzo.chat/?q="][href*="${encodeURIComponent(question)}"]`)
  await expect(handoff.first()).toBeVisible()
  await expect(page.getByText('trouble connecting')).toHaveCount(0)
  await expect(page.getByText('connectivity issues')).toHaveCount(0)
  expect(apiCalls).toEqual([])
})

test('the hand-off is announced, the close button is touch-sized, and the pulse stops', async ({ page }) => {
  await page.goto('/')
  const opener = page.getByRole('button', { name: 'Open chat' })
  expect(await opener.locator('span').evaluate((el) => getComputedStyle(el).animationIterationCount)).toBe('3')
  await opener.click()
  const box = page.getByRole('textbox', { name: 'Message' })
  const status = page.locator('[role="dialog"] [role="status"]')
  await expect(status).toHaveCount(1)
  await expect(status).toHaveText('')
  await box.fill('hello')
  await box.press('Enter')
  await expect(status).toHaveText('Opening in Hanzo Chat: hello')
  await box.fill('hello')
  await box.press('Enter')
  await expect(status).toHaveText('Opening in Hanzo Chat: hello')
  await expect(page.getByRole('link', { name: 'Continue in Hanzo Chat' })).toBeVisible()
  const close = (await page.getByRole('button', { name: 'Close chat' }).boundingBox())!
  expect([close.width, close.height]).toEqual([44, 44])
})

for (const colorScheme of ['light', 'dark'] as const) {
  test(`the open chat is readable in ${colorScheme} (axe)`, async ({ page }) => {
    await page.emulateMedia({ colorScheme })
    await page.goto('/')
    await page.getByRole('button', { name: 'Open chat' }).click()
    const box = page.getByRole('textbox', { name: 'Message' })
    await box.fill('hello')
    await box.press('Enter')
    const { violations } = await new AxeBuilder({ page }).include('[role="dialog"]').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()
    expect(violations.map((v) => v.id)).toEqual([])
  })
}
