import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { INVITE_VERIFY, WAITLIST } from './links'
import { body, drift, join, normalize, ROLES, verify, wait, InviteError, X_HANDLE } from './invite'

const CODE = 'HNZ-7K9Q2-M4XWP'

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
  await verify(CODE)
  const { url, init, body, headers } = lastCall()
  expect(url).toBe('https://api.hanzo.ai/v1/network/invite/verify')
  expect(init.method).toBe('POST')
  expect(init.credentials).toBe('omit')
  expect(headers.get('content-type')).toBe('application/json')
  expect(headers.has('authorization')).toBe(false)
  expect(body).toEqual({ code: CODE })
})

test('verify answers true and false from the body, never from anything else', async () => {
  reply({ valid: true }, { status: 200 })
  expect(await verify(CODE)).toBe(true)
  reply({ valid: false }, { status: 200 })
  expect(await verify('HNZ-AAAAA-AAAAA')).toBe(false)
})

test('verify: 429 is limited', async () => {
  reply({}, { status: 429 })
  await expect(verify(CODE)).rejects.toMatchObject({ kind: 'limited' })
})

test.each([500, 502, 503, 400, 401, 404, 413])('verify: a %i is unavailable, never a no', async (status) => {
  reply({ valid: false }, { status })
  await expect(verify(CODE)).rejects.toMatchObject({ kind: 'unavailable' })
})

test.each([{}, { valid: 'true' }, { valid: 1 }, { valid: null }, [], 'not json', ''])('verify: a 200 without a boolean valid is unavailable: %j', async (body) => {
  reply(body, { status: 200 })
  await expect(verify(CODE)).rejects.toMatchObject({ kind: 'unavailable' })
})

test('verify: a failed request is unavailable, and the error is an InviteError', async () => {
  vi.stubGlobal('fetch', vi.fn(async () => Promise.reject(new TypeError('offline'))))
  const err = await verify(CODE).catch((e) => e)
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
  const pending = verify(CODE).catch((e) => e)
  await vi.advanceTimersByTimeAsync(14_999)
  expect(vi.mocked(fetch).mock.calls[0][1]?.signal?.aborted).toBe(false)
  await vi.advanceTimersByTimeAsync(1)
  expect(await pending).toMatchObject({ kind: 'unavailable' })
})

test('a caller who aborts gets the abort, not a verdict', async () => {
  hangs()
  const ctl = new AbortController()
  const pending = verify(CODE, ctl.signal).catch((e) => e)
  ctl.abort()
  const err = await pending
  expect(err).not.toBeInstanceOf(InviteError)
  expect(err).toMatchObject({ kind: 'aborted' }) // request.ts's own word for a caller who gave up
})

test('verify with a signal already aborted rejects as an abort', async () => {
  hangs()
  const ctl = new AbortController()
  ctl.abort()
  const err = await verify(CODE, ctl.signal).catch((e) => e)
  expect(err).not.toBeInstanceOf(InviteError)
  expect(err).toMatchObject({ kind: 'aborted' })
})

test('join posts an email, a role and the source, anonymously', async () => {
  reply({ status: 'pending' }, { status: 202 })
  await join({ email: 'a@b.co', role: 'miner' })
  const { url, init, body, headers } = lastCall()
  expect(url).toBe('https://api.hanzo.ai/v1/network/waitlist')
  expect(init.method).toBe('POST')
  expect(init.credentials).toBe('omit')
  expect(headers.get('content-type')).toBe('application/json')
  expect(headers.has('authorization')).toBe(false)
  expect(body).toEqual({ email: 'a@b.co', role: 'miner', source: 'hanzo.network/early' })
})

test('join posts an xHandle instead of an email, never both, with its case kept', async () => {
  reply({ status: 'pending' }, { status: 202 })
  await join({ xHandle: 'Ada_9', role: 'staker' })
  expect(lastCall().body).toEqual({ xHandle: 'Ada_9', role: 'staker', source: 'hanzo.network/early' })
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
  expect(err).toMatchObject({ kind: 'aborted' }) // request.ts's own word for a caller who gave up
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
  reply({ valid: false }, { status: 502 })
  const v = await verify(CODE).catch((e) => e)
  expect(drift(v)?.message).toBe('invite/verify answered 502')
  reply({ valid: 'yes' }, { status: 200 })
  expect(drift(await verify(CODE).catch((e) => e))?.message).toBe('invite/verify answered 200')
  reply({}, { status: 500 })
  expect(drift(await join({ email: 'secret@b.co', role: 'builder' }).catch((e) => e))?.message).toBe('waitlist answered 500')
  reply({}, { status: 400 })
  expect(drift(await verify(CODE).catch((e) => e))?.message).toBe('invite/verify answered 400')
})

