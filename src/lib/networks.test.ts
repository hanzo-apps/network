import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { COMMANDS, CHAIN_CURL, DEVNET_COMMAND, VALIDATOR_COMMAND } from '../components/build/commands'
import { CURL_QUICKSTART } from './quickstart'
import { NETWORKS } from './networks'
import { MARKET_PAPER, POAI_PDF, RELATED_WORK, RPC_MAINNET, RPC_TESTNET } from './links'
import { solutions } from './solutions'

const llms = readFileSync('public/llms.txt', 'utf8')

describe('NETWORKS', () => {
  it('records the chain ids the facts sheet read from the node README and the live RPCs', () => {
    expect(NETWORKS.map((n) => [n.name, n.chainId])).toEqual([
      ['Mainnet', 36963],
      ['Testnet', 36962],
      ['Devnet', 36964],
    ])
  })

  it('has the public RPC for mainnet and testnet and none for devnet', () => {
    expect(NETWORKS.map((n) => n.rpc)).toEqual([RPC_MAINNET, RPC_TESTNET, null])
    expect(RPC_MAINNET).toBe('https://api.hanzo.network/v1/bc/hanzo/rpc')
    expect(RPC_TESTNET).toBe('https://api.hanzo-test.network/v1/bc/hanzo/rpc')
  })

  it('names the native coin of mainnet (the explorer config says AI) and none for testnet or devnet, which no source states', () => {
    expect(NETWORKS.map((n) => [n.name, n.currency])).toEqual([
      ['Mainnet', 'AI'],
      ['Testnet', null],
      ['Devnet', null],
    ])
  })

  it('uses the hex chain id the RPC answers with', () => {
    expect(NETWORKS.map((n) => '0x' + n.chainId.toString(16))).toEqual(['0x9063', '0x9062', '0x9064'])
  })
})

describe('commands', () => {
  it('prints the four connect commands from the spec, and none from the facts sheet\'s list of wrong ones', () => {
    expect(COMMANDS.map((c) => c.label)).toEqual(['Claude Code', 'Codex', 'Cursor and other MCP clients', 'Hosted, needs sign-in'])
    expect(COMMANDS[0].text).toBe('claude mcp add --scope user hanzo -- npx -y hanzo mcp')
    expect(COMMANDS[1].text).toBe('codex mcp add hanzo -- npx -y hanzo mcp')
    expect(COMMANDS[3].text).toBe('claude mcp add --transport http hanzo-cloud https://api.hanzo.ai/v1/mcp')
    for (const c of COMMANDS) expect(c.text).not.toMatch(/fabric|docs\.hanzo\.ai\/mcp/)
  })

  it('has a Cursor snippet that is valid JSON naming the same command', () => {
    expect(JSON.parse(COMMANDS[2].text)).toEqual({ mcpServers: { hanzo: { command: 'npx', args: ['-y', 'hanzo', 'mcp'] } } })
  })

  it('opts a machine in with hanzo chain, never the deprecated alias', () => {
    expect(VALIDATOR_COMMAND).toBe('hanzo chain up testnet')
    expect(VALIDATOR_COMMAND).not.toMatch(/fabric/)
  })

  it('reads the chain with the mainnet RPC and eth_blockNumber', () => {
    expect(CHAIN_CURL).toContain(RPC_MAINNET)
    expect(CHAIN_CURL).toContain('"method":"eth_blockNumber"')
  })

  it('keeps the curl quickstart Pricing shows', () => {
    expect(CURL_QUICKSTART).toContain('https://api.hanzo.ai/v1/chat/completions')
    expect(CURL_QUICKSTART).toContain('"model":"hanzo/zen"')
  })
})

describe('public/llms.txt', () => {
  it('has the shape of docs.base.org/llms.txt', () => {
    expect(llms.startsWith('# Hanzo Network\n')).toBe(true)
    for (const h of ['## Agent Instructions', '## Connect your agent', '## Network details', '## How Proof of AI checks', '## Solutions', '## Status of the network', '## Economics', '## Ecosystem', '## Sources']) {
      expect(llms).toContain(h)
    }
  })

  it('names every RPC URL and every chain id', () => {
    for (const n of NETWORKS) {
      if (n.rpc) expect(llms).toContain(n.rpc)
      expect(llms).toContain(String(n.chainId))
    }
  })

  it('contains every command the build page prints, character for character', () => {
    for (const text of [...COMMANDS.map((c) => c.text), CHAIN_CURL, CURL_QUICKSTART, DEVNET_COMMAND, VALIDATOR_COMMAND]) expect(llms).toContain(text)
  })

  it('carries the currency row, the validator steps and the three paper links', () => {
    expect(llms).toContain('| Currency | AI | none | none |')
    expect(llms).toContain('hanzo chain status')
    expect(llms).toContain('hanzo chain down')
    for (const url of [POAI_PDF, RELATED_WORK, MARKET_PAPER]) expect(llms).toContain(`](${url})`)
    expect(llms).toContain('2^61 - 1')
    expect(llms).toContain('2^-122')
  })

  it('is plain ASCII and never points at the redirect page or the unsupported command', () => {
    expect([...llms].filter((c) => c !== '\n' && (c < ' ' || c > '~'))).toEqual([])
    expect(llms).not.toMatch(/fabric/)
    expect(llms).not.toContain('docs.hanzo.ai/mcp')
  })

  it('lists every solution the home cards show, with the same title, status word and address', () => {
    const lines = llms.split('## Solutions')[1].split('\n## ')[0].split('\n').filter((l) => l.startsWith('- ['))
    const all = solutions('N')
    expect(lines).toHaveLength(all.length)
    for (const [i, c] of all.entries()) {
      const url = c.to.startsWith('/') ? `https://hanzo.network${c.to}` : c.to
      expect(lines[i]).toContain(`[${c.title}](${url}): ${c.tag}.`)
    }
  })

  it('lists every source as "- [Title](url): sentence." and every link resolves to a constant in links.ts', () => {
    const items = llms.split('\n').filter((l) => l.startsWith('- ['))
    expect(items.length).toBeGreaterThan(10)
    for (const l of items) expect(l).toMatch(/^- \[[^\]]+\]\(https?:\/\/[^)\s]+\): .+\.$/)
    const links = readFileSync('src/lib/links.ts', 'utf8')
    for (const l of items) {
      const url = /\((https?:\/\/[^)]+)\)/.exec(l)![1]
      if (!url.startsWith('https://hanzo.network')) expect(links).toContain(`'${url}'`)
    }
  })
})
