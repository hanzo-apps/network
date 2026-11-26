import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { CHAT_URL } from './helpers'

test('chat is one form that opens hanzo.chat with the question, and calls no API', async ({ page, context }) => {
  const question = 'What is Proof of AI?'
  const apiCalls: string[] = []
  page.on('request', (r) => r.url().startsWith(CHAT_URL) && apiCalls.push(r.url()))
  await context.route('https://hanzo.chat/**', (route) => route.abort()) // nothing is sent

  await page.goto('/')
  await page.getByRole('button', { name: 'Open chat' }).click()
  const box = page.getByRole('textbox', { name: 'Message' })
  await expect(box).toHaveAttribute('name', 'q')
  await expect(box).toHaveAttribute('required', '')
  await box.fill(question)
  // The new tab's first request is the hand-off itself; it is aborted above, so nothing reaches hanzo.chat.
  const [handoff] = await Promise.all([
    context.waitForEvent('request', (r) => r.url().startsWith('https://hanzo.chat/')),
    page.getByRole('button', { name: 'Ask in Hanzo Chat (opens in a new tab)' }).click(),
  ])
  expect(handoff.url().startsWith('https://hanzo.chat/?q=')).toBe(true)
  expect(handoff.url()).toContain(encodeURIComponent(question).replace(/%20/g, '+'))
  expect(apiCalls).toEqual([])
})

test('an empty question opens nothing', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Open chat' }).click()
  let opened = false
  page.on('popup', () => (opened = true))
  await page.getByRole('button', { name: /Ask in Hanzo Chat/ }).click()
  await page.waitForTimeout(300)
  expect(opened).toBe(false)
})

test('a question of only spaces opens nothing', async ({ page, context }) => {
  const sent: string[] = []
  await context.route('https://hanzo.chat/**', (route) => {
    sent.push(route.request().url())
    return route.abort()
  })
  await page.goto('/')
  await page.getByRole('button', { name: 'Open chat' }).click()
  await page.getByRole('textbox', { name: 'Message' }).fill('   ')
  await page.getByRole('button', { name: /Ask in Hanzo Chat/ }).click()
  await page.waitForTimeout(500)
  expect(sent).toEqual([])
})

test('Escape closes the chat and returns focus; the close button is touch-sized; the pulse stops', async ({ page }) => {
  await page.goto('/')
  const opener = page.getByRole('button', { name: 'Open chat' })
  expect(await opener.locator('span').evaluate((el) => getComputedStyle(el).animationIterationCount)).toBe('3')
  await opener.click()
  await expect(page.getByRole('heading', { name: 'Ask Hanzo' })).toBeVisible()
  await expect(page.getByText('Answers come from Hanzo Chat, free, in a new tab.')).toBeVisible()
  const close = (await page.getByRole('button', { name: 'Close chat' }).boundingBox())!
  expect([close.width, close.height]).toEqual([44, 44])
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(opener).toBeFocused()
})

for (const colorScheme of ['light', 'dark'] as const) {
  test(`the open chat is readable in ${colorScheme} (axe)`, async ({ page }) => {
    await page.emulateMedia({ colorScheme })
    await page.goto('/')
    await page.getByRole('button', { name: 'Open chat' }).click()
    await page.getByRole('textbox', { name: 'Message' }).fill('hello')
    const { violations } = await new AxeBuilder({ page }).include('[role="dialog"]').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()
    expect(violations.map((v) => v.id)).toEqual([])
  })
}