test('a 503 is the documented answer until the first invite is issued: it is not drift', async () => {
  reply({}, { status: 503 })
  expect(drift(await verify(CODE).catch((e) => e))).toBeNull()
  expect(drift(await join({ email: 'a@b.co', role: 'builder' }).catch((e) => e))).toBeNull()
})

test('a 429, a refused entry, a network failure, a timeout and an abort are not drift', async () => {
  reply({}, { status: 429 })
  expect(drift(await verify(CODE).catch((e) => e))).toBeNull()
  reply({}, { status: 400 })
  expect(drift(await join({ email: 'a@b.co', role: 'builder' }).catch((e) => e))).toBeNull()
  vi.stubGlobal('fetch', vi.fn(async () => Promise.reject(new TypeError('offline'))))
  expect(drift(await verify(CODE).catch((e) => e))).toBeNull()
  expect(drift(new DOMException('aborted', 'AbortError'))).toBeNull()
  expect(drift(new Error('other'))).toBeNull()
})

test('the roles are the four, in order, each with its label', () => {
  expect(ROLES).toEqual([
    { value: 'miner', label: 'Miner' },
    { value: 'builder', label: 'Builder' },
    { value: 'researcher', label: 'Researcher' },
    { value: 'staker', label: 'Staker' },
  ])
})

test('verify reads only a boolean valid: who issued the code, or any other field, is ignored', async () => {
  reply({ valid: true, inviterHandle: 'someone', clusterName: 'a-cluster', error: 'x' }, { status: 200 })
  expect(await verify(CODE)).toBe(true)
  reply({ valid: false, inviterHandle: 'someone', clusterName: 'a-cluster' }, { status: 200 })
  expect(await verify(CODE)).toBe(false)
})

test('a problem document from the server is never read or shown: a 400 and a 413 are plain unavailable', async () => {
  reply({ type: 'about:blank', title: 'Too large', status: 413, detail: 'SECRET DETAIL' }, { status: 413 })
  const err = await verify(CODE).catch((e) => e)
  expect(err).toMatchObject({ kind: 'unavailable', status: 413 })
  expect(JSON.stringify(err)).not.toContain('SECRET')
  expect(String(err.message)).not.toContain('SECRET')
})

test.each([
  ['HNZ-7K9Q2-M4XWP', 'HNZ-7K9Q2-M4XWP'],
  ['hnz-7k9q2-m4xwp', 'HNZ-7K9Q2-M4XWP'],
  ['HNZ7K9Q2M4XWP', 'HNZ-7K9Q2-M4XWP'],
  [' HNZ 7K9Q2 M4XWP ', 'HNZ-7K9Q2-M4XWP'],
  ['hnz_7k9q2.m4xwp', 'HNZ-7K9Q2-M4XWP'],
  ['hnz-7k9q2m', null],
  [' HNZ 7K9Q2M ', null],
  ['7k9q2m', null],
  ['7k9q2m4xwp', null],
  ['HNZ-7K9Q2-M4XW', null],
  ['HNZ-7K9Q2-M4XWPX', null],
  ['', null],
  ['   ', null],
  ['HNZ-7K9Q2-M4XW\u{1F600}', null],
  ['\u{1F600}\u{1F600}', null],
])('normalize(%j) is %j', (input, want) => {
  expect(normalize(input)).toBe(want)
})

test.each([
  ['', ''],
  ['7k9q2m4xwp', '7K9Q2M4XWP'],
  ['hnz-7k9q2-m4xwp', '7K9Q2M4XWP'],
  ['HNZ7K9Q2M4XWP', '7K9Q2M4XWP'],
  ['7k9q2', '7K9Q2'],
  ['hnz', 'HNZ'],
  ['HNZ1234567', 'HNZ1234567'], // ten characters that happen to begin HNZ: a body, not a prefix
  ['HNZ-HNZ12-34567', 'HNZ1234567'],
  ['7K9Q2M4XWPEXTRA', '7K9Q2M4XWP'],
  ['7K9 Q2-M4.XWP', '7K9Q2M4XWP'],
  ['\u{1F600}7K', '7K'],
])('body(%j) is %j: what the input keeps of what was typed or pasted', (input, want) => {
  expect(body(input)).toBe(want)
})

test('typing a whole code one character at a time ends on its ten characters', () => {
  let v = ''
  for (const c of 'HNZ-7K9Q2-M4XWP') v = body(v + c)
  expect(v).toBe('7K9Q2M4XWP')
  expect(normalize(`HNZ${v}`)).toBe('HNZ-7K9Q2-M4XWP')
})

