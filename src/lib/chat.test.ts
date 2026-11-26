import { afterEach, expect, test, vi } from 'vitest'
import { ask, CHAT_LANE, type Message } from './chat'

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
  expect(JSON.parse(String(init?.body))).toEqual({ messages: question })
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
