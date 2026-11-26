import { afterEach, expect, test, vi } from 'vitest'
import { ask, SYSTEM, type Message } from './chat'
import { CHAT_LANE } from './links'

const reply = (body: unknown, init?: ResponseInit) =>
  vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(body), init)))

const question: Message[] = [{ role: 'user', content: 'What is Proof of AI?' }]
const answer = (content: unknown, reasoning_content = 'private thoughts') => ({ choices: [{ message: { role: 'assistant', content, reasoning_content } }] })

afterEach(() => vi.unstubAllGlobals())

test('posts the messages to the public lane with no key and no cookies', async () => {
  reply(answer('Hi.'))
  const signal = new AbortController().signal
  await ask(question, signal)
  const [url, init] = vi.mocked(fetch).mock.calls[0]
  expect(url).toBe('https://api.hanzo.ai/v1/chat/public')
  expect(CHAT_LANE).toBe(url)
  expect(init?.method).toBe('POST')
  expect(init?.credentials).toBe('omit')
  expect(init?.signal).toBe(signal)
  expect(JSON.parse(String(init?.body))).toEqual({ messages: [{ role: 'system', content: SYSTEM }, ...question], max_tokens: 800 })
  const headers = new Headers(init?.headers)
  expect(headers.get('content-type')).toBe('application/json')
  expect(headers.has('authorization')).toBe(false)
})

test('returns the answer and nothing else', async () => {
  reply(answer('Proof of AI is a receipt.'))
  const got = await ask(question)
  expect(got).toBe('Proof of AI is a receipt.')
  expect(got).not.toContain('private thoughts')
})

test.each([500, 429, 401])('a %i answer throws', async (status) => {
  reply({ error: { message: 'no' } }, { status })
  await expect(ask(question)).rejects.toMatchObject({ status })
})

test.each([{}, { choices: [] }, answer(''), answer('   '), answer(null), answer(5), { choices: [{ message: { reasoning_content: 'only thoughts' } }] }])(
  'a body without a real answer throws: %j',
  async (body) => {
    reply(body)
    await expect(ask(question)).rejects.toThrow()
  },
)

test('a failed request throws', async () => {
  vi.stubGlobal('fetch', vi.fn(async () => Promise.reject(new TypeError('offline'))))
  await expect(ask(question)).rejects.toThrow()
})

test('every request opens with the system message and caps the answer length', async () => {
  reply(answer('Hi.'))
  await ask([...question, { role: 'assistant', content: 'a' }, { role: 'user', content: 'b' }])
  const body = JSON.parse(String(vi.mocked(fetch).mock.calls[0][1]?.body)) as { messages: Message[]; max_tokens: number }
  expect(body.messages[0]).toEqual({ role: 'system', content: SYSTEM })
  expect(body.messages.slice(1).map((m) => m.content)).toEqual(['What is Proof of AI?', 'a', 'b'])
  expect(body.max_tokens).toBeGreaterThan(0)
})

test('the system message is the settled text', () => {
  expect(SYSTEM).toBe(
    'You answer questions about Hanzo Network for visitors to hanzo.network. Facts: the chain (ID 36963) and an OpenAI-compatible API at api.hanzo.ai are live; nodes run tools and agents and are paid per job in stablecoins. Proof of AI mining, the 2 trillion AI supply policy and P3Q settlement are designed and not active; no dates are set. Never state or guess a price, return, yield, stake, staking reward, listing, purchase, sale, airdrop or date for the AI token, and never give investment advice; say that is not available and point to https://hanzo.network/economics and the whitepaper at https://papers.hanzo.ai/hanzo-ai-chain/. If you do not know, say so and point to https://docs.hanzo.ai. Keep answers short and plain.',
  )
})
