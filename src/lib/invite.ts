import { INVITE_VERIFY, WAITLIST } from './links'
import { request, RequestError } from './request'

/** The one place the invite and queue endpoints are known. Anonymous JSON on api.hanzo.ai, no credentials. */

const WAIT_MS = 15_000

/** The four roles the queue knows, in the order it shows them. */
export const ROLES = [
  { value: 'miner', label: 'Miner' },
  { value: 'builder', label: 'Builder' },
  { value: 'researcher', label: 'Researcher' },
  { value: 'staker', label: 'Staker' },
] as const
export type Role = (typeof ROLES)[number]['value']

/** An X handle without the @: 1 to 15 letters, digits or underscores. As a pattern string, it is anchored by the input and by tests. */
export const X_HANDLE = '[A-Za-z0-9_]{1,15}'

/** Exactly one of email or xHandle. */
export type Entry = ({ email: string } | { xHandle: string }) & { role: Role }

const DIGITS = 10

/** Upper-case ASCII letters only, as the server reads a code: a letter that merely folds to an ASCII one (long s, sharp s) stays what it is, and is then dropped. */
const upper = (text: string) => text.replace(/[a-z]/g, (c) => c.toUpperCase())

/** An invite code is `HNZ-` and ten characters in two groups of five: `HNZ-XXXXX-XXXXX`. Upper-case, drop everything that is not A-Z or 0-9, then require `HNZ` and exactly ten. Null when the text is not a code, and then nothing is sent. */
export function normalize(text: string): string | null {
  const m = /^HNZ([A-Z0-9]{5})([A-Z0-9]{5})$/.exec(upper(text).replace(/[^A-Z0-9]/g, ''))
  return m ? `HNZ-${m[1]}-${m[2]}` : null
}

/** What the code input keeps of what was typed or pasted: the ten characters after the fixed `HNZ-` prefix. A pasted whole code (more than ten once cleaned, beginning HNZ) loses its prefix; ten characters that happen to begin HNZ are a body. */
export function body(text: string): string {
  const clean = upper(text).replace(/[^A-Z0-9]/g, '')
  return (clean.length > DIGITS && clean.startsWith('HNZ') ? clean.slice(3) : clean).slice(0, DIGITS)
}

type Endpoint = 'invite/verify' | 'waitlist'

/**
 * `limited`: too many tries (429); `retryAfter` is the seconds the server said to wait, null when it said nothing usable.
 * `rejected`: the queue refused the entry itself (400).
 * `unavailable`: anything else that is not a clear answer (a 503 included). `status` is the HTTP status, 0 when none came back.
 */
export class InviteError extends Error {
  constructor(
    readonly kind: 'limited' | 'rejected' | 'unavailable',
    readonly endpoint: Endpoint,
    readonly status = 0,
    readonly retryAfter: number | null = null,
  ) {
    super(`invite service: ${kind}`)
  }
}

/** The one thing worth reporting when the contract drifts: which endpoint answered with which unexpected status. Never a body, a code, an email or a handle. Null for anything else. A 503 is the documented answer while no invite has been issued, so it is not drift. */
export function drift(err: unknown): Error | null {
  return err instanceof InviteError && err.kind === 'unavailable' && err.status > 0 && err.status !== 503 ? new Error(`${err.endpoint} answered ${err.status}`) : null
}

/** Seconds from a Retry-After header: whole seconds, or an HTTP date counted from now. Null for anything else, and for zero or less. */
function seconds(header: string | null): number | null {
  if (header === null) return null
  const n = /^\d+$/.test(header.trim()) ? Number(header) : Math.ceil((Date.parse(header) - Date.now()) / 1000)
  return Number.isFinite(n) && n > 0 ? n : null
}

/** How long to wait, as the page says it: "in a minute", "in 5 minutes", "in 2 hours", or "later" when the server gave no time. Always rounded up, so nobody is told to come back early. */
export function wait(secs: number | null): string {
  if (secs === null) return 'later'
  if (secs <= 60) return 'in a minute'
  if (secs <= 3600) return `in ${Math.ceil(secs / 60)} minutes`
  return `in ${Math.ceil(secs / 3600)} hours`
}

/** POSTs `body` and returns the status and the parsed JSON (undefined when it is not JSON). Any refusal becomes an InviteError through `refuse`; a caller's abort is rethrown as is. */
async function post(endpoint: Endpoint, url: string, body: unknown, signal?: AbortSignal): Promise<{ status: number; json: unknown }> {
  try {
    const res = await request(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body), signal }, WAIT_MS)
    return { status: res.status, json: await res.json().catch(() => undefined) }
  } catch (e) {
    if (!(e instanceof RequestError) || e.kind === 'aborted') throw e
    if (e.kind === 'status') return refuse(endpoint, e.status, e.headers)
    throw new InviteError('unavailable', endpoint)
  }
}

const refuse = (endpoint: Endpoint, status: number, headers = new Headers()): never => {
  if (status === 429) throw new InviteError('limited', endpoint, status, seconds(headers.get('retry-after')))
  if (status === 400 && endpoint === 'waitlist') throw new InviteError('rejected', endpoint, status)
  throw new InviteError('unavailable', endpoint, status)
}

/** Is `code` a real invite code? The server never says why a code is not. Throws InviteError when it cannot say yes or no. */
export async function verify(code: string, signal?: AbortSignal): Promise<boolean> {
  const { status, json } = await post('invite/verify', INVITE_VERIFY, { code }, signal)
  if (status !== 200) return refuse('invite/verify', status)
  const valid = (json as { valid?: unknown } | undefined)?.valid
  if (typeof valid !== 'boolean') throw new InviteError('unavailable', 'invite/verify', status)
  return valid
}

/** Puts `entry` in the queue. The answer is the same for a new and a repeat entry. Throws InviteError unless the queue took it. */
export async function join(entry: Entry, signal?: AbortSignal): Promise<void> {
  const { status } = await post('waitlist', WAITLIST, { ...entry, source: 'hanzo.network/early' }, signal)
  if (status !== 202) refuse('waitlist', status)
}
