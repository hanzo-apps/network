import { useEffect, useState } from 'react'
import { RPC_MAINNET } from './links'
import { request, RequestError } from './request'

/** How long the chain has to answer before it counts as down. */
const WAIT_MS = 5000

/** Height of the chain behind `rpc`, read with eth_blockNumber. Throws on any bad answer, or none in 5 s. */
export async function blockHeight(rpc: string, signal?: AbortSignal): Promise<number> {
  const res = await request(
    rpc,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'eth_blockNumber', params: [] }),
      signal,
    },
    WAIT_MS,
  )
  const { result } = (await res.json()) as { result?: unknown }
  if (typeof result !== 'string' || !/^0x[0-9a-f]+$/i.test(result)) throw new Error('chain gave no block number')
  return Number.parseInt(result, 16)
}

export type ChainState = { status: 'loading' } | { status: 'live'; height: number } | { status: 'down' }

/** Polls the chain at `rpc` (mainnet by default) every 6 s while the tab is visible and reports each answer. A request with no answer in 5 s is "down". Returns the stop function. */
export function watchChain(report: (s: ChainState) => void, rpc: string = RPC_MAINNET): () => void {
  let ctl: AbortController | undefined
  const poll = () => {
    if (document.visibilityState !== 'visible') return
    ctl?.abort()
    const c = (ctl = new AbortController())
    blockHeight(rpc, c.signal).then(
      (height) => report({ status: 'live', height }),
      (e: unknown) => {
        // Cancelled by a newer poll or by stop: stay silent. A timeout or any failure is down.
        if (!(e instanceof RequestError && e.kind === 'aborted')) report({ status: 'down' })
      },
    )
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
export function useChain(rpc: string = RPC_MAINNET): ChainState {
  const [state, setState] = useState<ChainState>({ status: 'loading' })
  useEffect(() => {
    setState({ status: 'loading' })
    return watchChain(setState, rpc)
  }, [rpc])
  return state
}
