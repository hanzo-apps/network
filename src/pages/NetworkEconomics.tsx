import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Ban,
  Briefcase,
  Coins,
  Cpu,
  FileText,
  Flame,
  Layers,
  Lock,
  Network,
  Repeat,
  Scale,
  Server,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Store,
  Terminal,
  Vote,
} from "lucide-react";
import { NetworkShell } from "@/components/network/NetworkShell";

// ─── Canonical Monetary Constants (Whitepaper §3 & §10.6) ────────────────────

const HARD_CAP_AI = 2_000_000_000_000;
const DAO_TREASURY_AI = 1_000_000_000_000;
const MINEABLE_POOL_AI = 1_000_000_000_000;
const NOMINAL_ERA_YEARS = 4;
const ILLUSTRATIVE_PROTOCOL_FEE_RATE = 0.025; // 2.5% blended protocol settlement fee (illustrative)

interface HalvingEra {
  era: number;
  k: number;
  label: string;
  capBillions: number;
  capDisplay: string;
  annualizedBillions: number;
  annualizedDisplay: string;
  cumulativeBillions: number;
  cumulativeDisplay: string;
  cumulativePct: number;
  cumulativePctDisplay: string;
  eraSharePctDisplay: string;
  heightPct: number;
  nominalYears: string;
}

const HALVING_ERAS: HalvingEra[] = [
  {
    era: 1,
    k: 0,
    label: "Era 1",
    capBillions: 500,
    capDisplay: "500B",
    annualizedBillions: 125,
    annualizedDisplay: "125B",
    cumulativeBillions: 500,
    cumulativeDisplay: "500B",
    cumulativePct: 50,
    cumulativePctDisplay: "50%",
    eraSharePctDisplay: "50.0000%",
    heightPct: 100,
    nominalYears: "Yr 0–4",
  },
  {
    era: 2,
    k: 1,
    label: "Era 2",
    capBillions: 250,
    capDisplay: "250B",
    annualizedBillions: 62.5,
    annualizedDisplay: "62.5B",
    cumulativeBillions: 750,
    cumulativeDisplay: "750B",
    cumulativePct: 75,
    cumulativePctDisplay: "75%",
    eraSharePctDisplay: "25.0000%",
    heightPct: 50,
    nominalYears: "Yr 4–8",
  },
  {
    era: 3,
    k: 2,
    label: "Era 3",
    capBillions: 125,
    capDisplay: "125B",
    annualizedBillions: 31.25,
    annualizedDisplay: "31.25B",
    cumulativeBillions: 875,
    cumulativeDisplay: "875B",
    cumulativePct: 87.5,
    cumulativePctDisplay: "87.5%",
    eraSharePctDisplay: "12.5000%",
    heightPct: 25,
    nominalYears: "Yr 8–12",
  },
  {
    era: 4,
    k: 3,
    label: "Era 4",
    capBillions: 62.5,
    capDisplay: "62.5B",
    annualizedBillions: 15.625,
    annualizedDisplay: "15.625B",
    cumulativeBillions: 937.5,
    cumulativeDisplay: "937.5B",
    cumulativePct: 93.75,
    cumulativePctDisplay: "93.75%",
    eraSharePctDisplay: "6.2500%",
    heightPct: 12.5,
    nominalYears: "Yr 12–16",
  },
  {
    era: 5,
    k: 4,
    label: "Era 5",
    capBillions: 31.25,
    capDisplay: "31.25B",
    annualizedBillions: 7.8125,
    annualizedDisplay: "7.8125B",
    cumulativeBillions: 968.75,
    cumulativeDisplay: "968.75B",
    cumulativePct: 96.875,
    cumulativePctDisplay: "96.875%",
    eraSharePctDisplay: "3.1250%",
    heightPct: 6.25,
    nominalYears: "Yr 16–20",
  },
  {
    era: 6,
    k: 5,
    label: "Era 6",
    capBillions: 15.625,
    capDisplay: "15.625B",
    annualizedBillions: 3.90625,
    annualizedDisplay: "3.906B",
    cumulativeBillions: 984.375,
    cumulativeDisplay: "984.375B",
    cumulativePct: 98.4375,
    cumulativePctDisplay: "98.4375%",
    eraSharePctDisplay: "1.5625%",
    heightPct: 3.125,
    nominalYears: "Yr 20–24",
  },
];

// ─── Role Presets for Illustrative Simulator ─────────────────────────────────

type RoleId =
  | "apple-silicon"
  | "rtx-4090"
  | "h100-8x"
  | "ai-cloud"
  | "agent-builder";

