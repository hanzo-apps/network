import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { blockHeight, watchChain, type ChainState } from './chain'

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

describe('watchChain', () => {
  const tick = (ms: number) => vi.advanceTimersByTimeAsync(ms)
  let stop: () => void
  let seen: ChainState[]

  beforeEach(() => {
    vi.useFakeTimers()
    vi.stubGlobal('document', { visibilityState: 'visible', addEventListener: vi.fn(), removeEventListener: vi.fn() })
    seen = []
  })
  afterEach(() => {
    stop?.()
    vi.useRealTimers()
  })

  // A fetch that answers after `ms`, or rejects with AbortError when its signal fires first.
  const slowFetch = (answers: Array<{ ms: number; result?: string; fail?: boolean }>) => {
    let n = 0
    vi.stubGlobal(
      'fetch',
      vi.fn((_url: string, init: RequestInit) => {
        const a = answers[Math.min(n++, answers.length - 1)]
        return new Promise<Response>((resolve, reject) => {
          const t = setTimeout(
            () => (a.fail ? resolve(new Response('x', { status: 503 })) : resolve(new Response(JSON.stringify({ result: a.result })))),
            a.ms,
          )
          init.signal?.addEventListener('abort', () => {
            clearTimeout(t)
            reject(new DOMException('aborted', 'AbortError'))
          })
        })
      }),
    )
  }

  test('reports live with the height', async () => {
    slowFetch([{ ms: 10, result: '0x10' }])
    stop = watchChain((s) => seen.push(s))
    await tick(20)
    expect(seen).toEqual([{ status: 'live', height: 16 }])
  })

  test('reports down when the chain fails, then live when it returns', async () => {
    slowFetch([{ ms: 10, fail: true }, { ms: 10, result: '0x11' }])
    stop = watchChain((s) => seen.push(s))
    await tick(20)
    expect(seen).toEqual([{ status: 'down' }])
    await tick(6000)
    expect(seen.at(-1)).toEqual({ status: 'live', height: 17 })
  })

  test('a slow request cut off by the next poll is not "down"', async () => {
    slowFetch([{ ms: 7000, result: '0x1' }, { ms: 10, result: '0x2' }])
    stop = watchChain((s) => seen.push(s))
    await tick(6010) // second poll aborts the first, which is still waiting
    await tick(20)
    expect(seen).toEqual([{ status: 'live', height: 2 }])
  })
})
