import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  Code2,
  Copy,
  Cpu,
  FileText,
  KeyRound,
  Layers,
  Lock,
  Server,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { NetworkShell } from "@/components/network/NetworkShell";
import { useLiveChain } from "@/lib/networkData";
import { useLogin } from "@/components/Try";

type AgentTabId = "claude" | "codex" | "hanzo" | "cursor";

interface AgentSnippet {
  id: AgentTabId;
  label: string;
  subtitle: string;
  filename: string;
  code: string;
}

const AGENT_SNIPPETS: AgentSnippet[] = [
  {
    id: "claude",
    label: "Claude Code",
    subtitle: "Register the remote Hanzo documentation MCP server directly in Claude Code.",
    filename: "terminal",
    code: "claude mcp add --transport http hanzo-docs https://docs.hanzo.ai/mcp",
  },
  {
    id: "codex",
    label: "Codex",
    subtitle: "Attach live Hanzo Network & Proof of AI docs to OpenAI Codex CLI.",
    filename: "terminal",
    code: "codex mcp add hanzo-docs --url https://docs.hanzo.ai/mcp",
  },
  {
    id: "hanzo",
    label: "Hanzo Dev / MCP",
    subtitle: "Run the portable Hanzo MCP server for tools, search, code intelligence, and chain ops.",
    filename: "terminal",
    code: "npx -y hanzo mcp",
  },
  {
    id: "cursor",
    label: "Cursor",
    subtitle: "Drop into .cursor/mcp.json (project) or ~/.cursor/mcp.json (global).",
    filename: "mcp.json",
    code: `{
  "mcpServers": {
    "hanzo-docs": {
      "url": "https://docs.hanzo.ai/mcp"
    }
  }
}`,
  },
];

const STATIC_LLM_INDEXES = [
  {
    label: "hanzo.network/llms.txt",
    href: "https://hanzo.network/llms.txt",
    desc: "Network endpoints, Chain 36963 specs, Proof of AI summary, and ecosystem map.",
  },
  {
    label: "docs.hanzo.ai/llms.txt",
    href: "https://docs.hanzo.ai/llms.txt",
    desc: "Concise index of Hanzo platform, SDK, MCP, and sovereign chain docs.",
  },
  {
    label: "docs.hanzo.ai/llms-full.txt",
    href: "https://docs.hanzo.ai/llms-full.txt",
    desc: "Full markdown documentation corpus formatted for long-context retrieval.",
  },
] as const;

const CURL_SNIPPET = `curl https://api.hanzo.ai/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $HANZO_API_KEY" \\
  -d '{
    "model": "zen4",
    "messages": [
      { "role": "user", "content": "Explain CPU-verifiable Proof of AI in three lines." }
    ]
  }'`;

const NODE_BOOTSTRAP_CMD = "hanzo fabric up";

