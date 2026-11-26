import { RPC_MAINNET, RPC_TESTNET } from './links'

/** The three Hanzo chains. Chain ids from the node README and each RPC's eth_chainId (26 Nov 2026). Devnet has no public RPC: run it locally. */
export const NETWORKS = [
  { name: 'Mainnet', rpc: RPC_MAINNET, chainId: 36963 },
  { name: 'Testnet', rpc: RPC_TESTNET, chainId: 36962 },
  { name: 'Devnet', rpc: null, chainId: 36964 },
] as const
