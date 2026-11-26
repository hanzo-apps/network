import { expect, test, type Page } from '@playwright/test'
import { allowance, eraCap, netChange, position, POOL, signed, whole } from '../src/lib/supply'
import { axeViolations, serveChain, serveModels } from './helpers'

const WHITEPAPER = 'https://papers.hanzo.ai/hanzo-ai-chain/'
const WHITEPAPER_PDF = 'https://papers.hanzo.ai/pdfs/hanzo-ai-chain.pdf'
const PLANS = 'https://hanzo.ai/pricing'

const open = async (page: Page, size?: { width: number; height: number }) => {
  if (size) await page.setViewportSize(size)
  await serveChain(page)
  await serveModels(page)
  await page.goto('/economics')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
}

/** axe skips faded-in elements, so scroll the whole page first. */
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

const sizes = [
  { width: 1440, height: 900 },
  { width: 375, height: 812 },
]

for (const colorScheme of ['dark', 'light'] as const) {
  for (const size of sizes) {
    test(`economics is readable in ${colorScheme} at ${size.width} (axe, WCAG 2.2 AA)`, async ({ page }) => {
      await page.emulateMedia({ colorScheme })
      await open(page, size)
      await scrollThrough(page)
      expect(await axeViolations(page)).toEqual([])
    })
  }
}

test('economics is readable with reduced motion (axe)', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await open(page)
  await scrollThrough(page)
  expect(await axeViolations(page)).toEqual([])
})

test('the heading, the Designed notice and the two buttons', async ({ page }) => {
  await open(page)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('A hard cap of two trillion AI.')
  const notice = page.locator('main header [data-notice]')
  await expect(notice).toContainText('Designed')
  await expect(notice).toContainText('Not active. Mining and this supply policy stay disabled until governance fixes the parameters and the launch gates pass.')
  await expect(notice.getByRole('link', { name: 'Whitepaper, sections 3 and 10' })).toHaveAttribute('href', WHITEPAPER_PDF)
  await expect(page.locator('main header').getByRole('link', { name: 'Read the whitepaper' })).toHaveAttribute('href', WHITEPAPER)
  await expect(page.locator('main header').getByRole('link', { name: 'Start building' })).toHaveAttribute('href', '/build')
})

test('four supply cards, each one number and one line', async ({ page }) => {
  await open(page)
  const cards = page.locator('#supply li')
  await expect(page.locator('#supply').getByRole('heading', { level: 2 })).toHaveText('Where the two trillion sits.')
  await expect(cards).toHaveCount(4)
  const want = [
    ['2T AI', 'Maximum supply'],
    ['1T AI', 'Hanzo DAO, fixed at genesis. It can never be mined.'],
    ['1T AI', 'Earned by proved work, nothing else.'],
    ['0 AI', 'Inflation on destination chains.'],
  ]
  for (const [i, [big, line]] of want.entries()) {
    await expect(cards.nth(i).locator('p').nth(0)).toHaveText(big)
    await expect(cards.nth(i).locator('p').nth(1)).toHaveText(line)
  }
})

test('halving text, formula and burn text are the settled sentences', async ({ page }) => {
  await open(page)
  const h = page.locator('#halving')
  await expect(h.getByRole('heading', { level: 2 })).toHaveText('Each era pays half the last.')
  await expect(h).toContainText('The first era may emit at most 500 billion AI, the second 250 billion, the third 125 billion. An era is a fixed number of chain blocks set by governance, nominally four years.')
  await expect(h.locator('[data-formula]')).toHaveText('A(h) = M(1 − 2^−k) + f·M·2^−(k+1)')
  await expect(h).toContainText('M is the earned pool, 1 trillion AI')
  const b = page.locator('#burn')
  await expect(b.getByRole('heading', { level: 2 })).toHaveText('Fees are burned.')
  await expect(b).toContainText('A governed share β of settled protocol fees is burned: ΔS = issuance − β × fees. β is not set yet. As issuance halves, a steady burn can make supply fall.')
})