const RESEARCH_AND_SPECS = [
  {
    category: "Whitepaper",
    title: "Hanzo AI Chain Specification",
    description:
      "End-to-end architecture for CPU-verifiable Proof of AI, A-Chain work receipts, Z-Chain P3Q succinct rollups, and omnichain settlement.",
    href: "https://papers.hanzo.ai/hanzo-ai-chain/",
    displayUrl: "papers.hanzo.ai/hanzo-ai-chain/",
  },
  {
    category: "Papers",
    title: "Hanzo Research Archive",
    description:
      "Published technical papers covering decentralized training, Zen model scaling, verifiable inference, and sovereign intelligence chains.",
    href: "https://papers.hanzo.ai",
    displayUrl: "papers.hanzo.ai",
  },
  {
    category: "Deep Dive",
    title: "Proof of AI Technical Essay",
    description:
      "Why useful AI execution replaces wasted hashing, how exact-integer transcripts verify on ordinary CPUs, and how halving eras work.",
    href: "https://hanzo.blog/proof-of-ai/",
    displayUrl: "hanzo.blog/proof-of-ai/",
  },
  {
    category: "Standards",
    title: "Hanzo Improvement Proposals (HIPs)",
    description:
      "Normative protocol specifications including HIP-1334 frozen-gate research promotions, sovereign per-model chains, and MCP standards.",
    href: "https://hips.hanzo.ai",
    displayUrl: "hips.hanzo.ai",
  },
  {
    category: "Verification",
    title: "Formal Proofs Registry",
    description:
      "Machine-checked proofs for AI agents, ML frameworks, cryptographic receipts, and distributed compute invariants.",
    href: "https://proofs.hanzo.network",
    displayUrl: "proofs.hanzo.network",
  },
  {
    category: "Docs",
    title: "Network Overview & RPC Reference",
    description:
      "JSON-RPC endpoints, chain parameters, wallet configuration, and sovereign intelligence chain deployment guides.",
    href: "https://docs.hanzo.ai/docs/network",
    displayUrl: "docs.hanzo.ai/docs/network",
  },
  {
    category: "Docs",
    title: "Proof of AI Protocol Guide",
    description:
      "Workload admission, commitment windows, challenge proofs, and payout nullifiers across A-Chain and Z-Chain.",
    href: "https://docs.hanzo.ai/docs/proof-of-ai",
    displayUrl: "docs.hanzo.ai/docs/proof-of-ai",
  },
  {
    category: "Operators",
    title: "Node Operator Runbook",
    description:
      "Hardware sizing, hanzod single-binary setup, k3s/cloud fabric orchestration, and Era 1 mining qualification.",
    href: "https://docs.hanzo.ai/docs/proof-of-ai/node-operator",
    displayUrl: "docs.hanzo.ai/docs/proof-of-ai/node-operator",
  },
  {
    category: "Chains",
    title: "Sovereign Intelligence Chains",
    description:
      "Architecture for deploying dedicated per-model chains and application-specific intelligence chains backed by Lux finality.",
    href: "https://hanzo.ai/blockchain/chains",
    displayUrl: "hanzo.ai/blockchain/chains",
  },
] as const;

function CopyButton({
  value,
  label = "Copy",
  className = "",
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable in restricted context
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied to clipboard" : `Copy ${label}`}
      className={`inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-1.5 font-mono text-xs text-[var(--foreground)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-elevated)] transition-colors ${className}`}
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      <span>{copied ? "Copied" : label}</span>
    </button>
  );
}

