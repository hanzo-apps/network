import { INVITE_VERIFY, WAITLIST } from './links'

/** The one place the invite and queue endpoints are known. Anonymous JSON on api.hanzo.ai, no credentials. */

const WAIT_MS = 15_000

export type Role = 'operator' | 'builder' | 'holder'
/** Exactly one of email or handle. */
export type Entry = ({ email: string } | { handle: string }) & { role: Role }

/** `limited`: too many tries (429). `unavailable`: anything else that is not a clear answer. */
export class InviteError extends Error {
  constructor(readonly kind: 'limited' | 'unavailable') {
    super(`invite service: ${kind}`)
  }
}

/** POSTs `body` and returns the status and the parsed JSON (undefined when it is not JSON). A caller's abort is rethrown as is; everything else that fails is `unavailable`. */
async function post(url: string, body: unknown, signal?: AbortSignal): Promise<{ status: number; json: unknown }> {
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
    throw new InviteError('unavailable')
  } finally {
    clearTimeout(timer)
    signal?.removeEventListener('abort', stop)
  }
}

const refuse = (status: number): never => {
  throw new InviteError(status === 429 ? 'limited' : 'unavailable')
}

/** Is `code` a real invite code? The server never says why a code is not. Throws InviteError when it cannot say yes or no. */
export async function verify(code: string, signal?: AbortSignal): Promise<boolean> {
  const { status, json } = await post(INVITE_VERIFY, { code }, signal)
  if (status !== 200) return refuse(status)
  const valid = (json as { valid?: unknown } | undefined)?.valid
  if (typeof valid !== 'boolean') throw new InviteError('unavailable')
  return valid
}

/** Puts `entry` in the queue. The answer is the same for a new and a repeat entry. Throws InviteError unless the queue took it. */
export async function join(entry: Entry, signal?: AbortSignal): Promise<void> {
  const { status } = await post(WAITLIST, { ...entry, source: 'hanzo.network/early' }, signal)
  if (status !== 202) refuse(status)
}
