import { RPC_MAINNET, RPC_TESTNET } from './links'

/**
 * The three Hanzo chains. Chain ids from the node README and each RPC's eth_chainId (26 Nov 2026). Devnet has no public RPC: run it locally.
 * currency is the native coin: mainnet's is "AI" (the explorer config, 18 decimals); no source states a symbol for testnet or devnet, so they have none.
 */
export const NETWORKS = [
  { name: 'Mainnet', rpc: RPC_MAINNET, chainId: 36963, currency: 'AI' },
  { name: 'Testnet', rpc: RPC_TESTNET, chainId: 36962, currency: null },
  { name: 'Devnet', rpc: null, chainId: 36964, currency: null },
] as const
