import { readFileSync } from 'node:fs'
import { expect, test, type Locator, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { failModels, serveChain, serveModels } from './helpers'
import { group, perToken, toModel } from '../src/lib/catalog'
import {
  DOCS_AGENTS, EXPLORER, HIP_0901, HIP_1334, NODE_GUIDE, POAI_BLOG, POAI_PDF, PROOFS, RELATED_WORK, WHITEPAPER, WHITEPAPER_PDF, WORK,
} from '../src/lib/links'

// Everything here belongs to the home page sections below the hero: Solutions, Pillars, How (+ Compare),
// Phases, Token, Latest, Closing. The network is mocked, so no test depends on the internet.
test.beforeEach(async ({ page }) => {
  await serveChain(page)
  await serveModels(page)
})

/** What the home page should print as the model count: distinct per-token models, aliases merged (the Pricing header's rule). */
const fixtureCount = () => {
  const raw = JSON.parse(readFileSync('e2e/fixtures/models.json', 'utf8')).data as { id: string }[]
  return group(perToken(raw.filter((r) => !r.id.endsWith(':batch')).map((r) => toModel(r as never)))).length
}

/** Scroll the whole page in steps so every reveal fires, then let the animations end (axe skips faded-in elements). */
async function scrollThrough(page: Page) {
  const h = await page.evaluate(() => document.scrollingElement!.scrollHeight)
  for (let y = 0; y <= h; y += 400) {
    await page.evaluate((top) => window.scrollTo(0, top), y)
    await page.waitForTimeout(60)
  }
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(1200)
}

/** Axe over the sections this spec owns (every section of the page after the hero). */
async function axe(page: Page) {
  await page.waitForLoadState('networkidle')
  const { violations } = await new AxeBuilder({ page })
    .include('main > section:not(:first-child)')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze()
  return violations.map((v) => `${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`)
}

const section = (page: Page, id: string) => page.locator(`section#${id}`)
const item = (root: Locator, title: string) => root.locator('li').filter({ has: root.page().getByRole('heading', { level: 3, name: title, exact: true }) })
const link = (root: Locator, name: string, href: string) => expect(root.getByRole('link', { name, exact: true })).toHaveAttribute('href', href)
const tags = (root: Locator) => root.locator('span.h-6.rounded-full')

// ---------------------------------------------------------------- Solutions
const SOLUTIONS = [
  { tag: 'Designed', title: 'Verifiable inference', link: 'Start building', href: '/build' },
  { tag: 'Designed', title: 'Mine AI with useful compute', link: 'Node operator guide', href: NODE_GUIDE },
  { tag: 'Live', title: 'Agents and metered compute', link: 'Agent docs', href: DOCS_AGENTS },
  { tag: 'Designed', title: 'Models, training and contributions', link: 'Read HIP-0901', href: HIP_0901 },
  { tag: 'Designed', title: 'Private post-quantum AI', link: 'Read the whitepaper', href: WHITEPAPER },
]

test.describe('Solutions', () => {
  test('heading, five cards, each with its tag, title and one link', async ({ page }) => {
    await page.goto('/')
    const s = section(page, 'solutions')
    await expect(s.getByText('Build a solution', { exact: true })).toBeVisible()
    await expect(s.getByRole('heading', { level: 2 })).toHaveText('Five things you can do.')
    await expect(s.locator('h3')).toHaveCount(5)
    for (const c of SOLUTIONS) {
      const card = item(s, c.title)
      await expect(card).toHaveCount(1)
      await expect(tags(card)).toHaveText(c.tag)
      await expect(card.locator('p:not(:has(span))').first()).not.toBeEmpty()
      await expect(card.getByRole('link')).toHaveCount(1)
      await link(card, c.link, c.href)
    }
  })

  test('the model count is the catalog count, and "hundreds" only while it loads or is down', async ({ page }) => {
    await page.goto('/')
    const card = item(section(page, 'solutions'), 'Verifiable inference')
    await expect(card).toContainText(`Call ${fixtureCount()} models through one OpenAI-compatible API today.`)
    await expect(card).toContainText('Proof of AI receipts are designed for open models such as Zen and are not switched on.')
    await expect(card).not.toContainText('hundreds of models')
  })

  test('when the catalog is down the card says "hundreds of models"', async ({ page }) => {
    await page.unroute('https://api.hanzo.ai/v1/models')
    await failModels(page)
    await page.goto('/')
    await expect(item(section(page, 'solutions'), 'Verifiable inference')).toContainText('Call hundreds of models through one OpenAI-compatible API today.')
  })

  test('mining is not presented as live', async ({ page }) => {
    await page.goto('/')
    const card = item(section(page, 'solutions'), 'Mine AI with useful compute')
    await expect(card).toContainText('Mining stays disabled until the launch gates pass.')
    await expect(card).toContainText('paid per job in stablecoins')
  })

  test('five cards sit in a 3 + 2 grid on desktop, one column on a phone, with even heights', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')
    const cards = section(page, 'solutions').locator('li')
    await expect(cards).toHaveCount(5)
    const box = await Promise.all([0, 1, 2, 3, 4].map((i) => cards.nth(i).boundingBox().then((b) => b!)))
    expect(Math.abs(box[0].y - box[2].y)).toBeLessThanOrEqual(1)
    expect(box[3].y).toBeGreaterThan(box[0].y + box[0].height)
    for (const i of [1, 2]) expect(Math.abs(box[i].height - box[0].height)).toBeLessThanOrEqual(1)
    expect(Math.abs(box[4].height - box[3].height)).toBeLessThanOrEqual(1)
    await page.setViewportSize({ width: 375, height: 812 })
    const x = await Promise.all([0, 1, 4].map((i) => cards.nth(i).boundingBox().then((b) => b!.x)))
    expect(new Set(x.map(Math.round)).size).toBe(1)
  })
})

