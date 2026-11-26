import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { INVITE_VERIFY, WAITLIST } from './links'
import { drift, join, verify, InviteError } from './invite'

const reply = (body: unknown, init?: ResponseInit) =>
  vi.stubGlobal('fetch', vi.fn(async () => new Response(typeof body === 'string' ? body : JSON.stringify(body), init)))

const lastCall = () => {
  const [url, init] = vi.mocked(fetch).mock.calls[0]
  return { url, init: init as RequestInit, body: JSON.parse(String(init?.body)), headers: new Headers(init?.headers) }
}

beforeEach(() => vi.useFakeTimers())
afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

test('the two addresses are the contract', () => {
  expect(INVITE_VERIFY).toBe('https://api.hanzo.ai/v1/network/invite/verify')
  expect(WAITLIST).toBe('https://api.hanzo.ai/v1/network/waitlist')
})

test('verify posts the code as typed, anonymously, as JSON', async () => {
  reply({ valid: true }, { status: 200 })
  await verify('HNZ-7K9Q2M')
  const { url, init, body, headers } = lastCall()
  expect(url).toBe('https://api.hanzo.ai/v1/network/invite/verify')
  expect(init.method).toBe('POST')
  expect(init.credentials).toBe('omit')
  expect(headers.get('content-type')).toBe('application/json')
  expect(headers.has('authorization')).toBe(false)
  expect(body).toEqual({ code: 'HNZ-7K9Q2M' })
})

test('verify answers true and false from the body, never from anything else', async () => {
  reply({ valid: true }, { status: 200 })
  expect(await verify('HNZ-7K9Q2M')).toBe(true)
  reply({ valid: false }, { status: 200 })
  expect(await verify('HNZ-AAAAAA')).toBe(false)
})

test('verify: 429 is limited', async () => {
  reply({}, { status: 429 })
  await expect(verify('HNZ-7K9Q2M')).rejects.toMatchObject({ kind: 'limited' })
})

test.each([500, 502, 503, 400, 401, 404])('verify: a %i is unavailable, never a no', async (status) => {
  reply({ valid: false }, { status })
  await expect(verify('HNZ-7K9Q2M')).rejects.toMatchObject({ kind: 'unavailable' })
})

test.each([{}, { valid: 'true' }, { valid: 1 }, { valid: null }, [], 'not json', ''])('verify: a 200 without a boolean valid is unavailable: %j', async (body) => {
  reply(body, { status: 200 })
  await expect(verify('HNZ-7K9Q2M')).rejects.toMatchObject({ kind: 'unavailable' })
})

test('verify: a failed request is unavailable, and the error is an InviteError', async () => {
  vi.stubGlobal('fetch', vi.fn(async () => Promise.reject(new TypeError('offline'))))
  const err = await verify('HNZ-7K9Q2M').catch((e) => e)
  expect(err).toBeInstanceOf(InviteError)
  expect(err.kind).toBe('unavailable')
})

const hangs = () =>
  vi.stubGlobal(
    'fetch',
    vi.fn(
      (_url: unknown, init?: RequestInit) =>
        new Promise((_resolve, reject) => {
          const abort = () => reject(new DOMException('aborted', 'AbortError'))
          if (init?.signal?.aborted) abort()
          init?.signal?.addEventListener('abort', abort)
        }),
    ),
  )

test('verify gives up after 15 seconds and says unavailable', async () => {
  hangs()
  const pending = verify('HNZ-7K9Q2M').catch((e) => e)
  await vi.advanceTimersByTimeAsync(14_999)
  expect(vi.mocked(fetch).mock.calls[0][1]?.signal?.aborted).toBe(false)
  await vi.advanceTimersByTimeAsync(1)
  expect(await pending).toMatchObject({ kind: 'unavailable' })
})

test('a caller who aborts gets the abort, not a verdict', async () => {
  hangs()
  const ctl = new AbortController()
  const pending = verify('HNZ-7K9Q2M', ctl.signal).catch((e) => e)
  ctl.abort()
  const err = await pending
  expect(err).not.toBeInstanceOf(InviteError)
  expect(err.name).toBe('AbortError')
})

test('verify with a signal already aborted rejects as an abort', async () => {
  hangs()
  const ctl = new AbortController()
  ctl.abort()
  const err = await verify('HNZ-7K9Q2M', ctl.signal).catch((e) => e)
  expect(err).not.toBeInstanceOf(InviteError)
})

