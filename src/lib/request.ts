/** Why a request failed: no answer in time, the caller gave up, the server said no, or nothing came back. */
export type RequestFailure = 'timeout' | 'aborted' | 'status' | 'network'

/** `status` is the HTTP status when `kind` is 'status', otherwise 0; `headers` are that answer's headers (empty otherwise), so a caller can read Retry-After. */
export class RequestError extends Error {
  constructor(
    readonly kind: RequestFailure,
    message: string,
    readonly status = 0,
    readonly headers: Headers = new Headers(),
  ) {
    super(message)
  }
}

/**
 * The one way this site makes a network call: fetch with a deadline of `ms`.
 * Sends no cookies unless `init.credentials` says so. Returns only a 2xx response.
 * Throws a RequestError: 'timeout' after `ms`, 'aborted' when the caller's own signal fires
 * (it wins over a timeout that fires at the same moment), 'status' for a non-2xx answer,
 * 'network' when nothing came back.
 * The deadline is a plain timer, not AbortSignal.timeout, so fake clocks in tests can drive it.
 */
export async function request(url: string, init: RequestInit = {}, ms: number): Promise<Response> {
  const deadline = new AbortController()
  const timer = setTimeout(() => deadline.abort(), ms)
  const signal = init.signal ? AbortSignal.any([init.signal, deadline.signal]) : deadline.signal
  try {
    const res = await fetch(url, { credentials: 'omit', ...init, signal })
    if (!res.ok) throw new RequestError('status', `${url} answered ${res.status}`, res.status, res.headers)
    return res
  } catch (e) {
    if (e instanceof RequestError) throw e
    if (init.signal?.aborted) throw new RequestError('aborted', `${url} was cancelled`)
    if (deadline.signal.aborted) throw new RequestError('timeout', `${url} gave no answer in ${ms} ms`)
    throw new RequestError('network', `${url} failed: ${e instanceof Error ? e.message : String(e)}`)
  } finally {
    clearTimeout(timer)
  }
}
