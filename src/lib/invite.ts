import { INVITE_VERIFY, WAITLIST } from './links'

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

/** An invite code is `HNZ-` and ten characters in two groups of five: `HNZ-XXXXX-XXXXX`. Upper-case, drop everything that is not A-Z or 0-9, then require `HNZ` and exactly ten. Null when the text is not a code, and then nothing is sent. */
export function normalize(text: string): string | null {
  const m = /^HNZ([A-Z0-9]{5})([A-Z0-9]{5})$/.exec(text.toUpperCase().replace(/[^A-Z0-9]/g, ''))
  return m ? `HNZ-${m[1]}-${m[2]}` : null
}

/** What the code input keeps of what was typed or pasted: the ten characters after the fixed `HNZ-` prefix. A pasted whole code (more than ten once cleaned, beginning HNZ) loses its prefix; ten characters that happen to begin HNZ are a body. */
export function body(text: string): string {
  const clean = text.toUpperCase().replace(/[^A-Z0-9]/g, '')
  return (clean.length > DIGITS && clean.startsWith('HNZ') ? clean.slice(3) : clean).slice(0, DIGITS)
}

type Endpoint = 'invite/verify' | 'waitlist'

/**
 * `limited`: too many tries (429). `rejected`: the queue refused the entry itself (400).
 * `unavailable`: anything else that is not a clear answer. `status` is the HTTP status, 0 when none came back.
 */
export class InviteError extends Error {
  constructor(
    readonly kind: 'limited' | 'rejected' | 'unavailable',
    readonly endpoint: Endpoint,
    readonly status = 0,
  ) {
    super(`invite service: ${kind}`)
  }
}

/** The one thing worth reporting when the contract drifts: which endpoint answered with which unexpected status. Never a body, a code, an email or a handle. Null for anything else. */
export function drift(err: unknown): Error | null {
  return err instanceof InviteError && err.kind === 'unavailable' && err.status > 0 ? new Error(`${err.endpoint} answered ${err.status}`) : null
}

/** POSTs `body` and returns the status and the parsed JSON (undefined when it is not JSON). A caller's abort is rethrown as is; everything else that fails is `unavailable`. */
async function post(endpoint: Endpoint, url: string, body: unknown, signal?: AbortSignal): Promise<{ status: number; json: unknown }> {
  const ctl = new AbortController()
  const stop = () => ctl.abort()
  if (signal?.aborted) stop()
  signal?.addEventListener('abort', stop)
  const timer = setTimeout(stop, WAIT_MS)
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'omit',
      signal: ctl.signal,
    })
    const json: unknown = await res.json().catch(() => undefined)
    return { status: res.status, json }
  } catch (e) {
    if (signal?.aborted) throw e
    throw new InviteError('unavailable', endpoint)
  } finally {
    clearTimeout(timer)
    signal?.removeEventListener('abort', stop)
  }
}

const refuse = (endpoint: Endpoint, status: number): never => {
  if (status === 429) throw new InviteError('limited', endpoint, status)
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