// ---------------------------------------------------------------- Pillars
const PILLARS = [
  { tag: 'Live', title: 'Maximum utility per node', link: 'Node operator guide', href: NODE_GUIDE },
  { tag: 'Designed', title: 'Multi-intelligence consensus', link: 'HIP-0901', href: HIP_0901 },
  { tag: 'Designed', title: 'Sovereign per-model chains', link: 'Explorer', href: EXPLORER },
  { tag: 'In progress', title: 'Decentralized agentic commerce', link: 'Agent docs', href: DOCS_AGENTS },
  { tag: 'In progress', title: 'Self-upgrading autonomous research', link: 'HIP-1334', href: HIP_1334 },
  { tag: 'Designed', title: 'DAO goal-setting and human de-work', link: 'Work board', href: WORK },
]

test.describe('Pillars', () => {
  test('heading and six numbered rows with their tags and source links', async ({ page }) => {
    await page.goto('/')
    const s = section(page, 'network')
    await expect(s.getByText('The network', { exact: true })).toBeVisible()
    await expect(s.getByRole('heading', { level: 2 })).toHaveText('Six parts, one loop.')
    const rows = s.getByRole('list').locator('> li')
    await expect(rows).toHaveCount(6)
    for (const [i, c] of PILLARS.entries()) {
      const row = rows.nth(i)
      await expect(row.getByRole('heading', { level: 3 })).toHaveText(c.title)
      await expect(tags(row)).toHaveText(c.tag)
      await expect(row.getByRole('link')).toHaveCount(1)
      await link(row, c.link, c.href)
      await expect(row).toContainText(String(i + 1))
    }
    expect((await s.locator('ol').count())).toBe(1)
  })

  test('the flywheel is a hidden ring of six nodes with six arrows in order 1 to 6 and back to 1', async ({ page }) => {
    await page.goto('/')
    const svg = section(page, 'network').locator('svg[aria-hidden="true"]')
    await expect(svg).toHaveCount(1)
    await expect(svg.locator('[data-node]')).toHaveCount(6)
    expect(await svg.locator('[data-node]').evaluateAll((n) => n.map((e) => e.textContent?.trim()))).toEqual(['1', '2', '3', '4', '5', '6'])
    expect(await svg.locator('[data-arrow]').evaluateAll((n) => n.map((e) => e.getAttribute('data-arrow')))).toEqual(['1-2', '2-3', '3-4', '4-5', '5-6', '6-1'])
    // Strokes follow the theme: no hex or rgb colour anywhere inside it.
    const html = await svg.evaluate((e) => e.outerHTML)
    expect(html).not.toMatch(/#[0-9a-f]{3,8}\b|rgb\(|hsl\(/i)
    await expect(svg.locator('a, button, [tabindex]')).toHaveCount(0)
  })

  test('each row says one honest sentence', async ({ page }) => {
    await page.goto('/')
    const rows = section(page, 'network').getByRole('list').locator('> li')
    const says = [
      'hanzod is one Rust daemon per machine: local inference, Dev, Bot and Team backends and an optional validator. Today a node runs tools and agents and is paid per job in stablecoins.',
      'Different models on bonded nodes settle policy votes and parameter medians on chain. A vote alone can never mint.',
      'A chain per model family or domain on Lux, with its own validators. Today there is one live chain, ID 36963, with a post-quantum handshake and ML-DSA validator identities.',
      'Agents sign up with a wallet, hold a budgeted key and pay per call today. Fee burn, on-chain spend caps and a compute market are designed.',
      "Hanzo's research runtime records datasets, runs, evaluations and claims. Promotion only by beating gates frozen in advance is designed. A draft spec, partly built, not yet tied to the chain.",
      'A DAO work board for goals and bounties. No Hanzo bounties are live yet.',
    ]
    for (const [i, text] of says.entries()) await expect(rows.nth(i)).toContainText(text)
  })

  test('the vocabulary: sovereign per-model chains, never "subnet"', async ({ page }) => {
    await page.goto('/')
    const text = await page.locator('main').innerText()
    expect(text).toMatch(/sovereign/i)
    expect(text).toMatch(/per-model chains/i)
    expect(text).not.toMatch(/subnet/i)
  })

  test('one dot travels the ring every 12 seconds with motion on', async ({ page }) => {
    await page.goto('/')
    const dot = await section(page, 'network').locator('svg').evaluate((svg) =>
      svg.getAnimations({ subtree: true }).filter((a) => a.playState === 'running').map((a) => {
        const t = a.effect!.getTiming()
        return { duration: t.duration, iterations: t.iterations }
      }),
    )
    expect(dot).toEqual([{ duration: 12000, iterations: Infinity }])
  })

  test('under reduced motion the flywheel is still', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await page.waitForTimeout(500)
    const svg = section(page, 'network').locator('svg[aria-hidden="true"]')
    await expect(svg).toBeVisible()
    expect(await svg.evaluate((e) => e.getAnimations({ subtree: true }).filter((a) => a.playState === 'running').length)).toBe(0)
  })

  test('at 1440 the flywheel fills its column and stays in view, below the nav, while the six rows scroll', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')
    const s = section(page, 'network')
    const svg = s.locator('svg')
    const rows = s.locator('ol > li')
    await rows.first().scrollIntoViewIfNeeded()
    await page.waitForTimeout(600)
    const box0 = (await svg.boundingBox())!
    expect(box0.width).toBeGreaterThanOrEqual(400)
    expect(box0.width).toBeLessThanOrEqual(421)
    // Scroll until the last row is the thing on screen: the ring is still beside it.
    await rows.last().scrollIntoViewIfNeeded()
    await page.waitForTimeout(600)
    const box = (await svg.boundingBox())!
    expect(box.y).toBeGreaterThanOrEqual(56)
    expect(box.y + box.height).toBeLessThanOrEqual(900)
  })

  test('at 375 the flywheel sits above the list and is not sticky', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    const wrap = section(page, 'network').locator('svg').locator('xpath=..')
    expect(await wrap.evaluate((e) => getComputedStyle(e).position)).toBe('static')
  })

  test('the flywheel never follows the pointer', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')
    const svg = section(page, 'network').locator('svg')
    await svg.scrollIntoViewIfNeeded()
    await page.waitForTimeout(1200) // let the section's fade-in finish: only the pointer may move things from here
    const snap = () => svg.locator('[data-node]').evaluateAll((n) => n.map((e) => JSON.stringify(e.getBoundingClientRect())))
    const before = await snap()
    await page.mouse.move(10, 10)
    await page.mouse.move(700, 450, { steps: 8 })
    expect(await snap()).toEqual(before)
  })
})