test('the chart has a name, eight labelled bars and the same data as a table', async ({ page }) => {
  await open(page)
  const chart = page.locator('#halving').getByRole('img', { name: /bar chart/i })
  await expect(chart).toBeVisible()
  const billions = (k: number) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 5 }).format(eraCap(k) / 1e9)
  const labels = await chart.locator('text').allTextContents()
  for (let k = 0; k < 8; k++) {
    expect(labels).toContain(`Era ${k + 1}`)
    expect(labels).toContain(billions(k))
  }
  expect(labels).toContain('500')
  expect(labels).toContain('3.90625')
  const rows = page.locator('#halving table tbody tr')
  await expect(rows).toHaveCount(8)
  for (let k = 0; k < 8; k++) {
    await expect(rows.nth(k).locator('th')).toHaveText(`Era ${k + 1}`)
    await expect(rows.nth(k).locator('td')).toHaveText(billions(k))
  }
  // The bars shrink by half each era.
  const heights = await chart.locator('rect[data-bar]').evaluateAll((els) => els.map((e) => Number(e.getAttribute('height'))))
  expect(heights).toHaveLength(8)
  for (let k = 1; k < 8; k++) expect(heights[k]).toBeCloseTo(heights[k - 1] / 2, 1)
})

test('six rules, in order, with their source', async ({ page }) => {
  await open(page)
  const r = page.locator('#rules')
  await expect(r.getByRole('heading', { level: 2 })).toHaveText('Proof earns. Hardware does not.')
  await expect(r).toContainText('A raw GPU-hour earns nothing.')
  const items = r.getByRole('listitem')
  await expect(items).toHaveCount(6)
  const want = [
    'Linked requester and provider must be declared, and can be capped or excluded.',
    'Fees and service budgets are bounded and cannot be recycled.',
    'Metering is committed and can be challenged.',
    'Copying an output without its transcript fails the challenge.',
    'Every finalized receipt uses up one global nullifier.',
    "Total payouts never exceed the era's allowance.",
  ]
  for (const [i, text] of want.entries()) await expect(items.nth(i)).toContainText(text)
  await expect(r.getByRole('link', { name: 'Whitepaper, section 5.8' })).toHaveAttribute('href', WHITEPAPER_PDF)
})

test('the comparison block is on the page, under a heading outline that does not skip', async ({ page }) => {
  await open(page)
  await expect(page.getByRole('heading', { name: 'Why proof beats votes.' })).toHaveCount(1)
  await expect(page.getByRole('table')).toHaveCount(2) // the hidden chart table and Compare
  const levels = await page.locator('main h1, main h2, main h3').evaluateAll((els) => els.map((e) => Number(e.tagName[1])))
  for (let i = 1; i < levels.length; i++) expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1)
})

// ---- calculator -----------------------------------------------------------------------------------------------

const slider = (page: Page, name: string) => page.getByRole('slider', { name })
const field = (page: Page, name: string) => page.getByRole('spinbutton', { name })
const out = (page: Page, label: string) => page.locator('#calculator dt', { hasText: new RegExp(`^${label}$`) }).locator('xpath=following-sibling::dd')

const YEARS = 'Years since activation'
const BETA = 'Share of fees burned (β)'
const FEES = 'Fees settled that year (AI)'

async function expectOutputs(page: Page, years: number, betaPct: number, feesBillions: number) {
  const { k, f } = position(years)
  const cap = eraCap(k)
  const mined = allowance(k, f)
  const year = cap / 4
  await expect(out(page, 'Era')).toHaveText(String(k + 1))
  await expect(out(page, 'Era cap')).toHaveText(`${whole(cap)} AI`)
  await expect(out(page, 'Most that could have been mined by then')).toHaveText(`${whole(mined)} AI`)
  await expect(out(page, 'Left in the pool')).toHaveText(`${whole(POOL - mined)} AI`)
  await expect(out(page, 'Most that could be issued that year')).toHaveText(`${whole(year)} AI`)
  await expect(out(page, 'Net supply change that year, at most')).toHaveText(`${signed(netChange(year, betaPct / 100, feesBillions * 1e9))} AI`)
}

