import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Coins,
  FlaskConical,
  Globe,
  Layers,
  Lock,
  Network,
  ShieldCheck,
  Store,
  Users,
  Vote,
  type LucideIcon,
} from "lucide-react";
import { NetworkShell } from "@/components/network/NetworkShell";
import { useLiveChain } from "@/lib/networkData";

type SurfaceCategory = "all" | "network-defi" | "commerce-work" | "verification-substrate";

interface EcosystemSurface {
  id: string;
  name: string;
  category: Exclude<SurfaceCategory, "all">;
  categoryLabel: string;
  status: string;
  statusEmphasis?: "primary" | "pending" | "standard";
  urlLabel: string;
  to?: string;
  href?: string;
  icon: LucideIcon;
  summary: string;
  pointsRole: string;
  highlights: string[];
}

const ECOSYSTEM_SURFACES: EcosystemSurface[] = [
  {
    id: "hanzo-network",
    name: "Hanzo Network",
    category: "network-defi",
    categoryLabel: "Network & DeFi",
    status: "Live · Invite-Only Era 1",
    statusEmphasis: "primary",
    urlLabel: "hanzo.network/early",
    to: "/early",
    icon: Lock,
    summary:
      "Sovereign L1 (Chain 36963), invite-only Era 1 mining, multi-asset staking (ETH, BTC, USDC, USDT, LUX, SOL), token sale tranches, live leaderboard, and wallet holders.",
    pointsRole:
      "Anchors base liquidity, PoAI compute weight, invite-cluster multipliers, and the canonical Genesis Points ledger.",
    highlights: ["Chain 36963", "ETH/BTC/USDC/USDT/LUX/SOL Staking", "Era 1 Mining & Leaderboard"],
  },
  {
    id: "hanzo-market",
    name: "Hanzo Market",
    category: "commerce-work",
    categoryLabel: "Commerce & Work",
    status: "Live",
    statusEmphasis: "standard",
    urlLabel: "hanzo.market",
    href: "https://hanzo.market",
    icon: Store,
    summary:
      "Agentic commerce marketplace for AI agents, apps, skills, and MCP servers. Commerce volume automatically routes developer royalties and Genesis Builder Points.",
    pointsRole:
      "Turns published skills, agents, and MCP servers into verifiable GMV, recurring builder royalties, and points.",
    highlights: ["Agents & Apps", "Skills & MCP Servers", "Builder Royalties"],
  },
  {
    id: "hanzo-work",
    name: "Hanzo DAO Work Board",
    category: "commerce-work",
    categoryLabel: "Commerce & Work",
    status: "Live",
    statusEmphasis: "standard",
    urlLabel: "work.hanzo.network",
    href: "https://work.hanzo.network",
    icon: Users,
    summary:
      "Decentralized De-Work human collaboration network. Complete engineering and research bounties, curate high-signal datasets, and review frozen evaluation gates.",
    pointsRole:
      "Rewards verified human labor, dataset stewardship, and HIP-1334 eval gate validation directly into the points graph.",
    highlights: ["Protocol Bounties", "Dataset Curation", "Frozen Eval Gates"],
  },
  {
    id: "hanzo-works",
    name: "Hanzo Works",
    category: "commerce-work",
    categoryLabel: "Commerce & Work",
    status: "Live",
    statusEmphasis: "standard",
    urlLabel: "hanzo.works",
    href: "https://hanzo.works",
    icon: Briefcase,
    summary:
      "Enterprise company OS combining Team collaboration, browser extension, autonomous bot, and 20 integrated business apps built for people and agents alike.",
    pointsRole:
      "Drives real-world enterprise inference and workflow demand back into Proof of AI compute pools.",
    highlights: ["Team & Bot", "Browser Extension", "20 Business Apps"],
  },
  {
    id: "hanzo-vote",
    name: "Hanzo Vote",
    category: "network-defi",
    categoryLabel: "Network & DeFi",
    status: "UI Live · Mainnet 36963 Governance Contracts Pending",
    statusEmphasis: "pending",
    urlLabel: "hanzo.vote",
    href: "https://hanzo.vote",
    icon: Vote,
    summary:
      "DAO proposal and goal-setting surface for protocol parameters, treasury priorities, and sovereign chain activation. The governance UI is live while Mainnet 36963 governance contracts remain pending audit-gated deployment.",
    pointsRole:
      "Hosts transparent community signaling today; transitions to binding on-chain voting once 36963 governance contracts deploy.",
    highlights: ["Proposal UI Live", "36963 Contracts Pending", "DAO Goal Setting"],
  },
  {
    id: "block-explorer",
    name: "Block Explorer",
    category: "verification-substrate",
    categoryLabel: "Verification & Substrate",
    status: "Live",
    statusEmphasis: "standard",
    urlLabel: "explore.hanzo.network",
    href: "https://explore.hanzo.network",
    icon: Activity,
    summary:
      "Public Chain 36963 explorer to inspect live blocks, transactions, contract state, and settled Proof of AI execution receipts in real time.",
    pointsRole:
      "Provides open auditability for every on-chain receipt, staking deposit, and sovereign chain state root.",
    highlights: ["Chain 36963 Blocks", "Tx & Receipt Inspection", "Public Audit Trail"],
  },
  {
    id: "formal-proofs",
    name: "Formal Proofs",
    category: "verification-substrate",
    categoryLabel: "Verification & Substrate",
    status: "Live",
    statusEmphasis: "standard",
    urlLabel: "proofs.hanzo.network",
    href: "https://proofs.hanzo.network",
    icon: ShieldCheck,
    summary:
      "Machine-checked formal proofs for AI agents, ML frameworks, exact-integer execution traces, and distributed compute safety properties.",
    pointsRole:
      "Supplies formal soundness guarantees backing verifiable intelligence claims and research promotions.",
    highlights: ["Machine-Checked Proofs", "Agent & ML Safety", "Distributed Compute"],
  },
  {
    id: "lux-network",
    name: "Lux Network",
    category: "verification-substrate",
    categoryLabel: "Verification & Substrate",
    status: "Live",
    statusEmphasis: "standard",
    urlLabel: "lux.network",
    href: "https://lux.network",
    icon: Network,
    summary:
      "Post-quantum L0 consensus and P3Q/Quasar finality substrate beneath Hanzo Network, enabling sovereign per-model chains and omnichain receipt portability.",
    pointsRole:
      "Finalizes A-Chain and Z-Chain P3Q settlement roots so rewards and liquidity move across supported chains.",
    highlights: ["Post-Quantum L0", "P3Q / Quasar Finality", "Omnichain Settlement"],
  },
  {
    id: "zoo-labs",
    name: "Zoo Labs",
    category: "verification-substrate",
    categoryLabel: "Verification & Substrate",
    status: "Live",
    statusEmphasis: "standard",
    urlLabel: "zoo.ngo",
    href: "https://zoo.ngo",
    icon: FlaskConical,
    summary:
      "501(c)(3) decentralized AI research foundation advancing open training, Decentralized Semantic Optimization (DSO), and Autonomous Swarm Optimization (ASO).",
    pointsRole:
      "Feeds open scientific models, public training methods, and reproducible benchmarks into the Hanzo intelligence economy.",
    highlights: ["501(c)(3) Foundation", "Open Training", "DSO / ASO Research"],
  },
];

