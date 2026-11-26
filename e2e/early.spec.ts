import { expect, test, type Locator, type Page } from '@playwright/test'
import { axeViolations, serveChain } from './helpers'

// Both endpoints are the backend's, built elsewhere. Every test here stands in for them with page.route: nothing reaches the real API.
const VERIFY = 'https://api.hanzo.ai/v1/network/invite/verify'
const WAITLIST = 'https://api.hanzo.ai/v1/network/waitlist'
const PRIVACY = 'https://hanzo.ai/privacy'
const DISCORD = 'https://discord.gg/CJCyAsm9Vr'
const X = 'https://x.com/hanzoai'
const NODE_GUIDE = 'https://docs.hanzo.ai/docs/proof-of-ai/node-operator'
const KEY = 'hn.invite'
const CODE = 'HNZ-7K9Q2M'
const cors = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*' }

type Reply = { status?: number; json?: unknown; body?: string; abort?: boolean }
type Seen = { headers: Record<string, string>; body: unknown }
type Mock = { verify?: Reply; join?: Reply; hold?: Promise<void> }

/** Answers both endpoints as the contract says unless told otherwise. `hold` keeps every answer back until it settles. Returns what each endpoint was sent. */
async function serve(page: Page, mock: Mock = {}) {
  const seen = { verify: [] as Seen[], join: [] as Seen[] }
  const answer = (url: string, into: Seen[], reply: Reply) =>
    page.route(url, async (route) => {
      if (route.request().method() === 'OPTIONS') return route.fulfill({ status: 204, headers: cors })
      into.push({ headers: route.request().headers(), body: route.request().postDataJSON() })
      await mock.hold
      if (reply.abort) return route.abort()
      await route.fulfill({ status: reply.status ?? 200, headers: cors, ...(reply.body === undefined ? { json: reply.json ?? {} } : { body: reply.body }) })
    })
  await answer(VERIFY, seen.verify, mock.verify ?? { json: { valid: true } })
  await answer(WAITLIST, seen.join, mock.join ?? { status: 202, json: { status: 'pending' } })
  await serveChain(page)
  return seen
}

const open = async (page: Page, size?: { width: number; height: number }) => {
  if (size) await page.setViewportSize(size)
  await page.goto('/early')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  const bar = page.getByRole('button', { name: 'Close and use essential cookies only' })
  if (await bar.isVisible()) await bar.click()
}

const gate = (page: Page) => page.locator('#gate')
const queue = (page: Page) => page.locator('#queue')
const code = (page: Page) => gate(page).getByRole('textbox', { name: 'Invite code' })
const check = (page: Page) => gate(page).getByRole('button', { name: 'Check code' })
const status = (l: Locator) => l.locator('[aria-live="polite"]')
const send = async (page: Page, text: string) => {
  await code(page).fill(text)
  await check(page).click()
}

