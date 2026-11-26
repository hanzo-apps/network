import { readFileSync } from 'node:fs'
import { expect, test, type Page } from '@playwright/test'
import { axeViolations, failModels, serveModels } from './helpers'

const MAINNET = 'https://api.hanzo.network/v1/bc/hanzo/rpc'
const TESTNET = 'https://api.hanzo-test.network/v1/bc/hanzo/rpc'

const CLAUDE = 'claude mcp add --scope user hanzo -- npx -y hanzo mcp'
const CODEX = 'codex mcp add hanzo -- npx -y hanzo mcp'
const CURSOR = `{
  "mcpServers": {
    "hanzo": {
      "command": "npx",
      "args": ["-y", "hanzo", "mcp"]
    }
  }
}`
const HOSTED = 'claude mcp add --transport http hanzo-cloud https://api.hanzo.ai/v1/mcp'
const CHAIN_CURL = `curl -s -X POST ${MAINNET} -H 'content-type: application/json' -d '{"jsonrpc":"2.0","id":1,"method":"eth_blockNumber","params":[]}'`
const QUICKSTART = `curl https://api.hanzo.ai/v1/chat/completions \\
  -H "Authorization: Bearer $HANZO_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"hanzo/zen","messages":[{"role":"user","content":"Hello"}]}'`

// The two chains answer different heights so each cell is told apart.
const MAIN_HEIGHT = 0x101039
const TEST_HEIGHT = 0xff6c3
type Answer = number | 'down'
const serveRpc = async (page: Page, main: Answer = MAIN_HEIGHT, test: Answer = TEST_HEIGHT) => {
  for (const [url, h] of [[MAINNET, main], [TESTNET, test]] as const) {
    await page.route(url, (route) =>
      h === 'down'
        ? route.fulfill({ status: 500, body: 'down' })
        : route.fulfill({ json: { jsonrpc: '2.0', id: 1, result: '0x' + h.toString(16) } }),
    )
  }
}
const fmt = (n: number) => n.toLocaleString('en-US')

const open = async (page: Page, main?: Answer, test?: Answer) => {
  await serveRpc(page, main, test)
  await serveModels(page)
  await page.goto('/build')
}

const row = (page: Page, name: string) =>
  page.locator('#network').getByRole('row').filter({ has: page.getByRole('rowheader', { name, exact: true }) })

test('the h1 and the sub line', async ({ page }) => {
  await open(page)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Start building.')
  await expect(page.getByText('Connect your agent, point it at the network, make a call.')).toBeVisible()
})

test('four connect blocks put the exact command on the clipboard', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await open(page)
  const agent = page.locator('#agent')
  await expect(agent.getByRole('heading', { level: 2, name: 'Connect your agent first.' })).toBeVisible()
  await expect(agent.getByText("Hanzo's MCP server gives your coding agent Hanzo's tools and docs.")).toBeVisible()
  for (const [i, [label, text]] of [
    ['Claude Code', CLAUDE],
    ['Codex', CODEX],
    ['Cursor and other MCP clients', CURSOR],
    ['Hosted, needs sign-in', HOSTED],
  ].entries()) {
    await expect(agent.getByText(label, { exact: true }).first()).toBeVisible()
    await expect(agent.getByLabel(label, { exact: true })).toHaveText(text)
    await expect(agent.getByRole('button', { name: `Copy ${label}`, exact: true })).toBeVisible()
    const button = agent.locator('button').nth(i)
    await button.click()
    await expect(button).toHaveText('Copied')
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(text)
  }
})

test('copy announces Copied in a live region', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await open(page)
  await page.locator('#agent').getByRole('button', { name: 'Copy Codex', exact: true }).click()
  const live = page.locator('#agent [aria-live="polite"]').filter({ hasText: 'Copied' })
  await expect(live).toHaveCount(1)
  await expect(live).toHaveText('Copied')
  await expect(live).toHaveCount(0, { timeout: 5000 })
})

test('agent links go where they say', async ({ page }) => {
  await open(page)
  const agent = page.locator('#agent')
  await expect(agent.getByRole('link', { name: 'hanzo.network/llms.txt' })).toHaveAttribute('href', '/llms.txt')
  await expect(agent.getByRole('link', { name: 'docs.hanzo.ai/llms.txt' })).toHaveAttribute('href', 'https://docs.hanzo.ai/llms.txt')
  await expect(agent.getByRole('link', { name: 'docs.hanzo.ai/llms-full.txt' })).toHaveAttribute('href', 'https://docs.hanzo.ai/llms-full.txt')
  await expect(agent.getByRole('link', { name: 'MCP docs' })).toHaveAttribute('href', 'https://docs.hanzo.ai/docs/mcp/')
})