// ---------------------------------------------------------------- How + Compare
test.describe('How', () => {
  test('heading, the sentence that it is a design, and the same four steps', async ({ page }) => {
    await page.goto('/')
    const s = section(page, 'how')
    await expect(s.getByRole('heading', { level: 2 })).toHaveText('How Proof of AI works.')
    await expect(s.getByText('How Proof of AI is designed to work.', { exact: false })).toBeVisible()
    await expect(s.getByText('Rewards stay off until the launch gates pass.', { exact: false })).toBeVisible()
    const steps = s.locator('ol > li')
    await expect(steps).toHaveCount(4)
    await expect(steps.locator('h3')).toHaveText(['Admit', 'Execute', 'Validate', 'Settle'])
  })

  test('"Check the math, not the machine." states the math, its limit and its source', async ({ page }) => {
    await page.goto('/')
    const s = section(page, 'how')
    await expect(s.getByRole('heading', { level: 3, name: 'Check the math, not the machine.' })).toBeVisible()
    const card = s.locator('div').filter({ has: page.getByRole('heading', { level: 3, name: 'Check the math, not the machine.' }) }).last()
    await expect(card).toContainText("About 95% of a model's forward pass is matrix multiplication, C = A·B. Redoing it costs cubic work. Checking it does not. After the provider commits C, the chain draws a random vector r, and an ordinary CPU checks A(Br) = Cr in quadratic work. A wrong product slips through with probability at most 1/p per vector, where p = 2⁶¹ − 1; two vectors bring that to at most 2⁻¹²². The committed trace frontier is about 768 bytes.")
    for (const m of ['C = A·B', 'A(Br) = Cr', '1/p', 'p = 2⁶¹ − 1', '2⁻¹²²']) await expect(s.locator('span.font-mono', { hasText: m }).first()).toBeVisible()
    await expect(s.getByText('This proves each opened product. It does not by itself prove a whole model; sampling covers the rest.')).toBeVisible()
    await link(s, 'Whitepaper, sections 5.3 and 9.2', WHITEPAPER_PDF)
    await link(s, 'Proof of AI paper', POAI_PDF)
  })
})