const FLYWHEEL_STAGES = [
  {
    step: "01",
    title: "Stake & Mine",
    surfaces: "Hanzo Network (/early) · hanzod",
    detail:
      "Multi-asset vaults (ETH, BTC, USDC, USDT, LUX, SOL) and Era 1 Proof of AI nodes supply capital and verifiable compute.",
  },
  {
    step: "02",
    title: "Build & Transact",
    surfaces: "hanzo.market · hanzo.works · api.hanzo.ai",
    detail:
      "Enterprise workspaces and agentic commerce route real workloads through sovereign intelligence chains, generating fees and builder royalties.",
  },
  {
    step: "03",
    title: "Contribute & Govern",
    surfaces: "work.hanzo.network · hanzo.vote",
    detail:
      "Contributors ship bounties, datasets, and frozen eval gates while setting protocol priorities through transparent DAO proposals.",
  },
  {
    step: "04",
    title: "Verify & Finalize",
    surfaces: "explore · proofs · lux.network · zoo.ngo",
    detail:
      "Public receipts, formal proofs, open research, and Lux post-quantum P3Q/Quasar finality close the loop across every chain.",
  },
] as const;

const POINTS_GRAPH_ROWS = [
  {
    track: "Capital & Liquidity",
    surface: "Hanzo Network (/early)",
    action: "Stake ETH, BTC, USDC, USDT, LUX, or SOL; participate in token sale & invite clusters",
    output: "Daily Genesis Points + invite-tree multipliers",
  },
  {
    track: "Compute & Validation",
    surface: "hanzod (hanzo fabric up)",
    action: "Serve pre-admitted AI inference, agents, and sovereign per-model chain validation",
    output: "Customer workload fees + Era 1 PoAI emissions",
  },
  {
    track: "Builders & Commerce",
    surface: "hanzo.market · hanzo.works",
    action: "List agents, apps, skills, and MCP servers; drive verified enterprise API usage",
    output: "Developer royalties + Genesis Builder Points",
  },
  {
    track: "Human & Scientific Work",
    surface: "work.hanzo.network · proofs · zoo.ngo",
    action: "Complete DAO bounties, curate datasets, verify formal proofs & HIP-1334 eval gates",
    output: "Bounty payouts + Research & Contributor Points",
  },
] as const;