test('network table: values, links and copy', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await open(page)
  const net = page.locator('#network')
  await expect(net.getByRole('heading', { level: 2, name: 'Network details.' })).toBeVisible()
  await expect(net.getByRole('table').getByRole('columnheader')).toHaveText(['Detail', 'Mainnet', 'Testnet', 'Devnet'])
  await expect(row(page, 'RPC')).toContainText(MAINNET)
  await expect(row(page, 'RPC')).toContainText(TESTNET)
  await expect(row(page, 'RPC')).toContainText('Local: hanzod --network devnet')
  await expect(row(page, 'RPC').getByRole('link', { name: 'needs a committee file, see the node README' })).toHaveAttribute('href', 'https://github.com/hanzoai/node')
  await expect(row(page, 'Chain ID').getByRole('cell')).toHaveText(['36963', '36962', '36964'], { useInnerText: true })
  await expect(row(page, 'Currency').getByRole('cell')).toHaveText(['AI', '—', '—'], { useInnerText: true })
  await expect(net.getByText("AI is the chain's native coin. The 2 trillion cap and mining policy are designed and not active.")).toBeVisible()
  await expect(net.getByRole('link', { name: 'Economics', exact: true })).toHaveAttribute('href', '/economics')
  await expect(row(page, 'Explorer').getByRole('link', { name: 'explore.hanzo.network' })).toHaveAttribute('href', 'https://explore.hanzo.network')
  await expect(row(page, 'Explorer').getByRole('cell').nth(1)).toContainText('—')
  await expect(row(page, 'Explorer').getByRole('cell').nth(2)).toContainText('—')
  const docs = row(page, 'Docs').getByRole('link')
  await expect(docs).toHaveCount(3)
  await expect(docs.nth(0)).toHaveAttribute('href', 'https://docs.hanzo.ai/docs/network')
  await expect(docs.nth(1)).toHaveAttribute('href', 'https://docs.hanzo.ai/docs/network')
  await expect(docs.nth(2)).toHaveAttribute('href', 'https://docs.hanzo.ai/docs/proof-of-ai/node-operator')
  await expect(net.getByRole('link', { name: 'Platform status' })).toHaveAttribute('href', 'https://status.hanzo.network')
  for (const [name, text] of [['Copy mainnet RPC', MAINNET], ['Copy testnet RPC', TESTNET]]) {
    await net.getByRole('button', { name, exact: true }).click()
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(text)
  }
})

test('run a validator: one copyable command, its status and the node repo', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await open(page)
  const v = page.locator('#network')
  await expect(v.getByRole('heading', { level: 3, name: 'Run a validator.' })).toBeVisible()
  const block = v.locator('div').filter({ has: v.getByRole('heading', { level: 3, name: 'Run a validator.' }) }).last()
  await expect(block.getByText('In progress', { exact: true })).toBeVisible()
  await expect(block).toContainText('Opts this machine in: hanzod fetches, verifies and starts the chain as a child process. Works with mainnet, testnet or devnet; hanzo chain status shows where it stands and hanzo chain down opts out. Mining rewards stay off until the launch gates pass.')
  await expect(v.getByLabel('Run a validator', { exact: true })).toHaveText('hanzo chain up testnet')
  await expect(block.getByRole('link', { name: 'Node on GitHub', exact: true })).toHaveAttribute('href', 'https://github.com/hanzoai/node')
  await v.getByRole('button', { name: 'Copy Run a validator', exact: true }).click()
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('hanzo chain up testnet')
})

test('latest block is live for mainnet and testnet and local for devnet', async ({ page }) => {
  await open(page)
  const cells = row(page, 'Latest block').getByRole('cell')
  await expect(cells.nth(0)).toContainText(fmt(MAIN_HEIGHT))
  await expect(cells.nth(1)).toContainText(fmt(TEST_HEIGHT))
  await expect(cells.nth(2)).toContainText('local')
})

test('latest block says unavailable when a chain is down, and the other stays live', async ({ page }) => {
  await open(page, MAIN_HEIGHT, 'down')
  const cells = row(page, 'Latest block').getByRole('cell')
  await expect(cells.nth(0)).toContainText(fmt(MAIN_HEIGHT))
  await expect(cells.nth(1)).toContainText('unavailable')
  await expect(cells.nth(2)).toContainText('local')
})

