import { afterEach, expect, test, vi } from 'vitest'
import { blockHeight } from './chain'

const reply = (body: unknown, init?: ResponseInit) =>
  vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(body), init)))

afterEach(() => vi.unstubAllGlobals())

test('reads the hex block number as a number', async () => {
  reply({ jsonrpc: '2.0', id: 1, result: '0x101039' })
  expect(await blockHeight()).toBe(1052729)
})

test('asks eth_blockNumber over JSON-RPC', async () => {
  reply({ result: '0x1' })
  await blockHeight()
  const [url, init] = vi.mocked(fetch).mock.calls[0]
  expect(url).toBe('https://api.hanzo.network/v1/chain/hanzo')
  expect(init?.method).toBe('POST')
  expect(JSON.parse(String(init?.body))).toEqual({ jsonrpc: '2.0', id: 1, method: 'eth_blockNumber', params: [] })
})

test.each([{}, { result: 'nope' }, { result: 5 }, { error: { code: -1 } }])('a bad reply throws: %j', async (body) => {
  reply(body)
  await expect(blockHeight()).rejects.toThrow()
})

test('a non-2xx answer throws', async () => {
  reply({ result: '0x1' }, { status: 503 })
  await expect(blockHeight()).rejects.toThrow()
})
