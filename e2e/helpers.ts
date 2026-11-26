import type { Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

export const MODELS_URL = 'https://api.hanzo.ai/v1/models'
export const CHAT_URL = 'https://api.hanzo.ai/v1/chat/completions'
export const RPC_URL = 'https://api.hanzo.network/v1/chain/hanzo'

export const serveModels = (page: Page) =>
  page.route(MODELS_URL, (route) => route.fulfill({ path: 'e2e/fixtures/models.json', contentType: 'application/json' }))

export const failModels = (page: Page) =>
  page.route(MODELS_URL, (route) => route.fulfill({ status: 500, body: 'down' }))

export const serveChain = (page: Page) =>
  page.route(RPC_URL, (route) =>
    route.fulfill({ json: { jsonrpc: '2.0', id: 1, result: '0x101039' } }),
  )

/** Every axe violation as "id: target, target, target", empty when clean. */
export async function axeViolations(page: Page): Promise<string[]> {
  await page.waitForLoadState('networkidle')
  const { violations } = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze()
  return violations.map(
    (v) => `${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`,
  )
}