interface RolePreset {
  id: RoleId;
  label: string;
  hardwareProfile: string;
  peakAnnualDirectUsd: number;
  baseWorkWeightUnits: number; // Relative verified PoAI units/yr at 100% util
  era1ReferenceSharePct: number; // Illustrative % of active era budget at 100% util (baseline fleet)
  poaiRailWeightAtEra1: number; // Illustrative visual composition weight in Era 1
  utilitySplit: {
    k3sCloud: number;
    inference: number;
    research: number;
    validation: number;
  };
  dualRailSummary: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ROLE_PRESETS: RolePreset[] = [
  {
    id: "apple-silicon",
    label: "Apple Silicon / Dev Box",
    hardwareProfile: "Unified memory desktop / laptop running hanzod",
    peakAnnualDirectUsd: 4_800,
    baseWorkWeightUnits: 120,
    era1ReferenceSharePct: 0.00018,
    poaiRailWeightAtEra1: 34,
    utilitySplit: {
      k3sCloud: 20,
      inference: 35,
      research: 15,
      validation: 30,
    },
    dualRailSummary:
      "Serves quantized Zen inference, verifies GPU Freivalds challenges on CPU, and hosts local edge k3s workloads when idle.",
    icon: Cpu,
  },
  {
    id: "rtx-4090",
    label: "Consumer GPU (RTX 4090)",
    hardwareProfile: "Single 24 GB workstation node + CPU verifier",
    peakAnnualDirectUsd: 16_500,
    baseWorkWeightUnits: 480,
    era1ReferenceSharePct: 0.00072,
    poaiRailWeightAtEra1: 30,
    utilitySplit: {
      k3sCloud: 15,
      inference: 50,
      research: 20,
      validation: 15,
    },
    dualRailSummary:
      "Routes spot inference, embeddings, and deterministic eval harnesses while attaching Merkle transcripts for PoAI mining.",
    icon: Activity,
  },
  {
    id: "h100-8x",
    label: "8×H100 Server",
    hardwareProfile: "Dedicated 8×80 GB HBM3 production node",
    peakAnnualDirectUsd: 265_000,
    baseWorkWeightUnits: 7_400,
    era1ReferenceSharePct: 0.011,
    poaiRailWeightAtEra1: 24,
    utilitySplit: {
      k3sCloud: 20,
      inference: 45,
      research: 25,
      validation: 10,
    },
    dualRailSummary:
      "Executes high-throughput frontier Zen inference, deterministic training checkpoints, /v1/research jobs, and per-model chain validation.",
    icon: Server,
  },
  {
    id: "ai-cloud",
    label: "Existing AI Cloud Cluster",
    hardwareProfile: "64×GPU neocloud / hyperscaler via Cloud Adapter",
    peakAnnualDirectUsd: 2_250_000,
    baseWorkWeightUnits: 62_000,
    era1ReferenceSharePct: 0.092,
    poaiRailWeightAtEra1: 18,
    utilitySplit: {
      k3sCloud: 30,
      inference: 40,
      research: 20,
      validation: 10,
    },
    dualRailSummary:
      "Keeps 100% of existing customer invoices through the cloud-provider adapter while earning incremental AI by capturing proof transcripts and filling idle capacity.",
    icon: Layers,
  },
  {
    id: "agent-builder",
    label: "API / Agent Builder",
    hardwareProfile: "Agentic commerce operator & eval curator",
    peakAnnualDirectUsd: 145_000,
    baseWorkWeightUnits: 1_950,
    era1ReferenceSharePct: 0.0029,
    poaiRailWeightAtEra1: 20,
    utilitySplit: {
      k3sCloud: 25,
      inference: 30,
      research: 30,
      validation: 15,
    },
    dualRailSummary:
      "Monetizes verifiable agent workflows on hanzo.market, publishes benchmark-bonded models, and earns DAO work bounties on work.hanzo.network.",
    icon: Terminal,
  },
];

// ─── Anti-Farming Invariants (Whitepaper §3.4 & §5.7) ────────────────────────

const ANTI_FARMING_RULES = [
  {
    code: "01",
    rejected: "Self-reported GPU-hours",
    title: "No subsidy for raw hardware uptime",
    detail:
      "Rented seconds, idle VRAM reservations, or self-attested cluster telemetry never mint AI. Rewards require an admitted A-Chain job reaching PoAI finality with verifiable metering.",
  },
  {
    code: "02",
    rejected: "Circular miner-created jobs",
    title: "No self-dealing demand loops",
    detail:
      "Related requester/provider control is declared and capped or excluded. Demand fees and governed network-service budgets are bounded and non-recyclable under active policy.",
  },
  {
    code: "03",
    rejected: "Copied or cached outputs",
    title: "No transcript-free result replay",
    detail:
      "Returning an output without the job-bound Merkle execution graph transcript fails post-commitment CPU Freivalds checks (≤ 2⁻¹²² cheat probability) and slashes bonded collateral.",
  },
  {
    code: "04",
    rejected: "TEE quotes alone",
    title: "Enclaves are privacy, not PoAI",
    detail:
      "Confidential compute attestations are optional vendor provenance for private prompts or weights. A TEE quote without canonical execution evidence cannot authorize mining rewards.",
  },
  {
    code: "05",
    rejected: "Customer signatures alone",
    title: "No fake-invoice minting",
    detail:
      "Signed receipts or subjective judge quorums may settle commercial demand fees, but signatures without job-specific cryptographic execution proof never unlock the mining pool.",
  },
  {
    code: "06",
    rejected: "Destination-local claims",
    title: "One mining authority, one nullifier",
    detail:
      "A-Chain is the sole PoAI authority. Every finalized receipt consumes one global work nullifier and clamps to A(h) − mintedMining; destination chains never verify raw work or inflate supply.",
  },
] as const;

// ─── Objective Slashing Matrix (Whitepaper §3.7) ─────────────────────────────

const SLASHING_CONDITIONS = [
  {
    fault: "Execution Fraud",
    proof: "CPU Freivalds check A(Br) ≠ Cr over 𝔽₂⁶¹₋₁ or divergent canonical int8 replay",
    enforcement: "Deterministic slash of provider bond + job reward forfeiture",
  },
  {
    fault: "Transcript Withholding",
    proof: "Missing Merkle-bound execution graph opening within data-availability challenge window",
    enforcement: "Automatic challenge award to watcher + provider collateral slash",
  },
  {
    fault: "Metering Fraud",
    proof: "Committed FLOP / token metering root contradicts canonical graph execution count",
    enforcement: "Receipt invalidated prior to finality + metering bond penalty",
  },
  {
    fault: "Replay & Policy Violation",
    proof: "Duplicate global work nullifier, stale confidential TEE collateral, or license_root breach",
    enforcement: "Fail-closed rejection at A-Chain settlement + validator/provider slash",
  },
] as const;

// ─── Cross-Ecosystem DeFi Flywheel ───────────────────────────────────────────

const FLYWHEEL_SURFACES = [
  {
    step: "01",
    domain: "hanzo.network",
    role: "L1 Settlement · PoAI · Staking",
    description:
      "Coordinates sovereign per-model chains, CPU-verifiable Proof of AI, bonded validators, multi-asset staking, and hanzod compute supply on Lux post-quantum finality.",
    metric: "Chain 36963 · 0 destination inflation",
    to: "/early" as const,
  },
  {
    step: "02",
    domain: "hanzo.market",
    role: "Agentic Commerce & HMM Fees",
    description:
      "Autonomous agents discover, price, and settle inference, tool execution, and capacity liquidity through the Hamiltonian Market Maker, generating continuous protocol fees.",
    metric: "H(Ψ, Θ) = κ · Endogenous clearing",
    href: "https://hanzo.market",
  },
  {
    step: "03",
    domain: "work.hanzo.network",
    role: "DAO De-Work & Eval Curation",
    description:
      "Human contributors and agents complete bounties, curate datasets, verify benchmark challenges, and lock prospectively frozen evaluation gates for sovereign chains.",
    metric: "Human + Agent verifiable curation",
    href: "https://work.hanzo.network",
  },
  {
    step: "04",
    domain: "hanzo.works",
    role: "Enterprise Agent Demand",
    description:
      "Production enterprise deployments route real commercial customer workloads onto Hanzo Network, anchoring Rail 1 workload revenue and recurring fee-burn volume.",
    metric: "Commercial demand · 100% provider rail",
    href: "https://hanzo.works",
  },
  {
    step: "05",
    domain: "hanzo.vote",
    role: "DAO Parameter Governance",
    description:
      "Constitutional stewardship of the non-mineable 1T DAO treasury and protocol parameters: activation height h₀, halving interval H, burn fraction β, and emergency back-off.",
    metric: "Audit- & governance-gated activation",
    href: "https://hanzo.vote",
  },
] as const;

// ─── Formatting Helpers ──────────────────────────────────────────────────────

function formatUsdCompact(value: number): string {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`;
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  }
  if (value >= 1_000) {
    return `$${Math.round(value).toLocaleString("en-US")}`;
  }
  return `$${value.toFixed(0)}`;
}

function formatVolumeMillions(millions: number): string {
  if (millions >= 1000) {
    const b = millions / 1000;
    return `$${Number.isInteger(b) ? b.toFixed(0) : b.toFixed(2)}B`;
  }
  return `$${millions}M`;
}

function formatAiCompact(tokens: number): string {
  if (tokens >= 1_000_000_000) {
    return `${(tokens / 1_000_000_000).toFixed(2)}B AI`;
  }
  if (tokens >= 1_000_000) {
    return `${(tokens / 1_000_000).toFixed(2)}M AI`;
  }
  if (tokens >= 1_000) {
    return `${Math.round(tokens / 1_000).toLocaleString("en-US")}K AI`;
  }
  return `${Math.round(tokens).toLocaleString("en-US")} AI`;
}

// ─── Pure Monochrome Slider Control ──────────────────────────────────────────

interface MonochromeSliderProps {
  id: string;
  label: string;
  valueDisplay: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  minLabel: string;
  maxLabel: string;
  hint?: string;
}

function MonochromeSlider({
  id,
  label,
  valueDisplay,
  min,
  max,
  step,
  value,
  onChange,
  minLabel,
  maxLabel,
  hint,
}: MonochromeSliderProps) {
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

  return (
    <div className="space-y-2.5">
      <div className="flex items-baseline justify-between gap-3">
        <label
          htmlFor={id}
          className="text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)]"
        >
          {label}
        </label>
        <span className="font-mono tabular-nums text-sm font-semibold text-[var(--foreground)]">
          {valueDisplay}
        </span>
      </div>

      <div className="relative flex h-6 items-center">
        {/* Track */}
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--border)]">
          <div
            className="h-full bg-[var(--foreground)] transition-[width] duration-75"
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* Thumb */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--background)] bg-[var(--foreground)] shadow-sm transition-[left] duration-75"
          style={{ left: `${pct}%` }}
        />

        {/* Accessible native input */}
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </div>

      <div className="flex items-center justify-between text-[11px] font-mono tabular-nums text-[var(--muted-foreground)]">
        <span>{minLabel}</span>
        {hint ? <span className="hidden sm:inline font-sans text-[11px]">{hint}</span> : null}
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

// ─── Main Page Component ─────────────────────────────────────────────────────

export function NetworkEconomics() {
  const [selectedEraIndex, setSelectedEraIndex] = useState<number>(0);
  const [roleId, setRoleId] = useState<RoleId>("h100-8x");
  const [utilizationPct, setUtilizationPct] = useState<number>(65);
  const [simEra, setSimEra] = useState<number>(1);
  const [annualVolumeM, setAnnualVolumeM] = useState<number>(500);
  const [betaPct, setBetaPct] = useState<number>(30);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Economics & 2T Monetary Policy — Hanzo Network";
    return () => {
      document.title = prevTitle;
    };
  }, []);

  const selectedEra = HALVING_ERAS[selectedEraIndex] ?? HALVING_ERAS[0];
  const activeRole = useMemo(
    () => ROLE_PRESETS.find((r) => r.id === roleId) ?? ROLE_PRESETS[2],
    [roleId]
  );

  // Simulator Calculations (strictly illustrative, governance-gated launch weights)
  const simulation = useMemo(() => {
    const utilRatio = utilizationPct / 100;
    const eraFactor = Math.pow(0.5, simEra - 1); // 1, 0.5, 0.25, 0.125
    const activeEraObj = HALVING_ERAS[simEra - 1] ?? HALVING_ERAS[0];

    // Rail 1: 100% retained customer/cloud/commerce revenue
    const annualDirectUsd = activeRole.peakAnnualDirectUsd * utilRatio;

    // Rail 2: Illustrative PoAI work-weight index & indicative token pool share
    const workWeightScore = Math.round(activeRole.baseWorkWeightUnits * utilRatio);
    const eraAnnualPoolAi = (MINEABLE_POOL_AI * 0.5 * eraFactor) / NOMINAL_ERA_YEARS;
    const illustrativeAnnualAi =
      eraAnnualPoolAi * ((activeRole.era1ReferenceSharePct * utilRatio) / 100);

    // Visual composition between Rail 1 (Customer Revenue) and Rail 2 (PoAI Subsidy)
    // As halving eras advance, PoAI bonus naturally shrinks relative to commercial workload revenue.
    const poaiCompositionRaw = activeRole.poaiRailWeightAtEra1 * eraFactor;
    const poaiSharePct = Math.max(
      2,
      Math.min(45, Math.round((poaiCompositionRaw / (100 - activeRole.poaiRailWeightAtEra1 + poaiCompositionRaw)) * 100))
    );
    const directSharePct = 100 - poaiSharePct;

    // Protocol Fee Burn & Net Deflation Trajectory
    const annualVolumeUsd = annualVolumeM * 1_000_000;
    const annualProtocolFeesUsd = annualVolumeUsd * ILLUSTRATIVE_PROTOCOL_FEE_RATE;
    const annualBurnUsd = annualProtocolFeesUsd * (betaPct / 100);

    // Reference crossover scale:
    // At $2B volume * 2.5% fee * 50% beta = $25M/yr burn.
    // To illustrate how geometric halving intersects persistent fee burn without inventing a token price,
    // we express an illustrative normalized burn-offset index against Era 1's 100-unit issuance baseline:
    // $25M/yr burn = 25 index points (crosses Era 3 = 25% of Era 1), $12.5M/yr = 12.5 pts (crosses Era 4),
    // $6.25M/yr = 6.25 pts (crosses Era 5), $3.125M/yr = 3.125 pts (crosses Era 6).
    const burnOffsetIndex = (annualBurnUsd / 1_000_000); // 1 index unit per $1M/yr permanent burn
    const activeEraIssuanceIndex = 100 * eraFactor; // Era 1: 100, Era 2: 50, Era 3: 25, Era 4: 12.5

    const eraTrajectories = HALVING_ERAS.map((e) => {
      const issuanceIdx = e.heightPct; // 100, 50, 25, 12.5, 6.25, 3.125
      const netIdx = issuanceIdx - burnOffsetIndex;
      return {
        ...e,
        issuanceIdx,
        burnIdx: Math.min(100, burnOffsetIndex),
        netIdx,
        isDeflationary: burnOffsetIndex >= issuanceIdx,
      };
    });

    const firstDeflationaryEra = eraTrajectories.find((t) => t.isDeflationary) ?? null;
    const activeEraDeflationary = burnOffsetIndex >= activeEraIssuanceIndex;
    const burnCoveragePct = Math.min(
      999,
      Math.round((burnOffsetIndex / activeEraIssuanceIndex) * 100)
    );

    return {
      activeEraObj,
      annualDirectUsd,
      workWeightScore,
      eraAnnualPoolAi,
      illustrativeAnnualAi,
      poaiSharePct,
      directSharePct,
      annualProtocolFeesUsd,
      annualBurnUsd,
      burnOffsetIndex,
      activeEraIssuanceIndex,
      eraTrajectories,
      firstDeflationaryEra,
      activeEraDeflationary,
      burnCoveragePct,
    };
  }, [activeRole, utilizationPct, simEra, annualVolumeM, betaPct]);

  return (
    <NetworkShell>
      {/* ─── Section 1: Hero & 2T Hard Cap Transparency Card ──────────────────── */}
      <section className="border-b border-[var(--border)] bg-[var(--background)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex flex-wrap items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
              <span>Monetary Policy</span>
              <span aria-hidden="true">·</span>
              <span>Whitepaper §3 &amp; §10.6</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums text-[var(--foreground)]">Chain 36963</span>
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl leading-[1.04]">
              Fixed supply. Useful work. Structurally deflationary.
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--muted-foreground)] sm:text-lg">
              <strong className="font-semibold text-[var(--foreground)]">AI</strong> is the native
              coin of Hanzo Network—independent from{" "}
              <strong className="font-semibold text-[var(--foreground)]">LUX</strong>, the base-layer
              coin providing post-quantum finality. Supply is hard-capped at{" "}
              <span className="font-mono tabular-nums font-medium text-[var(--foreground)]">
                2,000,000,000,000 AI
              </span>
              , earned only by cryptographically verified intelligence workloads on sovereign
              per-model chains and permanently reduced by protocol fee burn.
            </p>
          </div>

          {/* 2T Hard Cap Transparency Card */}
          <div className="mt-12 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-4 border-b border-[var(--border)] pb-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
                  Hard Cap Transparency Ledger
                </p>
                <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-mono tabular-nums text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl">
                    {HARD_CAP_AI.toLocaleString("en-US")} AI
                  </span>
                  <span className="font-mono tabular-nums text-xs uppercase tracking-wider text-[var(--muted-foreground)]">
                    Hard Maximum Nominal Supply · 18 Decimals
                  </span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 self-start rounded-full border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-3.5 py-1.5 font-mono text-xs tabular-nums text-[var(--foreground)] lg:self-auto">
                <Coins className="h-3.5 w-3.5" />
                <span>0 AI destination-chain inflation</span>
              </div>
            </div>

            {/* 50 / 50 Monochrome Split Bar */}
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between font-mono text-xs tabular-nums text-[var(--muted-foreground)]">
                <span>50% Hanzo DAO Constitutional Treasury (Non-Mineable)</span>
                <span>50% Proof of AI Miner &amp; Validator Pool</span>
              </div>
              <div className="grid h-10 w-full grid-cols-2 overflow-hidden rounded-xl border border-[var(--border-strong)]">
                <div className="flex items-center justify-between bg-[var(--foreground)] px-4 text-[var(--background)]">
                  <span className="font-mono tabular-nums text-xs font-semibold sm:text-sm">
                    {DAO_TREASURY_AI.toLocaleString("en-US")} AI
                  </span>
                  <span className="hidden font-mono tabular-nums text-xs opacity-80 sm:inline">
                    50.0%
                  </span>
                </div>
                <div
                  className="flex items-center justify-between bg-[var(--surface-elevated)] px-4 text-[var(--foreground)]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(-45deg, transparent, transparent 6px, var(--border) 6px, var(--border) 7px)",
                  }}
                >
                  <span className="font-mono tabular-nums text-xs font-semibold sm:text-sm">
                    {MINEABLE_POOL_AI.toLocaleString("en-US")} AI
                  </span>
                  <span className="hidden font-mono tabular-nums text-xs text-[var(--muted-foreground)] sm:inline">
                    50.0%
                  </span>
                </div>
              </div>
            </div>

            {/* 4 Allocation & Conservation Cards */}
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                  Permanent DAO Treasury
                </div>
                <div className="mt-2 font-mono tabular-nums text-2xl font-semibold text-[var(--foreground)]">
                  1T AI <span className="text-sm font-normal text-[var(--muted-foreground)]">(50%)</span>
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-[var(--muted-foreground)]">
                  Fixed at genesis and permanently{" "}
                  <span className="font-medium text-[var(--foreground)]">non-mineable</span>. Funds
                  research, public infrastructure, liquidity, ecosystem grants, and Genesis
                  distribution under Hanzo DAO constitutional treasury controls.
                </p>
              </div>

              <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                  PoAI Mining &amp; Validators
                </div>
                <div className="mt-2 font-mono tabular-nums text-2xl font-semibold text-[var(--foreground)]">
                  1T AI <span className="text-sm font-normal text-[var(--muted-foreground)]">(50%)</span>
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-[var(--muted-foreground)]">
                  Reserved exclusively for proof-earned miner &amp; validator rewards.{" "}
                  <span className="font-medium text-[var(--foreground)]">
                    Zero discretionary mint path.
                  </span>{" "}
                  Geometric Bitcoin-shaped halvings:{" "}
                  <span className="font-mono tabular-nums text-[var(--foreground)]">
                    500B → 250B → 125B → 62.5B
                  </span>
                  , converging to <span className="font-mono tabular-nums">1T</span>.
                </p>
              </div>

              <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                  Destination-Chain Inflation
                </div>
                <div className="mt-2 font-mono tabular-nums text-2xl font-semibold text-[var(--foreground)]">
                  0 AI
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-[var(--muted-foreground)]">
                  A-Chain is the{" "}
                  <span className="font-medium text-[var(--foreground)]">
                    sole mining authority
                  </span>
                  . Z-Chain batches finalized receipts via P3Q; omnichain payouts consume one global
                  work nullifier exactly once with zero local minting.
                </p>
              </div>

              <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                  Permanent Fee Burn
                </div>
                <div className="mt-2 font-mono tabular-nums text-lg font-semibold text-[var(--foreground)]">
                  ΔS = PoAI − β·Fees
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-[var(--muted-foreground)]">
                  A governed fraction{" "}
                  <span className="font-mono text-[var(--foreground)]">β</span> of settled protocol
                  fees is burned permanently. Burns{" "}
                  <span className="font-medium text-[var(--foreground)]">
                    never replenish DAO or mining pools
                  </span>
                  , making net supply structurally deflationary as issuance declines.
                </p>
              </div>
            </div>

            {/* Governance-Gated Disclosure (§10.6) */}
            <div className="mt-6 flex flex-col gap-3 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-elevated)] p-4 sm:flex-row sm:items-start">
              <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-[var(--foreground)]" />
              <div className="text-xs leading-relaxed text-[var(--muted-foreground)]">
                <span className="font-semibold text-[var(--foreground)]">
                  Audit &amp; Governance Activation Gate (Whitepaper §10.6):
                </span>{" "}
                Chain <span className="font-mono tabular-nums text-[var(--foreground)]">36963</span>{" "}
                is live. Proof of AI mining rewards, the{" "}
                <span className="font-mono tabular-nums text-[var(--foreground)]">2T AI</span>{" "}
                monetary activation, P3Q succinct settlement authority, and omnichain payouts remain
                fail-closed until security audits complete and Hanzo DAO governance locks activation
                height <span className="font-mono text-[var(--foreground)]">h₀</span>, halving
                interval <span className="font-mono text-[var(--foreground)]">H</span>,
                miner/validator split, job-class weights, fee-burn fraction{" "}
                <span className="font-mono text-[var(--foreground)]">β</span>, and emergency
                back-off parameters.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 2: Monochrome Halving Schedule Visualization ─────────────── */}
      <section className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
                Geometric Proof-Earned Emission · Whitepaper §3.3
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
                Bitcoin-shaped halving schedule.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-base">
                The <span className="font-mono tabular-nums text-[var(--foreground)]">1T AI</span>{" "}
                proof-earned pool halves every governance-fixed interval{" "}
                <span className="font-mono text-[var(--foreground)]">H</span> in finalized A-Chain
                blocks (nominally <span className="font-mono tabular-nums">4</span> years). Every
                settled receipt is strictly clamped to{" "}
                <span className="font-mono text-[var(--foreground)]">A(h) − mintedMining</span>.
              </p>
            </div>

            {/* Canonical Formula Box */}
            <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--background)] px-5 py-4">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                Cumulative Mining Allowance
              </div>
              <div className="mt-1.5 font-mono tabular-nums text-base font-semibold text-[var(--foreground)] sm:text-lg">
                A(h) = M(1 − 2⁻ᵏ) + f·M·2⁻⁽ᵏ⁺¹⁾
              </div>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] tabular-nums text-[var(--muted-foreground)]">
                <span>M = 10¹² AI</span>
                <span>k = ⌊(h − h₀) / H⌋</span>
                <span>f ∈ [0, 1)</span>
              </div>
            </div>
          </div>

          {/* Pure Monochrome SVG + Interactive Era Bars */}
          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 lg:col-span-8">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-[var(--foreground)]">
                    Era 1–6 Emission Caps &amp; Cumulative Convergence
                  </h3>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Select any era bar to inspect its cap, annualized ceiling, and cumulative % of
                    mineable supply.
                  </p>
                </div>
                <div className="flex items-center gap-4 font-mono text-[11px] text-[var(--muted-foreground)]">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-sm bg-[var(--foreground)]" />
                    Selected Era Cap
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-sm border border-[var(--border-strong)] bg-[var(--surface-elevated)]" />
                    Era Cap
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-0.5 w-4 bg-[var(--foreground)]" />
                    Cumulative %
                  </span>
                </div>
              </div>

              {/* Combined Pure SVG Cumulative Curve + Interactive Era Columns */}
              <div className="relative">
                {/* Pure Monochrome SVG Convergence Line Overlay */}
                <div className="mb-2">
                  <svg
                    viewBox="0 0 600 96"
                    className="h-24 w-full overflow-visible"
                    role="img"
                    aria-label="Cumulative mineable AI supply curve converging from 50% in Era 1 to 98.4375% in Era 6"
                  >
                    {/* 100% asymptotic ceiling line */}
                    <line
                      x1="0"
                      y1="8"
                      x2="600"
                      y2="8"
                      stroke="var(--border-strong)"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                    />
                    <text
                      x="598"
                      y="20"
                      textAnchor="end"
                      fill="var(--muted-foreground)"
                      className="font-mono text-[10px]"
                    >
                      100% Asymptote (1T AI)
                    </text>

                    {/* 50% reference line */}
                    <line
                      x1="0"
                      y1="52"
                      x2="600"
                      y2="52"
                      stroke="var(--border)"
                      strokeWidth="1"
                    />

                    {/* Cumulative polyline */}
                    <polyline
                      fill="none"
                      stroke="var(--foreground)"
                      strokeWidth="2"
                      points={HALVING_ERAS.map((e, idx) => {
                        const x = idx * 100 + 50;
                        // Map 0% -> y=90, 100% -> y=8
                        const y = 90 - (e.cumulativePct / 100) * 82;
                        return `${x},${y.toFixed(1)}`;
                      }).join(" ")}
                    />

                    {/* Data points */}
                    {HALVING_ERAS.map((e, idx) => {
                      const x = idx * 100 + 50;
                      const y = 90 - (e.cumulativePct / 100) * 82;
                      const active = idx === selectedEraIndex;
                      return (
                        <g
                          key={e.era}
                          className="cursor-pointer"
                          onClick={() => setSelectedEraIndex(idx)}
                        >
                          <circle
                            cx={x}
                            cy={y}
                            r={active ? 5.5 : 3.5}
                            fill={active ? "var(--foreground)" : "var(--background)"}
                            stroke="var(--foreground)"
                            strokeWidth="2"
                          />
                          <text
                            x={x}
                            y={y - 10}
                            textAnchor="middle"
                            fill={active ? "var(--foreground)" : "var(--muted-foreground)"}
                            className="font-mono text-[10px] tabular-nums"
                            fontWeight={active ? 700 : 400}
                          >
                            {e.cumulativePctDisplay}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Vertical Monochrome Halving Bars */}
                <div className="grid grid-cols-6 gap-2 sm:gap-3 pt-2 border-t border-[var(--border)]">
                  {HALVING_ERAS.map((e, idx) => {
                    const active = idx === selectedEraIndex;
                    return (
                      <button
                        key={e.era}
                        type="button"
                        onClick={() => setSelectedEraIndex(idx)}
                        aria-pressed={active}
                        className="group flex flex-col items-center focus:outline-none"
                      >
                        <div className="mb-1.5 font-mono tabular-nums text-[11px] font-semibold text-[var(--foreground)] sm:text-xs">
                          {e.capDisplay}
                        </div>
                        <div className="flex h-44 w-full items-end rounded-lg border border-[var(--border)] bg-[var(--surface)] p-1.5 transition-colors group-hover:border-[var(--border-strong)]">
                          <div
                            className={`w-full rounded-md transition-all duration-200 ${
                              active
                                ? "bg-[var(--foreground)]"
                                : "border border-[var(--border-strong)] bg-[var(--surface-elevated)] group-hover:bg-[var(--foreground)]/20"
                            }`}
                            style={{
                              height: `${Math.max(e.heightPct, 6)}%`,
                            }}
                          />
                        </div>
                        <div
                          className={`mt-2 font-mono text-xs tabular-nums ${
                            active
                              ? "font-semibold text-[var(--foreground)]"
                              : "text-[var(--muted-foreground)]"
                          }`}
                        >
                          {e.label}
                        </div>
                        <div className="font-mono text-[10px] tabular-nums text-[var(--muted-foreground)]">
                          k={e.k}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Selected Era Inspector Panel */}
            <div className="flex flex-col justify-between rounded-2xl border border-[var(--border-strong)] bg-[var(--background)] p-6 lg:col-span-4">
              <div>
                <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                      Selected Halving Era
                    </div>
                    <h3 className="mt-1 font-mono text-2xl font-semibold tabular-nums text-[var(--foreground)]">
                      {selectedEra.label}{" "}
                      <span className="text-sm font-normal text-[var(--muted-foreground)]">
                        (k = {selectedEra.k})
                      </span>
                    </h3>
                  </div>
                  <span className="rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-1 font-mono text-xs tabular-nums text-[var(--foreground)]">
                    {selectedEra.nominalYears}
                  </span>
                </div>

                <dl className="mt-5 space-y-3.5 text-sm">
                  <div className="flex items-baseline justify-between gap-2 border-b border-[var(--border)] pb-2.5">
                    <dt className="text-xs text-[var(--muted-foreground)]">Era Emission Cap</dt>
                    <dd className="font-mono tabular-nums font-semibold text-[var(--foreground)]">
                      {selectedEra.capDisplay} AI
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-2 border-b border-[var(--border)] pb-2.5">
                    <dt className="text-xs text-[var(--muted-foreground)]">
                      Share of Mineable Pool
                    </dt>
                    <dd className="font-mono tabular-nums font-medium text-[var(--foreground)]">
                      {selectedEra.eraSharePctDisplay}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-2 border-b border-[var(--border)] pb-2.5">
                    <dt className="text-xs text-[var(--muted-foreground)]">
                      Cumulative Cap at Era End
                    </dt>
                    <dd className="font-mono tabular-nums font-semibold text-[var(--foreground)]">
                      {selectedEra.cumulativeDisplay} AI
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-2 border-b border-[var(--border)] pb-2.5">
                    <dt className="text-xs text-[var(--muted-foreground)]">
                      Cumulative % of 1T Pool
                    </dt>
                    <dd className="font-mono tabular-nums font-semibold text-[var(--foreground)]">
                      {selectedEra.cumulativePctDisplay}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-2 pb-1">
                    <dt className="text-xs text-[var(--muted-foreground)]">
                      Nominal Annualized Cap (4yr)
                    </dt>
                    <dd className="font-mono tabular-nums font-medium text-[var(--foreground)]">
                      {selectedEra.annualizedDisplay} AI/yr
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                  Asymptotic Tail (Era 7+)
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted-foreground)]">
                  Remaining{" "}
                  <span className="font-mono tabular-nums font-medium text-[var(--foreground)]">
                    15.625B AI (1.5625%)
                  </span>{" "}
                  emits geometrically across all subsequent eras via{" "}
                  <span className="font-mono text-[var(--foreground)]">
                    Σ M·2⁻⁽ᵏ⁺¹⁾ = 1T AI
                  </span>
                  , strictly bounded by the{" "}
                  <span className="font-mono tabular-nums text-[var(--foreground)]">2T AI</span>{" "}
                  hard ceiling.
                </p>
              </div>
            </div>
          </div>

          {/* Compact Full Era 1–6 Data Table */}
          <div className="mt-6 overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--background)]">
            <table className="w-full min-w-[640px] border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--surface)] font-mono uppercase tracking-wider text-[var(--muted-foreground)]">
                  <th className="px-4 py-3 font-medium">Era</th>
                  <th className="px-4 py-3 font-medium">Index k</th>
                  <th className="px-4 py-3 font-medium text-right">Per-Era Cap</th>
                  <th className="px-4 py-3 font-medium text-right">Annualized Ceiling</th>
                  <th className="px-4 py-3 font-medium text-right">Cumulative Emitted</th>
                  <th className="px-4 py-3 font-medium text-right">Cumulative % of Mineable</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)] font-mono tabular-nums">
                {HALVING_ERAS.map((e, idx) => {
                  const active = idx === selectedEraIndex;
                  return (
                    <tr
                      key={e.era}
                      onClick={() => setSelectedEraIndex(idx)}
                      className={`cursor-pointer transition-colors ${
                        active
                          ? "bg-[var(--surface-elevated)] font-semibold text-[var(--foreground)]"
                          : "text-[var(--muted-foreground)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
                      }`}
                    >
                      <td className="px-4 py-3 text-[var(--foreground)]">{e.label}</td>
                      <td className="px-4 py-3">{e.k}</td>
                      <td className="px-4 py-3 text-right text-[var(--foreground)]">
                        {e.capDisplay} AI
                      </td>
                      <td className="px-4 py-3 text-right">{e.annualizedDisplay} AI/yr</td>
                      <td className="px-4 py-3 text-right">{e.cumulativeDisplay} AI</td>
                      <td className="px-4 py-3 text-right text-[var(--foreground)]">
                        {e.cumulativePctDisplay}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── Section 3: Interactive "Compute Once, Earn Twice" & Net Deflation Calculator ─── */}
      <section className="border-b border-[var(--border)] bg-[var(--background)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[var(--foreground)]">
                <Sliders className="h-3 w-3" />
                <span>Illustrative Simulator — Launch Weights Governance-Gated</span>
              </div>
              <h2 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
                Compute once, earn twice. Model net deflation.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-base">
                Providers retain <span className="font-mono tabular-nums text-[var(--foreground)]">100%</span>{" "}
                of their customer or cloud workload payment (Rail 1) while earning Proof of AI work
                rewards (Rail 2) for attaching CPU-verifiable transcripts. Test how hardware class,
                utilization, halving era, settled volume, and fee-burn fraction{" "}
                <span className="font-mono text-[var(--foreground)]">β</span> interact.
              </p>
            </div>
          </div>

          {/* Role Preset Selector */}
          <div className="mt-8">
            <div className="mb-2.5 font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
              Select Operator / Builder Role Preset
            </div>
            <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
              {ROLE_PRESETS.map((preset) => {
                const Icon = preset.icon;
                const active = preset.id === roleId;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setRoleId(preset.id)}
                    aria-pressed={active}
                    className={`flex flex-col items-start rounded-xl border p-3.5 text-left transition-all ${
                      active
                        ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
                        : "border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--border-strong)]"
                    }`}
                  >
                    <div className="flex w-full items-center justify-between gap-2">
                      <Icon className="h-4 w-4 shrink-0" />
                      <span
                        className={`font-mono text-[10px] uppercase tracking-wider ${
                          active ? "opacity-80" : "text-[var(--muted-foreground)]"
                        }`}
                      >
                        Preset
                      </span>
                    </div>
                    <div className="mt-2.5 text-xs font-semibold leading-snug">{preset.label}</div>
                    <div
                      className={`mt-1 text-[11px] leading-snug ${
                        active ? "opacity-75" : "text-[var(--muted-foreground)]"
                      }`}
                    >
                      {preset.hardwareProfile}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Controls + Live Outputs Grid */}
          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            {/* Left Column: Sliders */}
            <div className="flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 lg:col-span-5">
              <div className="space-y-7">
                <div className="border-b border-[var(--border)] pb-4">
                  <h3 className="text-sm font-semibold text-[var(--foreground)]">
                    Simulation Parameters
                  </h3>
                  <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                    Adjust node utilization and network-wide settlement parameters.
                  </p>
                </div>

                <MonochromeSlider
                  id="sim-utilization"
                  label="Node / Workload Utilization"
                  valueDisplay={`${utilizationPct}%`}
                  min={10}
                  max={95}
                  step={1}
                  value={utilizationPct}
                  onChange={setUtilizationPct}
                  minLabel="10%"
                  maxLabel="95%"
                  hint="Active verified duty cycle"
                />

                <div className="space-y-2.5">
                  <MonochromeSlider
                    id="sim-era"
                    label="Halving Era"
                    valueDisplay={`Era ${simEra} (${simulation.activeEraObj.capDisplay} cap)`}
                    min={1}
                    max={4}
                    step={1}
                    value={simEra}
                    onChange={setSimEra}
                    minLabel="Era 1 (500B)"
                    maxLabel="Era 4 (62.5B)"
                    hint={`Annualized max: ${simulation.activeEraObj.annualizedDisplay} AI/yr`}
                  />
                  <div className="grid grid-cols-4 gap-1.5 pt-1">
                    {[1, 2, 3, 4].map((eraNum) => (
                      <button
                        key={eraNum}
                        type="button"
                        onClick={() => setSimEra(eraNum)}
                        className={`rounded-lg border py-1 font-mono text-[11px] tabular-nums transition-colors ${
                          simEra === eraNum
                            ? "border-[var(--foreground)] bg-[var(--foreground)] font-semibold text-[var(--background)]"
                            : "border-[var(--border)] bg-[var(--background)] text-[var(--muted-foreground)] hover:border-[var(--border-strong)] hover:text-[var(--foreground)]"
                        }`}
                      >
                        Era {eraNum}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <MonochromeSlider
                    id="sim-volume"
                    label="Network Annual Settled Compute Volume"
                    valueDisplay={formatVolumeMillions(annualVolumeM)}
                    min={10}
                    max={2000}
                    step={10}
                    value={annualVolumeM}
                    onChange={setAnnualVolumeM}
                    minLabel="$10M"
                    maxLabel="$2B"
                    hint="Inference + training + HMM"
                  />
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {[10, 100, 500, 1000, 2000].map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setAnnualVolumeM(v)}
                        className={`rounded-lg border px-2.5 py-1 font-mono text-[11px] tabular-nums transition-colors ${
                          annualVolumeM === v
                            ? "border-[var(--foreground)] bg-[var(--foreground)] font-semibold text-[var(--background)]"
                            : "border-[var(--border)] bg-[var(--background)] text-[var(--muted-foreground)] hover:border-[var(--border-strong)] hover:text-[var(--foreground)]"
                        }`}
                      >
                        {formatVolumeMillions(v)}
                      </button>
                    ))}
                  </div>
                </div>

                <MonochromeSlider
                  id="sim-beta"
                  label="Protocol Fee-Burn Fraction (β)"
                  valueDisplay={`${betaPct}%`}
                  min={10}
                  max={50}
                  step={1}
                  value={betaPct}
                  onChange={setBetaPct}
                  minLabel="10%"
                  maxLabel="50%"
                  hint="Governed by hanzo.vote"
                />
              </div>

              <div className="mt-7 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 text-[11px] leading-relaxed text-[var(--muted-foreground)]">
                <span className="font-mono uppercase tracking-wider text-[var(--foreground)]">
                  Model Disclosure:
                </span>{" "}
                Illustrative simulation only. Reward weights, protocol fee rate (modeled at{" "}
                <span className="font-mono tabular-nums text-[var(--foreground)]">2.5%</span>),
                halving interval <span className="font-mono text-[var(--foreground)]">H</span>, and
                burn fraction <span className="font-mono text-[var(--foreground)]">β</span> remain
                governance-gated per §10.6. No token price or yield is promised.
              </div>
            </div>

            {/* Right Column: Dual-Rail + Node Utility + Net Supply Trajectory */}
            <div className="space-y-6 lg:col-span-7">
              {/* Output Card 1: Dual-Rail Composition */}
              <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                      Dual-Rail Output · {activeRole.label}
                    </div>
                    <h3 className="mt-0.5 text-base font-semibold text-[var(--foreground)]">
                      Compute Once, Earn Twice Composition
                    </h3>
                  </div>
                  <span className="rounded-full border border-[var(--border-strong)] bg-[var(--background)] px-3 py-1 font-mono text-[11px] tabular-nums text-[var(--foreground)]">
                    100% Customer Revenue Retained
                  </span>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
                    <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                      Rail 1 · Retained Workload Revenue
                    </div>
                    <div className="mt-1.5 font-mono tabular-nums text-2xl font-semibold text-[var(--foreground)]">
                      {formatUsdCompact(simulation.annualDirectUsd)}
                      <span className="text-xs font-normal text-[var(--muted-foreground)]">
                        {" "}
                        / yr (est.)
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-[var(--muted-foreground)]">
                      Ordinary customer, cloud-adapter, or agentic commerce revenue kept{" "}
                      <span className="font-mono tabular-nums text-[var(--foreground)]">100%</span>{" "}
                      by the operator.
                    </p>
                  </div>

                  <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
                    <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                      Rail 2 · PoAI Work-Weight Share (Era {simEra})
                    </div>
                    <div className="mt-1.5 font-mono tabular-nums text-2xl font-semibold text-[var(--foreground)]">
                      {formatAiCompact(simulation.illustrativeAnnualAi)}
                      <span className="text-xs font-normal text-[var(--muted-foreground)]">
                        {" "}
                        / yr (sim.)
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-[var(--muted-foreground)]">
                      Verified work index:{" "}
                      <span className="font-mono tabular-nums text-[var(--foreground)]">
                        {simulation.workWeightScore.toLocaleString("en-US")} u/yr
                      </span>{" "}
                      · Clamped to{" "}
                      <span className="font-mono text-[var(--foreground)]">
                        A(h) − mintedMining
                      </span>
                      .
                    </p>
                  </div>
                </div>

                {/* Stacked Dual-Rail Bar */}
                <div className="mt-5">
                  <div className="mb-1.5 flex items-center justify-between font-mono text-[11px] tabular-nums text-[var(--muted-foreground)]">
                    <span>Rail 1 Commercial Revenue ({simulation.directSharePct}%)</span>
                    <span>Rail 2 PoAI Bootstrap Weight ({simulation.poaiSharePct}%)</span>
                  </div>
                  <div className="flex h-3.5 w-full overflow-hidden rounded-full border border-[var(--border-strong)] bg-[var(--background)]">
                    <div
                      className="h-full bg-[var(--foreground)] transition-[width] duration-200"
                      style={{ width: `${simulation.directSharePct}%` }}
                    />
                    <div
                      className="h-full bg-[var(--surface-elevated)] transition-[width] duration-200"
                      style={{
                        width: `${simulation.poaiSharePct}%`,
                        backgroundImage:
                          "repeating-linear-gradient(-45deg, transparent, transparent 4px, var(--border-strong) 4px, var(--border-strong) 5px)",
                      }}
                    />
                  </div>
                  <p className="mt-2.5 text-xs leading-relaxed text-[var(--muted-foreground)]">
                    {activeRole.dualRailSummary}
                  </p>
                </div>
              </div>

              {/* Output Card 2: Node Multi-Utility Breakdown */}
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                      Single-Binary Node Stack (hanzod)
                    </div>
                    <h3 className="mt-0.5 text-base font-semibold text-[var(--foreground)]">
                      Node Multi-Utility Workload Mix
                    </h3>
                  </div>
                  <span className="font-mono tabular-nums text-xs text-[var(--muted-foreground)]">
                    Active duty: {utilizationPct}%
                  </span>
                </div>

                {/* 4-segment monochrome bar */}
                <div className="mt-4 flex h-3 w-full overflow-hidden rounded-full border border-[var(--border-strong)] bg-[var(--background)]">
                  <div
                    className="h-full bg-[var(--foreground)]"
                    style={{ width: `${activeRole.utilitySplit.k3sCloud}%` }}
                    title={`k3s Cloud: ${activeRole.utilitySplit.k3sCloud}%`}
                  />
                  <div
                    className="h-full bg-[var(--foreground)]/65"
                    style={{ width: `${activeRole.utilitySplit.inference}%` }}
                    title={`Inference: ${activeRole.utilitySplit.inference}%`}
                  />
                  <div
                    className="h-full bg-[var(--foreground)]/35"
                    style={{ width: `${activeRole.utilitySplit.research}%` }}
                    title={`Research: ${activeRole.utilitySplit.research}%`}
                  />
                  <div
                    className="h-full bg-[var(--surface-elevated)]"
                    style={{
                      width: `${activeRole.utilitySplit.validation}%`,
                      backgroundImage:
                        "repeating-linear-gradient(90deg, transparent, transparent 3px, var(--border-strong) 3px, var(--border-strong) 4px)",
                    }}
                    title={`Validation: ${activeRole.utilitySplit.validation}%`}
                  />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    {
                      label: "k3s Cloud",
                      pct: activeRole.utilitySplit.k3sCloud,
                      sub: "Hanzo Cloud pods",
                      swatchClass: "bg-[var(--foreground)]",
                    },
                    {
                      label: "Inference",
                      pct: activeRole.utilitySplit.inference,
                      sub: "hanzo-engine + PoAI",
                      swatchClass: "bg-[var(--foreground)]/65",
                    },
                    {
                      label: "Research",
                      pct: activeRole.utilitySplit.research,
                      sub: "/v1/research & evals",
                      swatchClass: "bg-[var(--foreground)]/35",
                    },
                    {
                      label: "Validation",
                      pct: activeRole.utilitySplit.validation,
                      sub: "CPU checks & chains",
                      swatchClass: "border border-[var(--border-strong)] bg-[var(--surface-elevated)]",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-3"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className={`h-2 w-2 rounded-sm ${item.swatchClass}`} />
                        <span className="text-xs font-medium text-[var(--foreground)]">
                          {item.label}
                        </span>
                      </div>
                      <div className="mt-1.5 font-mono tabular-nums text-lg font-semibold text-[var(--foreground)]">
                        {item.pct}%
                      </div>
                      <div className="text-[11px] text-[var(--muted-foreground)]">{item.sub}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Output Card 3: Net Supply Trajectory & Fee Burn Crossover */}
              <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                      Net Supply Dynamics · ΔS = PoAI issuance − β · settled fees
                    </div>
                    <h3 className="mt-0.5 text-base font-semibold text-[var(--foreground)]">
                      Fee Burn vs. Declining Geometric Issuance
                    </h3>
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--background)] px-3 py-1 font-mono text-[11px] tabular-nums text-[var(--foreground)]">
                    <Flame className="h-3.5 w-3.5" />
                    {simulation.activeEraDeflationary
                      ? `Era ${simEra}: Net Deflationary (ΔS ≤ 0)`
                      : simulation.firstDeflationaryEra
                        ? `Illustrative Crossover: ${simulation.firstDeflationaryEra.label}`
                        : "Bootstrap Issuance Regime (ΔS > 0)"}
                  </span>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-3.5">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                      Settled Protocol Fees (2.5% est.)
                    </div>
                    <div className="mt-1 font-mono tabular-nums text-lg font-semibold text-[var(--foreground)]">
                      {formatUsdCompact(simulation.annualProtocolFeesUsd)}
                      <span className="text-xs font-normal text-[var(--muted-foreground)]">/yr</span>
                    </div>
                  </div>
                  <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-3.5">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                      Permanent Annual Burn (β={betaPct}%)
                    </div>
                    <div className="mt-1 font-mono tabular-nums text-lg font-semibold text-[var(--foreground)]">
                      {formatUsdCompact(simulation.annualBurnUsd)}
                      <span className="text-xs font-normal text-[var(--muted-foreground)]">/yr</span>
                    </div>
                  </div>
                  <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-3.5">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                      Era {simEra} Burn Offset Index
                    </div>
                    <div className="mt-1 font-mono tabular-nums text-lg font-semibold text-[var(--foreground)]">
                      {simulation.burnCoveragePct}%
                      <span className="text-xs font-normal text-[var(--muted-foreground)]">
                        {" "}
                        of cap
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pure Monochrome Trajectory SVG: Geometric Issuance Step-Down vs Permanent Burn Line */}
                <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-[var(--muted-foreground)]">
                    <span>Geometric Issuance Decay vs. Permanent Fee Burn Threshold (Eras 1–6)</span>
                    <span className="tabular-nums text-[var(--foreground)]">
                      Burn never refills DAO or mining pools
                    </span>
                  </div>

                  <svg
                    viewBox="0 0 600 148"
                    className="h-36 w-full"
                    role="img"
                    aria-label="Monochrome chart comparing declining geometric PoAI issuance across Eras 1 to 6 against permanent protocol fee burn"
                  >
                    {/* Grid baselines */}
                    {[20, 60, 100, 124].map((y) => (
                      <line
                        key={y}
                        x1="28"
                        y1={y}
                        x2="588"
                        y2={y}
                        stroke="var(--border)"
                        strokeWidth="1"
                      />
                    ))}

                    {/* Era issuance bars */}
                    {simulation.eraTrajectories.map((t, idx) => {
                      const x = 44 + idx * 90;
                      const barW = 54;
                      const barH = Math.max(4, (t.issuanceIdx / 100) * 104);
                      const y = 124 - barH;
                      const isCurrent = t.era === simEra;
                      return (
                        <g key={t.era}>
                          <rect
                            x={x}
                            y={y}
                            width={barW}
                            height={barH}
                            rx="4"
                            fill={
                              t.isDeflationary
                                ? "var(--surface-elevated)"
                                : isCurrent
                                  ? "var(--foreground)"
                                  : "var(--muted-foreground)"
                            }
                            fillOpacity={t.isDeflationary ? 1 : isCurrent ? 1 : 0.35}
                            stroke={
                              isCurrent || t.isDeflationary
                                ? "var(--foreground)"
                                : "var(--border-strong)"
                            }
                            strokeDasharray={t.isDeflationary ? "3 2" : undefined}
                            strokeWidth={isCurrent ? 1.75 : 1}
                          />
                          <text
                            x={x + barW / 2}
                            y={y - 5}
                            textAnchor="middle"
                            fill="var(--muted-foreground)"
                            className="font-mono text-[9.5px] tabular-nums"
                          >
                            {t.annualizedDisplay}
                          </text>
                          <text
                            x={x + barW / 2}
                            y={140}
                            textAnchor="middle"
                            fill={isCurrent ? "var(--foreground)" : "var(--muted-foreground)"}
                            fontWeight={isCurrent ? 700 : 400}
                            className="font-mono text-[10px] tabular-nums"
                          >
                            {t.label}
                            {t.isDeflationary ? " (ΔS≤0)" : ""}
                          </text>
                        </g>
                      );
                    })}

                    {/* Horizontal permanent fee-burn line */}
                    {(() => {
                      const clampedBurn = Math.min(96, Math.max(1.5, simulation.burnOffsetIndex));
                      const burnY = 124 - (clampedBurn / 100) * 104;
                      return (
                        <g>
                          <line
                            x1="28"
                            y1={burnY}
                            x2="588"
                            y2={burnY}
                            stroke="var(--foreground)"
                            strokeWidth="2"
                            strokeDasharray="6 3"
                          />
                          <rect
                            x="390"
                            y={Math.max(4, burnY - 19)}
                            width="196"
                            height="16"
                            rx="4"
                            fill="var(--foreground)"
                          />
                          <text
                            x="488"
                            y={Math.max(15, burnY - 8)}
                            textAnchor="middle"
                            fill="var(--background)"
                            className="font-mono text-[9.5px] tabular-nums"
                            fontWeight="600"
                          >
                            β·Fees Burn: {formatUsdCompact(simulation.annualBurnUsd)}/yr
                          </text>
                        </g>
                      );
                    })()}
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 4: Hamiltonian Market Maker (HMM) & Compute Markets ──────── */}
      <section className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
              HIP-0008 · Whitepaper §4 &amp; §5
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
              Hamiltonian Market Maker &amp; Useful-Compute Markets.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-base">
              Hanzo Network clears inference, training, evaluation, and storage through one
              canonical A-Chain job format while pricing liquidity endogenously via the Hamiltonian
              Market Maker. Market pricing and proof validity are strictly separated.
            </p>
          </div>

          {/* HMM Invariant Block + Monochrome Convex Pricing Curve */}
          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--background)] p-6 sm:p-8 lg:col-span-7">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] pb-5">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                    Oracle-Minimal Endogenous Pricing
                  </div>
                  <div className="mt-1 font-mono text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
                    H(Ψ, Θ) = κ
                  </div>
                </div>
                <span className="rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-1 font-mono text-xs text-[var(--foreground)]">
                  HIP-0008 Core Invariant
                </span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                  <div className="font-mono text-lg font-semibold text-[var(--foreground)]">Ψ</div>
                  <div className="mt-1 text-xs font-semibold text-[var(--foreground)]">
                    Quality-Weighted Supply
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted-foreground)]">
                    Active bonded CPU/GPU capacity weighted by verifiable latency, throughput,
                    availability, and deterministic accuracy.
                  </p>
                </div>

                <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                  <div className="font-mono text-lg font-semibold text-[var(--foreground)]">Θ</div>
                  <div className="mt-1 text-xs font-semibold text-[var(--foreground)]">
                    Demand Credit Pool
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted-foreground)]">
                    Pre-admitted compute demand and settlement liquidity escrowed by API callers,
                    enterprises, and autonomous agents.
                  </p>
                </div>

                <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                  <div className="font-mono text-lg font-semibold text-[var(--foreground)]">κ</div>
                  <div className="mt-1 text-xs font-semibold text-[var(--foreground)]">
                    Conserved Invariant
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted-foreground)]">
                    Clears compute endogenously without fragile external price feeds: scarce supply
                    raises marginal clearing price to pull in idle cloud nodes.
                  </p>
                </div>
              </div>

              {/* On-chain Model Registry Commitment Note (§4) */}
              <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--foreground)]">
                  On-Chain Model Commitments (Whitepaper §4)
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted-foreground)]">
                  Weights live in content-addressed storage; sovereign per-model chains store six
                  immutable commitments per version:{" "}
                  <code className="font-mono text-[var(--foreground)]">model_root</code>,{" "}
                  <code className="font-mono text-[var(--foreground)]">benchmark_root</code>,{" "}
                  <code className="font-mono text-[var(--foreground)]">license_root</code>,{" "}
                  <code className="font-mono text-[var(--foreground)]">inference_price</code>,{" "}
                  <code className="font-mono text-[var(--foreground)]">training_history</code>, and{" "}
                  <code className="font-mono text-[var(--foreground)]">owner</code>.
                </p>
              </div>
            </div>

            {/* Pure Monochrome SVG Invariant Manifold */}
            <div className="flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 lg:col-span-5">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                  Conservation Manifold
                </div>
                <h3 className="mt-1 text-sm font-semibold text-[var(--foreground)]">
                  Endogenous Compute Clearing Curve
                </h3>
                <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                  Instant sub-second settlement with TWAP &amp; price-impact bounds.
                </p>
              </div>

              <svg
                viewBox="0 0 360 220"
                className="my-4 h-52 w-full"
                role="img"
                aria-label="Monochrome invariant curve H of Psi and Theta equals kappa showing endogenous price adjustment"
              >
                {/* Axes */}
                <line
                  x1="44"
                  y1="184"
                  x2="338"
                  y2="184"
                  stroke="var(--border-strong)"
                  strokeWidth="1.25"
                />
                <line
                  x1="44"
                  y1="184"
                  x2="44"
                  y2="18"
                  stroke="var(--border-strong)"
                  strokeWidth="1.25"
                />

                {/* Grid */}
                {[60, 100, 140].map((y) => (
                  <line
                    key={y}
                    x1="44"
                    y1={y}
                    x2="338"
                    y2={y}
                    stroke="var(--border)"
                    strokeDasharray="3 3"
                  />
                ))}

                {/* Secondary contour */}
                <path
                  d="M 88 28 Q 130 132 328 164"
                  fill="none"
                  stroke="var(--border-strong)"
                  strokeWidth="1.25"
                  strokeDasharray="4 4"
                />

                {/* Primary H(Psi, Theta) = kappa curve */}
                <path
                  d="M 66 24 Q 108 136 322 172"
                  fill="none"
                  stroke="var(--foreground)"
                  strokeWidth="2.25"
                />

                {/* Equilibrium point */}
                <line
                  x1="154"
                  y1="126"
                  x2="154"
                  y2="184"
                  stroke="var(--muted-foreground)"
                  strokeDasharray="2 2"
                />
                <line
                  x1="44"
                  y1="126"
                  x2="154"
                  y2="126"
                  stroke="var(--muted-foreground)"
                  strokeDasharray="2 2"
                />
                <circle
                  cx="154"
                  cy="126"
                  r="5"
                  fill="var(--foreground)"
                  stroke="var(--background)"
                  strokeWidth="2"
                />

                {/* Surge demand point */}
                <circle
                  cx="94"
                  cy="74"
                  r="4"
                  fill="var(--background)"
                  stroke="var(--foreground)"
                  strokeWidth="2"
                />

                {/* Labels */}
                <text
                  x="164"
                  y="118"
                  fill="var(--foreground)"
                  className="font-mono text-[10px]"
                  fontWeight="600"
                >
                  Equilibrium (Ψ*, Θ*)
                </text>
                <text
                  x="104"
                  y="68"
                  fill="var(--muted-foreground)"
                  className="font-mono text-[9.5px]"
                >
                  Demand Surge → Higher Price → Pulls Idle Supply
                </text>
                <text
                  x="336"
                  y="202"
                  textAnchor="end"
                  fill="var(--muted-foreground)"
                  className="font-mono text-[10px]"
                >
                  Ψ (Quality-Weighted Supply) →
                </text>
                <text
                  x="16"
                  y="102"
                  textAnchor="middle"
                  fill="var(--muted-foreground)"
                  className="font-mono text-[10px]"
                  transform="rotate(-90 16 102)"
                >
                  Θ (Demand Pool) →
                </text>
              </svg>

              <div className="flex items-center justify-between border-t border-[var(--border)] pt-3 font-mono text-[11px] tabular-nums text-[var(--muted-foreground)]">
                <span>Spot &amp; Reserved Pools</span>
                <span className="text-[var(--foreground)]">TWAP + Impact Caps</span>
              </div>
            </div>
          </div>

          {/* Spot vs Reserved Capacity Markets */}
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted-foreground)]">
                  Market Tier 01 · §5.8
                </span>
                <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-0.5 font-mono text-[11px] text-[var(--foreground)]">
                  Elastic / Preemptible
                </span>
              </div>
              <h3 className="mt-3 text-xl font-semibold text-[var(--foreground)]">
                Spot Capacity Market
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
                Routes open inference, embedding, and evaluation jobs to global CPU/GPU inventory at
                live endogenous clearing rates. Trades cancellation risk for lower marginal cost and
                absorbs idle capacity from existing AI clouds.
              </p>
              <ul className="mt-4 space-y-2 border-t border-[var(--border)] pt-4 text-xs text-[var(--muted-foreground)]">
                <li className="flex items-center justify-between">
                  <span>Clearing mechanism</span>
                  <span className="font-mono text-[var(--foreground)]">HMM Spot Pool</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Ideal workloads</span>
                  <span className="font-mono text-[var(--foreground)]">
                    Burst inference · Evals · Batch
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Verification path</span>
                  <span className="font-mono text-[var(--foreground)]">
                    Identical A-Chain PoAI Receipt
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted-foreground)]">
                  Market Tier 02 · §5.8
                </span>
                <span className="rounded-full border border-[var(--border-strong)] bg-[var(--foreground)] px-2.5 py-0.5 font-mono text-[11px] text-[var(--background)]">
                  SLA / Escrowed
                </span>
              </div>
              <h3 className="mt-3 text-xl font-semibold text-[var(--foreground)]">
                Reserved Capacity Market
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
                Escrows forward capacity commitments with bonded latency, throughput, and
                availability SLAs. Guarantees dedicated compute windows for enterprise agents and
                multi-checkpoint deterministic training runs.
              </p>
              <ul className="mt-4 space-y-2 border-t border-[var(--border)] pt-4 text-xs text-[var(--muted-foreground)]">
                <li className="flex items-center justify-between">
                  <span>Clearing mechanism</span>
                  <span className="font-mono text-[var(--foreground)]">Forward Escrow + Bond</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Ideal workloads</span>
                  <span className="font-mono text-[var(--foreground)]">
                    Production SLAs · Training
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Verification path</span>
                  <span className="font-mono text-[var(--foreground)]">
                    Identical A-Chain PoAI Receipt
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Staking & Objective Slashing Table (§3.7) */}
          <div className="mt-6 rounded-2xl border border-[var(--border-strong)] bg-[var(--background)] p-6 sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--muted-foreground)]">
                  <Scale className="h-3.5 w-3.5 text-[var(--foreground)]" />
                  <span>Staking &amp; Objective Slashing · Whitepaper §3.7</span>
                </div>
                <h3 className="mt-1.5 text-xl font-semibold text-[var(--foreground)]">
                  Cryptographic fault proofs only—never subjective votes.
                </h3>
              </div>
              <span className="self-start rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-1 font-mono text-[11px] text-[var(--foreground)] sm:self-auto">
                Objective Slashing Only
              </span>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-[var(--border-strong)] font-mono uppercase tracking-wider text-[var(--muted-foreground)]">
                    <th className="py-3 pr-4 font-medium">Slashable Fault</th>
                    <th className="py-3 px-4 font-medium">Objective Proof Condition</th>
                    <th className="py-3 pl-4 font-medium">Protocol Enforcement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {SLASHING_CONDITIONS.map((row) => (
                    <tr key={row.fault}>
                      <td className="py-3.5 pr-4 font-mono font-semibold text-[var(--foreground)] whitespace-nowrap">
                        {row.fault}
                      </td>
                      <td className="py-3.5 px-4 text-[var(--muted-foreground)]">{row.proof}</td>
                      <td className="py-3.5 pl-4 text-[var(--foreground)]">{row.enforcement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 5: Anti-Farming Invariants (Whitepaper §5.7) ─────────────── */}
      <section className="border-b border-[var(--border)] bg-[var(--background)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
              Sybil &amp; Wash-Compute Resistance · Whitepaper §3.4 &amp; §5.7
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
              Six Anti-Farming Invariants.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-base">
              Proof of AI rewards cryptographically bound useful computation without turning fake
              invoices or idle rigs into a mint. Every receipt violating any invariant below
              receives{" "}
              <span className="font-mono tabular-nums font-semibold text-[var(--foreground)]">
                0 AI
              </span>{" "}
              subsidy.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ANTI_FARMING_RULES.map((rule) => (
              <div
                key={rule.code}
                className="flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--border-strong)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono tabular-nums text-xs font-semibold text-[var(--muted-foreground)]">
                      INVARIANT {rule.code}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-[var(--border-strong)] bg-[var(--background)] px-2.5 py-0.5 font-mono tabular-nums text-[10px] font-semibold uppercase text-[var(--foreground)]">
                      <Ban className="h-3 w-3" />0 AI Subsidy
                    </span>
                  </div>

                  <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 font-mono text-xs text-[var(--muted-foreground)] line-through decoration-[var(--foreground)]/50">
                    {rule.rejected}
                  </div>

                  <h3 className="mt-4 text-base font-semibold text-[var(--foreground)]">
                    {rule.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--muted-foreground)]">
                    {rule.detail}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-1.5 border-t border-[var(--border)] pt-3 font-mono text-[11px] text-[var(--foreground)]">
                  <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                  <span>Enforced prior to A-Chain finality</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 6: Cross-Ecosystem DeFi Flywheel & CTA Strip ─────────────── */}
      <section className="bg-[var(--surface)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
              Value Accrual &amp; Protocol Surface
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
              Cross-Ecosystem DeFi Flywheel.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-base">
              Five specialized surfaces close into one compounding economic loop: enterprise and
              agentic commerce drive settled compute fees across sovereign per-model chains,
              accelerating permanent <span className="font-mono text-[var(--foreground)]">β</span>{" "}
              burn while DAO curation raises model quality and validator demand.
            </p>
          </div>

          {/* Monochrome Loop Bar */}
          <div className="mt-8 rounded-2xl border border-[var(--border-strong)] bg-[var(--background)] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
              {[
                { icon: Briefcase, label: "Enterprise & Agent Demand" },
                { icon: Store, label: "HMM & Commerce Fees" },
                { icon: Flame, label: "Permanent β Burn (ΔS)" },
                { icon: Network, label: "Sovereign Chains & Staking" },
                { icon: Vote, label: "DAO Governance & Bounties" },
              ].map((node, idx, arr) => {
                const Icon = node.icon;
                return (
                  <React.Fragment key={node.label}>
                    <div className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[var(--foreground)]">
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      <span>{node.label}</span>
                    </div>
                    {idx < arr.length - 1 ? (
                      <ArrowRight className="hidden h-3.5 w-3.5 text-[var(--muted-foreground)] lg:block" />
                    ) : (
                      <Repeat className="hidden h-3.5 w-3.5 text-[var(--foreground)] lg:block" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* 5 Ecosystem Cards */}
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {FLYWHEEL_SURFACES.map((item) => {
              const cardInner = (
                <>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono tabular-nums text-[11px] text-[var(--muted-foreground)]">
                        {item.step}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-[var(--muted-foreground)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--foreground)]" />
                    </div>
                    <h3 className="mt-3 font-mono text-sm font-semibold text-[var(--foreground)]">
                      {item.domain}
                    </h3>
                    <div className="mt-1 text-xs font-medium text-[var(--foreground)]/80">
                      {item.role}
                    </div>
                    <p className="mt-2.5 text-xs leading-relaxed text-[var(--muted-foreground)]">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-4 border-t border-[var(--border)] pt-3 font-mono text-[10px] tabular-nums uppercase tracking-wider text-[var(--muted-foreground)]">
                    {item.metric}
                  </div>
                </>
              );

              const cardClasses =
                "group flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5 transition-colors hover:border-[var(--border-strong)]";

              if ("to" in item) {
                return (
                  <Link key={item.domain} to={item.to} className={cardClasses}>
                    {cardInner}
                  </Link>
                );
              }

              return (
                <a
                  key={item.domain}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClasses}
                >
                  {cardInner}
                </a>
              );
            })}
          </div>

          {/* Final CTA Strip */}
          <div className="mt-12 rounded-2xl border border-[var(--border-strong)] bg-[var(--background)] p-8 sm:p-10">
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <div className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
                  Genesis Participation &amp; Specification
                </div>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl">
                  Inspect the formal specification or enter Genesis early access.
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
                  Redeem a 6-character invite code for the Genesis terminal (multi-asset staking,
                  Era 1 <span className="font-mono tabular-nums text-[var(--foreground)]">500B AI</span>{" "}
                  mining whitelist, and operator queues) or audit every equation directly in the
                  Hanzo AI Chain whitepaper.
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
                <a
                  href="https://papers.hanzo.ai/hanzo-ai-chain/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--surface-elevated)]"
                >
                  <FileText className="h-4 w-4" />
                  <span>Read Full Whitepaper</span>
                  <ArrowUpRight className="h-4 w-4 opacity-70" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </NetworkShell>
  );
}

export default NetworkEconomics;