test('the calculator says it is illustrative, always visible, with the Designed tag', async ({ page }) => {
  for (const size of sizes) {
    await open(page, size)
    const calc = page.locator('#calculator')
    await expect(calc.getByRole('heading', { level: 2 })).toHaveText('Try the numbers.')
    await expect(calc.getByText('Designed', { exact: true }).first()).toBeVisible()
    const note = calc.getByText("Illustrative until activation. These are upper bounds from the whitepaper's formulas with your own inputs. Real issuance depends on proved work.")
    await note.scrollIntoViewIfNeeded()
    await expect(note).toBeVisible()
    await expect(calc).toContainText('Node earnings cannot be estimated yet: reward weights are not set (whitepaper, section 3.3).')
  }
})

test('first values: nothing mined yet, whole pool left', async ({ page }) => {
  await open(page)
  await expectOutputs(page, 0, 0, 0)
  await expect(out(page, 'Era cap')).toHaveText('500,000,000,000 AI')
  await expect(out(page, 'Left in the pool')).toHaveText('1,000,000,000,000 AI')
})

test('hand-computed: 5 years, 50% burned, 100 billion in fees', async ({ page }) => {
  await open(page)
  await field(page, YEARS).fill('5')
  await field(page, BETA).fill('50')
  await field(page, FEES).fill('100')
  await expect(out(page, 'Era')).toHaveText('2')
  await expect(out(page, 'Era cap')).toHaveText('250,000,000,000 AI')
  await expect(out(page, 'Most that could have been mined by then')).toHaveText('562,500,000,000 AI')
  await expect(out(page, 'Left in the pool')).toHaveText('437,500,000,000 AI')
  await expect(out(page, 'Most that could be issued that year')).toHaveText('62,500,000,000 AI')
  await expect(out(page, 'Net supply change that year, at most')).toHaveText('+12,500,000,000 AI')
})

test('every output follows supply.ts across years, burn and fees, with a true minus when the burn wins', async ({ page }) => {
  await open(page)
  for (const [years, beta, fees] of [[0, 0, 0], [3, 100, 500], [4, 25, 40], [13, 7, 3], [28, 100, 1], [32, 100, 500]] as const) {
    await field(page, YEARS).fill(String(years))
    await field(page, BETA).fill(String(beta))
    await field(page, FEES).fill(String(fees))
    await expectOutputs(page, years, beta, fees)
  }
  await expect(out(page, 'Net supply change that year, at most')).toHaveText(/^−[\d,]+ AI$/)
})

test('keyboard only: each number is followed by its slider; arrows, Home and End move the sliders; the number follows', async ({ page }) => {
  await open(page)
  await field(page, YEARS).focus()
  await page.keyboard.press('Tab')
  await expect(slider(page, YEARS)).toBeFocused()
  for (let i = 0; i < 5; i++) await page.keyboard.press('ArrowRight')
  await expect(field(page, YEARS)).toHaveValue('5')
  await expectOutputs(page, 5, 0, 0)
  await page.keyboard.press('End')
  await expect(field(page, YEARS)).toHaveValue('32')
  await page.keyboard.press('Home')
  await expect(field(page, YEARS)).toHaveValue('0')

  await page.keyboard.press('Tab')
  await expect(field(page, BETA)).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(slider(page, BETA)).toBeFocused()
  await page.keyboard.press('End')
  await expect(field(page, BETA)).toHaveValue('100')
  await page.keyboard.press('Tab')
  await expect(field(page, FEES)).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(slider(page, FEES)).toBeFocused()
  await page.keyboard.press('ArrowRight')
  await page.keyboard.press('ArrowRight')
  await expect(field(page, FEES)).toHaveValue('2')
  await expectOutputs(page, 0, 100, 2)
  await page.keyboard.press('Shift+Tab')
  await expect(field(page, FEES)).toBeFocused()
  await page.keyboard.press('ArrowUp')
  await expect(slider(page, FEES)).toHaveValue('3')
})