test.describe('Compare', () => {
  test('a Designed table of four rows, two columns, with a caption and real header cells', async ({ page }) => {
    await page.goto('/')
    const c = section(page, 'how').locator('table').locator('xpath=ancestor::div[.//h3[normalize-space()="Why proof beats votes."]][1]')
    await expect(c.getByRole('heading', { level: 3, name: 'Why proof beats votes.' })).toBeVisible()
    await expect(tags(c)).toHaveText('Designed')
    const table = c.getByRole('table')
    await expect(table).toHaveCount(1)
    expect(await table.locator('caption').textContent()).toMatch(/\S/)
    await expect(table.locator('thead th[scope="col"]')).toHaveText(['Other approaches', 'Proof of AI'])
    const rows = table.locator('tbody tr')
    await expect(rows).toHaveCount(3)
    await expect(rows.locator('td')).toHaveCount(6)
    await expect(table).not.toContainText('Idle hardware')
    await expect(rows.nth(0)).toContainText('Synthetic AI-like mining shows hardware was spent. Nobody asked for the result.')
    await expect(rows.nth(0)).toContainText('Only jobs someone requested and admitted beforehand count.')
    await expect(rows.nth(1)).toContainText('Signed GPU attestors add a new authority to trust.')
    await expect(rows.nth(1)).toContainText('Any ordinary CPU can check the work.')
    await expect(rows.nth(2)).toContainText('Validator votes are judgment. They can earn fees.')
    await expect(rows.nth(2)).toContainText('A vote alone can never mint. The math decides.')
    await link(c, 'Source: whitepaper sections 1, 2.6 and 3.4', WHITEPAPER_PDF)
  })

  test('side by side on desktop, stacked on a phone without sideways scroll', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')
    const cells = section(page, 'how').locator('table tbody tr').first().locator('td')
    const wide = await Promise.all([0, 1].map((i) => cells.nth(i).boundingBox().then((b) => b!)))
    expect(wide[1].x).toBeGreaterThan(wide[0].x + wide[0].width - 1)
    expect(Math.abs(wide[1].y - wide[0].y)).toBeLessThanOrEqual(1)

    await page.setViewportSize({ width: 375, height: 812 })
    const table = section(page, 'how').locator('table')
    await table.scrollIntoViewIfNeeded()
    const narrow = await Promise.all([0, 1].map((i) => cells.nth(i).boundingBox().then((b) => b!)))
    expect(Math.abs(narrow[1].x - narrow[0].x)).toBeLessThanOrEqual(1)
    expect(narrow[1].y).toBeGreaterThan(narrow[0].y + narrow[0].height - 1)
    expect(await table.evaluate((t) => t.scrollWidth <= t.clientWidth + 1)).toBe(true)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  })

  test('names Bittensor once, in the Compare block, with the related-work link, and nowhere else on the page', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText(/bittensor/i)).toHaveCount(1)
    expect((await page.content()).match(/bittensor/gi)).toHaveLength(1)
    const c = section(page, 'how').locator('table').locator('xpath=ancestor::div[.//h3[normalize-space()="Why proof beats votes."]][1]')
    await expect(c.getByText('Compared with validator-voted networks such as Bittensor.')).toBeVisible()
    await link(c, 'Related work, Hanzo consensus paper', RELATED_WORK)
  })
})