test('latest block is an empty reserved cell while loading, and does not change height when it fills', async ({ page }) => {
  let release!: () => void
  const gate = new Promise<void>((r) => (release = r))
  for (const [url, h] of [[MAINNET, MAIN_HEIGHT], [TESTNET, TEST_HEIGHT]] as const) {
    await page.route(url, async (route) => {
      await gate
      await route.fulfill({ json: { jsonrpc: '2.0', id: 1, result: '0x' + h.toString(16) } })
    })
  }
  await page.goto('/build')
  const mainnet = row(page, 'Latest block').getByRole('cell').nth(0)
  await expect(mainnet).toBeVisible()
  await expect(mainnet).not.toContainText(/\d/)
  const before = (await mainnet.boundingBox())!.height
  expect(before).toBeGreaterThan(20)
  release()
  await expect(mainnet).toContainText(fmt(MAIN_HEIGHT))
  expect(Math.abs((await mainnet.boundingBox())!.height - before)).toBeLessThanOrEqual(1)
})

test('make a call: the shared quickstart, the chain read, and the one filled button', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await open(page)
  const call = page.locator('#call')
  await expect(call.getByRole('heading', { level: 2, name: 'Make a call.' })).toBeVisible()
  await call.getByRole('button', { name: 'Copy curl command', exact: true }).click()
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(QUICKSTART)
  await expect(call.getByText('Read the chain, no key needed', { exact: true }).first()).toBeVisible()
  await call.getByRole('button', { name: 'Copy Read the chain, no key needed', exact: true }).click()
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(CHAIN_CURL)
  const key = call.getByRole('link', { name: 'Get an API key' })
  await expect(key).toHaveAttribute('href', /^https:\/\/platform\.hanzo\.ai\/api-keys\?hz_aid=/)
  await expect(key).toHaveClass(/bg-primary/)
  await expect(page.locator('main a.bg-primary, main button.bg-primary')).toHaveCount(1)
})

test('the shared quickstart does not point at models listed "below" on a page that lists none', async ({ page }) => {
  await open(page)
  const call = page.locator('#call')
  await expect(call).not.toContainText(/\bbelow\b/)
  await expect(call).toContainText('Swap the model name to use any chat model.')
  await expect(call).toContainText('Each request is billed per token.')
})

test('the See all prices link in the shared quickstart points at the pricing page', async ({ page }) => {
  await open(page)
  await expect(page.locator('#call').getByRole('link', { name: 'See all prices' })).toHaveAttribute('href', '/pricing#models')
})

test('the three earn cards, their tags and links', async ({ page }) => {
  await open(page)
  const earn = page.locator('#earn')
  await expect(earn.getByRole('heading', { level: 2, name: 'What builders can earn.' })).toBeVisible()
  await expect(earn.getByText('For builders', { exact: true })).toBeVisible()
  const cards = earn.getByRole('listitem')
  await expect(cards).toHaveCount(3)
  const expected = [
    ['In progress', 'Open-source payouts', 'https://docs.hanzo.ai/docs/proof-of-ai/oss-payouts'],
    ['In progress', 'Author royalty', 'https://hips.hanzo.ai/docs/hip-1000-author-royalty'],
    ['Live', 'Referrals', 'https://docs.hanzo.ai/docs/referrals'],
  ]
  for (const [i, [tag, title, href]] of expected.entries()) {
    const card = cards.nth(i)
    await expect(card.getByText(tag, { exact: true })).toBeVisible()
    await expect(card.getByRole('heading', { level: 3 })).toHaveText(title)
    await expect(card.getByRole('link')).toHaveAttribute('href', href)
  }
  await expect(cards.nth(1)).toContainText('Prove you control a repository and accrue a royalty on what others spend running projects built from it. Tracked in a ledger; payouts are settled by hand today.')
  await expect(earn.getByText(/\d+%/)).toHaveCount(1) // only the referral share; the royalty figure is not on HIP-1000's public page
  await expect(earn.getByText('Rewards in AI for builders are not designed yet. Mining rewards are for proved compute.')).toBeVisible()
  await expect(earn.getByRole('link', { name: 'Activation phases' })).toHaveAttribute('href', '/#phases')
})

test('no wrong words anywhere', async ({ page }) => {
  await open(page)
  const text = await page.locator('main').innerText()
  expect(text).not.toContain('docs.hanzo.ai/mcp')
  expect(text).not.toMatch(/fabric/i)
  expect(text).not.toMatch(/bittensor/i)
  expect(text).not.toMatch(/\d+\+? (MCP )?tools/i)
  expect(text).not.toMatch(/Proposed|Beta|Soon/)
  await expect(page.locator('a[href="https://docs.hanzo.ai/mcp"]')).toHaveCount(0)
})

test('/llms.txt is served', async ({ page }) => {
  const res = await page.request.get('/llms.txt')
  expect(res.status()).toBe(200)
  const body = await res.text()
  expect(body).toContain('## Agent Instructions')
  expect(body).toBe(readFileSync('public/llms.txt', 'utf8'))
})

