import type { Status } from '@/components/ui/tag'
import { DOCS_AGENTS, EXPLORER, HIP_0901, HIP_1334, NODE_GUIDE, WORK } from './links'
import { NETWORKS } from './networks'

export type Pillar = { tag: Status; title: string; text: string; link: string; href: string }

/**
 * The six parts of the network, once: the home page draws them and a test holds public/llms.txt to the same titles, statuses, sentences and addresses.
 * The words are the CTO's redesign spec (sovereign per-model chains, never "subnet"); each tag is what the evidence supports today.
 */
export const PILLARS: Pillar[] = [
  {
    tag: 'Live',
    title: 'Maximum utility per node',
    text: 'hanzod is one Rust daemon per machine: local inference, Dev, Bot and Team backends and an optional validator. Today a node runs tools and agents and is paid per job in stablecoins.',
    link: 'Node operator guide',
    href: NODE_GUIDE,
  },
  {
    tag: 'Designed',
    title: 'Multi-intelligence consensus',
    text: 'Different models on bonded nodes settle policy votes and parameter medians on chain. A vote alone can never mint.',
    link: 'HIP-0901',
    href: HIP_0901,
  },
  {
    tag: 'Designed',
    title: 'Sovereign per-model chains',
    text: `A chain per model family or domain on Lux, with its own validators. Today there is one live chain, ID ${NETWORKS[0].chainId}, with a post-quantum handshake and ML-DSA validator identities.`,
    link: 'Explorer',
    href: EXPLORER,
  },
  {
    tag: 'In progress',
    title: 'Decentralized agentic commerce',
    text: 'Agents sign up with a wallet, hold a budgeted key and pay per call today. Fee burn, on-chain spend caps and a compute market are designed.',
    link: 'Agent docs',
    href: DOCS_AGENTS,
  },
  {
    tag: 'In progress',
    title: 'Self-upgrading autonomous research',
    text: "Hanzo's research runtime records datasets, runs, evaluations and claims. Promotion only by beating gates frozen in advance is designed. A draft spec, partly built, not yet tied to the chain.",
    link: 'HIP-1334',
    href: HIP_1334,
  },
  {
    tag: 'Designed',
    title: 'DAO goal-setting and human de-work',
    text: 'A DAO work board for goals and bounties. No Hanzo bounties are live yet.',
    link: 'Work board',
    href: WORK,
  },
]
