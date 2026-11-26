import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Blocks,
  BookOpen,
  Check,
  Cpu,
  FileCode2,
  FlaskConical,
  GitBranch,
  Layers,
  Lock,
  Minus,
  RefreshCw,
  Scale,
  Server,
  ShieldCheck,
  Terminal,
  Users,
  Vote,
} from "lucide-react";
import { NetworkShell } from "@/components/network/NetworkShell";
import { useLiveChain, useLiveModels } from "@/lib/networkData";
import { useTheme } from "@/contexts/ThemeContext";

// ─── Subtle Monochrome Architectural Grid Canvas ─────────────────────────────

function ArchitecturalGridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = motionQuery.matches;
    let rafId = 0;
    let frame = 0;

    const cell = 56;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (w === 0 || h === 0) return;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const renderFrame = (tick: number) => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (w === 0 || h === 0) return;

      ctx.clearRect(0, 0, w, h);

      const channel = isDarkMode ? 255 : 0;
      const gridAlpha = isDarkMode ? 0.055 : 0.055;
      const crossAlpha = isDarkMode ? 0.14 : 0.12;

      ctx.strokeStyle = `rgba(${channel}, ${channel}, ${channel}, ${gridAlpha})`;
      ctx.lineWidth = 1;

      ctx.beginPath();
      for (let x = 0.5; x < w; x += cell) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = 0.5; y < h; y += cell) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      // Architectural crosshairs & slow monochrome node pulses
      const phase = tick * 0.012;
      for (let x = cell; x < w; x += cell) {
        for (let y = cell; y < h; y += cell) {
          const isMajor = (x / cell) % 3 === 0 && (y / cell) % 2 === 0;
          if (isMajor) {
            ctx.strokeStyle = `rgba(${channel}, ${channel}, ${channel}, ${crossAlpha})`;
            ctx.beginPath();
            ctx.moveTo(x - 3.5, y + 0.5);
            ctx.lineTo(x + 4.5, y + 0.5);
            ctx.moveTo(x + 0.5, y - 3.5);
            ctx.lineTo(x + 0.5, y + 4.5);
            ctx.stroke();
          }

          if (!reducedMotion) {
            const wave = Math.sin(phase + x * 0.012 + y * 0.009) * 0.5 + 0.5;
            if (wave > 0.92) {
              const dotAlpha = ((wave - 0.92) / 0.08) * (isDarkMode ? 0.28 : 0.2);
              ctx.fillStyle = `rgba(${channel}, ${channel}, ${channel}, ${dotAlpha})`;
              ctx.beginPath();
              ctx.arc(x + 0.5, y + 0.5, 1.75, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }
    };

    const loop = () => {
      renderFrame(frame);
      if (!reducedMotion) {
        frame += 1;
        rafId = window.requestAnimationFrame(loop);
      }
    };

    resize();
    loop();

    const onResize = () => {
      resize();
      if (reducedMotion) renderFrame(0);
    };

    const onMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      window.cancelAnimationFrame(rafId);
      if (reducedMotion) {
        renderFrame(0);
      } else {
        loop();
      }
    };

    window.addEventListener("resize", onResize);
    motionQuery.addEventListener("change", onMotionChange);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{
        maskImage:
          "radial-gradient(ellipse 82% 72% at 50% 34%, black 38%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 82% 72% at 50% 34%, black 38%, transparent 100%)",
      }}
    />
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────

const FLYWHEEL_STEPS = [
  {
    step: "01",
    label: "Goal & Gate Setting",
    title: "DAO + Human De-Work",
    spec: "work.hanzo.network",
    description:
      "Humans and DAOs define domain goals, datasets, bounties, and prospectively frozen evaluation gates before any model or agent runs.",
    href: "https://work.hanzo.network",
  },
  {
    step: "02",
    label: "Execution Substrate",
    title: "Sovereign Per-Model Chains",
    spec: "hanzod · CreateChainTx",
    description:
      "Dedicated intelligence chains run on high-utility hanzod nodes combining k3s/Cloud, AI engine, Dev/Bot/Team runtimes, and chain validation.",
  },
  {
    step: "03",
    label: "SOTA Progression",
    title: "Autonomous Research",
    spec: "/v1/research · HIP-1334/1400",
    description:
      "Continuously self-upgrading research agents iterate on weights and architectures, promoting candidates only when beating frozen gates.",
  },
  {
    step: "04",
    label: "Cryptographic Verification",
    title: "Multi-Intelligence + PoAI",
    spec: "HIP-0901 · Freivalds O(n²)",
    description:
      "Diverse bonded models reach leaderless verdicts while CPU validators verify exact-int8 GPU execution and issue declining AI rewards.",
  },
  {
    step: "05",
    label: "Real Demand & Burn",
    title: "Agentic Commerce",
    spec: "ΔS = issuance − β·fees",
    description:
      "Autonomous agents transact 24/7 with cryptographic spend policies, settle external API fees, permanently burn AI, and fund Step 01.",
  },
] as const;

const PILLARS = [
  {
    icon: Server,
    tag: "hanzod v0.4 · hanzo fabric up",
    title: "High-Utility Nodes",
    description:
      "One Rust binary runs k3s/Hanzo Cloud, native inference and training, Dev/Bot/Team runtimes, /v1/research, and chain validation. Every node earns from real cloud and AI demand rather than sitting idle.",
  },
  {
    icon: Vote,
    tag: "HIP-0901 · AIGovernor + AIParams",
    title: "Consensus Across Different Intelligences",
    description:
      "Distinct frontier and open-weight models on bonded nodes reach leaderless on-chain verdicts via AIGovernor and Byzantine-robust continuous medians via AIParams under timelock and policy guardrails.",
  },
  {
    icon: Layers,
    tag: "CreateChainTx · Lux Quasar PQ",
    title: "Sovereign Per-Model & Domain Chains",
    description:
      "Launch dedicated per-model or vertical intelligence chains with independent validators and frozen eval gates, full EVM + AI precompiles, post-quantum finality, and Warp/Teleport omnichain settlement.",
  },
  {
    icon: Scale,
    tag: "AIPolicy · H(Ψ, Θ) = κ",
    title: "Decentralized Agentic Commerce",
    description:
      "Agent wallets with cryptographic spend policies (AIPolicy) and the Hamiltonian Market Maker settle 24/7 machine commerce, channeling real external API revenue into permanent protocol fee burn.",
  },
  {
    icon: FlaskConical,
    tag: "/v1/research · HIP-1334 / HIP-1400",
    title: "Self-Upgrading Autonomous Research",
    description:
      "Four machine-enforced laws—lineage, evaluation, prospectively frozen gates, and dataset provenance—govern PoT and PoC (DeltaSoup) so only reproducible gains enter canonical model weights.",
  },
  {
    icon: Users,
    tag: "work.hanzo.network · Live Board",
    title: "DAO Goal-Setting + Human De-Work",
    description:
      "Humans and DAOs steer intelligence chains directly through the live work board—publishing domain targets, frozen evaluation suites, curated datasets, and bounties alongside autonomous agents.",
    href: "https://work.hanzo.network",
    linkLabel: "Open work.hanzo.network",
  },
] as const;

const POAI_STEPS = [
  {
    step: "01",
    title: "Admit & Execute in Exact Int8",
    detail:
      "A-Chain fixes model, input digest, deliverable, and payout target. The provider executes with exact int8 accumulators over F_{2^61−1}—zero floating-point drift and zero false rejects across CPU/GPU vendors.",
  },
  {
    step: "02",
    title: "Commit ~768 B MMR Trace + Seal Prompt",
    detail:
      "Provider commits the output, execution graph, and compact ~768 B Merkle Mountain Range trace. Sensitive prompts seal under X-Wing (X25519 + ML-KEM-768) with zero plaintext exposure; TEEs remain optional for confidentiality.",
  },
  {
    step: "03",
    title: "Post-Commitment r & O(n²) CPU Check",
    detail:
      "After commitment, an unpredictable challenge vector r is derived. Any ordinary CPU checks A·(B·r) == C·r in O(n²) time against O(n³) GPU matmul—bounding forgery to ≤ 2⁻¹²² (information-theoretic / post-quantum).",
  },
  {
    step: "04",
    title: "Consume Nullifier & P3Q Z-Chain Settle",
    detail:
      "A-Chain consumes the global work nullifier so no workload pays twice. P3Q batches finalized receipts onto Z-Chain; Lux Quasar post-quantum finality carries verifiable payouts to the bound destination chain.",
  },
] as const;

const POAI_WORKLOADS = [
  {
    code: "PoI",
    name: "Proof of Inference",
    workload: "Token prefill & autoregressive decode",
    verification: "Exact-int8 Freivalds O(n²) check over committed ~768 B MMR layer trace",
    payout: "Customer API fee + declining Era AI subsidy",
  },
  {
    code: "PoE",
    name: "Proof of Embeddings",
    workload: "Dense & multimodal vector indexing",
    verification: "Deterministic int8 projection transcript bound to weights & input root",
    payout: "Retrieval / indexing fee + PoAI verification share",
  },
  {
    code: "PoT",
    name: "Proof of Training",
    workload: "Deterministic backprop & gradient steps",
    verification: "Committed forward/backward graph openings + checkpoint Freivalds audit",
    payout: "Training grant / cluster fee + PoAI epoch allocation",
  },
  {
    code: "PoC",
    name: "Proof of Contribution",
    workload: "DeltaSoup weight deltas & research runs",
    verification: "Lineage proof + reproducible gain against prospectively frozen eval gates",
    payout: "DAO bounty + ongoing model-chain fee share",
  },
] as const;

const COMPARISON_ROWS = [
  {
    dimension: "Verification Math",
    hanzo:
      "Deterministic Freivalds (A·(B·r) == C·r) over exact int8 F_{2^61−1}. ≤ 2⁻¹²² cheat probability, zero false rejects, CPU verifies GPU.",
    subjective:
      "Subjective validator scoring, opaque polling, and social weight-setting prone to collusion and rubber-stamping.",
  },
  {
    dimension: "Economic Backing",
    hanzo:
      "Real external API & cloud revenue (“Compute Once, Earn Twice”) with permanent fee burn (ΔS = issuance − β·fees) under a 2T hard cap.",
    subjective:
      "Circular emission farming where token inflation subsidizes synthetic queries with little external customer demand.",
  },
  {
    dimension: "Node Utility",
    hanzo:
      "Full-stack hanzod binary runs k3s/Cloud, AI inference/training, Dev/Bot/Team, /v1/research, and chain validation on one machine.",
    subjective:
      "Single-purpose worker scripts that burn compute only on narrow synthetic scoring ticks.",
  },
  {
    dimension: "Chain Topology",
    hanzo:
      "Sovereign per-model and domain intelligence chains (CreateChainTx) with independent validators, EVM + AI precompiles, and frozen research gates.",
    subjective:
      "Siloed competition slots vying for a single centralized emission pipe with shared governance bottlenecks.",
  },
  {
    dimension: "Settlement & Security",
    hanzo:
      "Lux Quasar post-quantum finality, P3Q Z-Chain STARK/FRI settlement, X-Wing hybrid PQ prompt sealing, and omnichain Warp/Teleport payout.",
    subjective:
      "Classical ECDSA signatures, single-chain lock-in, and unverified multisig bridges.",
  },
] as const;

const ECOSYSTEM_CARDS = [
  {
    title: "Genesis Invite Gate",
    tag: "Invite Only",
    description:
      "Redeem a 6-character invite code for multi-asset Genesis staking, Era 1 hanzod mining whitelist, and cluster multipliers.",
    to: "/early",
  },
  {
    title: "Hanzo Market",
    tag: "Agentic Commerce",
    description:
      "Autonomous agent marketplace with AIPolicy wallets, Hamiltonian Market Maker liquidity, and verifiable settlement.",
    href: "https://hanzo.market",
  },
  {
    title: "DAO De-Work Board",
    tag: "Live Work Board",
    description:
      "Humans and DAOs post domain objectives, frozen evaluation suites, curated datasets, and bounties alongside agents.",
    href: "https://work.hanzo.network",
  },
  {
    title: "Hanzo Works",
    tag: "Enterprise OS",
    description:
      "Sovereign company operating system unifying human operators and verifiable autonomous agent teams.",
    href: "https://hanzo.works",
  },
  {
    title: "Hanzo Vote",
    tag: "UI Live · Mainnet 36963 Contracts Pending",
    description:
      "DAO governance portal for AIGovernor verdicts, AIParams continuous parameter medians, and treasury allocation.",
    href: "https://hanzo.vote",
  },
] as const;

const ACTIVATION_PHASES = [
  {
    phase: "Phase 0",
    title: "Live Chain 36963 & Inference Substrate",
    status: "Live Today",
    isLive: true,
    detail:
      "Hanzo L1 (Chain 36963) RPC and block explorer live, /v1/models serving open-weight Zen and partner models, hanzod v0.4 binary, and live DAO work board.",
  },
  {
    phase: "Phase 1",
    title: "Invite-Only Genesis & Determinism Freeze",
    status: "Staging · Invite Gate",
    isLive: false,
    detail:
      "Genesis invite gate (/early), frozen exact-int8 reference kernels, ML-DSA hanzod miner onboarding, and shadow-mode Freivalds transcript verification.",
  },
  {
    phase: "Phase 2",
    title: "A-Chain PoAI Consensus & Era 1 Activation",
    status: "Audit-Gated",
    isLive: false,
    detail:
      "Audited A-Chain PoAI mining authority, global work nullifiers, HIP-0901 AIGovernor/AIParams contracts on Chain 36963, and Era 1 (500B AI) emission schedule.",
  },
  {
    phase: "Phase 3",
    title: "P3Q Z-Chain Succinct Settlement",
    status: "Audit-Gated",
    isLive: false,
    detail:
      "Plonky3-derived pairing-free STARK/FRI PoAI AIR verifier, recursive receipt batching on Z-Chain, and Lux Quasar post-quantum settlement root.",
  },
  {
    phase: "Phase 4",
    title: "Sovereign Intelligence Chains & Omnichain Payout",
    status: "Governance-Gated",
    isLive: false,
    detail:
      "Permissionless CreateChainTx per-model chains, autonomous /v1/research DeltaSoup promotions, and Warp/Teleport exactly-once payouts to any destination chain.",
  },
] as const;

const SHIPPED_ARTIFACTS = [
  {
    label: "hanzo-engine/src/poi.rs",
    kind: "Rust · Exact-Int8 & MMR PoI",
    href: "https://github.com/hanzoai/engine/blob/main/src/poi.rs",
  },
  {
    label: "luxfi/crypto/poi",
    kind: "Go · Freivalds & Field Verifier",
    href: "https://github.com/luxfi/crypto/tree/main/poi",
  },
  {
    label: "luxfi/standard/contracts/ai/",
    kind: "Solidity · AIGovernor, AIParams, AIPolicy",
    href: "https://github.com/luxfi/standard/tree/main/contracts/ai",
  },
  {
    label: "proofs.hanzo.network",
    kind: "Formal Verification & Soundness Bounds",
    href: "https://proofs.hanzo.network",
  },
  {
    label: "explore.hanzo.network",
    kind: "Live Chain 36963 Block Explorer",
    href: "https://explore.hanzo.network",
  },
] as const;

const AUDIT_GATED_ITEMS = [
  "Era 1 (500B AI) PoAI mining emissions and finalized reward-weighting formula",
  "Production P3Q PoAI AIR recursive STARK settlement verifier on Z-Chain",
  "Mainnet Chain 36963 deployment of AIGovernor, AIParams, and AIPolicy contracts",
  "Warp/Teleport omnichain receipt-bound payout activation across external destinations",
] as const;

const LATEST_EDITORIAL = [
  {
    category: "Whitepaper",
    title: "Hanzo AI Chain: Proof of AI & Sovereign Intelligence Chains",
    description:
      "Complete protocol specification covering exact-int8 Freivalds verification, 2T monetary policy, P3Q settlement, and §10 activation phases.",
    href: "https://papers.hanzo.ai/hanzo-ai-chain/",
    meta: "papers.hanzo.ai",
  },
  {
    category: "Engineering",
    title: "Proof of AI: How Ordinary CPUs Verify GPU-Scale Intelligence",
    description:
      "Why deterministic execution over F_{2^61−1} and ~768 B MMR traces eliminate subjective validator cartels and enable Compute Once, Earn Twice.",
    href: "https://hanzo.blog/proof-of-ai/",
    meta: "hanzo.blog",
  },
  {
    category: "Standards",
    title: "Hanzo Improvement Proposals (HIP-0901, HIP-1334, HIP-1400)",
    description:
      "Normative protocol standards for Multi-Intelligence Consensus, autonomous research laws, frozen gates, and DeltaSoup model promotion.",
    href: "https://hips.hanzo.ai",
    meta: "hips.hanzo.ai",
  },
  {
    category: "Formal Proofs",
    title: "Machine-Checked Soundness & Consensus Safety Artifacts",
    description:
      "Inspectable mathematical proofs for Freivalds error bounds (≤ 2⁻¹²²), nullifier non-replay, and Byzantine-robust parameter aggregation.",
    href: "https://proofs.hanzo.network",
    meta: "proofs.hanzo.network",
  },
] as const;

// ─── Component ───────────────────────────────────────────────────────────────

export function NetworkLanding() {
  const chain = useLiveChain();
  const models = useLiveModels();

  return (
    <NetworkShell>
      {/* 1. HERO */}
      <section className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--background)]">
        <ArchitecturalGridCanvas />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-28 lg:px-8 lg:pt-32">
          <div className="max-w-4xl">
            <div className="mb-7 inline-flex flex-wrap items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-3.5 py-1.5 text-xs font-medium text-[var(--foreground)]">
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--foreground)]"
              />
              <span className="font-mono tracking-tight">
                Hanzo L1 · Chain 36963 · Anchored on Lux Post-Quantum Finality
              </span>
            </div>

            <h1 className="text-4xl font-semibold tracking-[-0.035em] text-[var(--foreground)] sm:text-6xl lg:text-[4.5rem] lg:leading-[1.03]">
              The blockchain for global intelligence.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--muted-foreground)] sm:text-lg sm:leading-relaxed">
              High-utility{" "}
              <code className="font-mono text-[0.92em] text-[var(--foreground)]">hanzod</code>{" "}
              nodes, sovereign per-model chains, CPU-verifiable Proof of AI, self-upgrading
              autonomous research, and decentralized agentic commerce—settled with post-quantum
              finality.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                to="/early"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-6 py-3 text-sm font-semibold text-[var(--background)] transition-opacity hover:opacity-85"
              >
                <Lock className="h-4 w-4" />
                <span>Enter Invite Code</span>
              </Link>

              <Link
                to="/build"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--background)] px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--accent)]"
              >
                <span>Start Building</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Live 4-Cell Monochrome Telemetry Strip */}
          <div
            aria-label="Live network telemetry"
            className="mt-16 grid grid-cols-1 overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] sm:grid-cols-2 lg:grid-cols-4"
          >
            {/* Cell 1: Live Block */}
            <a
              href="https://explore.hanzo.network"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between border-b border-[var(--border)] p-5 transition-colors hover:bg-[var(--surface-elevated)] sm:border-r lg:border-b-0"
            >
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[var(--muted-foreground)]">
                <span className="inline-flex items-center gap-1.5">
                  <Blocks className="h-3.5 w-3.5" />
                  Live Block
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
              </div>
              <div className="mt-3">
                <div className="font-mono text-2xl font-semibold tracking-tight text-[var(--foreground)] tabular-nums">
                  {chain.status === "live" && chain.blockNumber !== null
                    ? `#${chain.blockNumber.toLocaleString()}`
                    : chain.status === "loading"
                      ? "Syncing RPC…"
                      : "RPC Offline"}
                </div>
                <div className="mt-1 font-mono text-xs text-[var(--muted-foreground)]">
                  {chain.status === "live"
                    ? `Chain ${chain.chainId ?? 36963}${chain.latencyMs !== null ? ` · ${chain.latencyMs}ms` : ""}`
                    : chain.status === "loading"
                      ? "api.hanzo.network · Chain 36963"
                      : "Chain 36963 · verify on explorer"}
                </div>
              </div>
            </a>

            {/* Cell 2: Live Models */}
            <div className="flex flex-col justify-between border-b border-[var(--border)] p-5 transition-colors hover:bg-[var(--surface-elevated)] lg:border-b-0 lg:border-r">
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[var(--muted-foreground)]">
                <span className="inline-flex items-center gap-1.5">
                  <Cpu className="h-3.5 w-3.5" />
                  Live Models
                </span>
                {models.status === "error" ? (
                  <button
                    type="button"
                    onClick={models.retry}
                    className="inline-flex items-center gap-1 rounded-full border border-[var(--border-strong)] px-2 py-0.5 text-[10px] font-medium text-[var(--foreground)] hover:bg-[var(--accent)]"
                  >
                    <RefreshCw className="h-2.5 w-2.5" />
                    Retry
                  </button>
                ) : (
                  <Link
                    to="/pricing"
                    aria-label="View live model pricing"
                    className="opacity-50 transition-opacity hover:opacity-100"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
              <div className="mt-3">
                <Link to="/pricing" className="block">
                  <div className="font-mono text-2xl font-semibold tracking-tight text-[var(--foreground)] tabular-nums">
                    {models.status === "live"
                      ? `${models.totalCount.toLocaleString()} models`
                      : models.status === "loading"
                        ? "Querying API…"
                        : "Catalog Offline"}
                  </div>
                  <div className="mt-1 font-mono text-xs text-[var(--muted-foreground)]">
                    {models.status === "live"
                      ? `${models.zenCount} Zen open-weight · /v1/models`
                      : models.status === "loading"
                        ? "api.hanzo.ai/v1/models"
                        : "Endpoint unreachable right now"}
                  </div>
                </Link>
              </div>
            </div>

            {/* Cell 3: Hard Cap */}
            <Link
              to="/economics"
              className="group flex flex-col justify-between border-b border-[var(--border)] p-5 transition-colors hover:bg-[var(--surface-elevated)] sm:border-b-0 sm:border-r"
            >
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[var(--muted-foreground)]">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Monetary Cap
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
              </div>
              <div className="mt-3">
                <div className="font-mono text-2xl font-semibold tracking-tight text-[var(--foreground)] tabular-nums">
                  Hard Cap: 2T AI
                </div>
                <div className="mt-1 font-mono text-xs text-[var(--muted-foreground)]">
                  500B Era 1 · 1T DAO · 1T PoAI
                </div>
              </div>
            </Link>

            {/* Cell 4: Status */}
            <a
              href="https://status.hanzo.network"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between p-5 transition-colors hover:bg-[var(--surface-elevated)]"
            >
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[var(--muted-foreground)]">
                <span className="inline-flex items-center gap-1.5">
                  <Activity className="h-3.5 w-3.5" />
                  Status
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
              </div>
              <div className="mt-3">
                <div className="font-mono text-2xl font-semibold tracking-tight text-[var(--foreground)]">
                  status.hanzo.network
                </div>
                <div className="mt-1 font-mono text-xs text-[var(--muted-foreground)]">
                  Live RPC, inference &amp; node telemetry
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* 2. THE CLOSED INTELLIGENCE FLYWHEEL */}
      <section className="border-b border-[var(--border)] bg-[var(--surface)] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
              Closed Loop · Five Compounding Stages
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[var(--foreground)] sm:text-4xl">
              The closed intelligence flywheel.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted-foreground)]">
              Governance, compute, research, deterministic verification, and real machine commerce
              close into one self-funding economic loop—anchored to external demand instead of
              circular token inflation.
            </p>
          </div>

          <ol className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            {FLYWHEEL_STEPS.map((item, idx) => (
              <li
                key={item.step}
                className="relative flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5 transition-colors hover:border-[var(--border-strong)]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border-strong)] font-mono text-xs font-semibold text-[var(--foreground)]">
                      {item.step}
                    </span>
                    <span className="font-mono text-[11px] text-[var(--muted-foreground)]">
                      {idx < FLYWHEEL_STEPS.length - 1 ? `→ 0${idx + 2}` : "↺ 01"}
                    </span>
                  </div>

                  <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                    {item.label}
                  </p>
                  <h3 className="mt-1 text-base font-semibold tracking-tight text-[var(--foreground)]">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[var(--muted-foreground)]">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 border-t border-[var(--border)] pt-3">
                  {"href" in item && item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-xs text-[var(--foreground)] underline-offset-4 hover:underline"
                    >
                      <span>{item.spec}</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  ) : (
                    <span className="font-mono text-xs text-[var(--foreground)]">{item.spec}</span>
                  )}
                </div>
              </li>
            ))}
          </ol>

          {/* Loop Closure Bar */}
          <div className="mt-4 flex flex-col items-start justify-between gap-3 rounded-2xl border border-[var(--border-strong)] bg-[var(--background)] px-5 py-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <GitBranch className="h-4 w-4 shrink-0 text-[var(--foreground)]" />
              <p className="text-sm text-[var(--muted-foreground)]">
                <span className="font-semibold text-[var(--foreground)]">Loop closes at Step 05 → 01:</span>{" "}
                External agentic commerce settles fees, burns supply (
                <code className="font-mono text-xs text-[var(--foreground)]">
                  ΔS = issuance − β·fees
                </code>
                ), and refills DAO bounties at{" "}
                <a
                  href="https://work.hanzo.network"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[var(--foreground)] underline underline-offset-4"
                >
                  work.hanzo.network
                </a>
                .
              </p>
            </div>
            <Link
              to="/economics"
              className="inline-flex shrink-0 items-center gap-1.5 font-mono text-xs font-semibold text-[var(--foreground)] hover:opacity-75"
            >
              <span>Monetary Policy</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. SIX CORE PILLARS */}
      <section className="border-b border-[var(--border)] bg-[var(--background)] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
                Protocol Architecture · Six Pillars
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[var(--foreground)] sm:text-4xl">
                Full-stack intelligence infrastructure.
              </h2>
            </div>
            <Link
              to="/build"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--foreground)] underline-offset-4 hover:underline"
            >
              <span>Explore developer specs</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article
                  key={pillar.title}
                  className="flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-elevated)]"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-strong)] bg-[var(--background)] text-[var(--foreground)]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="rounded-full border border-[var(--border)] bg-[var(--background)] px-2.5 py-1 font-mono text-[11px] text-[var(--muted-foreground)]">
                        {pillar.tag}
                      </span>
                    </div>

                    <h3 className="mt-5 text-lg font-semibold tracking-tight text-[var(--foreground)]">
                      {pillar.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-[var(--muted-foreground)]">
                      {pillar.description}
                    </p>
                  </div>

                  {"href" in pillar && pillar.href ? (
                    <div className="mt-5 border-t border-[var(--border)] pt-4">
                      <a
                        href={pillar.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--foreground)] hover:opacity-75"
                      >
                        <span>{pillar.linkLabel}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. "COMPUTE ONCE, EARN TWICE" + CPU-VERIFIES-GPU PROOF OF AI */}
      <section className="border-b border-[var(--border)] bg-[var(--surface)] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
                Proof of AI · CPU Verifies GPU
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[var(--foreground)] sm:text-4xl">
                Compute once. Earn twice.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted-foreground)]">
                Providers keep their ordinary API and cloud workload fees while earning declining{" "}
                <code className="font-mono text-sm text-[var(--foreground)]">AI</code> rewards for
                attaching exact-integer execution proofs. No synthetic puzzles—real AI work becomes
                mineable work verified by ordinary CPUs.
              </p>
            </div>

            <div className="lg:col-span-4 lg:text-right">
              <a
                href="https://papers.hanzo.ai/hanzo-ai-chain/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--background)] px-4 py-2 text-xs font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--accent)]"
              >
                <span>Read PoAI Specification</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* 4-Step Verification Flow */}
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {POAI_STEPS.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5"
              >
                <div className="font-mono text-xs font-semibold text-[var(--muted-foreground)]">
                  STEP {item.step}
                </div>
                <h3 className="mt-2 text-base font-semibold tracking-tight text-[var(--foreground)]">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[var(--muted-foreground)]">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Cryptographic Guarantees Strip */}
          <div className="mt-4 grid grid-cols-2 gap-3 rounded-2xl border border-[var(--border-strong)] bg-[var(--background)] p-5 sm:grid-cols-3 lg:grid-cols-5">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                Field Arithmetic
              </div>
              <div className="mt-1 font-mono text-sm font-semibold text-[var(--foreground)]">
                Exact int8 · F<sub>2⁶¹−1</sub>
              </div>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                Transcript Size
              </div>
              <div className="mt-1 font-mono text-sm font-semibold text-[var(--foreground)]">
                ~768 B MMR trace
              </div>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                Cheat Probability
              </div>
              <div className="mt-1 font-mono text-sm font-semibold text-[var(--foreground)]">
                ≤ 2⁻¹²² (PQ-safe)
              </div>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                Prompt Privacy
              </div>
              <div className="mt-1 font-mono text-sm font-semibold text-[var(--foreground)]">
                X-Wing · TEE optional
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                Settlement Rollup
              </div>
              <div className="mt-1 font-mono text-sm font-semibold text-[var(--foreground)]">
                P3Q on Z-Chain
              </div>
            </div>
          </div>

          {/* Compact 4-Workload Table */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--background)]">
            <div className="border-b border-[var(--border)] px-5 py-3.5">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]">
                Supported Verifiable AI Workloads (PoI · PoE · PoT · PoC)
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--surface)] text-xs font-mono uppercase tracking-wider text-[var(--muted-foreground)]">
                    <th className="px-5 py-3 font-medium">Proof</th>
                    <th className="px-5 py-3 font-medium">Workload Class</th>
                    <th className="px-5 py-3 font-medium">CPU Verification Mechanism</th>
                    <th className="px-5 py-3 font-medium">Dual Economics</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {POAI_WORKLOADS.map((row) => (
                    <tr key={row.code} className="hover:bg-[var(--surface)]/70">
                      <td className="px-5 py-4 align-top">
                        <span className="inline-flex items-center rounded-md border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-2 py-0.5 font-mono text-xs font-semibold text-[var(--foreground)]">
                          {row.code}
                        </span>
                        <div className="mt-1 text-xs text-[var(--muted-foreground)]">
                          {row.name}
                        </div>
                      </td>
                      <td className="px-5 py-4 align-top font-medium text-[var(--foreground)]">
                        {row.workload}
                      </td>
                      <td className="px-5 py-4 align-top text-[var(--muted-foreground)]">
                        {row.verification}
                      </td>
                      <td className="px-5 py-4 align-top text-[var(--muted-foreground)]">
                        {row.payout}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HANZO NETWORK VS. SUBJECTIVE AI NETWORKS */}
      <section className="border-b border-[var(--border)] bg-[var(--background)] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
              Architectural Contrast
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[var(--foreground)] sm:text-4xl">
              Hanzo Network vs. subjective AI networks.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted-foreground)]">
              First-generation decentralized AI networks rely on subjective validator voting and
              emission farming. Hanzo replaces opinion with deterministic linear-algebra checks and
              real external API revenue.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-strong)] bg-[var(--surface-elevated)] text-xs font-mono uppercase tracking-wider">
                    <th className="w-[19%] px-5 py-3.5 font-semibold text-[var(--muted-foreground)]">
                      Dimension
                    </th>
                    <th className="w-[42%] px-5 py-3.5 font-semibold text-[var(--foreground)]">
                      Hanzo Network (Chain 36963)
                    </th>
                    <th className="w-[39%] px-5 py-3.5 font-semibold text-[var(--muted-foreground)]">
                      Subjective AI Networks
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)] bg-[var(--background)]">
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.dimension}>
                      <td className="px-5 py-4 align-top font-mono text-xs font-semibold uppercase tracking-wide text-[var(--foreground)]">
                        {row.dimension}
                      </td>
                      <td className="px-5 py-4 align-top text-[var(--foreground)]">
                        <div className="flex items-start gap-2.5">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--foreground)]" />
                          <span className="leading-relaxed">{row.hanzo}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 align-top text-[var(--muted-foreground)]">
                        <div className="flex items-start gap-2.5">
                          <Minus className="mt-0.5 h-4 w-4 shrink-0 opacity-60" />
                          <span className="leading-relaxed">{row.subjective}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 6. UNIFIED DEFI-GAMIFIED ECOSYSTEM STRIP */}
      <section className="border-b border-[var(--border)] bg-[var(--surface)] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
                Unified Ecosystem · DeFi &amp; Coordination
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[var(--foreground)] sm:text-4xl">
                Five surfaces. One settlement layer.
              </h2>
            </div>

            <Link
              to="/ecosystem"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--foreground)] underline-offset-4 hover:underline"
            >
              <span>View full ecosystem directory</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {ECOSYSTEM_CARDS.map((card) => {
              const inner = (
                <>
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="inline-block rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 py-0.5 font-mono text-[10px] leading-snug text-[var(--muted-foreground)]">
                        {card.tag}
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--muted-foreground)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--foreground)]" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold tracking-tight text-[var(--foreground)]">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--muted-foreground)]">
                      {card.description}
                    </p>
                  </div>
                  <div className="mt-5 border-t border-[var(--border)] pt-3 font-mono text-[11px] text-[var(--foreground)]">
                    {"to" in card ? card.to : card.href.replace("https://", "")}
                  </div>
                </>
              );

              const cardClasses =
                "group flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-elevated)]";

              return "to" in card ? (
                <Link key={card.title} to={card.to} className={cardClasses}>
                  {inner}
                </Link>
              ) : (
                <a
                  key={card.title}
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClasses}
                >
                  {inner}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. PROTOCOL ACTIVATION PHASES (PHASE 0–4) & HONEST LEDGER */}
      <section className="border-b border-[var(--border)] bg-[var(--background)] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
              Whitepaper §10 · Receipts Over Claims
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[var(--foreground)] sm:text-4xl">
              Protocol activation phases &amp; live ledger.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted-foreground)]">
              Chain 36963 and model routing are live today. Monetary activation, PoAI mining
              emissions, and succinct P3Q settlement unlock strictly after deterministic verification
              and independent security audits clear each gate.
            </p>
          </div>

          {/* Phase 0–4 Ledger */}
          <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)]">
            <div className="divide-y divide-[var(--border)]">
              {ACTIVATION_PHASES.map((p) => (
                <div
                  key={p.phase}
                  className="grid grid-cols-1 gap-3 bg-[var(--background)] px-5 py-5 sm:grid-cols-12 sm:items-center sm:gap-4"
                >
                  <div className="flex items-center gap-3 sm:col-span-3">
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]">
                      {p.phase}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-[11px] font-medium ${
                        p.isLive
                          ? "bg-[var(--foreground)] text-[var(--background)]"
                          : "border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--muted-foreground)]"
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                  <div className="sm:col-span-3">
                    <h3 className="text-sm font-semibold text-[var(--foreground)]">{p.title}</h3>
                  </div>
                  <div className="sm:col-span-6">
                    <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                      {p.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Today vs. Audit-Gated Split Ledger */}
          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Shipped Code & Live Surfaces */}
            <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCode2 className="h-4 w-4 text-[var(--foreground)]" />
                  <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]">
                    Shipped &amp; Inspectable Today
                  </h3>
                </div>
                <span className="rounded-full bg-[var(--foreground)] px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[var(--background)]">
                  Live
                </span>
              </div>

              <ul className="mt-5 divide-y divide-[var(--border)]">
                {SHIPPED_ARTIFACTS.map((item) => (
                  <li key={item.label} className="py-3 first:pt-0 last:pb-0">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="font-mono text-sm font-medium text-[var(--foreground)] group-hover:underline underline-offset-4">
                          {item.label}
                        </div>
                        <div className="mt-0.5 text-xs text-[var(--muted-foreground)]">
                          {item.kind}
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--muted-foreground)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--foreground)]" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Audit- & Governance-Gated */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-[var(--foreground)]" />
                  <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]">
                    Audit- &amp; Governance-Gated
                  </h3>
                </div>
                <span className="rounded-full border border-[var(--border-strong)] bg-[var(--background)] px-2.5 py-0.5 font-mono text-[10px] font-medium text-[var(--muted-foreground)]">
                  Pending Activation
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[var(--muted-foreground)]">
                Per Whitepaper §10, the following monetary and cryptographic transitions remain
                explicitly inactive until audits, deterministic test vectors, and governance sign-off
                complete:
              </p>

              <ul className="mt-5 space-y-3">
                {AUDIT_GATED_ITEMS.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--foreground)]"
                  >
                    <Lock className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--muted-foreground)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 8. LATEST ON HANZO NETWORK + TIGHT BOTTOM CTA */}
      <section className="bg-[var(--background)] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
                Papers, Standards &amp; Proofs
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[var(--foreground)] sm:text-4xl">
                Latest on Hanzo Network.
              </h2>
            </div>
            <a
              href="https://docs.hanzo.ai/docs/network"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--foreground)] underline-offset-4 hover:underline"
            >
              <BookOpen className="h-4 w-4" />
              <span>All network documentation</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {LATEST_EDITORIAL.map((entry) => (
              <a
                key={entry.title}
                href={entry.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-elevated)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                      {entry.category}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-[var(--muted-foreground)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--foreground)]" />
                  </div>
                  <h3 className="mt-3 text-base font-semibold leading-snug tracking-tight text-[var(--foreground)]">
                    {entry.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[var(--muted-foreground)]">
                    {entry.description}
                  </p>
                </div>
                <div className="mt-5 border-t border-[var(--border)] pt-3 font-mono text-xs text-[var(--foreground)]">
                  {entry.meta}
                </div>
              </a>
            ))}
          </div>

          {/* Tight Bottom CTA */}
          <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-8 sm:p-10 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
                Genesis Access · Chain 36963
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[var(--foreground)] sm:text-3xl">
                Run real intelligence. Verify on CPU. Settle post-quantum.
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
                Enter your invite code for Genesis staking and Era 1 node onboarding, or review the
                2T monetary policy and fee-burn mechanics.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/early"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-6 py-3 text-sm font-semibold text-[var(--background)] transition-opacity hover:opacity-85"
              >
                <Lock className="h-4 w-4" />
                <span>Enter Invite Code</span>
              </Link>
              <Link
                to="/economics"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--background)] px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--accent)]"
              >
                <span>Read Economics</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </NetworkShell>
  );
}

export default NetworkLanding;
