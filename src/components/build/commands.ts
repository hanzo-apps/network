import { API_CHAT, API_MCP, RPC_MAINNET } from '../../lib/links'

/** The commands the Build page prints. public/llms.txt must carry every one (src/lib/networks.test.ts). */
export const COMMANDS = [
  { label: 'Claude Code', text: 'claude mcp add --scope user hanzo -- npx -y hanzo mcp' },
  { label: 'Codex', text: 'codex mcp add hanzo -- npx -y hanzo mcp' },
  {
    label: 'Cursor and other MCP clients',
    text: `{
  "mcpServers": {
    "hanzo": {
      "command": "npx",
      "args": ["-y", "hanzo", "mcp"]
    }
  }
}`,
  },
  { label: 'Hosted, needs sign-in', text: `claude mcp add --transport http hanzo-cloud ${API_MCP}` },
] as const

export const DEVNET_COMMAND = 'hanzod --network devnet'

/** The first call, shown on /pricing and /build. */
export const CURL_QUICKSTART = `curl ${API_CHAT} \\
  -H "Authorization: Bearer $HANZO_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"hanzo/zen","messages":[{"role":"user","content":"Hello"}]}'`

/** Read the chain, no key needed. */
export const CHAIN_CURL = `curl -s -X POST ${RPC_MAINNET} -H 'content-type: application/json' -d '{"jsonrpc":"2.0","id":1,"method":"eth_blockNumber","params":[]}'`