export function NetworkEcosystem() {
  const chain = useLiveChain();
  const [activeCategory, setActiveCategory] = useState<SurfaceCategory>("all");

  useEffect(() => {
    document.title = "Ecosystem — Hanzo Network";
  }, []);

  const visibleSurfaces = useMemo(() => {
    if (activeCategory === "all") return ECOSYSTEM_SURFACES;
    return ECOSYSTEM_SURFACES.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  const counts = {
    all: ECOSYSTEM_SURFACES.length,
    "network-defi": ECOSYSTEM_SURFACES.filter((s) => s.category === "network-defi").length,
    "commerce-work": ECOSYSTEM_SURFACES.filter((s) => s.category === "commerce-work").length,
    "verification-substrate": ECOSYSTEM_SURFACES.filter(
      (s) => s.category === "verification-substrate"
    ).length,
  };

  return (
    <NetworkShell>
      {/* Hero */}
      <section className="border-b border-[var(--border)] bg-[var(--background)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
              <Globe className="h-3.5 w-3.5 text-[var(--foreground)]" />
              Unified DeFi-Gamified Ecosystem
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 font-mono text-[11px] text-[var(--foreground)] tabular-nums">
              <Coins className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
              <span>9 Interlocking Surfaces</span>
              {chain.status === "live" && chain.blockNumber !== null ? (
                <>
                  <span className="text-[var(--muted-foreground)]">·</span>
                  <span>Chain 36963 #{chain.blockNumber.toLocaleString()}</span>
                </>
              ) : null}
            </span>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.06] text-[var(--foreground)]">
              One DeFi-gamified economy across every Hanzo surface.
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-[var(--muted-foreground)]">
              Staking, Proof of AI compute mining, agentic commerce, DAO bounties, enterprise
              workspaces, governance, formal verification, and open research all feed a single
              Genesis Points and royalty graph anchored to Chain{" "}
              <span className="font-mono text-[var(--foreground)]">36963</span> and Lux
              post-quantum finality.
            </p>
          </div>

          {/* 4-Stage Interlocking Flywheel */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FLYWHEEL_STAGES.map((stage) => (
              <div
                key={stage.step}
                className="flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[var(--muted-foreground)]">
                      {stage.step}
                    </span>
                    <Layers className="h-4 w-4 text-[var(--muted-foreground)]" />
                  </div>
                  <h2 className="mt-3 text-base font-semibold text-[var(--foreground)]">
                    {stage.title}
                  </h2>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--muted-foreground)]">
                    {stage.detail}
                  </p>
                </div>
                <div className="mt-4 border-t border-[var(--border)] pt-3 font-mono text-[11px] text-[var(--foreground)]">
                  {stage.surfaces}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filterable Ecosystem Directory */}
      <section className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between mb-10">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)] mb-2">
                Directory · Verified Live Surfaces
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--foreground)]">
                Every protocol layer, honest status included.
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter ecosystem surfaces">
              {(
                [
                  { id: "all", label: "All Surfaces", count: counts.all },
                  { id: "network-defi", label: "Network & DeFi", count: counts["network-defi"] },
                  { id: "commerce-work", label: "Commerce & Work", count: counts["commerce-work"] },
                  {
                    id: "verification-substrate",
                    label: "Verification & Substrate",
                    count: counts["verification-substrate"],
                  },
                ] as const
              ).map((tab) => {
                const active = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveCategory(tab.id)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                      active
                        ? "bg-[var(--foreground)] text-[var(--background)]"
                        : "border border-[var(--border)] bg-[var(--background)] text-[var(--muted-foreground)] hover:border-[var(--border-strong)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className="font-mono text-[11px] opacity-75 tabular-nums">
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visibleSurfaces.map((surface) => {
              const Icon = surface.icon;
              const isInternal = Boolean(surface.to);

              const cardContent = (
                <>
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--foreground)]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] leading-tight ${
                          surface.statusEmphasis === "primary"
                            ? "bg-[var(--foreground)] text-[var(--background)] font-semibold"
                            : surface.statusEmphasis === "pending"
                              ? "border border-dashed border-[var(--border-strong)] bg-[var(--surface-elevated)] text-[var(--foreground)]"
                              : "border border-[var(--border)] bg-[var(--surface)] text-[var(--muted-foreground)]"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                            surface.statusEmphasis === "primary"
                              ? "bg-[var(--background)]"
                              : surface.statusEmphasis === "pending"
                                ? "bg-[var(--muted-foreground)]"
                                : "bg-[var(--foreground)]"
                          }`}
                        />
                        <span>{surface.status}</span>
                      </span>
                    </div>

                    <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted-foreground)]">
                      {surface.categoryLabel}
                    </div>
                    <h3 className="mt-1 text-lg font-semibold tracking-tight text-[var(--foreground)] flex items-center justify-between gap-2">
                      <span>{surface.name}</span>
                      {isInternal ? (
                        <ArrowRight className="h-4 w-4 shrink-0 text-[var(--muted-foreground)] group-hover:translate-x-0.5 group-hover:text-[var(--foreground)] transition-all" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors" />
                      )}
                    </h3>

                    <p className="mt-2.5 text-sm leading-relaxed text-[var(--muted-foreground)]">
                      {surface.summary}
                    </p>

                    <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                        Economy & Points Graph Role
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-[var(--foreground)]">
                        {surface.pointsRole}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[var(--border)]">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {surface.highlights.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-0.5 font-mono text-[10px] text-[var(--muted-foreground)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between font-mono text-xs text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors">
                      <span>{surface.urlLabel}</span>
                      <span>{isInternal ? "Open Terminal →" : "Visit Surface ↗"}</span>
                    </div>
                  </div>
                </>
              );

              if (surface.to) {
                return (
                  <Link
                    key={surface.id}
                    to={surface.to}
                    className="group flex flex-col justify-between rounded-2xl border border-[var(--border-strong)] bg-[var(--background)] p-6 hover:bg-[var(--surface-elevated)]/40 transition-colors"
                  >
                    {cardContent}
                  </Link>
                );
              }

              return (
                <a
                  key={surface.id}
                  href={surface.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 hover:border-[var(--border-strong)] transition-colors"
                >
                  {cardContent}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Genesis Points Graph Matrix */}
      <section className="border-b border-[var(--border)] bg-[var(--background)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <div className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)] mb-2">
              Unified Incentives · Genesis Points Graph
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--foreground)]">
              How participation compounds across surfaces.
            </h2>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              Instead of siloed loyalty programs, verified actions across liquidity vaults,
              compute nodes, agentic commerce, and DAO bounties resolve to one portable account
              identity.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--surface-elevated)] font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                  <th className="px-5 py-3.5 font-medium">Track</th>
                  <th className="px-5 py-3.5 font-medium">Primary Surface</th>
                  <th className="px-5 py-3.5 font-medium">Verified Action</th>
                  <th className="px-5 py-3.5 font-medium">Accrual / Settlement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {POINTS_GRAPH_ROWS.map((row) => (
                  <tr
                    key={row.track}
                    className="bg-[var(--background)] hover:bg-[var(--surface)] transition-colors"
                  >
                    <td className="px-5 py-4 font-semibold text-[var(--foreground)]">
                      {row.track}
                    </td>
                    <td className="px-5 py-4 font-mono text-xs text-[var(--foreground)]">
                      {row.surface}
                    </td>
                    <td className="px-5 py-4 text-xs sm:text-sm text-[var(--muted-foreground)]">
                      {row.action}
                    </td>
                    <td className="px-5 py-4 text-xs sm:text-sm font-medium text-[var(--foreground)]">
                      {row.output}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Bottom Action Handoff */}
      <section className="bg-[var(--surface)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 rounded-2xl border border-[var(--border-strong)] bg-[var(--background)] p-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <div className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
                Start Participating
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
                Enter Era 1 with an invite code, or ship on Chain 36963 today.
              </h2>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                Stake multi-asset vaults, whitelist a <code className="font-mono text-xs text-[var(--foreground)]">hanzod</code>{" "}
                node, or inspect the 2T AI monetary schedule.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/early"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-2.5 text-sm font-semibold text-[var(--background)] hover:opacity-85 transition-opacity"
              >
                <Lock className="h-4 w-4" />
                <span>Enter Invite Code</span>
              </Link>
              <Link
                to="/build"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--background)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface-elevated)] transition-colors"
              >
                <span>Build & MCP</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/economics"
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-medium text-[var(--foreground)] hover:border-[var(--border-strong)] transition-colors"
              >
                <span>2T Policy</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </NetworkShell>
  );
}

export default NetworkEcosystem;