test('an X handle is 1 to 15 letters, digits or underscores', () => {
  const ok = (h: string) => new RegExp(`^${X_HANDLE}$`).test(h)
  for (const h of ['a', 'Ada_9', 'x'.repeat(15), '_']) expect(ok(h)).toBe(true)
  for (const h of ['', 'has space', 'bad!', 'x'.repeat(16), '@ada', 'ada.lovelace']) expect(ok(h)).toBe(false)
})

test('the server reads ASCII only: a letter that merely upper-cases to an ASCII one is not that letter', () => {
  expect(normalize('HNZ-7K9Q2-M4XW\u017F')).toBeNull() // long s upper-cases to S
  expect(normalize('hnz-7k9q2-m4xw\u00DF')).toBeNull() // sharp s upper-cases to SS
  expect(body('7K9Q2M4XW\u017F')).toBe('7K9Q2M4XW')
})

test.each([
  ['120', 120],
  ['5', 5],
  ['3600', 3600],
])('verify: a 429 with Retry-After %s says to wait %i seconds', async (header, seconds) => {
  reply({}, { status: 429, headers: { 'retry-after': header } })
  const err = await verify(CODE).catch((e) => e)
  expect(err).toMatchObject({ kind: 'limited', retryAfter: seconds })
})

test('join: a 429 carries its Retry-After too', async () => {
  reply({}, { status: 429, headers: { 'retry-after': '90' } })
  await expect(join({ email: 'a@b.co', role: 'builder' })).rejects.toMatchObject({ kind: 'limited', retryAfter: 90 })
})

test('a Retry-After that is an HTTP date counts from now', async () => {
  vi.setSystemTime(new Date('2026-11-27T10:00:00Z'))
  reply({}, { status: 429, headers: { 'retry-after': 'Fri, 27 Nov 2026 10:05:00 GMT' } })
  expect(await verify(CODE).catch((e) => e)).toMatchObject({ kind: 'limited', retryAfter: 300 })
})

test.each([[undefined], ['soon'], ['0'], ['-5'], ['1.5']])('a 429 without a usable Retry-After (%s) has no wait to show', async (header) => {
  reply({}, { status: 429, headers: header === undefined ? {} : { 'retry-after': header } })
  expect(await verify(CODE).catch((e) => e)).toMatchObject({ kind: 'limited', retryAfter: null })
})

test.each([
  [1, 'in a minute'],
  [60, 'in a minute'],
  [61, 'in 2 minutes'],
  [300, 'in 5 minutes'],
  [3599, 'in 60 minutes'],
  [3600, 'in 60 minutes'],
  [3601, 'in 2 hours'],
  [7200, 'in 2 hours'],
  [null, 'later'],
])('wait(%j) reads "%s"', (seconds, said) => {
  expect(wait(seconds)).toBe(said)
})

test('a 503 from either endpoint is unavailable and is not drift to hide: the status stays on the error', async () => {
  reply({ type: 'about:blank', status: 503 }, { status: 503, headers: { 'content-type': 'application/problem+json', 'retry-after': '5' } })
  expect(await verify(CODE).catch((e) => e)).toMatchObject({ kind: 'unavailable', status: 503 })
  expect(await join({ email: 'a@b.co', role: 'builder' }).catch((e) => e)).toMatchObject({ kind: 'unavailable', status: 503 })
})

test.each([
  ['HNZ-7K9QU-M4XWP', 'U is not in the alphabet'],
  ['HNZ-UUUUU-UUUUU', 'U everywhere'],
  ['hnz-7k9q2-m4xwu', 'lower-case u'],
])('normalize refuses %s: %s, so nothing is sent', (input) => {
  expect(normalize(input)).toBeNull()
})

test.each([
  ['HNZ-7K9Q2-M4XWI', 'HNZ-7K9Q2-M4XW1'],
  ['HNZ-7K9Q2-M4XWL', 'HNZ-7K9Q2-M4XW1'],
  ['HNZ-7K9Q2-M4XWO', 'HNZ-7K9Q2-M4XW0'],
  ['hnz-ilolo-ilolo', 'HNZ-11010-11010'],
])('normalize reads %s as the server does: I and L are 1, O is 0 (%s)', (input, want) => {
  expect(normalize(input)).toBe(want)
})

test('a code with a U makes no request at all', async () => {
  const f = vi.fn()
  vi.stubGlobal('fetch', f)
  expect(normalize('HNZ-7K9QU-M4XWP')).toBeNull()
  expect(f).not.toHaveBeenCalled()
})
