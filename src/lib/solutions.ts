import type { Status } from '@/components/ui/tag'
import { DOCS_AGENTS, HIP_0901, NODE_GUIDE, WHITEPAPER } from './links'

export type Solution = { tag: Status; title: string; text: string; link: string; to: string }

/** The five solutions, once: the home cards draw them and a test holds public/llms.txt to the same titles, statuses and addresses. `models` is the live model count, or "hundreds of" while it loads. */
export const solutions = (models: string): Solution[] => [
  {
    tag: 'Designed',
    title: 'Verifiable inference',
    text: `Call ${models} models through one OpenAI-compatible API today. Proof of AI receipts are designed for open models such as Zen and are not switched on.`,
    link: 'Start building',
    to: '/build',
  },
  {
    tag: 'Designed',
    title: 'Mine AI with useful compute',
    text: 'Compute once, earn twice: providers keep the customer fee and, if mining activates, may also earn a declining AI reward. Mining stays disabled until the launch gates pass. Today a node runs tools and agents and is paid per job in stablecoins.',
    link: 'Node operator guide',
    to: NODE_GUIDE,
  },
  {
    tag: 'Live',
    title: 'Agents and metered compute',
    text: 'Give an agent its own API key with a monthly budget; calls stop when it is spent. On-chain agent wallets with spend caps are designed.',
    link: 'Agent docs',
    to: DOCS_AGENTS,
  },
  {
    tag: 'Designed',
    title: 'Models, training and contributions',
    text: 'Zen open-weight models are served today. Proofs for training and rewards for private contributions are specified in a draft proposal.',
    link: 'Read HIP-0901',
    to: HIP_0901,
  },
  {
    tag: 'Designed',
    title: 'Private post-quantum AI',
    text: 'Prompt sealing with X-Wing (X25519 + ML-KEM-768) and optional secure enclaves are specified. Succinct settlement on Z-Chain is audit-gated.',
    link: 'Read the whitepaper',
    to: WHITEPAPER,
  },
]