test('typing keeps the slider in step, and a value out of range is not taken', async ({ page }) => {
  await open(page)
  await field(page, YEARS).fill('12')
  await expect(slider(page, YEARS)).toHaveValue('12')
  await field(page, YEARS).fill('99')
  await expect(field(page, YEARS)).toHaveAttribute('aria-invalid', 'true')
  await expectOutputs(page, 12, 0, 0)
  await field(page, YEARS).blur()
  await expect(field(page, YEARS)).toHaveValue('12')
  await expect(field(page, YEARS)).not.toHaveAttribute('aria-invalid', 'true')
  await field(page, BETA).fill('')
  await field(page, BETA).blur()
  await expect(field(page, BETA)).toHaveValue('0')
})

test('every input has a visible label, and the outputs are polite live regions', async ({ page }) => {
  await open(page)
  for (const name of [YEARS, BETA, FEES]) {
    await expect(page.locator('#calculator label', { hasText: name })).toBeVisible()
    await expect(slider(page, name)).toBeVisible()
    await expect(field(page, name)).toBeVisible()
  }
  await expect(page.locator('#calculator [aria-live="polite"]')).not.toHaveCount(0)
  await expect(page.locator('#calculator').getByText('assumes the nominal four-year era')).toBeVisible()
  // No node, hardware or staking calculator.
  await expect(page.locator('#calculator input')).toHaveCount(6)
})

// ---- words ---------------------------------------------------------------------------------------------------

test('no sale, offer, price, return, date or forbidden symbol anywhere on the page', async ({ page }) => {
  await open(page)
  const body = await page.locator('body').innerText()
  expect(body).not.toMatch(/sale|presale|investment|yield|APY|Bittensor/i)
  const main = await page.locator('main').innerText()
  expect(main).not.toMatch(/price|return|offer|invest|profit|stak(e|ing)|airdrop|\bbuy\b|\bAPR\b|points|leaderboard/i)
  expect(main).not.toMatch(/[ΨΘκ]/)
  expect(main).not.toMatch(/\$\s?\d/)
  expect(main).not.toMatch(/20\d\d/)
  expect(main).not.toMatch(/(?<![\d,])1,000,000,000(?![\d,])/)
  expect(main).not.toMatch(/Proposed|Beta|Soon/)
})

test('every status on the page is one of the three words', async ({ page }) => {
  await open(page)
  const tags = await page.locator('main span.font-mono.uppercase.rounded-full').allTextContents()
  expect(tags.length).toBeGreaterThanOrEqual(3) // notice, calculator, comparison
  for (const t of tags) expect(['Live', 'In progress', 'Designed']).toContain(t)
})

// ---- layout --------------------------------------------------------------------------------------------------

for (const colorScheme of ['dark', 'light'] as const) {
  test(`at phone width nothing scrolls sideways, in ${colorScheme}`, async ({ page }) => {
    await page.emulateMedia({ colorScheme })
    await open(page, { width: 375, height: 812 })
    await scrollThrough(page)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    // Worst case: the longest numbers.
    await field(page, YEARS).fill('0')
    await field(page, FEES).fill('500')
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  })
}

test('the pricing page points to the monthly plans on hanzo.ai', async ({ page }) => {
  await serveModels(page)
  await page.goto('/pricing')
  const line = page.locator('header p', { hasText: 'Monthly plans, Pro $15 and Max $95, are on' })
  await expect(line).toBeVisible()
  await expect(line.getByRole('link', { name: 'hanzo.ai/pricing' })).toHaveAttribute('href', PLANS)
})