// ---------------------------------------------------------------- Phases
const PHASES = [
  { n: 0, tag: 'In progress', title: 'Arithmetic and wire freeze' },
  { n: 1, tag: 'Designed', title: 'Exact replay and shadow proofs' },
  { n: 2, tag: 'Designed', title: 'Optimistic Proof of AI' },
  { n: 3, tag: 'Designed', title: 'Cloud-provider pilot' },
  { n: 4, tag: 'Designed', title: 'Succinct-proof settlement' },
]

test.describe('Phases', () => {
  test('heading, lead, five phase cards, the governance line and its source', async ({ page }) => {
    await page.goto('/')
    const s = section(page, 'phases')
    await expect(s.getByText('Activation', { exact: true })).toBeVisible()
    await expect(s.getByRole('heading', { level: 2 })).toHaveText('Mining is gated in phases.')
    await expect(s.getByText('Mining stays disabled until these gates pass. No dates are promised.')).toBeVisible()
    await expect(s.locator('h3')).toHaveCount(5)
    for (const p of PHASES) {
      const card = item(s, p.title)
      await expect(card).toHaveCount(1)
      await expect(card).toContainText(`Phase ${p.n}`)
      await expect(tags(card)).toHaveText(p.tag)
    }
    await expect(s.getByText('Then governance fixes the supply parameters: activation height, halving interval and fee-burn fraction.')).toBeVisible()
    await link(s, 'Whitepaper, section 10', WHITEPAPER_PDF)
    await expect(s).not.toContainText(/\b20\d\d\b/) // no dates
  })

  test('five columns on desktop with even heights, one column on a phone', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')
    const cards = section(page, 'phases').locator('li')
    const box = await Promise.all([0, 1, 2, 3, 4].map((i) => cards.nth(i).boundingBox().then((b) => b!)))
    for (const b of box) {
      expect(Math.abs(b.y - box[0].y)).toBeLessThanOrEqual(1)
      expect(Math.abs(b.height - box[0].height)).toBeLessThanOrEqual(1)
    }
    await page.setViewportSize({ width: 375, height: 812 })
    const x = await Promise.all([0, 4].map((i) => cards.nth(i).boundingBox().then((b) => b!.x)))
    expect(Math.abs(x[0] - x[1])).toBeLessThanOrEqual(1)
  })
})