test('the page has its own title and keeps the site description (Shell sets the title, index.html the description)', async ({ page }) => {
  await open(page)
  await expect(page).toHaveTitle('Build on Hanzo Network')
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /\S/)
})

for (const colorScheme of ['dark', 'light'] as const) {
  for (const [width, height] of [[1440, 900], [375, 812]]) {
    test(`axe: build is readable at ${width} in ${colorScheme}`, async ({ page }) => {
      await page.setViewportSize({ width, height })
      await page.emulateMedia({ colorScheme })
      await open(page)
      await expect(page.getByText(fmt(MAIN_HEIGHT)).first()).toBeVisible()
      // axe skips faded-in blocks: scroll down and back so every Reveal has played.
      await page.evaluate(async () => {
        for (let y = 0; y <= document.body.scrollHeight; y += 400) {
          window.scrollTo(0, y)
          await new Promise((r) => setTimeout(r, 40))
        }
        window.scrollTo(0, 0)
      })
      await page.waitForTimeout(500)
      expect(await axeViolations(page)).toEqual([])
    })
  }
}

test('axe: build is readable under reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await open(page)
  await expect(page.getByText(fmt(MAIN_HEIGHT)).first()).toBeVisible()
  expect(await axeViolations(page)).toEqual([])
})

test('axe: build with both chains down', async ({ page }) => {
  await open(page, 'down', 'down')
  await expect(page.getByText('unavailable').first()).toBeVisible()
  expect(await axeViolations(page)).toEqual([])
})

test('at 375 nothing scrolls sideways and the code scrolls inside its own box', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await open(page)
  await expect(page.getByText(fmt(MAIN_HEIGHT)).first()).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0)
  // the longest command is wider than the phone and scrolls in its own pre
  const pre = page.locator('#agent').getByLabel('Hosted, needs sign-in', { exact: true })
  expect(await pre.evaluate((el) => el.scrollWidth > el.clientWidth)).toBe(true)
  expect((await pre.boundingBox())!.width).toBeLessThanOrEqual(375)
})

test('every Copy button is at least 44px tall; the button never sits on top of the command', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await open(page)
  const buttons = page.getByRole('button', { name: /^Copy / })
  expect(await buttons.count()).toBe(9) // four connect, two RPC, the validator command, quickstart, chain read
  for (let i = 0; i < 9; i++) expect((await buttons.nth(i).boundingBox())!.height).toBeGreaterThanOrEqual(44)
  for (const label of ['Claude Code', 'Codex', 'Hosted, needs sign-in']) {
    const copy = (await page.getByRole('button', { name: `Copy ${label}`, exact: true }).boundingBox())!
    const code = (await page.getByLabel(label, { exact: true }).boundingBox())!
    expect(copy.y + copy.height).toBeLessThanOrEqual(code.y)
  }
})

test('at 375 the network table stacks: each cell under the one before and named', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await open(page)
  const cells = row(page, 'Chain ID').getByRole('cell')
  const boxes = await Promise.all([0, 1, 2].map(async (i) => (await cells.nth(i).boundingBox())!))
  expect(boxes[1].y).toBeGreaterThanOrEqual(boxes[0].y + boxes[0].height - 1)
  expect(boxes[2].y).toBeGreaterThanOrEqual(boxes[1].y + boxes[1].height - 1)
  for (const b of boxes) expect(b.x + b.width).toBeLessThanOrEqual(375)
  await expect(cells.nth(0)).toHaveText(/^mainnet\s*36963$/i, { useInnerText: true })
  await expect(cells.nth(2)).toHaveText(/^devnet\s*36964$/i, { useInnerText: true })
})

test('at 1440 the network table is three columns side by side, with no repeated labels', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await open(page)
  const cells = row(page, 'Chain ID').getByRole('cell')
  const [a, b, c] = await Promise.all([0, 1, 2].map(async (i) => (await cells.nth(i).boundingBox())!))
  expect(b.x).toBeGreaterThan(a.x + a.width - 1)
  expect(c.x).toBeGreaterThan(b.x + b.width - 1)
  expect(Math.abs(a.y - c.y)).toBeLessThan(2)
  await expect(cells.nth(0)).toHaveText('36963', { useInnerText: true })
})

test('the page works when the model catalog is down (it does not use it)', async ({ page }) => {
  await serveRpc(page)
  await failModels(page)
  await page.goto('/build')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Start building.')
  await expect(page.locator('#call').getByRole('link', { name: 'Get an API key' })).toBeVisible()
})
