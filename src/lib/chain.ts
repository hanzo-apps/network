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

/** The latest block, polled every 6 s while the tab is visible. null until known or when the chain is unreachable. */
export function useBlockHeight(): number | null {
  const [height, setHeight] = useState<number | null>(null)
  useEffect(() => {
    let ctl: AbortController | undefined
    const poll = () => {
      if (document.visibilityState !== 'visible') return
      ctl?.abort()
      ctl = new AbortController()
      blockHeight(ctl.signal).then(setHeight, () => {
        if (!ctl?.signal.aborted) setHeight(null)
      })
    }
    poll()
    const id = setInterval(poll, 6000)
    document.addEventListener('visibilitychange', poll)
    return () => {
      clearInterval(id)
      document.removeEventListener('visibilitychange', poll)
      ctl?.abort()
    }
  }, [])
  return height
}
