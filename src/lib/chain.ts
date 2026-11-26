import { useEffect, useState } from 'react'

const RPC = 'https://api.hanzo.network/v1/chain/hanzo'

/** Height of the Hanzo chain, read with eth_blockNumber. Throws on any bad answer. */
export async function blockHeight(signal?: AbortSignal): Promise<number> {
  const res = await fetch(RPC, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'eth_blockNumber', params: [] }),
    signal,
  })
  if (!res.ok) throw new Error(`chain answered ${res.status}`)
  const { result } = (await res.json()) as { result?: unknown }
  if (typeof result !== 'string' || !/^0x[0-9a-f]+$/i.test(result)) throw new Error('chain gave no block number')
  return Number.parseInt(result, 16)
}

export type ChainState = { status: 'loading' } | { status: 'live'; height: number } | { status: 'down' }

/** Polls the chain every 6 s while the tab is visible and reports each answer. A request with no answer in 5 s is "down". Returns the stop function. */
export function watchChain(report: (s: ChainState) => void): () => void {
  let ctl: AbortController | undefined
  const poll = () => {
    if (document.visibilityState !== 'visible') return
    ctl?.abort()
    const c = (ctl = new AbortController())
    let timedOut = false
    const timer = setTimeout(() => {
      timedOut = true
      c.abort()
    }, 5000)
    blockHeight(c.signal)
      .then(
        (height) => report({ status: 'live', height }),
        () => {
          // Aborted by a newer poll: stay silent. Aborted by the timeout, or failed: down.
          if (timedOut || !c.signal.aborted) report({ status: 'down' })
        },
      )
      .finally(() => clearTimeout(timer))
  }
  poll()
  const id = setInterval(poll, 6000)
  document.addEventListener('visibilitychange', poll)
  return () => {
    clearInterval(id)
    document.removeEventListener('visibilitychange', poll)
    ctl?.abort()
  }
}

/** loading until the first answer, then live or down. */
export function useChain(): ChainState {
  const [state, setState] = useState<ChainState>({ status: 'loading' })
  useEffect(() => watchChain(setState), [])
  return state
}
