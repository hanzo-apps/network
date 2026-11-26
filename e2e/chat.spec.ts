import { expect, test } from '@playwright/test'
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
