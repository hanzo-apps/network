import type { Status } from './status'
import { DOCS, EXPLORER, HANZO, HIPS, PAPERS, STATUS, VOTE, WORK, WORKS, ZEN } from './links'

export type Entry = { tag: Status; name: string; text: string; host: string; href: string }
export type Group = { title: string; entries: Entry[] }

/**
 * What exists around the network, once: /ecosystem draws it, and a test holds public/llms.txt to it.
 * Each entry was loaded and read on 26 Nov 2026; its tag is what the page showed, not what anyone says about it.
 */
export const GROUPS: Group[] = [
  {
    title: 'Hanzo',
    entries: [
      { tag: 'Live', name: 'Hanzo AI', text: 'Frontier and open models and agents on one cloud. Train on your data and run on infrastructure you control.', host: 'hanzo.ai', href: HANZO },
      { tag: 'Live', name: 'Zen models', text: 'Open-weight foundation models for agentic coding, served on Hanzo Cloud.', host: 'hanzo.ai/zen', href: ZEN },
      { tag: 'Live', name: 'Docs', text: 'Guides and references for the cloud, the API, MCP and the network.', host: 'docs.hanzo.ai', href: DOCS },
      { tag: 'Live', name: 'Hanzo Works', text: 'A browser extension, Hanzo Team, a bot for your team chat and 20 business apps on one login. Not part of the chain.', host: 'hanzo.works', href: WORKS },
      { tag: 'Live', name: 'Chain explorer', text: 'Search blocks, transactions and addresses on the Hanzo chain.', host: 'explore.hanzo.network', href: EXPLORER },
      { tag: 'Live', name: 'Platform status', text: "Health of Hanzo's platform. It does not monitor the chain RPC.", host: 'status.hanzo.network', href: STATUS },
      { tag: 'Designed', name: 'Work board', text: 'A DAO work board for goals and bounties. The board is up; no Hanzo bounties are live yet.', host: 'work.hanzo.network', href: WORK },
      { tag: 'In progress', name: 'Hanzo Vote', text: 'A governance dashboard. It says no Governor address is on record yet.', host: 'hanzo.vote', href: VOTE },
    ],
  },
  {
    title: 'Research and standards',
    entries: [
      { tag: 'Live', name: 'HIPs', text: "Hanzo Improvement Proposals: the standards for Hanzo's infrastructure.", host: 'hips.hanzo.ai', href: HIPS },
      { tag: 'Live', name: 'Papers', text: 'Technical papers on AI and post-quantum cryptography, including the AI Chain whitepaper.', host: 'papers.hanzo.ai', href: PAPERS },
    ],
  },
]

export const ENTRIES = GROUPS.flatMap((g) => g.entries)

/** One entry by name. */
export const entry = (name: string): Entry => {
  const e = ENTRIES.find((x) => x.name === name)
  if (!e) throw new Error(`no ecosystem entry named ${name}`)
  return e
}