const scrollThrough = async (page: Page) => {
  await page.evaluate(async () => {
    for (let y = 0; y <= document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 30))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(500)
}

/** Presses Tab until `target` has focus: the way a keyboard visitor gets there. */
const tabTo = async (page: Page, target: Locator) => {
  for (let i = 0; i < 80; i++) {
    await page.keyboard.press('Tab')
    if (await target.evaluate((el) => el === document.activeElement)) return
  }
  throw new Error('never reached the target by Tab')
}

const sizes = [
  { width: 1440, height: 900 },
  { width: 375, height: 812 },
]

// ---------------------------------------------------------------- the page
test('the header, the gate, the queue, where invites come from, what you can do today: in that order', async ({ page }) => {
  await serve(page)
  await open(page)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Enter your invite code.')
  await expect(page.locator('main').getByText('Early access', { exact: true })).toBeVisible()
  await expect(page.locator('main')).toContainText('Early access to the network is invite-only.')
  await expect(page.getByRole('heading', { level: 2 })).toHaveText(['No code? Join the queue.', 'Where invites come from.', 'What you can do today.'])
  const top = async (l: Locator) => (await l.boundingBox())!.y
  expect(await top(page.getByRole('heading', { level: 1 }))).toBeLessThan(await top(gate(page)))
  expect(await top(gate(page))).toBeLessThan(await top(queue(page)))
  expect(await top(queue(page))).toBeLessThan(await top(page.getByRole('heading', { level: 2, name: 'Where invites come from.' })))
  await expect(page.locator('main')).toContainText('Hanzo issues invite codes.')
  const main = page.locator('main')
  await expect(main.getByRole('link', { name: 'Join the Hanzo server.' })).toHaveAttribute('href', DISCORD)
  await expect(main.getByRole('link', { name: 'Follow @hanzoai.' })).toHaveAttribute('href', X)
  await expect(page.getByRole('heading', { level: 3, name: 'Discord', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { level: 3, name: 'X', exact: true })).toBeVisible()
  await expect(main.getByRole('link', { name: 'Start building' })).toHaveAttribute('href', '/build')
  await expect(main).toContainText('Enroll a node, run tools and agents, get paid per job. Enrolling needs a registration code.')
  await expect(main.getByRole('link', { name: 'Run a node' })).toHaveAttribute('href', NODE_GUIDE)
})

test('at 1440 both cards are as wide as the card row below them', async ({ page }) => {
  await serve(page)
  await open(page, { width: 1440, height: 900 })
  const row = page.locator('section', { has: page.getByRole('heading', { level: 2, name: 'Where invites come from.' }) }).locator('ul')
  const width = async (l: Locator) => (await l.boundingBox())!.width
  const want = await width(row)
  expect(Math.abs((await width(gate(page).locator('.glass'))) - want)).toBeLessThanOrEqual(1)
  expect(Math.abs((await width(queue(page).locator('.glass'))) - want)).toBeLessThanOrEqual(1)
})

test('the gate card says how it works in three plain lines, before and after a code is accepted', async ({ page }) => {
  await serve(page)
  await open(page)
  const lines = ['Check your code here.', 'Keep it. It is not used up by checking.', 'It does not unlock anything yet.']
  const panel = gate(page).locator('aside')
  await expect(panel).toContainText('How it works')
  await expect(panel.locator('ol li')).toHaveCount(3)
  for (const [i, l] of lines.entries()) {
    await expect(panel.locator('ol li').nth(i)).toContainText(l)
    await expect(panel.locator('ol li').nth(i)).toContainText(`0${i + 1}`)
  }
  await send(page, CODE)
  await expect(gate(page)).toContainText(/code accepted/i)
  for (const l of lines) await expect(panel).toContainText(l)
})

test('the queue note sits after the form in the page order, with its own eyebrow', async ({ page }) => {
  await serve(page)
  await open(page)
  await expect(queue(page).locator('aside')).toContainText('What we store')
  await expect(queue(page).locator('aside')).toContainText('We keep your email or handle, your role and that you signed up here.')
  expect(await queue(page).evaluate((q) => !!(q.querySelector('form')!.compareDocumentPosition(q.querySelector('aside')!) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true)
})

test('Check code is the one filled button in the page content', async ({ page }) => {
  await serve(page)
  await open(page)
  const filled = page.locator('main a.bg-primary, main button.bg-primary')
  await expect(filled).toHaveCount(1)
  await expect(filled).toHaveText('Check code')
})

test('the nav and the hero say "Enter invite code" and go to /early', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('header').getByRole('link', { name: 'Enter invite code' })).toHaveAttribute('href', '/early')
})

// ---------------------------------------------------------------- the gate
test('the code input: a labelled mono box that asks for nothing from the browser', async ({ page }) => {
  await serve(page)
  await open(page)
  const input = code(page)
  await expect(input).toHaveAttribute('autocapitalize', 'characters')
  await expect(input).toHaveAttribute('autocomplete', 'off')
  await expect(input).toHaveAttribute('spellcheck', 'false')
  await expect(input).toHaveAttribute('inputmode', 'text')
  await expect(input).toHaveAttribute('placeholder', 'HNZ-______')
  expect(Number(await input.getAttribute('maxlength'))).toBeGreaterThanOrEqual(16)
  await expect(gate(page).getByText('Invite code', { exact: true }).first()).toBeVisible()
  await expect(gate(page).getByText('HNZ- and six characters.')).toBeVisible()
  expect(await input.evaluate((el) => getComputedStyle(el).fontFamily)).toMatch(/mono/i)
  await expect(status(gate(page))).toHaveText('')
})

test('empty and whitespace send nothing, keep the button on, and put focus in the input', async ({ page }) => {
  const seen = await serve(page)
  await open(page)
  await check(page).click()
  await expect(status(gate(page))).toHaveText('Enter a code.')
  await expect(code(page)).toBeFocused()
  await expect(check(page)).toBeEnabled()
  await send(page, '   ')
  await expect(status(gate(page))).toHaveText('Enter a code.')
  await expect(code(page)).toBeFocused()
  await page.waitForTimeout(300)
  expect(seen.verify).toHaveLength(0)
})

test('while checking, the input and the button are off and the status says so', async ({ page }) => {
  let release!: () => void
  const hold = new Promise<void>((r) => (release = r))
  await serve(page, { hold })
  await open(page)
  await send(page, CODE)
  await expect(status(gate(page))).toHaveText('Checking…')
  await expect(code(page)).toBeDisabled()
  await expect(check(page)).toBeDisabled()
  release()
  await expect(gate(page)).toContainText(/code accepted/i)
})

test('a valid code: the request is exactly the typed code, anonymous; the card says accepted and nothing is unlocked', async ({ page }) => {
  const seen = await serve(page)
  await open(page)
  await send(page, `  ${CODE}  `)
  await expect(gate(page)).toContainText(/code accepted/i)
  await expect(gate(page)).toContainText('This code is valid. It does not unlock anything yet.')
  await expect(gate(page).locator('svg')).toHaveCount(1)
  await expect(gate(page).getByRole('button', { name: 'Check code' })).toHaveCount(0)
  expect(seen.verify).toHaveLength(1)
  expect(seen.verify[0].body).toEqual({ code: CODE })
  expect(JSON.stringify(seen.verify[0].body)).toBe(`{"code":"${CODE}"}`)
  expect(seen.verify[0].headers.authorization).toBeUndefined()
  expect(seen.verify[0].headers.cookie).toBeUndefined()
})

test('the code is sent as typed (trimmed) and kept upper-cased in sessionStorage only; never in the URL, local storage or cookies', async ({ page }) => {
  const seen = await serve(page)
  await open(page)
  await send(page, '  hnz-7k9q2m ')
  await expect(gate(page)).toContainText(/code accepted/i)
  expect(seen.verify[0].body).toEqual({ code: 'hnz-7k9q2m' })
  expect(await page.evaluate((k) => sessionStorage.getItem(k), KEY)).toBe(CODE)
  // Other scripts on the site may keep their own session keys; none of them may hold the code.
  expect(await page.evaluate((k) => Object.entries(sessionStorage).filter(([key, v]) => key !== k && /7k9q2m/i.test(v)), KEY)).toEqual([])
  expect(await page.evaluate(() => Object.entries(localStorage).filter(([k, v]) => /invite|code/i.test(k) || /7k9q2m/i.test(v)))).toEqual([])
  expect(await page.evaluate(() => document.cookie)).not.toMatch(/HNZ/i)
  expect(page.url()).not.toMatch(/hnz|7k9q2m|code/i)
})

test('the accepted state survives a reload; "Use a different code" clears it and the input comes back empty and focused', async ({ page }) => {
  const seen = await serve(page)
  await open(page)
  await send(page, CODE)
  await expect(gate(page)).toContainText(/code accepted/i)
  await page.reload()
  await expect(gate(page)).toContainText(/code accepted/i)
  await expect(gate(page)).toContainText(CODE)
  expect(seen.verify).toHaveLength(1)
  await gate(page).getByRole('button', { name: 'Use a different code' }).click()
  expect(await page.evaluate((k) => sessionStorage.getItem(k), KEY)).toBeNull()
  await expect(code(page)).toHaveValue('')
  await expect(code(page)).toBeFocused()
  await expect(gate(page)).not.toContainText(/code accepted/i)
  await page.reload()
  await expect(code(page)).toBeVisible()
})

test('a code that is not valid: no reason, the value stays, focused and selected', async ({ page }) => {
  await serve(page, { verify: { json: { valid: false } } })
  await open(page)
  await send(page, 'HNZ-AAAAAA')
  await expect(status(gate(page))).toHaveText('That code is not valid.')
  await expect(code(page)).toHaveValue('HNZ-AAAAAA')
  await expect(code(page)).toBeFocused()
  expect(await code(page).evaluate((el: HTMLInputElement) => [el.selectionStart, el.selectionEnd])).toEqual([0, 10])
  await expect(check(page)).toBeEnabled()
  await expect(gate(page).locator('form')).not.toContainText(/accepted|expired|used|revoked|exist/i)
  expect(await page.evaluate((k) => sessionStorage.getItem(k), KEY)).toBeNull()
})

test('too many tries: 429 says to try again later', async ({ page }) => {
  await serve(page, { verify: { status: 429 } })
  await open(page)
  await send(page, CODE)
  await expect(status(gate(page))).toHaveText('Too many tries. Try again later.')
  await expect(check(page)).toBeEnabled()
  await expect(gate(page)).not.toContainText(/accepted|not valid/i)
})

for (const [name, reply] of [
  ['a 500', { status: 500, body: 'down' }],
  ['a 200 that is not JSON', { status: 200, body: '<html>proxy</html>' }],
  ['a 200 without a boolean', { status: 200, json: { valid: 'yes' } }],
  ['no answer at all', { abort: true }],
] as const) {
  test(`${name} shows neither accepted nor rejected`, async ({ page }) => {
    await serve(page, { verify: reply })
    await open(page)
    await send(page, CODE)
    await expect(status(gate(page))).toHaveText('The invite service did not answer. Try again.')
    await expect(gate(page)).not.toContainText(/accepted|not valid/i)
    await expect(check(page)).toBeEnabled()
    await expect(code(page)).toBeEnabled()
    await expect(code(page)).toHaveValue(CODE)
    expect(await page.evaluate((k) => sessionStorage.getItem(k), KEY)).toBeNull()
  })
}

test('after an unavailable answer, trying again can succeed', async ({ page }) => {
  let n = 0
  await page.route(VERIFY, (route) => {
    if (route.request().method() === 'OPTIONS') return route.fulfill({ status: 204, headers: cors })
    return route.fulfill(++n === 1 ? { status: 503, headers: cors } : { status: 200, json: { valid: true }, headers: cors })
  })
  await open(page)
  await send(page, CODE)
  await expect(status(gate(page))).toHaveText('The invite service did not answer. Try again.')
  await check(page).click()
  await expect(gate(page)).toContainText(/code accepted/i)
})

test('the gate by keyboard alone: Tab to the input, type, Enter', async ({ page }) => {
  const seen = await serve(page)
  await open(page)
  await tabTo(page, code(page))
  await page.keyboard.type(CODE)
  await page.keyboard.press('Enter')
  await expect(gate(page)).toContainText(/code accepted/i)
  expect(seen.verify[0].body).toEqual({ code: CODE })
  await tabTo(page, gate(page).getByRole('button', { name: 'Use a different code' }))
  await page.keyboard.press('Enter')
  await expect(code(page)).toBeFocused()
})

// ---------------------------------------------------------------- the queue
const ROLES = [
  ['Node operator', 'operator'],
  ['Builder', 'builder'],
  ['Holder', 'holder'],
] as const

const joinForm = (page: Page) => queue(page).locator('form')
const contact = (page: Page) => joinForm(page).locator('input:not([type=radio])')
const handleBox = (page: Page) => queue(page).getByRole('textbox', { name: 'Handle', exact: true })
/** The visible error tied to the contact input: the id in aria-describedby that ends in "error". */
const errorOf = async (page: Page) => {
  await expect(contact(page)).toHaveAttribute('aria-describedby', /error/)
  const ids = ((await contact(page).getAttribute('aria-describedby')) ?? '').split(' ')
  return queue(page).locator(`#${ids.find((i) => i.endsWith('error'))}`)
}
const submit = (page: Page) => queue(page).getByRole('button', { name: 'Join the queue' })

for (const [label, role] of ROLES) {
  test(`the queue takes an email as ${role}`, async ({ page }) => {
    const seen = await serve(page)
    await open(page)
    await expect(queue(page).getByRole('heading', { level: 2, name: 'No code? Join the queue.' })).toBeVisible()
    await expect(contact(page)).toHaveAttribute('type', 'email')
    await expect(contact(page)).toHaveAttribute('autocomplete', 'email')
    await contact(page).fill('ada@example.com')
    await queue(page).getByRole('radio', { name: label, exact: true }).check()
    await submit(page).click()
    await expect(status(queue(page))).toHaveText(/You are on the list\./)
    expect(seen.join).toHaveLength(1)
    expect(seen.join[0].body).toEqual({ email: 'ada@example.com', role, source: 'hanzo.network/early' })
    expect(seen.join[0].headers.authorization).toBeUndefined()
    await expect(joinForm(page)).toHaveCount(0)
    await expect(queue(page)).toContainText(label)
    await expect(queue(page)).toContainText('We keep your email or handle, your role and that you signed up here.')
  })

  test(`the queue takes a handle as ${role}`, async ({ page }) => {
    const seen = await serve(page)
    await open(page)
    await queue(page).getByRole('radio', { name: 'Handle', exact: true }).check()
    await expect(handleBox(page)).toBeVisible()
    await expect(contact(page)).toHaveAttribute('type', 'text')
    await expect(contact(page)).toHaveAttribute('inputmode', 'text')
    await handleBox(page).fill('Ada_9')
    await queue(page).getByRole('radio', { name: label, exact: true }).check()
    await submit(page).click()
    await expect(status(queue(page))).toHaveText(/You are on the list\./)
    expect(seen.join[0].body).toEqual({ handle: 'ada_9', role, source: 'hanzo.network/early' })
    expect(Object.keys(seen.join[0].body as object).sort()).toEqual(['handle', 'role', 'source'])
  })
}

test('the same answer for a repeat entry', async ({ page }) => {
  const seen = await serve(page)
  await open(page)
  const once = async () => {
    await contact(page).fill('ada@example.com')
    await queue(page).getByRole('radio', { name: 'Builder', exact: true }).check()
    await submit(page).click()
    await expect(status(queue(page))).toHaveText(/You are on the list\./)
    return status(queue(page)).innerText()
  }
  await expect(status(queue(page))).toHaveText('')
  const first = await once()
  await page.reload()
  const second = await once()
  expect(first).toBe(second)
  expect(second).toContain('You are on the list.')
  expect(seen.join).toHaveLength(2)
})

test('sending: the form is off and the status says so', async ({ page }) => {
  let release!: () => void
  const hold = new Promise<void>((r) => (release = r))
  await serve(page, { hold })
  await open(page)
  await contact(page).fill('ada@example.com')
  await queue(page).getByRole('radio', { name: 'Holder', exact: true }).check()
  await submit(page).click()
  await expect(status(queue(page))).toHaveText('Sending…')
  await expect(submit(page)).toBeDisabled()
  await expect(contact(page)).toBeDisabled()
  release()
  await expect(status(queue(page))).toHaveText(/You are on the list\./)
})

test('a bad email is stopped in the page, with a visible error tied to the input', async ({ page }) => {
  const seen = await serve(page)
  await open(page)
  await contact(page).fill('not-an-email')
  await queue(page).getByRole('radio', { name: 'Builder', exact: true }).check()
  await submit(page).click()
  const err = await errorOf(page)
  await expect(err).toBeVisible()
  await expect(err).toContainText('email')
  await expect(contact(page)).toHaveAttribute('aria-invalid', 'true')
  await expect(contact(page)).toBeFocused()
  await page.waitForTimeout(300)
  expect(seen.join).toHaveLength(0)
  await contact(page).fill('ada@example.com')
  await expect(contact(page)).not.toHaveAttribute('aria-invalid', 'true')
})

for (const bad of ['a', 'has space', 'bad!', 'x'.repeat(33), '']) {
  test(`a bad handle (${JSON.stringify(bad.slice(0, 12))}) is stopped in the page`, async ({ page }) => {
    const seen = await serve(page)
    await open(page)
    await queue(page).getByRole('radio', { name: 'Handle', exact: true }).check()
    await handleBox(page).fill(bad)
    await queue(page).getByRole('radio', { name: 'Builder', exact: true }).check()
    await submit(page).click()
    const err = await errorOf(page)
    await expect(err).toBeVisible()
    await expect(err).toContainText('2 to 32')
    await page.waitForTimeout(300)
    expect(seen.join).toHaveLength(0)
  })
}

test('no role chosen is stopped in the page, and nothing is pre-chosen', async ({ page }) => {
  const seen = await serve(page)
  await open(page)
  await expect(queue(page).getByRole('radio', { checked: true })).toHaveCount(1) // the Email choice only
  await expect(queue(page).getByRole('radio', { name: 'Email', exact: true })).toBeChecked()
  await expect(queue(page).locator('input[type=checkbox]')).toHaveCount(0)
  await contact(page).fill('ada@example.com')
  await submit(page).click()
  await expect(queue(page).getByRole('group', { name: 'I am a' })).toContainText('Choose a role.')
  await page.waitForTimeout(300)
  expect(seen.join).toHaveLength(0)
})

test('the queue says when there have been too many tries', async ({ page }) => {
  await serve(page, { join: { status: 429 } })
  await open(page)
  await contact(page).fill('ada@example.com')
  await queue(page).getByRole('radio', { name: 'Builder', exact: true }).check()
  await submit(page).click()
  await expect(status(queue(page))).toHaveText('Too many tries. Try again later.')
  await expect(submit(page)).toBeEnabled()
  await expect(queue(page)).not.toContainText('You are on the list.')
})

test('the queue says when it did not answer, keeps what was typed, and a retry can succeed', async ({ page }) => {
  let n = 0
  await page.route(WAITLIST, (route) => {
    if (route.request().method() === 'OPTIONS') return route.fulfill({ status: 204, headers: cors })
    return route.fulfill(++n === 1 ? { status: 500, headers: cors } : { status: 202, json: { status: 'pending' }, headers: cors })
  })
  await open(page)
  await contact(page).fill('ada@example.com')
  await queue(page).getByRole('radio', { name: 'Holder', exact: true }).check()
  await submit(page).click()
  await expect(status(queue(page))).toHaveText('The queue did not answer. Try again.')
  await expect(contact(page)).toHaveValue('ada@example.com')
  await expect(queue(page).getByRole('radio', { name: 'Holder', exact: true })).toBeChecked()
  await expect(queue(page)).not.toContainText('You are on the list.')
  await submit(page).click()
  await expect(status(queue(page))).toHaveText(/You are on the list\./)
})

test('the queue by keyboard alone: type, choose a role with the arrow keys, Enter', async ({ page }) => {
  const seen = await serve(page)
  await open(page)
  await tabTo(page, contact(page))
  await page.keyboard.type('ada@example.com')
  await tabTo(page, queue(page).getByRole('radio', { name: 'Node operator', exact: true }))
  await page.keyboard.press('ArrowRight')
  await expect(queue(page).getByRole('radio', { name: 'Builder', exact: true })).toBeChecked()
  await tabTo(page, submit(page))
  await page.keyboard.press('Enter')
  await expect(status(queue(page))).toHaveText(/You are on the list\./)
  expect(seen.join[0].body).toEqual({ email: 'ada@example.com', role: 'builder', source: 'hanzo.network/early' })
})

test('the contact choice by keyboard: arrow keys switch Email and Handle', async ({ page }) => {
  await serve(page)
  await open(page)
  await tabTo(page, queue(page).getByRole('radio', { name: 'Email', exact: true }))
  await page.keyboard.press('ArrowRight')
  await expect(queue(page).getByRole('radio', { name: 'Handle', exact: true })).toBeChecked()
  await expect(handleBox(page)).toBeVisible()
})

test('what is stored, and the Privacy link, are always visible', async ({ page }) => {
  await serve(page)
  await open(page)
  const sentence = queue(page).getByText('We keep your email or handle, your role and that you signed up here.')
  await expect(sentence).toBeVisible()
  const link = queue(page).getByRole('link', { name: 'Privacy' })
  await expect(link).toBeVisible()
  await expect(link).toHaveAttribute('href', PRIVACY)
  await contact(page).fill('ada@example.com')
  await queue(page).getByRole('radio', { name: 'Builder', exact: true }).check()
  await submit(page).click()
  await expect(status(queue(page))).toHaveText(/You are on the list\./)
  await expect(sentence).toBeVisible()
  await expect(link).toBeVisible()
})

test('exactly one live region in each form, and none of it sits inside an aria-busy element', async ({ page }) => {
  await serve(page)
  await open(page)
  await expect(gate(page).locator('[aria-live], [role=status], [role=alert], [role=log]')).toHaveCount(1)
  await expect(queue(page).locator('[aria-live], [role=status], [role=alert], [role=log]')).toHaveCount(1)
  await send(page, CODE)
  await expect(gate(page)).toContainText(/code accepted/i)
  await expect(gate(page).locator('[aria-live], [role=status], [role=alert], [role=log]')).toHaveCount(1)
  await expect(page.locator('#gate [aria-busy] [aria-live], #queue [aria-busy] [aria-live]')).toHaveCount(0)
  await contact(page).fill('nope')
  await submit(page).click()
  await expect(queue(page).locator('[aria-live], [role=status], [role=alert], [role=log]')).toHaveCount(1)
})

test('the handle: labelled Handle, with a hint; a leading @ is stripped before it is checked and sent', async ({ page }) => {
  const seen = await serve(page)
  await open(page)
  await queue(page).getByRole('radio', { name: 'Handle', exact: true }).check()
  await expect(handleBox(page)).toBeVisible()
  await expect(queue(page).getByText('Your X or Discord handle.')).toBeVisible()
  await expect(queue(page).getByText('Hanzo handle')).toHaveCount(0)
  await handleBox(page).fill('@Ada_9')
  await expect(handleBox(page)).toHaveValue('ada_9')
  await queue(page).getByRole('radio', { name: 'Holder', exact: true }).check()
  await submit(page).click()
  await expect(status(queue(page))).toHaveText(/You are on the list\./)
  expect(seen.join[0].body).toEqual({ handle: 'ada_9', role: 'holder', source: 'hanzo.network/early' })
})

test('the email box holds at most 254 characters', async ({ page }) => {
  await serve(page)
  await open(page)
  await expect(contact(page)).toHaveAttribute('maxlength', '254')
})

test('a 400 from the queue is the visitor\'s entry, not a service problem: an error on the field, focus on it, never "did not answer"', async ({ page }) => {
  await serve(page, { join: { status: 400 } })
  await open(page)
  await contact(page).fill('ada@example.com')
  await queue(page).getByRole('radio', { name: 'Builder', exact: true }).check()
  await submit(page).click()
  const err = await errorOf(page)
  await expect(err).toHaveText('Check your email or handle.')
  await expect(contact(page)).toHaveAttribute('aria-invalid', 'true')
  await expect(contact(page)).toBeFocused()
  await expect(contact(page)).toHaveValue('ada@example.com')
  await expect(queue(page)).not.toContainText(/did not answer|on the list/i)
  await expect(submit(page)).toBeEnabled()
})

test('after the queue answers, focus goes where the answer is: the confirmation, or back to the button', async ({ page }) => {
  await serve(page)
  await open(page)
  await contact(page).fill('ada@example.com')
  await queue(page).getByRole('radio', { name: 'Builder', exact: true }).check()
  await submit(page).click()
  await expect(status(queue(page))).toHaveText(/You are on the list\./)
  await expect(queue(page).locator('[tabindex="-1"]')).toBeFocused()
  await expect(queue(page).locator('[tabindex="-1"]')).toContainText('You are on the list.')
  for (const reply of [{ status: 429 }, { status: 500 }]) {
    const p = await page.context().newPage()
    await serve(p, { join: reply })
    await open(p)
    await contact(p).fill('ada@example.com')
    await queue(p).getByRole('radio', { name: 'Builder', exact: true }).check()
    await submit(p).click()
    await expect(status(queue(p))).not.toHaveText('')
    await expect(submit(p)).toBeFocused()
    await p.close()
  }
})

test('a validation error gets focus once its text and aria-invalid are on the page', async ({ page }) => {
  await serve(page)
  await open(page)
  await contact(page).fill('nope')
  await submit(page).click()
  await expect(contact(page)).toBeFocused()
  expect(await contact(page).evaluate((el) => el.getAttribute('aria-invalid') === 'true' && !!document.getElementById(el.getAttribute('aria-describedby')!.split(' ').find((i) => i.endsWith('error'))!)?.textContent)).toBe(true)
})

test('the gate input is described by its hint and its status; an accepted code moves focus to the explanation', async ({ page }) => {
  await serve(page)
  await open(page)
  const ids = ((await code(page).getAttribute('aria-describedby')) ?? '').split(' ')
  expect(ids).toHaveLength(2)
  expect(await page.evaluate((i) => document.getElementById(i[0])?.textContent, ids)).toBe('HNZ- and six characters.')
  expect(await page.evaluate((i) => document.getElementById(i[1])?.getAttribute('aria-live'), ids)).toBe('polite')
  await send(page, CODE)
  await expect(gate(page)).toContainText(/code accepted/i)
  await expect(gate(page).locator('[tabindex="-1"]')).toBeFocused()
  await expect(gate(page).locator('[tabindex="-1"]')).toContainText('This code is valid. It does not unlock anything yet.')
  expect(await status(gate(page)).evaluate((e) => e.textContent)).toBe('Code accepted')
})

test('after a reload the accepted state does not steal focus', async ({ page }) => {
  await serve(page)
  await open(page)
  await send(page, CODE)
  await expect(gate(page)).toContainText(/code accepted/i)
  await page.reload()
  await expect(gate(page)).toContainText(/code accepted/i)
  await expect(gate(page).locator('[tabindex="-1"]')).not.toBeFocused()
})

test('each form keeps the very same live-region element from idle through checking to the answer', async ({ page }) => {
  let release!: () => void
  const hold = new Promise<void>((r) => (release = r))
  await serve(page, { hold })
  await open(page)
  const live = (root: Locator) => root.locator('[aria-live]').elementHandle()
  const same = (a: Awaited<ReturnType<typeof live>>, b: Awaited<ReturnType<typeof live>>) => page.evaluate(([x, y]) => x === y && x!.isConnected, [a, b])
  const gateIdle = await live(gate(page))
  const queueIdle = await live(queue(page))
  await send(page, CODE)
  await expect(status(gate(page))).toHaveText('Checking…')
  expect(await same(gateIdle, await live(gate(page)))).toBe(true)
  await contact(page).fill('ada@example.com')
  await queue(page).getByRole('radio', { name: 'Builder', exact: true }).check()
  await submit(page).click()
  await expect(status(queue(page))).toHaveText('Sending…')
  expect(await same(queueIdle, await live(queue(page)))).toBe(true)
  release()
  await expect(gate(page)).toContainText(/code accepted/i)
  await expect(status(queue(page))).toHaveText(/You are on the list\./)
  expect(await same(gateIdle, await live(gate(page)))).toBe(true)
  expect(await same(queueIdle, await live(queue(page)))).toBe(true)
})

// ---------------------------------------------------------------- what leaves the page
/** Every request the page makes to anyone but this site and the two invite endpoints, as "url body". */
const watchOthers = (page: Page) => {
  const seen: string[] = []
  page.on('request', (r) => {
    const u = r.url()
    if (u.startsWith('http://localhost') || u === VERIFY || u === WAITLIST) return
    seen.push(`${u} ${r.postData() ?? ''}`)
  })
  return seen
}

test('no analytics or other request carries the typed code, email or handle', async ({ page }) => {
  await page.route(/api\.hanzo\.ai\/v1\/(event|project\/tags)/, (route) => (route.request().method() === 'OPTIONS' ? route.fulfill({ status: 204, headers: cors }) : route.fulfill({ status: 204, headers: cors })))
  await serve(page)
  const others = watchOthers(page)
  await open(page)
  await send(page, 'hnz-7k9q2m')
  await expect(gate(page)).toContainText(/code accepted/i)
  await contact(page).fill('secret.person@example.com')
  await queue(page).getByRole('radio', { name: 'Builder', exact: true }).check()
  await submit(page).click()
  await expect(status(queue(page))).toHaveText(/You are on the list\./)
  await page.reload()
  await queue(page).getByRole('radio', { name: 'Handle', exact: true }).check()
  await handleBox(page).fill('SecretHandle_9')
  await queue(page).getByRole('radio', { name: 'Holder', exact: true }).check()
  await submit(page).click()
  await expect(status(queue(page))).toHaveText(/You are on the list\./)
  // The stream flushes on its own cadence; wait for it, so the watch is not blind, then leave to flush the rest.
  await expect.poll(() => others.some((o) => o.includes('/v1/event')), { timeout: 15_000, message: 'the watch must see the stream, or it proves nothing' }).toBe(true)
  await page.goto('about:blank')
  await page.waitForTimeout(500)
  for (const o of others) expect(o).not.toMatch(/7k9q2m|secret\.person|secrethandle|example\.com/i)
})

test('an unexpected answer is reported as the endpoint and the status only', async ({ page }) => {
  await page.route(/api\.hanzo\.ai\/v1\/(event|project\/tags)/, (route) => route.fulfill({ status: 204, headers: cors }))
  await serve(page, { verify: { status: 503 }, join: { status: 500 } })
  const others = watchOthers(page)
  await open(page)
  await send(page, 'hnz-7k9q2m')
  await expect(status(gate(page))).toHaveText('The invite service did not answer. Try again.')
  await contact(page).fill('secret.person@example.com')
  await queue(page).getByRole('radio', { name: 'Builder', exact: true }).check()
  await submit(page).click()
  await expect(status(queue(page))).toHaveText('The queue did not answer. Try again.')
  await expect.poll(() => others.some((o) => o.includes('invite/verify answered 503'))).toBe(true)
  await expect.poll(() => others.some((o) => o.includes('waitlist answered 500'))).toBe(true)
  for (const o of others) expect(o).not.toMatch(/7k9q2m|secret\.person|example\.com/i)
})

test('a 429 or a refused entry is not reported as drift', async ({ page }) => {
  await page.route(/api\.hanzo\.ai\/v1\/(event|project\/tags)/, (route) => route.fulfill({ status: 204, headers: cors }))
  await serve(page, { verify: { status: 429 }, join: { status: 400 } })
  const others = watchOthers(page)
  await open(page)
  await send(page, CODE)
  await expect(status(gate(page))).toHaveText('Too many tries. Try again later.')
  await contact(page).fill('ada@example.com')
  await queue(page).getByRole('radio', { name: 'Builder', exact: true }).check()
  await submit(page).click()
  await expect(await errorOf(page)).toHaveText('Check your email or handle.')
  await page.goto('about:blank')
  await page.waitForTimeout(500)
  for (const o of others) expect(o).not.toMatch(/answered \d{3}/)
})

// ---------------------------------------------------------------- words
test('no sale, offer, staking, points, leaderboard, balance or date: idle, accepted and joined', async ({ page }) => {
  await serve(page)
  await open(page)
  const forbidden = /sale|presale|investment|yield|APY|stak|points|leaderboard|soon|terminal|bind|wallet|members|nothing else|an hour/i
  const main = page.locator('main')
  expect(await main.innerText()).not.toMatch(forbidden)
  await send(page, CODE)
  await expect(gate(page)).toContainText(/code accepted/i)
  await contact(page).fill('ada@example.com')
  await queue(page).getByRole('radio', { name: 'Builder', exact: true }).check()
  await submit(page).click()
  await expect(status(queue(page))).toHaveText(/You are on the list\./)
  const text = await main.innerText()
  expect(text).not.toMatch(forbidden)
  expect(text).not.toMatch(/balance|airdrop|reward|countdown|20\d\d/i)
  expect(text).not.toMatch(/\d+\s*(days?|weeks?)/i)
})

// ---------------------------------------------------------------- accessibility and layout
for (const colorScheme of ['dark', 'light'] as const) {
  for (const size of sizes) {
    test(`early is readable in ${colorScheme} at ${size.width} (axe, WCAG 2.2 AA): idle, then errors, then accepted`, async ({ page }) => {
      await serve(page, { verify: { json: { valid: false } } })
      await page.emulateMedia({ colorScheme })
      await open(page, size)
      await scrollThrough(page)
      expect(await axeViolations(page)).toEqual([])
      await send(page, 'HNZ-AAAAAA')
      await expect(status(gate(page))).toHaveText('That code is not valid.')
      await contact(page).fill('nope')
      await submit(page).click()
      await expect(contact(page)).toHaveAttribute('aria-invalid', 'true')
      expect(await axeViolations(page)).toEqual([])
      await page.unroute(VERIFY)
      await page.route(VERIFY, (route) => (route.request().method() === 'OPTIONS' ? route.fulfill({ status: 204, headers: cors }) : route.fulfill({ json: { valid: true }, headers: cors })))
      await check(page).click()
      await expect(gate(page)).toContainText(/code accepted/i)
      expect(await axeViolations(page)).toEqual([])
    })
  }
}

test('early is readable with reduced motion (axe), idle and accepted', async ({ page }) => {
  await serve(page)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await open(page)
  await scrollThrough(page)
  expect(await axeViolations(page)).toEqual([])
  await send(page, CODE)
  await expect(gate(page)).toContainText(/code accepted/i)
  expect(await axeViolations(page)).toEqual([])
})

test('at phone width nothing scrolls sideways: idle, accepted, joined', async ({ page }) => {
  await serve(page)
  await open(page, { width: 375, height: 812 })
  const wide = () => page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
  await scrollThrough(page)
  expect(await wide()).toBe(false)
  await send(page, CODE)
  await expect(gate(page)).toContainText(/code accepted/i)
  await contact(page).fill('a-rather-long-address-for-a-phone@subdomain.example-company.com')
  await queue(page).getByRole('radio', { name: 'Node operator', exact: true }).check()
  await submit(page).click()
  await expect(status(queue(page))).toHaveText(/You are on the list\./)
  await scrollThrough(page)
  expect(await wide()).toBe(false)
})

test('every link, button, input and choice in the page is at least 44px tall at phone width', async ({ page }) => {
  await serve(page)
  await open(page, { width: 375, height: 812 })
  for (const el of await page.locator('main a, main button, main input:not([type=radio]), main label:has(input[type=radio])').all()) {
    const box = (await el.boundingBox())!
    expect(box.height, await el.evaluate((e) => e.textContent || e.getAttribute('aria-label') || e.tagName)).toBeGreaterThanOrEqual(44)
  }
})
