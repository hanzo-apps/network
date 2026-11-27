import { expect, test, type Page, type Route } from '@playwright/test'
import { axeViolations, CHAT_URL } from './helpers'

const THOUGHTS = 'PRIVATE-REASONING-TEXT'
const ANSWER = 'Proof of AI is a signed receipt for work an agent did.'
const cors = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*' }

const okBody = { choices: [{ message: { role: 'assistant', content: ANSWER, reasoning_content: THOUGHTS } }] }

/** Stands in for the public lane. Each request is recorded; `reply` decides the answer. Never reaches the real API. */
async function serveChat(page: Page, reply: (route: Route, n: number) => Promise<void> | void = (r) => r.fulfill({ json: okBody, headers: cors })) {
  const seen: { headers: Record<string, string>; body: { messages: { role: string; content: string }[] }; system: string; maxTokens: number }[] = []
  await page.route(CHAT_URL, async (route) => {
    if (route.request().method() === 'OPTIONS') return route.fulfill({ status: 204, headers: cors })
    const sent = route.request().postDataJSON() as { messages: { role: string; content: string }[]; max_tokens: number }
    // Every request opens with the system message; `body` is the conversation after it.
    expect(sent.messages[0].role).toBe('system')
    seen.push({ headers: route.request().headers(), body: { messages: sent.messages.slice(1) }, system: sent.messages[0].content, maxTokens: sent.max_tokens })
    await reply(route, seen.length)
  })
  return seen
}

const open = async (page: Page) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  // On a phone the opt-in cookie bar sits over the launcher until it is closed.
  const bar = page.getByRole('button', { name: 'Close and use essential cookies only' })
  if (await bar.isVisible()) await bar.click()
  await page.getByRole('button', { name: 'Open chat' }).click()
  return page.getByRole('textbox', { name: 'Message' })
}
const ask = async (page: Page, text: string) => {
  await page.getByRole('textbox', { name: 'Message' }).fill(text)
  await page.getByRole('button', { name: 'Ask', exact: true }).click()
}
const dialog = (page: Page) => page.getByRole('dialog', { name: 'Ask Hanzo' })

test('a question is answered in place: the question, then the answer, with no key and none of the reasoning', async ({ page }) => {
  const seen = await serveChat(page)
  await open(page)
  await ask(page, 'What is Proof of AI?')
  await expect(dialog(page).getByText('What is Proof of AI?')).toBeVisible()
  await expect(dialog(page).getByText(ANSWER)).toBeVisible()
  await expect(page.getByText(THOUGHTS)).toHaveCount(0)
  expect(await page.content()).not.toContain(THOUGHTS)
  expect(seen).toHaveLength(1)
  expect(seen[0].body).toEqual({ messages: [{ role: 'user', content: 'What is Proof of AI?' }] })
  expect(seen[0].system).toContain('You answer questions about Hanzo Network for visitors to hanzo.network.')
  expect(seen[0].maxTokens).toBe(800)
  expect(await page.content()).not.toContain('You answer questions about Hanzo Network')
  expect(seen[0].headers.authorization).toBeUndefined()
  expect(seen[0].headers.cookie).toBeUndefined()
  await expect(page.getByRole('textbox', { name: 'Message' })).toBeFocused()
  await expect(page.getByRole('textbox', { name: 'Message' })).toHaveValue('')
})

test('a follow-up carries the conversation, and only the last ten messages', async ({ page }) => {
  const seen = await serveChat(page)
  await open(page)
  for (let i = 1; i <= 7; i++) await ask(page, `question ${i}`).then(() => expect(dialog(page).getByText(ANSWER)).toHaveCount(i))
  expect(seen[1].body.messages.map((m) => m.content)).toEqual(['question 1', ANSWER, 'question 2'])
  const last = seen[6].body.messages
  expect(last).toHaveLength(10)
  expect(last[0].content).toBe(ANSWER)
  expect(last.at(-1)).toEqual({ role: 'user', content: 'question 7' })
})

test('while it thinks, the form is disabled and the wait is announced from outside any busy region', async ({ page }) => {
  let release!: () => void
  const gate = new Promise<void>((r) => (release = r))
  await serveChat(page, async (route) => {
    await gate
    await route.fulfill({ json: okBody, headers: cors })
  })
  await open(page)
  await ask(page, 'hello')
  const status = dialog(page).getByRole('status')
  await expect(status).toHaveText('Thinking…')
  await expect(status).toHaveAttribute('aria-live', 'polite')
  expect(await status.evaluate((el) => !!el.closest('[aria-busy="true"]'))).toBe(false)
  await expect(page.getByRole('textbox', { name: 'Message' })).toBeDisabled()
  await expect(page.getByRole('button', { name: 'Ask', exact: true })).toBeDisabled()
  release()
  await expect(dialog(page).getByText(ANSWER)).toBeVisible()
  await expect(status).toBeEmpty()
})

test('a failure says so, never answers, and Retry sends the same question again', async ({ page }) => {
  const seen = await serveChat(page, (route, n) =>
    n === 1 ? route.fulfill({ status: 500, body: 'boom', headers: cors }) : route.fulfill({ json: okBody, headers: cors }),
  )
  await open(page)
  await ask(page, 'Is it free? & more')
  const note = dialog(page).getByText('The chat did not answer. Try again, or continue on Hanzo Chat.')
  await expect(note).toBeVisible()
  await expect(dialog(page).getByText(ANSWER)).toHaveCount(0)
  const handoff = dialog(page).getByRole('link', { name: /Hanzo Chat/ })
  await expect(handoff.first()).toHaveAttribute('href', 'https://hanzo.chat/?q=' + encodeURIComponent('Is it free? & more'))
  await dialog(page).getByRole('button', { name: 'Retry' }).click()
  await expect(dialog(page).getByText(ANSWER)).toBeVisible()
  await expect(note).toHaveCount(0)
  expect(seen).toHaveLength(2)
  expect(seen[1].body).toEqual(seen[0].body)
})