test('join posts an email, a role and the source, anonymously', async () => {
  reply({ status: 'pending' }, { status: 202 })
  await join({ email: 'a@b.co', role: 'operator' })
  const { url, init, body, headers } = lastCall()
  expect(url).toBe('https://api.hanzo.ai/v1/network/waitlist')
  expect(init.method).toBe('POST')
  expect(init.credentials).toBe('omit')
  expect(headers.get('content-type')).toBe('application/json')
  expect(headers.has('authorization')).toBe(false)
  expect(body).toEqual({ email: 'a@b.co', role: 'operator', source: 'hanzo.network/early' })
})

test('join posts a handle instead of an email, never both', async () => {
  reply({ status: 'pending' }, { status: 202 })
  await join({ handle: 'ada_9', role: 'holder' })
  expect(lastCall().body).toEqual({ handle: 'ada_9', role: 'holder', source: 'hanzo.network/early' })
})

test('join: 202 resolves with nothing to show', async () => {
  reply({ status: 'pending' }, { status: 202 })
  await expect(join({ email: 'a@b.co', role: 'builder' })).resolves.toBeUndefined()
})

test('join: 429 is limited', async () => {
  reply({}, { status: 429 })
  await expect(join({ email: 'a@b.co', role: 'builder' })).rejects.toMatchObject({ kind: 'limited' })
})

test.each([500, 503, 200, 204, 401])('join: a %i is unavailable', async (status) => {
  reply({ status: 'pending' }, { status })
  await expect(join({ email: 'a@b.co', role: 'builder' })).rejects.toMatchObject({ kind: 'unavailable' })
})

test('join: a 400 is rejected: the entry itself was refused, which is not a service problem', async () => {
  reply({ error: 'bad' }, { status: 400 })
  await expect(join({ email: 'nope', role: 'builder' })).rejects.toMatchObject({ kind: 'rejected' })
})

test('a caller who aborts a join gets the abort, not a verdict', async () => {
  hangs()
  const ctl = new AbortController()
  const pending = join({ email: 'a@b.co', role: 'builder' }, ctl.signal).catch((e) => e)
  ctl.abort()
  const err = await pending
  expect(err).not.toBeInstanceOf(InviteError)
  expect(err.name).toBe('AbortError')
})

test('join: a failed request is unavailable; a hang ends after 15 seconds', async () => {
  vi.stubGlobal('fetch', vi.fn(async () => Promise.reject(new TypeError('offline'))))
  await expect(join({ email: 'a@b.co', role: 'builder' })).rejects.toMatchObject({ kind: 'unavailable' })
  hangs()
  const pending = join({ email: 'a@b.co', role: 'builder' }).catch((e) => e)
  await vi.advanceTimersByTimeAsync(15_000)
  expect(await pending).toMatchObject({ kind: 'unavailable' })
})

test('an unexpected status is reported as the endpoint and the status, and nothing else', async () => {
  reply({ valid: false }, { status: 503 })
  const v = await verify('HNZ-7K9Q2M').catch((e) => e)
  expect(drift(v)?.message).toBe('invite/verify answered 503')
  reply({ valid: 'yes' }, { status: 200 })
  expect(drift(await verify('HNZ-7K9Q2M').catch((e) => e))?.message).toBe('invite/verify answered 200')
  reply({}, { status: 500 })
  expect(drift(await join({ email: 'secret@b.co', role: 'builder' }).catch((e) => e))?.message).toBe('waitlist answered 500')
  reply({}, { status: 400 })
  expect(drift(await verify('HNZ-7K9Q2M').catch((e) => e))?.message).toBe('invite/verify answered 400')
})

test('a 429, a refused entry, a network failure, a timeout and an abort are not drift', async () => {
  reply({}, { status: 429 })
  expect(drift(await verify('HNZ-7K9Q2M').catch((e) => e))).toBeNull()
  reply({}, { status: 400 })
  expect(drift(await join({ email: 'a@b.co', role: 'builder' }).catch((e) => e))).toBeNull()
  vi.stubGlobal('fetch', vi.fn(async () => Promise.reject(new TypeError('offline'))))
  expect(drift(await verify('HNZ-7K9Q2M').catch((e) => e))).toBeNull()
  expect(drift(new DOMException('aborted', 'AbortError'))).toBeNull()
  expect(drift(new Error('other'))).toBeNull()
})
