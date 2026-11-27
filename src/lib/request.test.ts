import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { request, RequestError } from './request'

// A fetch that answers after `ms`, or rejects when its signal fires first.
const slow = (ms: number, status = 200) =>
  vi.stubGlobal(
    'fetch',
    vi.fn((_url: string, init: RequestInit) =>
      new Promise<Response>((resolve, reject) => {
        if (init.signal?.aborted) return reject(init.signal.reason)
        const t = setTimeout(() => resolve(new Response('ok', { status })), ms)
        init.signal?.addEventListener('abort', () => {
          clearTimeout(t)
          reject(init.signal?.reason)
        })
      }),
    ),
  )

beforeEach(() => vi.useFakeTimers())
afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

test('returns the response when it answers in time', async () => {
  slow(10)
  const p = request('https://x.test/a', {}, 1000)
  await vi.advanceTimersByTimeAsync(10)
  expect(await (await p).text()).toBe('ok')
})

test('sends no cookies unless told otherwise', async () => {
  slow(1)
  const a = request('https://x.test/a', {}, 1000)
  await vi.advanceTimersByTimeAsync(1)
  await a
  expect(vi.mocked(fetch).mock.calls[0][1]?.credentials).toBe('omit')
  const b = request('https://x.test/a', { credentials: 'include' }, 1000)
  await vi.advanceTimersByTimeAsync(1)
  await b
  expect(vi.mocked(fetch).mock.calls[1][1]?.credentials).toBe('include')
})

test('passes the url and the rest of init through', async () => {
  slow(1)
  const p = request('https://x.test/a', { method: 'POST', body: 'b' }, 1000)
  await vi.advanceTimersByTimeAsync(1)
  await p
  const [url, init] = vi.mocked(fetch).mock.calls[0]
  expect(url).toBe('https://x.test/a')
  expect(init?.method).toBe('POST')
  expect(init?.body).toBe('b')
})

test('no answer in time is a timeout error', async () => {
  slow(60_000)
  const p = request('https://x.test/a', {}, 5000).catch((e: unknown) => e)
  await vi.advanceTimersByTimeAsync(4999)
  let settled = false
  void p.then(() => (settled = true))
  await vi.advanceTimersByTimeAsync(0)
  expect(settled).toBe(false)
  await vi.advanceTimersByTimeAsync(1)
  const e = await p
  expect(e).toBeInstanceOf(RequestError)
  expect(e).toMatchObject({ kind: 'timeout', status: 0 })
})

test('the caller aborting is an aborted error, not a timeout', async () => {
  slow(60_000)
  const ctl = new AbortController()
  const p = request('https://x.test/a', { signal: ctl.signal }, 5000).catch((e: unknown) => e)
  await vi.advanceTimersByTimeAsync(100)
  ctl.abort()
  expect(await p).toMatchObject({ kind: 'aborted' })
})

test('the caller wins when it aborts and the timeout fires together', async () => {
  slow(60_000)
  const ctl = new AbortController()
  const p = request('https://x.test/a', { signal: ctl.signal }, 5000).catch((e: unknown) => e)
  await vi.advanceTimersByTimeAsync(4999)
  ctl.abort()
  await vi.advanceTimersByTimeAsync(1)
  expect(await p).toMatchObject({ kind: 'aborted' })
})

test('a signal already aborted is an aborted error', async () => {
  slow(10)
  const ctl = new AbortController()
  ctl.abort()
  await expect(request('https://x.test/a', { signal: ctl.signal }, 1000)).rejects.toMatchObject({ kind: 'aborted' })
})

test.each([404, 429, 500])('a %i answer is a status error carrying the status', async (status) => {
  slow(1, status)
  const p = request('https://x.test/a', {}, 1000).catch((e: unknown) => e)
  await vi.advanceTimersByTimeAsync(1)
  expect(await p).toMatchObject({ kind: 'status', status })
})

test('a request that fails outright is a network error', async () => {
  vi.stubGlobal('fetch', vi.fn(async () => Promise.reject(new TypeError('offline'))))
  await expect(request('https://x.test/a', {}, 1000)).rejects.toMatchObject({ kind: 'network', status: 0 })
})

test('the timer is cleared once the answer is in', async () => {
  slow(1)
  const p = request('https://x.test/a', {}, 5000)
  await vi.advanceTimersByTimeAsync(1)
  await p
  expect(vi.getTimerCount()).toBe(0)
})

test('a refused answer carries its headers, so a caller can read Retry-After', async () => {
  vi.stubGlobal('fetch', vi.fn(async () => new Response('no', { status: 429, headers: { 'retry-after': '120' } })))
  const e = await request('https://x.test/a', {}, 1000).catch((x: unknown) => x)
  expect(e).toBeInstanceOf(RequestError)
  expect(e).toMatchObject({ kind: 'status', status: 429 })
  expect((e as RequestError).headers.get('retry-after')).toBe('120')
})