// ---------------------------------------------------------------- Token
test.describe('Token', () => {
  const token = (page: Page) => page.locator('main > section').filter({ has: page.getByRole('heading', { level: 2, name: 'Compute once. Earn twice.' }) })

  test('says Designed, keeps the three figures, links to the economics and the whitepaper', async ({ page }) => {
    await page.goto('/')
    const s = token(page)
    await expect(s.getByText('The AI token', { exact: false })).toBeVisible()
    await expect(tags(s)).toHaveText('Designed')
    await expect(s).not.toContainText('Proposed')
    await expect(s.getByText('2T AI', { exact: true })).toBeVisible()
    await expect(s.getByText('1T AI', { exact: true })).toHaveCount(2)
    await expect(s.getByText('Providers keep the customer fee and, if mining activates, may also earn AI.')).toBeVisible()
    await expect(s.getByText('Reserved for the Hanzo DAO', { exact: true })).toBeVisible()
    await expect(s).not.toContainText('Held by')
    await expect(s.getByText('Designed in the whitepaper: a 2 trillion cap, half fixed with the Hanzo DAO and half earned by proved work in halving eras. Not active yet.')).toBeVisible()
    await link(s, 'See the economics', '/economics')
    await link(s, 'Whitepaper, section 3', WHITEPAPER_PDF)
    await expect(s.getByRole('link', { name: 'Read the spec' })).toHaveCount(0)
  })
})

// ---------------------------------------------------------------- Latest
const LATEST = [
  { title: 'Hanzo AI Chain whitepaper', line: 'The design: Proof of AI, supply, activation gates.', meta: 'Working draft · 18 Aug 2026', href: WHITEPAPER },
  { title: 'Proof of AI explainer', line: 'The plain-words introduction on the Hanzo blog.', meta: '26 Jun 2026', href: POAI_BLOG },
  { title: 'HIP-0901', line: 'Proof of AI: native execution proofs. Draft proposal.', meta: 'Draft', href: HIP_0901 },
  { title: 'Formal proofs', line: "Machine-checked proofs for Hanzo's agent and ML systems. None is about Proof of AI.", meta: 'Lean and Coq', href: PROOFS },
]

test.describe('Latest', () => {
  test('four rows, each one full-row link with its line and date or status', async ({ page }) => {
    await page.goto('/')
    const s = section(page, 'latest')
    await expect(s.getByText('Latest', { exact: true })).toBeVisible()
    await expect(s.getByRole('heading', { level: 2 })).toHaveText('Read the sources.')
    await expect(s.getByRole('link')).toHaveCount(4)
    for (const r of LATEST) {
      const a = s.getByRole('link', { name: new RegExp(r.title) })
      await expect(a).toHaveAttribute('href', r.href)
      await expect(a).toContainText(r.line)
      await expect(a).toContainText(r.meta)
      expect((await a.boundingBox())!.height).toBeGreaterThanOrEqual(44)
    }
  })

  test('does not say Proof of AI is formally proved', async ({ page }) => {
    await page.goto('/')
    const s = section(page, 'latest')
    await expect(s.getByRole('link', { name: /Formal proofs/ })).toContainText('None is about Proof of AI.')
    await expect(s).not.toContainText(/formally proved|proved formally/i)
  })
})