test('too many questions says so plainly', async ({ page }) => {
  await serveChat(page, (route) => route.fulfill({ status: 429, json: { error: { message: 'limit' } }, headers: cors }))
  await open(page)
  await ask(page, 'again')
  await expect(dialog(page).getByText('Too many questions just now. Try again in a minute.')).toBeVisible()
  await expect(dialog(page).getByRole('button', { name: 'Retry' })).toBeVisible()
})

test('an answer with no text is a failure, not a blank reply', async ({ page }) => {
  await serveChat(page, (route) => route.fulfill({ json: { choices: [{ message: { content: '', reasoning_content: THOUGHTS } }] }, headers: cors }))
  await open(page)
  await ask(page, 'hello')
  await expect(dialog(page).getByText('The chat did not answer.', { exact: false })).toBeVisible()
  await expect(page.getByText(THOUGHTS)).toHaveCount(0)
})

test('no reply in 30 seconds is a failure', async ({ page }) => {
  await page.clock.install()
  await serveChat(page, () => new Promise(() => {}))
  await open(page)
  await ask(page, 'hello')
  await expect(dialog(page).getByRole('status')).toHaveText('Thinking…')
  await page.clock.fastForward(30_000)
  await expect(dialog(page).getByText('The chat did not answer.', { exact: false })).toBeVisible()
  await expect(page.getByRole('textbox', { name: 'Message' })).toBeEnabled()
})

test('closing the dialog aborts the request in flight', async ({ page }) => {
  let failed = false
  page.on('requestfailed', (r) => r.url() === CHAT_URL && (failed = true))
  await serveChat(page, () => new Promise(() => {}))
  await open(page)
  await ask(page, 'hello')
  await expect(dialog(page).getByRole('status')).toHaveText('Thinking…')
  await page.getByRole('button', { name: 'Close chat' }).click()
  await expect.poll(() => failed).toBe(true)
})

test('a question of only spaces sends nothing', async ({ page }) => {
  const seen = await serveChat(page)
  await open(page)
  await ask(page, '   ')
  await page.getByRole('textbox', { name: 'Message' }).press('Enter')
  await page.waitForTimeout(400)
  expect(seen).toEqual([])
  await expect(dialog(page).getByText(ANSWER)).toHaveCount(0)
})

test('Open in Hanzo Chat is always there: the bare site first, then the last question', async ({ page }) => {
  await serveChat(page)
  await open(page)
  const link = dialog(page).getByRole('link', { name: 'Open in Hanzo Chat' })
  await expect(link).toHaveAttribute('href', 'https://hanzo.chat')
  await ask(page, 'What is Zen?')
  await expect(dialog(page).getByText(ANSWER)).toBeVisible()
  await expect(link).toHaveAttribute('href', 'https://hanzo.chat/?q=' + encodeURIComponent('What is Zen?'))
})

test('the answer is plain text: markup in it is shown, never run', async ({ page }) => {
  await serveChat(page, (route) => route.fulfill({ json: { choices: [{ message: { content: '<img src=x onerror="window.pwned=1"> line one\nline two' } }] }, headers: cors }))
  await open(page)
  await ask(page, 'hello')
  await expect(dialog(page).getByText('<img src=x onerror="window.pwned=1"> line one')).toBeVisible()
  expect(await page.evaluate(() => (window as unknown as { pwned?: number }).pwned)).toBeUndefined()
  expect(await dialog(page).locator('img').count()).toBe(0)
})

test('Escape closes the chat and returns focus; the close button is touch-sized; the launcher is transparent monochrome', async ({ page }) => {
  await page.goto('/')
  const opener = page.getByRole('button', { name: 'Open chat' })
  expect(await opener.evaluate((el) => getComputedStyle(el).backgroundColor)).toBe('rgba(0, 0, 0, 0)')
  await opener.click()
  await expect(page.getByRole('heading', { name: 'Ask Hanzo' })).toBeVisible()
  const close = (await page.getByRole('button', { name: 'Close chat' }).boundingBox())!
  expect([close.width, close.height]).toEqual([44, 44])
  await page.keyboard.press('Escape')
  await expect(dialog(page)).toHaveCount(0)
  await expect(opener).toBeFocused()
})

test('the answer arriving moves nothing: the dialog keeps its size and nothing scrolls sideways', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 700 })
  await serveChat(page, (route) => route.fulfill({ json: { choices: [{ message: { content: 'word '.repeat(400) + 'x'.repeat(200) } }] }, headers: cors }))
  await open(page)
  await ask(page, 'long')
  await expect(dialog(page).getByText('word word', { exact: false })).toBeVisible()
  const box = (await dialog(page).boundingBox())!
  expect(box.height).toBeLessThanOrEqual(700 * 0.7 + 1)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  expect(await dialog(page).evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(true)
})

for (const colorScheme of ['dark', 'light'] as const) {
  for (const [width, height] of [[1440, 900], [375, 700]]) {
    test(`the open chat with an answer is accessible in ${colorScheme} at ${width}px (axe)`, async ({ page }) => {
      await page.emulateMedia({ colorScheme })
      await page.setViewportSize({ width, height })
      await serveChat(page)
      await open(page)
      await ask(page, 'What is Proof of AI?')
      await expect(dialog(page).getByText(ANSWER)).toBeVisible()
      expect(await axeViolations(page)).toEqual([])
    })
  }
}