export function NetworkBuild() {
  const chain = useLiveChain();
  const loginHref = useLogin();
  const [activeAgentTab, setActiveAgentTab] = useState<AgentTabId>("claude");

  useEffect(() => {
    document.title = "Build — Hanzo Network";
  }, []);

  const currentSnippet =
    AGENT_SNIPPETS.find((item) => item.id === activeAgentTab) ?? AGENT_SNIPPETS[0];

  const liveBlockLabel =
    chain.status === "live" && chain.blockNumber !== null
      ? `Block #${chain.blockNumber.toLocaleString()}`
      : chain.status === "loading"
        ? "Syncing RPC…"
        : "RPC Check";

  return (
    <NetworkShell>
      {/* Hero */}
      <section className="border-b border-[var(--border)] bg-[var(--background)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
              <Terminal className="h-3.5 w-3.5 text-[var(--foreground)]" />
              Agent-First Developer Hub
            </span>
            <a
              href="https://explore.hanzo.network"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 font-mono text-[11px] text-[var(--foreground)] hover:border-[var(--border-strong)] transition-colors tabular-nums"
            >
              <span
                className={`h-1.5 w-1.5 rounded-full bg-[var(--foreground)] ${
                  chain.status === "live" ? "opacity-100" : "opacity-40"
                }`}
              />
              <span>Mainnet 36963</span>
              <span className="text-[var(--muted-foreground)]">·</span>
              <span>{liveBlockLabel}</span>
              {chain.status === "live" && chain.latencyMs !== null ? (
                <>
                  <span className="text-[var(--muted-foreground)]">·</span>
                  <span className="text-[var(--muted-foreground)]">{chain.latencyMs}ms</span>
                </>
              ) : null}
            </a>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.06] text-[var(--foreground)]">
              Build for agents, models, and sovereign chains.
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-[var(--muted-foreground)]">
              Wire your coding agent directly into live Hanzo docs over MCP, run a single-binary{" "}
              <code className="font-mono text-sm text-[var(--foreground)]">hanzod</code> node
              combining cloud, AI, and chain validation, or deploy sovereign per-model chains with
              Proof of AI settlement.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={loginHref}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-2.5 text-sm font-semibold text-[var(--background)] hover:opacity-85 transition-opacity"
            >
              <KeyRound className="h-4 w-4" />
              <span>Get API Key</span>
            </a>
            <Link
              to="/early"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--background)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface-elevated)] transition-colors"
            >
              <Lock className="h-4 w-4" />
              <span>Era 1 Node Whitelist</span>
            </Link>
            <a
              href="https://docs.hanzo.ai/docs/network"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)] hover:border-[var(--border-strong)] transition-colors"
            >
              <span>Network Docs</span>
              <ArrowUpRight className="h-4 w-4 opacity-70" />
            </a>
          </div>
        </div>
      </section>

      {/* Section 1: Connect Your Agent First */}
      <section id="connect-agent" className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
                01 · Connect Your Agent First
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--foreground)]">
                Give your agent live protocol docs before writing line one.
              </h2>
              <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                Every Hanzo Network spec, RPC schema, HIP, and SDK reference is published over
                hosted Streamable HTTP MCP at{" "}
                <a
                  href="https://docs.hanzo.ai/mcp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[var(--foreground)] underline underline-offset-4 hover:opacity-80"
                >
                  docs.hanzo.ai/mcp
                </a>{" "}
                and mirrored as static <code className="font-mono text-xs text-[var(--foreground)]">llms.txt</code>{" "}
                manifests for zero-hallucination retrieval.
              </p>

              {/* Static LLM Indexes */}
              <div className="pt-2 space-y-2">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                  Static LLM Indexes
                </div>
                <div className="divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-[var(--background)]">
                  {STATIC_LLM_INDEXES.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start justify-between gap-3 p-3.5 hover:bg-[var(--surface-elevated)] transition-colors first:rounded-t-2xl last:rounded-b-2xl"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 font-mono text-xs font-medium text-[var(--foreground)]">
                          <FileText className="h-3.5 w-3.5 shrink-0 text-[var(--muted-foreground)]" />
                          <span className="truncate">{item.label}</span>
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-[var(--muted-foreground)]">
                          {item.desc}
                        </p>
                      </div>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors mt-0.5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive MCP Tab Card */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--background)] overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3">
                  <div
                    role="tablist"
                    aria-label="Select coding agent"
                    className="flex flex-wrap items-center gap-1.5"
                  >
                    {AGENT_SNIPPETS.map((tab) => {
                      const active = tab.id === activeAgentTab;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          onClick={() => setActiveAgentTab(tab.id)}
                          className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                            active
                              ? "bg-[var(--foreground)] text-[var(--background)]"
                              : "text-[var(--muted-foreground)] hover:bg-[var(--background)] hover:text-[var(--foreground)]"
                          }`}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                  <CopyButton value={currentSnippet.code} label="Copy snippet" />
                </div>

                <div className="p-5 sm:p-6">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <p className="text-xs text-[var(--muted-foreground)]">
                      {currentSnippet.subtitle}
                    </p>
                    <span className="shrink-0 font-mono text-[11px] text-[var(--muted-foreground)]">
                      {currentSnippet.filename}
                    </span>
                  </div>
                  <pre className="overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-xs sm:text-[13px] leading-relaxed text-[var(--foreground)]">
                    <code>{currentSnippet.code}</code>
                  </pre>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] pt-4 text-xs text-[var(--muted-foreground)]">
                    <span>
                      Direct MCP URL:{" "}
                      <code className="font-mono text-[var(--foreground)]">
                        https://docs.hanzo.ai/mcp
                      </code>
                    </span>
                    <a
                      href="https://docs.hanzo.ai/mcp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-[var(--foreground)] hover:opacity-75 transition-opacity"
                    >
                      <span>Inspect endpoint</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Network Details Table */}
      <section id="networks" className="border-b border-[var(--border)] bg-[var(--background)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)] mb-2">
                02 · Chain Endpoints
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--foreground)]">
                Network details & sovereign chain RPCs.
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-[var(--muted-foreground)]">
                Hanzo primary EVM endpoints plus local single-node devnet. Sovereign per-model
                chains and application-specific intelligence chains anchor finality into the same
                post-quantum root.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href="https://status.hanzo.network"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 py-1.5 text-xs font-medium text-[var(--foreground)] hover:border-[var(--border-strong)] transition-colors"
              >
                <span>Network Status</span>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
              </a>
              <a
                href="https://hanzo.ai/blockchain/chains"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 py-1.5 text-xs font-medium text-[var(--foreground)] hover:border-[var(--border-strong)] transition-colors"
              >
                <span>Sovereign Chains</span>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
              </a>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--surface-elevated)] font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                  <th className="px-5 py-3.5 font-medium">Network</th>
                  <th className="px-5 py-3.5 font-medium">Chain ID</th>
                  <th className="px-5 py-3.5 font-medium">RPC / Bootstrap</th>
                  <th className="px-5 py-3.5 font-medium">Explorer</th>
                  <th className="px-5 py-3.5 font-medium text-right">Live Telemetry</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {/* Mainnet */}
                <tr className="bg-[var(--background)] hover:bg-[var(--surface)] transition-colors">
                  <td className="px-5 py-4 align-middle">
                    <div className="font-semibold text-[var(--foreground)]">Hanzo Mainnet</div>
                    <div className="text-xs text-[var(--muted-foreground)]">
                      Production sovereign L1 · AI native asset
                    </div>
                  </td>
                  <td className="px-5 py-4 align-middle font-mono tabular-nums text-[var(--foreground)]">
                    36963
                    <span className="ml-2 text-xs text-[var(--muted-foreground)]">(0x9063)</span>
                  </td>
                  <td className="px-5 py-4 align-middle">
                    <div className="flex items-center gap-2">
                      <code className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 font-mono text-xs text-[var(--foreground)]">
                        https://api.hanzo.network/v1/bc/hanzo/rpc
                      </code>
                      <CopyButton
                        value="https://api.hanzo.network/v1/bc/hanzo/rpc"
                        label="Copy"
                        className="px-2.5 py-1 text-[11px]"
                      />
                    </div>
                  </td>
                  <td className="px-5 py-4 align-middle">
                    <a
                      href="https://explore.hanzo.network"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-xs text-[var(--foreground)] underline underline-offset-4 hover:opacity-75"
                    >
                      <span>explore.hanzo.network</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </td>
                  <td className="px-5 py-4 align-middle text-right">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-3 py-1 font-mono text-xs text-[var(--foreground)] tabular-nums">
                      <span
                        className={`h-1.5 w-1.5 rounded-full bg-[var(--foreground)] ${
                          chain.status === "live" ? "opacity-100" : "opacity-40"
                        }`}
                      />
                      <span>{liveBlockLabel}</span>
                    </span>
                  </td>
                </tr>

                {/* Testnet */}
                <tr className="bg-[var(--background)] hover:bg-[var(--surface)] transition-colors">
                  <td className="px-5 py-4 align-middle">
                    <div className="font-semibold text-[var(--foreground)]">Hanzo Testnet</div>
                    <div className="text-xs text-[var(--muted-foreground)]">
                      Public staging & PoAI challenge testing
                    </div>
                  </td>
                  <td className="px-5 py-4 align-middle font-mono tabular-nums text-[var(--foreground)]">
                    36962
                    <span className="ml-2 text-xs text-[var(--muted-foreground)]">(0x9062)</span>
                  </td>
                  <td className="px-5 py-4 align-middle">
                    <div className="flex items-center gap-2">
                      <code className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 font-mono text-xs text-[var(--foreground)]">
                        https://api.hanzo-test.network/v1/bc/hanzo/rpc
                      </code>
                      <CopyButton
                        value="https://api.hanzo-test.network/v1/bc/hanzo/rpc"
                        label="Copy"
                        className="px-2.5 py-1 text-[11px]"
                      />
                    </div>
                  </td>
                  <td className="px-5 py-4 align-middle font-mono text-xs text-[var(--muted-foreground)]">
                    Testnet RPC
                  </td>
                  <td className="px-5 py-4 align-middle text-right">
                    <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 font-mono text-xs text-[var(--muted-foreground)]">
                      Public Testnet
                    </span>
                  </td>
                </tr>

                {/* Devnet */}
                <tr className="bg-[var(--background)] hover:bg-[var(--surface)] transition-colors">
                  <td className="px-5 py-4 align-middle">
                    <div className="font-semibold text-[var(--foreground)]">Hanzo Devnet</div>
                    <div className="text-xs text-[var(--muted-foreground)]">
                      Instant local sovereign chain for CI & contract tests
                    </div>
                  </td>
                  <td className="px-5 py-4 align-middle font-mono tabular-nums text-[var(--foreground)]">
                    36964
                    <span className="ml-2 text-xs text-[var(--muted-foreground)]">(0x9064)</span>
                  </td>
                  <td className="px-5 py-4 align-middle">
                    <div className="flex items-center gap-2">
                      <code className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 font-mono text-xs text-[var(--foreground)]">
                        hanzod --network devnet
                      </code>
                      <CopyButton
                        value="hanzod --network devnet"
                        label="Copy"
                        className="px-2.5 py-1 text-[11px]"
                      />
                    </div>
                  </td>
                  <td className="px-5 py-4 align-middle font-mono text-xs text-[var(--muted-foreground)]">
                    Local RPC
                  </td>
                  <td className="px-5 py-4 align-middle text-right">
                    <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 font-mono text-xs text-[var(--muted-foreground)]">
                      Local Binary
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 3: Incentivized Building & High-Utility Nodes */}
      <section className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <div className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)] mb-2">
              03 · Incentivized Building & High-Utility Nodes
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--foreground)]">
              Run one binary. Earn from compute, code, and verified research.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* High-Utility Node Card */}
            <div className="flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 sm:p-8">
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--foreground)]">
                    <Server className="h-5 w-5" />
                  </span>
                  <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                    Single Rust Binary
                  </span>
                </div>

                <h3 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
                  Run a High-Utility{" "}
                  <code className="font-mono text-lg">hanzod</code> Node
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)]">
                  One Rust binary unifies k3s/cloud workload scheduling, GPU/CPU model inference,
                  autonomous agent runtimes, <code className="font-mono text-xs text-[var(--foreground)]">/v1/research</code>{" "}
                  evaluation pipelines, and sovereign chain validation. Keep customer workload fees
                  and qualify for declining Era 1 Proof of AI mining emissions on verified work.
                </p>

                <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="font-mono text-xs text-[var(--muted-foreground)]">$</span>
                    <code className="truncate font-mono text-sm text-[var(--foreground)]">
                      {NODE_BOOTSTRAP_CMD}
                    </code>
                  </div>
                  <CopyButton value={NODE_BOOTSTRAP_CMD} label="Copy" />
                </div>

                <ul className="mt-5 space-y-2 text-xs sm:text-sm text-[var(--muted-foreground)]">
                  <li className="flex items-start gap-2">
                    <Cpu className="h-4 w-4 shrink-0 text-[var(--foreground)] mt-0.5" />
                    <span>
                      Full k3s/cloud + inference + agents + <code className="font-mono text-xs text-[var(--foreground)]">/v1/research</code> + chain validation in one deployable unit.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-[var(--foreground)] mt-0.5" />
                    <span>
                      CPU-verifiable exact-integer transcripts settle through A-Chain and P3Q on Z-Chain.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-[var(--border)] pt-5">
                <Link
                  to="/early"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-4 py-2 text-xs sm:text-sm font-semibold text-[var(--background)] hover:opacity-85 transition-opacity"
                >
                  <Lock className="h-3.5 w-3.5" />
                  <span>Era 1 Mining Whitelist</span>
                </Link>
                <a
                  href="https://docs.hanzo.ai/docs/proof-of-ai/node-operator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-strong)] px-4 py-2 text-xs sm:text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface-elevated)] transition-colors"
                >
                  <span>Node Operator Guide</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Ship Apps, Models, Agents & Research Card */}
            <div className="flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 sm:p-8">
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--foreground)]">
                    <Layers className="h-5 w-5" />
                  </span>
                  <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                    Royalties & Genesis Points
                  </span>
                </div>

                <h3 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
                  Ship Apps, Models, Agents & Research
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)]">
                  Every verifiable contribution compounds into developer royalties and Genesis
                  Builder Points tracked on the unified Hanzo Network points graph:
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3.5">
                    <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                      API Routing
                    </div>
                    <div className="mt-1 text-sm font-semibold text-[var(--foreground)]">
                      Verified API Calls
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--muted-foreground)]">
                      Route production traffic through <code className="font-mono">api.hanzo.ai</code>{" "}
                      with attributed app keys and metered receipts.
                    </p>
                  </div>

                  <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3.5">
                    <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                      Commerce
                    </div>
                    <div className="mt-1 text-sm font-semibold text-[var(--foreground)]">
                      hanzo.market Listings
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--muted-foreground)]">
                      Publish agents, apps, skills, and MCP servers to earn recurring commerce
                      royalties.
                    </p>
                  </div>

                  <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3.5">
                    <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                      HIP-1334
                    </div>
                    <div className="mt-1 text-sm font-semibold text-[var(--foreground)]">
                      /v1/research Promotions
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--muted-foreground)]">
                      Pass frozen-gate evaluations to promote checkpoints, weights, and agent
                      policies on-chain.
                    </p>
                  </div>

                  <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3.5">
                    <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                      De-Work
                    </div>
                    <div className="mt-1 text-sm font-semibold text-[var(--foreground)]">
                      work.hanzo.network
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--muted-foreground)]">
                      Claim protocol bounties, curate datasets, and audit evaluation gates for
                      direct rewards.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-[var(--border)] pt-5">
                <a
                  href="https://hanzo.market"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[var(--foreground)] px-4 py-2 text-xs sm:text-sm font-semibold text-[var(--background)] hover:opacity-85 transition-opacity"
                >
                  <span>Publish on hanzo.market</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <a
                  href="https://work.hanzo.network"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-strong)] px-4 py-2 text-xs sm:text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface-elevated)] transition-colors"
                >
                  <span>Browse Bounties</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <a
                  href="https://hips.hanzo.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  <span>HIP-1334 Spec</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: 3-Step First API Call */}
      <section id="quickstart" className="border-b border-[var(--border)] bg-[var(--background)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-10">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)] mb-2">
                04 · 3-Step First API Call
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--foreground)]">
                Ship your first inference call in 60 seconds.
              </h2>
            </div>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--foreground)] hover:opacity-75 transition-opacity"
            >
              <span>Inspect live model catalog</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[var(--muted-foreground)]">STEP 01</span>
                  <a
                    href={loginHref}
                    className="inline-flex items-center gap-1 font-mono text-xs font-medium text-[var(--foreground)] underline underline-offset-4 hover:opacity-75"
                  >
                    <span>hanzo.ai/login</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
                <h3 className="mt-2 text-base font-semibold text-[var(--foreground)]">
                  Provision your API key
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[var(--muted-foreground)]">
                  Sign in via Hanzo IAM to generate a scoped API key and export it as{" "}
                  <code className="font-mono text-xs text-[var(--foreground)]">HANZO_API_KEY</code>.
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[var(--muted-foreground)]">STEP 02</span>
                  <span className="font-mono text-xs text-[var(--muted-foreground)]">
                    OpenAI-Compatible
                  </span>
                </div>
                <h3 className="mt-2 text-base font-semibold text-[var(--foreground)]">
                  Call <code className="font-mono text-sm">api.hanzo.ai/v1/chat/completions</code>
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[var(--muted-foreground)]">
                  Point any OpenAI SDK, CLI agent, or <code className="font-mono text-xs text-[var(--foreground)]">curl</code>{" "}
                  request at <code className="font-mono text-xs text-[var(--foreground)]">https://api.hanzo.ai/v1</code>{" "}
                  to route across Zen and frontier models.
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[var(--muted-foreground)]">STEP 03</span>
                  <Link
                    to="/ecosystem"
                    className="inline-flex items-center gap-1 font-mono text-xs font-medium text-[var(--foreground)] underline underline-offset-4 hover:opacity-75"
                  >
                    <span>Explore Ecosystem</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
                <h3 className="mt-2 text-base font-semibold text-[var(--foreground)]">
                  Verify receipts & scale to sovereign chains
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[var(--muted-foreground)]">
                  Track chain settlement on{" "}
                  <a
                    href="https://explore.hanzo.network"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--foreground)] underline underline-offset-4"
                  >
                    explore.hanzo.network
                  </a>{" "}
                  and graduate heavy model workloads onto dedicated per-model intelligence chains.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col">
              <div className="flex-1 flex flex-col rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] overflow-hidden">
                <div className="flex items-center justify-between gap-2 border-b border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3">
                  <div className="flex items-center gap-2 font-mono text-xs text-[var(--foreground)]">
                    <Code2 className="h-4 w-4 text-[var(--muted-foreground)]" />
                    <span>POST https://api.hanzo.ai/v1/chat/completions</span>
                  </div>
                  <CopyButton value={CURL_SNIPPET} label="Copy curl" />
                </div>
                <pre className="flex-1 overflow-x-auto bg-[var(--background)] p-5 sm:p-6 font-mono text-xs sm:text-[13px] leading-relaxed text-[var(--foreground)]">
                  <code>{CURL_SNIPPET}</code>
                </pre>
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] bg-[var(--surface)] px-5 py-3.5 text-xs text-[var(--muted-foreground)]">
                  <span>
                    Base URL:{" "}
                    <code className="font-mono text-[var(--foreground)]">
                      https://api.hanzo.ai/v1
                    </code>
                  </span>
                  <div className="flex items-center gap-4">
                    <a
                      href={loginHref}
                      className="font-medium text-[var(--foreground)] hover:opacity-75 transition-opacity"
                    >
                      Get API Key →
                    </a>
                    <Link
                      to="/pricing"
                      className="font-medium text-[var(--foreground)] hover:opacity-75 transition-opacity"
                    >
                      Model IDs →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Authoritative Research, HIPs & Proofs Index */}
      <section id="references" className="bg-[var(--surface)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <div className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)] mb-2">
              05 · Authoritative Index
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--foreground)]">
              Research papers, HIPs, formal proofs & docs.
            </h2>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              Canonical specifications and verification artifacts maintained by Hanzo Industries and
              protocol contributors.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {RESEARCH_AND_SPECS.map((doc) => (
              <a
                key={doc.href}
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5 hover:border-[var(--border-strong)] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                      {doc.category}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors" />
                  </div>
                  <h3 className="text-base font-semibold text-[var(--foreground)]">
                    {doc.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[var(--muted-foreground)]">
                    {doc.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 border-t border-[var(--border)] pt-3 font-mono text-[11px] text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors">
                  <BookOpen className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{doc.displayUrl}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </NetworkShell>
  );
}

export default NetworkBuild;