// ---------------------------------------------------------------- Closing
test.describe('Closing', () => {
  test('one filled button to the invite, one outline button to /build', async ({ page }) => {
    await page.goto('/')
    const s = page.locator('main > section').last()
    await expect(s.getByRole('heading', { level: 2 })).toHaveText('Build on the network.')
    const invite = s.getByRole('link', { name: 'Early access', exact: true })
    const build = s.getByRole('link', { name: 'Start building', exact: true })
    await expect(invite).toHaveAttribute('href', '/early')
    await expect(build).toHaveAttribute('href', '/build')
    const bg = (l: Locator) => l.evaluate((e) => getComputedStyle(e).backgroundColor)
    const probe = await page.evaluate(() => {
      const i = document.createElement('i')
      i.className = 'bg-primary'
      document.body.append(i)
      const c = getComputedStyle(i).backgroundColor
      i.remove()
      return c
    })
    expect(await bg(invite)).toBe(probe)
    expect(await bg(build)).not.toBe(probe)
    expect((await invite.boundingBox())!.height).toBeGreaterThanOrEqual(44)
    expect((await build.boundingBox())!.height).toBeGreaterThanOrEqual(44)
    await expect(s.getByRole('link', { name: /API key|provide compute/i })).toHaveCount(0)
  })
})

// ---------------------------------------------------------------- the page as a whole
test.describe('all sections', () => {
  test('use only the three status words, and the old Doors section is gone', async ({ page }) => {
    await page.goto('/')
    const body = page.locator('main > section:not(:first-child)')
    const texts = await tags(body).allTextContents()
    expect(texts).toHaveLength(5 + 6 + 1 + 5 + 1)
    for (const t of texts) expect(['Live', 'In progress', 'Designed']).toContain(t)
    await expect(body.getByText(/\b(Proposed|Beta|Soon|Coming)\b/)).toHaveCount(0)
    await expect(page.getByText('Use the network. Or power it.')).toHaveCount(0)
    await expect(page.getByRole('heading', { level: 2 })).toContainText(['Five things you can do.', 'Six parts, one loop.', 'How Proof of AI works.', 'Mining is gated in phases.', 'Compute once. Earn twice.', 'Read the sources.', 'Build on the network.'])
  })

  test('copy has no em dashes and no hype', async ({ page }) => {
    await page.goto('/')
    const text = await page.locator('main > section:not(:first-child)').allInnerTexts()
    for (const t of text) {
      expect(t).not.toMatch(/—/)
      expect(t).not.toMatch(/revolutionary|seamless|unlock|game-chang/i)
    }
  })

  for (const hash of ['solutions', 'network', 'how', 'phases', 'latest']) {
    test(`#${hash} exists and lands below the sticky nav`, async ({ page }) => {
      await page.goto('/')
      await page.evaluate((h) => { location.hash = h }, hash)
      const target = page.locator('#' + hash)
      await expect(target).toHaveCount(1)
      const nav = (await page.locator('header').first().boundingBox())!
      await expect.poll(async () => (await target.boundingBox())!.y).toBeGreaterThanOrEqual(nav.y + nav.height - 1)
    })
  }

  for (const width of [375, 1440]) {
    test(`no sideways scroll at ${width}px, even after scrolling through`, async ({ page }) => {
      await page.setViewportSize({ width, height: 812 })
      await page.goto('/')
      await scrollThrough(page)
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    })
  }
})

// ---------------------------------------------------------------- axe: dark and light, 1440 and 375, scrolled and reduced motion
for (const scheme of ['dark', 'light'] as const) {
  for (const width of [1440, 375]) {
    test.describe(`${scheme} at ${width}`, () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width, height: 900 })
        await page.emulateMedia({ colorScheme: scheme })
      })

      test('sections are readable after scrolling through them (axe, WCAG 2.2 AA)', async ({ page }) => {
        await page.goto('/')
        await scrollThrough(page)
        expect(await axe(page)).toEqual([])
      })

      test('sections are readable with reduced motion (axe, WCAG 2.2 AA)', async ({ page }) => {
        await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' })
        await page.goto('/')
        expect(await axe(page)).toEqual([])
      })
    })
  }
}
