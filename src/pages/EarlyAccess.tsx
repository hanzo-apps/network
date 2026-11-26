import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  CheckCircle2,
  Cloud,
  Code2,
  Coins,
  Copy,
  Cpu,
  Database,
  HardDrive,
  Hash,
  KeyRound,
  Layers,
  Lock,
  Network,
  RefreshCw,
  Server,
  Shield,
  ShieldCheck,
  Store,
  Terminal,
  Trophy,
  Unlock,
  Users,
  Vote,
  Wallet,
} from "lucide-react";
import { NetworkShell } from "@/components/network/NetworkShell";
import { useLogin } from "@/components/Try";
import {
  NETWORK_API,
  submitInviteWaitlist,
  useLiveChain,
  verifyInviteCode,
  type ChainFamily,
  type HolderRow,
  type InviteVerifyResponse,
  type LeaderboardRow,
  type SaleTranche,
  type StakeVault,
} from "@/lib/networkData";

// ─── Types ───────────────────────────────────────────────────────────────────

type WaitlistRole = "staker" | "miner" | "builder" | "researcher";
type TerminalTab = "stake" | "sale" | "mining" | "leaderboard";
type LeaderboardSubTab = "stakers" | "miners" | "builders" | "researchers" | "holders";
type HardwareClassId =
  | "apple-silicon"
  | "cpu-validator"
  | "consumer-gpu"
  | "datacenter-gpu"
  | "cloud-adapter";

interface VerifiedSession {
  code: string;
  inviterHandle?: string;
  clusterName?: string;
  mode: "verified" | "dev-preview";
  verifiedAt: string;
}

interface BoundWalletDraft {
  id: string;
  family: ChainFamily;
  address: string;
  stagedAt: string;
}

interface BoundMinerDraft {
  nodeId: string;
  hardwareClass: HardwareClassId;
  payoutChain: string;
  region: string;
  stagedAt: string;
}

// ─── Static Protocol Catalogs (Zero Fabricated Metrics) ──────────────────────

const WAITLIST_ROLES: Array<{
  id: WaitlistRole;
  title: string;
  subtitle: string;
}> = [
  { id: "staker", title: "Capital / Staker", subtitle: "Multi-asset Genesis vaults" },
  { id: "miner", title: "Node / Miner", subtitle: "hanzod PoAI & cloud adapters" },
  { id: "builder", title: "Builder / Developer", subtitle: "hanzo.market & agent APIs" },
  { id: "researcher", title: "Researcher / De-Work", subtitle: "work.hanzo.network bounties" },
];

const LOCKED_LANES = [
  {
    index: "01",
    title: "Multi-Asset Staking",
    tag: "ETH · BTC · WBTC · USDC · USDT · LUX · SOL",
    description:
      "Audit-gated staking vaults spanning Ethereum, Bitcoin, Lux, Base, and Solana. Committed liquidity earns Genesis Points and Era 1 priority multipliers once activated.",
  },
  {
    index: "02",
    title: "Invite-Only Token Sale",
    tag: "1T Permanent DAO Treasury",
    description:
      "Genesis allocation sourced strictly from the 1T permanent Hanzo DAO treasury — zero discretionary minting from the 1T Proof of AI mining pool. Compliance-gated via hanzo.ai.",
  },
  {
    index: "03",
    title: "hanzod Mining & Era 1 Queue",
    tag: "500B AI Era 1 Cap · ML-DSA-65",
    description:
      "Bind post-quantum ML-DSA-65 node identities for sovereign per-model chains and cloud adapters. Reserve your Era 1 queue slot for CPU-verifiable useful AI work.",
  },
  {
    index: "04",
    title: "Leaderboard, Holders & Squads",
    tag: "+16% Direct · +8% Second-Degree",
    description:
      "Live rankings across stakers, compute clusters, builders, and researchers, plus the transparent wallet holder ledger and viral invite squad multipliers.",
  },
] as const;

const ECOSYSTEM_SURFACES = [
  {
    surface: "hanzo.network",
    href: "https://hanzo.network",
    role: "Staking, Nodes & Squads",
    pointsFeed: "Multi-asset vault duration, whitelisted hanzod uptime, and verified invite squad multipliers.",
    icon: Network,
  },
  {
    surface: "hanzo.market",
    href: "https://hanzo.market",
    role: "Inference & Agent Compute",
    pointsFeed: "Verified API inference volume, model routing usage, and sovereign per-model chain compute spend.",
    icon: Store,
  },
  {
    surface: "work.hanzo.network",
    href: "https://work.hanzo.network",
    role: "De-Work & Research Bounties",
    pointsFeed: "Completed evaluation suites, open-weight training contributions, and proof-audited DAO work.",
    icon: Code2,
  },
  {
    surface: "hanzo.vote",
    href: "https://hanzo.vote",
    role: "DAO Governance",
    pointsFeed: "On-chain signaling, parameter governance, and sovereign chain activation participation.",
    icon: Vote,
  },
] as const;

const STAKE_VAULTS: Array<
  StakeVault & {
    chainLabel: string;
    railNote: string;
    multiplierTier: string;
  }
> = [
  {
    id: "vault-eth-mainnet",
    asset: "ETH",
    chain: "ethereum",
    chainLabel: "Ethereum",
    depositAddress: "Pending Audit Seal",
    minDeposit: "TBD at Activation",
    pointsPerUsdPerDay: 0,
    lockRule: "Audit-gated · Unlock on Genesis Mainnet",
    totalDepositedUsd: null,
    userDeposited: "0",
    userDepositedUsd: 0,
    status: "upcoming",
    railNote: "Native L1 ETH vault",
    multiplierTier: "Era 1 Priority · Base + Squad Boost",
  },
  {
    id: "vault-btc-native",
    asset: "BTC",
    chain: "bitcoin",
    chainLabel: "Bitcoin",
    depositAddress: "Pending Audit Seal",
    minDeposit: "TBD at Activation",
    pointsPerUsdPerDay: 0,
    lockRule: "Audit-gated · Non-custodial Taproot proof",
    totalDepositedUsd: null,
    userDeposited: "0",
    userDepositedUsd: 0,
    status: "upcoming",
    railNote: "Native Bitcoin L1 proof-of-lock",
    multiplierTier: "Era 1 Priority · Base + Squad Boost",
  },
  {
    id: "vault-wbtc-eth",
    asset: "WBTC",
    chain: "ethereum",
    chainLabel: "Ethereum",
    depositAddress: "Pending Audit Seal",
    minDeposit: "TBD at Activation",
    pointsPerUsdPerDay: 0,
    lockRule: "Audit-gated · Unlock on Genesis Mainnet",
    totalDepositedUsd: null,
    userDeposited: "0",
    userDepositedUsd: 0,
    status: "upcoming",
    railNote: "ERC-20 Wrapped Bitcoin",
    multiplierTier: "Era 1 Priority · Base + Squad Boost",
  },
  {
    id: "vault-usdc-base",
    asset: "USDC",
    chain: "base",
    chainLabel: "Base",
    depositAddress: "Pending Audit Seal",
    minDeposit: "TBD at Activation",
    pointsPerUsdPerDay: 0,
    lockRule: "Audit-gated · Unlock on Genesis Mainnet",
    totalDepositedUsd: null,
    userDeposited: "0",
    userDepositedUsd: 0,
    status: "upcoming",
    railNote: "Native USDC (Base & Ethereum rails)",
    multiplierTier: "Era 1 Priority · Stablecoin Weight",
  },
  {
    id: "vault-usdt-eth",
    asset: "USDT",
    chain: "ethereum",
    chainLabel: "Ethereum",
    depositAddress: "Pending Audit Seal",
    minDeposit: "TBD at Activation",
    pointsPerUsdPerDay: 0,
    lockRule: "Audit-gated · Unlock on Genesis Mainnet",
    totalDepositedUsd: null,
    userDeposited: "0",
    userDepositedUsd: 0,
    status: "upcoming",
    railNote: "ERC-20 Tether USD",
    multiplierTier: "Era 1 Priority · Stablecoin Weight",
  },
  {
    id: "vault-lux-primary",
    asset: "LUX",
    chain: "lux",
    chainLabel: "Lux",
    depositAddress: "Pending Audit Seal",
    minDeposit: "TBD at Activation",
    pointsPerUsdPerDay: 0,
    lockRule: "Audit-gated · Post-quantum Quasar settlement",
    totalDepositedUsd: null,
    userDeposited: "0",
    userDepositedUsd: 0,
    status: "upcoming",
    railNote: "Lux L0/L1 native staking rail",
    multiplierTier: "Era 1 Priority · Ecosystem Alignment Boost",
  },
  {
    id: "vault-sol-native",
    asset: "SOL",
    chain: "solana",
    chainLabel: "Solana",
    depositAddress: "Pending Audit Seal",
    minDeposit: "TBD at Activation",
    pointsPerUsdPerDay: 0,
    lockRule: "Audit-gated · Unlock on Genesis Mainnet",
    totalDepositedUsd: null,
    userDeposited: "0",
    userDepositedUsd: 0,
    status: "upcoming",
    railNote: "Native Solana SPL vault",
    multiplierTier: "Era 1 Priority · Base + Squad Boost",
  },
];

const GENESIS_TRANCHE: SaleTranche = {
  id: "tranche-1-genesis",
  name: "Tranche 1",
  priceUsdPerAi: "Opening on Genesis Activation",
  capUsd: null,
  committedUsd: null,
  minTicketUsd: null,
  maxTicketUsd: null,
  vestingSummary: "Opening on Genesis Activation",
  acceptedAssets: ["ETH", "BTC", "USDC", "USDT", "LUX", "SOL"],
  status: "upcoming",
};

const CHAIN_FAMILY_OPTIONS: Array<{
  id: ChainFamily;
  label: string;
  networks: string;
  placeholder: string;
  validate: (addr: string) => boolean;
  hint: string;
}> = [
  {
    id: "evm",
    label: "EVM",
    networks: "Ethereum · Base · Hanzo 36963",
    placeholder: "0x0000...0000",
    validate: (addr) => /^0x[a-fA-F0-9]{40}$/.test(addr.trim()),
    hint: "42-character 0x hex address",
  },
  {
    id: "btc",
    label: "BTC",
    networks: "Bitcoin Mainnet (Taproot / SegWit)",
    placeholder: "bc1p... or bc1q...",
    validate: (addr) => /^(bc1[a-zA-HJ-NP-Z0-9]{25,87}|[13][a-km-zA-HJ-NP-Z1-9]{25,34})$/.test(addr.trim()),
    hint: "Bech32/Bech32m (bc1…) or P2PKH/P2SH address",
  },
  {
    id: "lux",
    label: "LUX",
    networks: "Lux P-Chain / C-Chain",
    placeholder: "0x... or P-lux1...",
    validate: (addr) =>
      /^(0x[a-fA-F0-9]{40}|[PXC]-lux1[a-z0-9]{30,60}|lux1[a-z0-9]{30,60})$/.test(addr.trim()),
    hint: "0x C-Chain or Lux bech32 address",
  },
  {
    id: "sol",
    label: "SOL",
    networks: "Solana Mainnet",
    placeholder: "Base58 public key",
    validate: (addr) => /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(addr.trim()),
    hint: "32–44 character base58 Solana public key",
  },
];

const HARDWARE_CLASSES: Array<{
  id: HardwareClassId;
  name: string;
  category: string;
  workloadScope: string;
  verificationRole: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  {
    id: "apple-silicon",
    name: "Apple Silicon",
    category: "M-Series Unified Memory",
    workloadScope: "Edge Zen model inference, local embeddings, and sovereign per-model chain serving.",
    verificationRole: "Exact-integer transcript generation + lightweight CPU challenge verification.",
    icon: Cpu,
  },
  {
    id: "cpu-validator",
    name: "CPU Validator",
    category: "Standard x86_64 / ARM64",
    workloadScope: "A-Chain Proof of AI validation without requiring datacenter GPUs.",
    verificationRole: "Deterministic challenge replay, matrix spot-checks, and Z-Chain P3Q receipt verification.",
    icon: Shield,
  },
  {
    id: "consumer-gpu",
    name: "Consumer GPU",
    category: "Workstation / Multi-GPU",
    workloadScope: "Low-latency inference, LoRA fine-tuning, and sovereign per-model chain execution.",
    verificationRole: "Committed integer output proofs with optional confidential attestation.",
    icon: HardDrive,
  },
  {
    id: "datacenter-gpu",
    name: "Datacenter GPU",
    category: "H100 / H200 / B200 / MI300X",
    workloadScope: "High-throughput frontier inference and distributed training for Zen 1T+ models.",
    verificationRole: "High-volume pre-admitted work receipts settled via P3Q to Lux finality.",
    icon: Server,
  },
  {
    id: "cloud-adapter",
    name: "Existing Cloud Adapter",
    category: "Sidecar Proof Bridge",
    workloadScope: "Attach hanzod proof generation to AI workloads you already serve for customers.",
    verificationRole: "Keep 100% of customer compute fees while submitting CPU-verifiable PoAI proofs for Era 1 rewards.",
    icon: Cloud,
  },
];

const MINING_COMMANDS = [
  {
    step: "01",
    label: "Install Hanzo CLI & hanzod binary",
    cmd: "curl -fsSL https://hanzo.sh | sh",
  },
  {
    step: "02",
    label: "Generate post-quantum ML-DSA-65 node identity",
    cmd: "hanzo fabric init --pqc ml-dsa-65 --chain 36963",
  },
  {
    step: "03",
    label: "Start unified cloud, AI, and sovereign chain node",
    cmd: "hanzo fabric up",
  },
] as const;

const LEADERBOARD_TABS: Array<{
  id: LeaderboardSubTab;
  label: string;
  shortLabel: string;
  endpoint: string;
  description: string;
}> = [
  {
    id: "stakers",
    label: "Top Stakers",
    shortLabel: "Stakers",
    endpoint: "/v1/network/leaderboard?category=stakers",
    description: "Ranked by verified Genesis Points from multi-asset staking vaults and Era 1 multipliers.",
  },
  {
    id: "miners",
    label: "Top Miners / Compute Clusters",
    shortLabel: "Miners & Clusters",
    endpoint: "/v1/network/leaderboard?category=miners",
    description: "Ranked by CPU-verified Proof of AI work units and whitelisted hanzod cluster reliability.",
  },
  {
    id: "builders",
    label: "Top Builders (hanzo.market / API)",
    shortLabel: "Builders",
    endpoint: "/v1/network/leaderboard?category=builders",
    description: "Ranked by verified inference traffic, agent MCP workloads, and hanzo.market activity.",
  },
  {
    id: "researchers",
    label: "Top Researchers (work.hanzo.network)",
    shortLabel: "Researchers",
    endpoint: "/v1/network/leaderboard?category=researchers",
    description: "Ranked by accepted De-Work research deliverables, eval suites, and open-weight contributions.",
  },
  {
    id: "holders",
    label: "Wallet Holders",
    shortLabel: "Wallet Holders",
    endpoint: "/v1/network/holders",
    description: "Transparent ledger of verified addresses and .hanzo handles, tiers, allocations, and share %.",
  },
];

const CLUSTER_MILESTONES = [
  {
    tier: "Tier 01",
    name: "Genesis Squad",
    requirement: "Verified invite activation + first bound wallet or node",
    benefit: "Unlocks personal HNZ-XXXXXX invite codes (+16% direct / +8% second-degree points match).",
  },
  {
    tier: "Tier 02",
    name: "Compute Cluster",
    requirement: "Active squad staking + whitelisted hanzod or cloud adapter operators",
    benefit: "Shared squad multiplier step-up and priority allocation to sovereign per-model chains.",
  },
  {
    tier: "Tier 03",
    name: "Era 1 Quorum",
    requirement: "Sustained verified PoAI work units + DAO governance participation",
    benefit: "Additional invite code waves and top-tier Era 1 compute routing priority.",
  },
] as const;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function normalizeInviteSuffix(raw: string): string {
  const upper = raw.toUpperCase().replace(/^HNZ-?/, "");
  return upper.replace(/[^A-Z0-9]/g, "").slice(0, 6);
}

function formatBlock(n: number | null): string {
  if (n === null) return "—";
  return `#${n.toLocaleString("en-US")}`;
}

function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

function formatUsd(n: number): string {
  return `$${n.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
}

function truncateMiddle(value: string, head = 8, tail = 6): string {
  if (value.length <= head + tail + 3) return value;
  return `${value.slice(0, head)}…${value.slice(-tail)}`;
}

// ─── Subcomponents ───────────────────────────────────────────────────────────

function TelemetryStrip({
  unlocked,
  isDevPreview,
}: {
  unlocked: boolean;
  isDevPreview: boolean;
}) {
  const chain = useLiveChain(15000);

  return (
    <div className="border-b border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)] sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 text-[var(--foreground)]">
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--foreground)]"
            />
            <span>GENESIS TERMINAL</span>
          </span>
          <span className="text-[var(--border-strong)]">/</span>
          <span>
            {unlocked
              ? isDevPreview
                ? "STATE: DEV DESIGN PREVIEW"
                : "STATE: INVITE VERIFIED"
              : "STATE: INVITE-ONLY LOCKED"}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 tabular-nums">
          <span>
            CHAIN{" "}
            <strong className="font-semibold text-[var(--foreground)]">
              {chain.chainId ?? 36963}
            </strong>
          </span>
          <span>
            BLOCK{" "}
            <strong className="font-semibold text-[var(--foreground)]">
              {chain.status === "live" ? formatBlock(chain.blockNumber) : "SYNCING"}
            </strong>
          </span>
          {chain.latencyMs !== null ? (
            <span className="hidden sm:inline">
              RPC{" "}
              <strong className="font-semibold text-[var(--foreground)]">
                {chain.latencyMs}ms
              </strong>
            </span>
          ) : null}
          <span className="hidden md:inline">
            HARD CAP <strong className="font-semibold text-[var(--foreground)]">2T AI</strong>
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Locked Invite Gate View ─────────────────────────────────────────────────

function LockedInviteGate({
  initialCodeSuffix,
  onVerified,
}: {
  initialCodeSuffix: string;
  onVerified: (session: VerifiedSession) => void;
}) {
  const [codeSuffix, setCodeSuffix] = useState<string>(initialCodeSuffix);
  const [verifying, setVerifying] = useState(false);
  const [verifyFeedback, setVerifyFeedback] = useState<InviteVerifyResponse | null>(null);

  // Waitlist form state
  const [role, setRole] = useState<WaitlistRole>("staker");
  const [email, setEmail] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [xHandle, setXHandle] = useState("");
  const [submittingWaitlist, setSubmittingWaitlist] = useState(false);
  const [waitlistResult, setWaitlistResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [waitlistValidationError, setWaitlistValidationError] = useState<string | null>(null);

  const fullCode = `HNZ-${codeSuffix}`;
  const isCodeComplete = codeSuffix.length === 6;

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodeSuffix(normalizeInviteSuffix(e.target.value));
    if (verifyFeedback) setVerifyFeedback(null);
  };

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCodeComplete) {
      setVerifyFeedback({
        valid: false,
        backendLive: true,
        reason: "Enter all 6 alphanumeric characters after HNZ- (format: HNZ-XXXXXX).",
      });
      return;
    }

    setVerifying(true);
    setVerifyFeedback(null);
    const result = await verifyInviteCode(fullCode);
    setVerifying(false);

    if (result.valid) {
      onVerified({
        code: fullCode,
        inviterHandle: result.inviterHandle,
        clusterName: result.clusterName,
        mode: "verified",
        verifiedAt: new Date().toISOString(),
      });
      return;
    }

    setVerifyFeedback(result);
  };

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setWaitlistValidationError(null);
    setWaitlistResult(null);

    const trimmedEmail = email.trim();
    const trimmedWallet = walletAddress.trim();
    const trimmedX = xHandle.trim().replace(/^@+/, "");

    if (!trimmedEmail && !trimmedX) {
      setWaitlistValidationError("Provide an email address or X handle so we can deliver your invite code.");
      return;
    }
    if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setWaitlistValidationError("Enter a valid email address.");
      return;
    }

    setSubmittingWaitlist(true);
    const res = await submitInviteWaitlist({
      role,
      email: trimmedEmail || undefined,
      walletAddress: trimmedWallet || undefined,
      xHandle: trimmedX ? `@${trimmedX}` : undefined,
    });
    setSubmittingWaitlist(false);
    setWaitlistResult(res);
  };

  const codeSlots = Array.from({ length: 6 }, (_, i) => codeSuffix[i] ?? "");

  return (
    <div className="relative">
      {/* Subtle monochrome hairline grid backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "linear-gradient(to bottom, var(--foreground), transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, var(--foreground), transparent)",
        }}
      />

      {/* Hero + Gate Split */}
      <section className="relative mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left 7 cols: Strict Invite Code Gate */}
          <div className="lg:col-span-7">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest text-[var(--foreground)]">
              <Lock className="h-3.5 w-3.5" />
              <span>Strictly Invite-Only · Genesis Terminal</span>
            </div>

            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight leading-[1.03] text-[var(--foreground)] sm:text-5xl lg:text-6xl">
              Enter your invite code to unlock Genesis.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--muted-foreground)]">
              Multi-asset staking vaults, the 1T DAO treasury Genesis allocation, whitelisted{" "}
              <code className="font-mono text-[var(--foreground)]">hanzod</code> mining across
              sovereign per-model chains, and the live Genesis leaderboard are sealed behind
              server-verified invite codes.
            </p>

            {/* Primary Invite Verification Console */}
            <div className="mt-8 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] pb-4">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--foreground)]">
                  <KeyRound className="h-4 w-4" />
                  <span>Invite Verification Console</span>
                </div>
                <span className="font-mono text-[11px] text-[var(--muted-foreground)]">
                  POST /v1/network/invite/verify
                </span>
              </div>

              <form onSubmit={handleVerifySubmit} className="mt-6 space-y-5">
                <div>
                  <label
                    htmlFor="genesis-invite-code"
                    className="mb-2 block font-mono text-xs uppercase tracking-wider text-[var(--muted-foreground)]"
                  >
                    6-Character Invite Code
                  </label>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="flex flex-1 items-center overflow-hidden rounded-xl border border-[var(--border-strong)] bg-[var(--background)] focus-within:border-[var(--foreground)]">
                      <span
                        aria-hidden="true"
                        className="select-none border-r border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3.5 font-mono text-base font-semibold tracking-widest text-[var(--muted-foreground)]"
                      >
                        HNZ-
                      </span>
                      <input
                        id="genesis-invite-code"
                        type="text"
                        inputMode="text"
                        autoCapitalize="characters"
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck={false}
                        maxLength={10}
                        value={codeSuffix}
                        onChange={handleCodeChange}
                        placeholder="XXXXXX"
                        aria-describedby="invite-code-slots"
                        className="w-full bg-[var(--background)] px-4 py-3.5 font-mono text-base font-semibold uppercase tracking-[0.32em] text-[var(--foreground)] placeholder:tracking-[0.32em] placeholder:text-[var(--muted-foreground)] focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={verifying}
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--foreground)] px-6 py-3.5 text-sm font-semibold text-[var(--background)] transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {verifying ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>Verifying…</span>
                        </>
                      ) : (
                        <>
                          <span>Unlock Terminal</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* 6-slot monospace parity readout */}
                  <div
                    id="invite-code-slots"
                    className="mt-3 flex flex-wrap items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-1.5 font-mono text-xs tabular-nums">
                      <span className="text-[var(--muted-foreground)]">HNZ</span>
                      <span className="text-[var(--muted-foreground)]">-</span>
                      {codeSlots.map((char, idx) => (
                        <span
                          key={idx}
                          className={`inline-flex h-7 w-7 items-center justify-center rounded-md border font-semibold ${
                            char
                              ? "border-[var(--foreground)] bg-[var(--surface-elevated)] text-[var(--foreground)]"
                              : "border-[var(--border)] bg-[var(--background)] text-[var(--muted-foreground)]"
                          }`}
                        >
                          {char || "·"}
                        </span>
                      ))}
                    </div>
                    <span className="font-mono text-[11px] tabular-nums text-[var(--muted-foreground)]">
                      {codeSuffix.length}/6 CHARS
                    </span>
                  </div>
                </div>

                {verifyFeedback ? (
                  <div
                    role="status"
                    aria-live="polite"
                    className="flex items-start gap-3 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-elevated)] p-4 text-xs leading-relaxed text-[var(--foreground)]"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--foreground)]" />
                    <div className="space-y-1">
                      <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                        {verifyFeedback.backendLive
                          ? "Verification Declined"
                          : "Genesis Gate Staging"}
                      </div>
                      <p>{verifyFeedback.reason}</p>
                    </div>
                  </div>
                ) : null}
              </form>

              {/* Protocol invariants strip */}
              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-[var(--border)] pt-5 font-mono">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                    Hard Cap
                  </div>
                  <div className="mt-1 text-sm font-semibold tabular-nums text-[var(--foreground)]">
                    2,000,000,000,000 AI
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                    DAO / PoAI Split
                  </div>
                  <div className="mt-1 text-sm font-semibold tabular-nums text-[var(--foreground)]">
                    1T DAO / 1T PoAI
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                    Era 1 Mining Cap
                  </div>
                  <div className="mt-1 text-sm font-semibold tabular-nums text-[var(--foreground)]">
                    500B AI
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right 5 cols: Request an Invite Waitlist Form */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-7">
              <div className="flex items-center justify-between gap-2 border-b border-[var(--border)] pb-4">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
                    Request an Invite
                  </h2>
                  <p className="mt-0.5 text-xs text-[var(--muted-foreground)]">
                    Register for Phase 1 wave drops across capital, mining, building, and research.
                  </p>
                </div>
                <span className="rounded-md border border-[var(--border)] bg-[var(--surface-elevated)] px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                  Wave Queue
                </span>
              </div>

              <form onSubmit={handleWaitlistSubmit} className="mt-5 space-y-4">
                {/* Role selector */}
                <fieldset>
                  <legend className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                    Primary Role
                  </legend>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {WAITLIST_ROLES.map((item) => {
                      const selected = role === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setRole(item.id)}
                          aria-pressed={selected}
                          className={`rounded-xl border px-3.5 py-2.5 text-left transition-colors ${
                            selected
                              ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
                              : "border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-elevated)]"
                          }`}
                        >
                          <div className="text-xs font-semibold">{item.title}</div>
                          <div
                            className={`mt-0.5 text-[11px] ${
                              selected ? "opacity-80" : "text-[var(--muted-foreground)]"
                            }`}
                          >
                            {item.subtitle}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Email */}
                <div>
                  <label
                    htmlFor="waitlist-email"
                    className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]"
                  >
                    Email Address
                  </label>
                  <input
                    id="waitlist-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="operator@domain.com"
                    className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--background)] px-3.5 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--foreground)] focus:outline-none"
                  />
                </div>

                {/* Optional wallet address */}
                <div>
                  <label
                    htmlFor="waitlist-wallet"
                    className="mb-1.5 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]"
                  >
                    <span>Wallet Address (ETH / BTC / LUX / SOL)</span>
                    <span>Optional</span>
                  </label>
                  <input
                    id="waitlist-wallet"
                    type="text"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    placeholder="0x… / bc1… / P-lux1… / Solana pubkey"
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3.5 py-2.5 font-mono text-xs text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--foreground)] focus:outline-none"
                  />
                </div>

                {/* X handle */}
                <div>
                  <label
                    htmlFor="waitlist-x"
                    className="mb-1.5 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]"
                  >
                    <span>X Handle</span>
                    <span>Optional</span>
                  </label>
                  <div className="flex items-center overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--background)] focus-within:border-[var(--foreground)]">
                    <span className="border-r border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-2.5 font-mono text-xs text-[var(--muted-foreground)]">
                      @
                    </span>
                    <input
                      id="waitlist-x"
                      type="text"
                      value={xHandle}
                      onChange={(e) => setXHandle(e.target.value.replace(/^@+/, ""))}
                      placeholder="handle"
                      className="w-full bg-[var(--background)] px-3 py-2.5 font-mono text-xs text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none"
                    />
                  </div>
                </div>

                {waitlistValidationError ? (
                  <p className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-3.5 py-2.5 text-xs text-[var(--foreground)]">
                    {waitlistValidationError}
                  </p>
                ) : null}

                {waitlistResult ? (
                  <div
                    role="status"
                    aria-live="polite"
                    className="flex items-start gap-2.5 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-elevated)] p-3.5 text-xs leading-relaxed text-[var(--foreground)]"
                  >
                    {waitlistResult.ok ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                    ) : (
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    )}
                    <div>
                      <p>{waitlistResult.message}</p>
                      <div className="mt-2 flex flex-wrap gap-3 font-mono text-[11px] underline-offset-2">
                        <a
                          href="https://discord.gg/CJCyAsm9Vr"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 hover:underline"
                        >
                          Discord <ArrowUpRight className="h-3 w-3" />
                        </a>
                        <a
                          href="https://x.com/hanzoai"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 hover:underline"
                        >
                          @hanzoai <ArrowUpRight className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={submittingWaitlist}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--foreground)] hover:text-[var(--background)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submittingWaitlist ? "Submitting Request…" : "Join Invite Queue"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Locked Manifest — What Your Invite Unlocks */}
      <section className="border-t border-[var(--border)] bg-[var(--surface)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-[var(--muted-foreground)]">
                Sealed Manifest
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl">
                What Your Invite Unlocks
              </h2>
            </div>
            <p className="max-w-md text-sm text-[var(--muted-foreground)]">
              All four Genesis lanes remain sealed until your invite code verifies against{" "}
              <code className="font-mono text-xs text-[var(--foreground)]">
                /v1/network/invite/verify
              </code>
              .
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {LOCKED_LANES.map((lane) => (
              <div
                key={lane.index}
                className="flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-semibold tabular-nums text-[var(--muted-foreground)]">
                      LANE {lane.index}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--foreground)]">
                      <Lock className="h-3 w-3" />
                      Locked
                    </span>
                  </div>

                  <h3 className="mt-4 text-base font-semibold tracking-tight text-[var(--foreground)]">
                    {lane.title}
                  </h3>

                  <div className="mt-1.5 font-mono text-[11px] text-[var(--muted-foreground)]">
                    {lane.tag}
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-[var(--muted-foreground)]">
                    {lane.description}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-3 font-mono text-[11px] text-[var(--muted-foreground)]">
                  <span>ACCESS LEVEL</span>
                  <span className="text-[var(--foreground)]">INVITE REQUIRED</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unified Genesis Points Across All Hanzo Ecosystem Surfaces */}
      <section className="border-t border-[var(--border)] bg-[var(--background)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-[var(--muted-foreground)]">
                Unified Accounting
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl">
                Every Hanzo surface feeds Genesis Points.
              </h2>
            </div>
            <p className="max-w-lg text-sm text-[var(--muted-foreground)]">
              Capital, verified compute, model inference spend, research bounties, and DAO
              governance converge into one unified Genesis Points ledger bound to your verified
              identity and invite squad.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ECOSYSTEM_SURFACES.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.surface}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-elevated)]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-[var(--muted-foreground)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--foreground)]" />
                    </div>
                    <div className="mt-4 font-mono text-sm font-semibold text-[var(--foreground)]">
                      {item.surface}
                    </div>
                    <div className="mt-1 text-xs font-medium text-[var(--muted-foreground)]">
                      {item.role}
                    </div>
                    <p className="mt-2.5 text-xs leading-relaxed text-[var(--muted-foreground)]">
                      {item.pointsFeed}
                    </p>
                  </div>
                  <div className="mt-4 border-t border-[var(--border)] pt-3 font-mono text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                    → Unified Genesis Points
                  </div>
                </a>
              );
            })}
          </div>

          {/* Viral Squad Summary Footer */}
          <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <Users className="mt-0.5 h-5 w-5 shrink-0 text-[var(--foreground)]" />
              <div>
                <div className="text-sm font-semibold text-[var(--foreground)]">
                  Viral Invite Squads · +16% Direct / +8% Second-Degree Match
                </div>
                <p className="mt-0.5 text-xs text-[var(--muted-foreground)]">
                  Once activated, members receive personal{" "}
                  <code className="font-mono text-[var(--foreground)]">HNZ-XXXXXX</code> invite
                  codes and earn matched points across their direct and second-degree Compute
                  Cluster graph.
                </p>
              </div>
            </div>
            <Link
              to="/economics"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--background)] px-4 py-2 font-mono text-xs font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-elevated)]"
            >
              Read 2T Monetary Policy
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Tab 1: Stake to Earn ────────────────────────────────────────────────────

function StakeTab({
  boundWallets,
  onAddWallet,
  onRemoveWallet,
}: {
  boundWallets: BoundWalletDraft[];
  onAddWallet: (wallet: BoundWalletDraft) => void;
  onRemoveWallet: (id: string) => void;
}) {
  const [chainFilter, setChainFilter] = useState<"all" | StakeVault["chain"]>("all");
  const [selectedVaultId, setSelectedVaultId] = useState<string>(STAKE_VAULTS[0].id);

  // Wallet bind state
  const [walletFamily, setWalletFamily] = useState<ChainFamily>("evm");
  const [walletInput, setWalletInput] = useState("");
  const [walletError, setWalletError] = useState<string | null>(null);
  const [walletNotice, setWalletNotice] = useState<string | null>(null);

  const filteredVaults = useMemo(
    () =>
      chainFilter === "all"
        ? STAKE_VAULTS
        : STAKE_VAULTS.filter((v) => v.chain === chainFilter),
    [chainFilter]
  );

  const selectedVault =
    STAKE_VAULTS.find((v) => v.id === selectedVaultId) ?? STAKE_VAULTS[0];
  const activeFamilyMeta =
    CHAIN_FAMILY_OPTIONS.find((f) => f.id === walletFamily) ?? CHAIN_FAMILY_OPTIONS[0];

  const handleBindWallet = (e: React.FormEvent) => {
    e.preventDefault();
    setWalletError(null);
    setWalletNotice(null);

    const trimmed = walletInput.trim();
    if (!trimmed) {
      setWalletError(`Enter a ${activeFamilyMeta.label} address to stage for binding.`);
      return;
    }
    if (!activeFamilyMeta.validate(trimmed)) {
      setWalletError(`Invalid ${activeFamilyMeta.label} address format (${activeFamilyMeta.hint}).`);
      return;
    }
    if (boundWallets.some((w) => w.family === walletFamily && w.address.toLowerCase() === trimmed.toLowerCase())) {
      setWalletError("That address is already staged in this session.");
      return;
    }

    onAddWallet({
      id: `${walletFamily}-${Date.now()}`,
      family: walletFamily,
      address: trimmed,
      stagedAt: new Date().toISOString(),
    });
    setWalletInput("");
    setWalletNotice(
      "Address staged locally. Signature verification executes via /v1/network/wallets/bind when Genesis vaults open."
    );
  };

  return (
    <div className="space-y-8">
      {/* Header & Honest Status */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
            <Coins className="h-3.5 w-3.5 text-[var(--foreground)]" />
            <span>Multi-Asset Genesis Staking Vaults</span>
          </div>
          <h2 className="mt-1.5 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
            Stake to Earn Genesis Points
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-[var(--muted-foreground)]">
            Seven canonical assets across Ethereum, Bitcoin, Lux, Base, and Solana. All vault
            contracts remain strictly audit-gated prior to Genesis activation — zero fabricated TVL
            or placeholder deposit addresses are shown.
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-start gap-1 rounded-xl border border-[var(--border-strong)] bg-[var(--background)] px-4 py-3 font-mono md:items-end">
          <span className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
            Vault Status
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]">
            Staging / Audit-Gated
          </span>
          <span className="text-[11px] tabular-nums text-[var(--muted-foreground)]">
            Total TVL: — (Pre-Activation)
          </span>
        </div>
      </div>

      {/* Chain Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter vaults by chain">
          {(
            [
              { id: "all", label: "All Chains (7)" },
              { id: "ethereum", label: "Ethereum" },
              { id: "bitcoin", label: "Bitcoin" },
              { id: "lux", label: "Lux" },
              { id: "base", label: "Base" },
              { id: "solana", label: "Solana" },
            ] as const
          ).map((chip) => {
            const active = chainFilter === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => setChainFilter(chip.id)}
                className={`rounded-full border px-3.5 py-1.5 font-mono text-xs transition-colors ${
                  active
                    ? "border-[var(--foreground)] bg-[var(--foreground)] font-semibold text-[var(--background)]"
                    : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted-foreground)] hover:border-[var(--border-strong)] hover:text-[var(--foreground)]"
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>

        <span className="font-mono text-[11px] text-[var(--muted-foreground)]">
          Click a vault row to inspect audit-gate specifications
        </span>
      </div>

      {/* Vaults Table */}
      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--surface-elevated)] font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                <th className="px-5 py-3.5 font-medium">Asset</th>
                <th className="px-5 py-3.5 font-medium">Chain</th>
                <th className="px-5 py-3.5 font-medium">Status</th>
                <th className="px-5 py-3.5 font-medium">Vault TVL</th>
                <th className="px-5 py-3.5 font-medium">Deposit Rail</th>
                <th className="px-5 py-3.5 font-medium">Multiplier / Points</th>
                <th className="px-5 py-3.5 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] text-sm">
              {filteredVaults.map((vault) => {
                const isSelected = vault.id === selectedVault.id;
                return (
                  <tr
                    key={vault.id}
                    onClick={() => setSelectedVaultId(vault.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-[var(--surface-elevated)]"
                        : "bg-[var(--background)] hover:bg-[var(--surface)]"
                    }`}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] font-mono text-xs font-semibold text-[var(--foreground)]">
                          {vault.asset.slice(0, 3)}
                        </span>
                        <div>
                          <div className="font-mono font-semibold text-[var(--foreground)]">
                            {vault.asset}
                          </div>
                          <div className="text-[11px] text-[var(--muted-foreground)]">
                            {vault.railNote}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-mono text-xs text-[var(--foreground)]">
                      {vault.chainLabel}
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[var(--foreground)]">
                        <Lock className="h-3 w-3" />
                        Staging / Audit-Gated
                      </span>
                    </td>
                    <td className="px-5 py-4 font-mono text-xs tabular-nums text-[var(--muted-foreground)]">
                      {vault.totalDepositedUsd !== null ? formatUsd(vault.totalDepositedUsd) : "—"}
                    </td>
                    <td className="px-5 py-4 font-mono text-xs text-[var(--muted-foreground)]">
                      {vault.depositAddress}
                    </td>
                    <td className="px-5 py-4 text-xs text-[var(--muted-foreground)]">
                      {vault.multiplierTier}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        disabled
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 font-mono text-[11px] text-[var(--muted-foreground)] opacity-70"
                      >
                        <Lock className="h-3 w-3" />
                        Audit-Gated
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Selected Vault Spec Footer */}
        <div className="grid grid-cols-1 gap-4 border-t border-[var(--border)] bg-[var(--surface)] px-5 py-4 font-mono text-xs md:grid-cols-4">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
              Selected Vault
            </div>
            <div className="mt-1 font-semibold text-[var(--foreground)]">
              {selectedVault.asset} · {selectedVault.chainLabel}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
              Lock & Settlement Rule
            </div>
            <div className="mt-1 text-[var(--foreground)]">{selectedVault.lockRule}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
              Your Staked Balance
            </div>
            <div className="mt-1 tabular-nums text-[var(--foreground)]">
              {selectedVault.userDeposited} {selectedVault.asset}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
              Minimum Deposit
            </div>
            <div className="mt-1 text-[var(--foreground)]">{selectedVault.minDeposit}</div>
          </div>
        </div>
      </div>

      {/* Bottom Split: Wallet-Bind Panel + Genesis Points Multipliers */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Wallet-Bind Panel */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 lg:col-span-7">
          <div className="flex items-center justify-between gap-2 border-b border-[var(--border)] pb-4">
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-[var(--foreground)]" />
              <h3 className="text-base font-semibold text-[var(--foreground)]">
                Bind Staking & Payout Wallets
              </h3>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
              EVM · BTC · LUX · SOL
            </span>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-[var(--muted-foreground)]">
            Pre-register addresses across chain families to unify Genesis Points attribution across
            deposits, <code className="font-mono text-[var(--foreground)]">hanzod</code> payouts,
            and Compute Cluster squads.
          </p>

          <form onSubmit={handleBindWallet} className="mt-5 space-y-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {CHAIN_FAMILY_OPTIONS.map((fam) => {
                const active = walletFamily === fam.id;
                return (
                  <button
                    key={fam.id}
                    type="button"
                    onClick={() => {
                      setWalletFamily(fam.id);
                      setWalletError(null);
                    }}
                    className={`rounded-xl border px-3 py-2 text-left transition-colors ${
                      active
                        ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
                        : "border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:border-[var(--border-strong)]"
                    }`}
                  >
                    <div className="font-mono text-xs font-semibold">{fam.label}</div>
                    <div
                      className={`mt-0.5 truncate text-[10px] ${
                        active ? "opacity-80" : "text-[var(--muted-foreground)]"
                      }`}
                    >
                      {fam.networks}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <label htmlFor="bind-wallet-address" className="sr-only">
                {activeFamilyMeta.label} wallet address
              </label>
              <input
                id="bind-wallet-address"
                type="text"
                value={walletInput}
                onChange={(e) => {
                  setWalletInput(e.target.value);
                  if (walletError) setWalletError(null);
                }}
                placeholder={activeFamilyMeta.placeholder}
                className="flex-1 rounded-xl border border-[var(--border-strong)] bg-[var(--background)] px-3.5 py-2.5 font-mono text-xs text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--foreground)] focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-[var(--foreground)] px-5 py-2.5 text-xs font-semibold text-[var(--background)] transition-opacity hover:opacity-85"
              >
                Stage Address
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {walletError ? (
              <p className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-3.5 py-2 text-xs text-[var(--foreground)]">
                {walletError}
              </p>
            ) : null}

            {walletNotice ? (
              <p className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-3.5 py-2 text-xs text-[var(--muted-foreground)]">
                {walletNotice}
              </p>
            ) : null}
          </form>

          {/* Staged addresses list */}
          <div className="mt-5 border-t border-[var(--border)] pt-4">
            <div className="mb-2.5 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
              <span>Staged Wallets ({boundWallets.length})</span>
              <span>Signature Verification: Activation-Gated</span>
            </div>

            {boundWallets.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--background)] px-4 py-5 text-center font-mono text-xs text-[var(--muted-foreground)]">
                No wallet addresses staged yet. Add an EVM, BTC, LUX, or SOL address above.
              </div>
            ) : (
              <ul className="space-y-2">
                {boundWallets.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3.5 py-2.5 font-mono text-xs"
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span className="rounded border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-2 py-0.5 text-[10px] font-semibold uppercase text-[var(--foreground)]">
                        {item.family}
                      </span>
                      <span className="truncate text-[var(--foreground)]" title={item.address}>
                        {truncateMiddle(item.address, 14, 10)}
                      </span>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="hidden text-[10px] uppercase text-[var(--muted-foreground)] sm:inline">
                        Staged
                      </span>
                      <button
                        type="button"
                        onClick={() => onRemoveWallet(item.id)}
                        className="text-[11px] text-[var(--muted-foreground)] underline-offset-2 hover:text-[var(--foreground)] hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Genesis Points + Era 1 Multipliers Explainer */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 lg:col-span-5">
          <div className="flex items-center gap-2 border-b border-[var(--border)] pb-4">
            <Layers className="h-4 w-4 text-[var(--foreground)]" />
            <h3 className="text-base font-semibold text-[var(--foreground)]">
              Genesis Points & Era 1 Multipliers
            </h3>
          </div>

          <div className="mt-4 space-y-4 text-xs leading-relaxed text-[var(--muted-foreground)]">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--foreground)]">
                01 · Time-Weighted Multi-Asset Accrual
              </div>
              <p className="mt-1.5">
                Once audit-gated vaults unlock, Genesis Points accrue continuously against verified
                USD-equivalent liquidity across ETH, BTC/WBTC, USDC, USDT, LUX, and SOL.
              </p>
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--foreground)]">
                02 · Era 1 Priority Multipliers
              </div>
              <p className="mt-1.5">
                Early Genesis stakers who pair liquidity with verified{" "}
                <code className="font-mono text-[var(--foreground)]">hanzod</code> node operation,{" "}
                <code className="font-mono text-[var(--foreground)]">hanzo.market</code> usage, or
                Compute Cluster milestones unlock Era 1 priority multipliers without inflating the
                1T PoAI mining pool.
              </p>
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--foreground)]">
                03 · Strict Audit & Governance Gate
              </div>
              <p className="mt-1.5">
                No funds are accepted until smart contracts, Taproot proof verifiers, and Lux
                post-quantum settlement adapters pass published security audits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Tab 2: Token Sale (Invite-Only Genesis Allocation) ──────────────────────

function TokenSaleTab() {
  const loginHref = useLogin();

  return (
    <div className="space-y-8">
      {/* Monetary Policy Separation Banner */}
      <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[var(--foreground)]">
            <ShieldCheck className="h-4 w-4" />
            <span>Hard-Capped 2T Monetary Policy · Zero Mining Pool Dilution</span>
          </div>
          <span className="rounded-full border border-[var(--border-strong)] bg-[var(--background)] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[var(--foreground)]">
            Source: 1T Permanent DAO Treasury
          </span>
        </div>

        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl">
          Invite-Only Genesis Allocation
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted-foreground)]">
          Every Genesis Token Sale tranche is drawn{" "}
          <strong className="font-semibold text-[var(--foreground)]">
            strictly from the 1T permanent Hanzo DAO treasury
          </strong>
          . There is{" "}
          <strong className="font-semibold text-[var(--foreground)]">
            zero discretionary minting
          </strong>{" "}
          from the separate 1T Proof of AI mining pool — PoAI emissions can only be minted by
          CPU-verifiable useful AI work finalized on A-Chain.
        </p>

        {/* Visual 2T Split Bar (Monochrome) */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-[var(--foreground)] bg-[var(--background)] p-4">
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider">
              <span className="font-semibold text-[var(--foreground)]">
                1,000,000,000,000 AI · 50%
              </span>
              <span className="text-[var(--foreground)]">ACTIVE SOURCE</span>
            </div>
            <div className="mt-1.5 text-sm font-semibold text-[var(--foreground)]">
              Permanent Hanzo DAO Treasury
            </div>
            <p className="mt-1 text-xs text-[var(--muted-foreground)]">
              Funds Genesis allocation tranches, ecosystem grants, research bounties, and protocol
              liquidity under DAO governance.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-4">
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
              <span className="font-semibold">1,000,000,000,000 AI · 50%</span>
              <span>SEALED · PROOF-EARNED ONLY</span>
            </div>
            <div className="mt-1.5 text-sm font-semibold text-[var(--foreground)]">
              Proof of AI Mining & Validator Pool
            </div>
            <p className="mt-1 text-xs text-[var(--muted-foreground)]">
              Immutable Bitcoin-style halving curve (500B → 250B → 125B → …). Zero allocation
              sold, pre-minted, or diverted to Genesis tranches.
            </p>
          </div>
        </div>
      </div>

      {/* Tranche 1 + Compliance Gate Split */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Tranche 1 Card */}
        <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-6 sm:p-7 lg:col-span-7">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[var(--border)] pb-5">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-[var(--muted-foreground)]">
                Genesis Allocation Schedule
              </div>
              <h3 className="mt-1 text-xl font-semibold tracking-tight text-[var(--foreground)]">
                {GENESIS_TRANCHE.name}
              </h3>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--background)] px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[var(--foreground)]">
              <Lock className="h-3 w-3" />
              Opening on Genesis Activation
            </span>
          </div>

          <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
              <dt className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                Pricing
              </dt>
              <dd className="mt-1.5 font-mono text-sm font-semibold text-[var(--foreground)]">
                {GENESIS_TRANCHE.priceUsdPerAi}
              </dd>
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
              <dt className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                Tranche Cap
              </dt>
              <dd className="mt-1.5 font-mono text-sm font-semibold tabular-nums text-[var(--foreground)]">
                {GENESIS_TRANCHE.capUsd !== null
                  ? formatUsd(GENESIS_TRANCHE.capUsd)
                  : "Opening on Genesis Activation"}
              </dd>
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
              <dt className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                Vesting Schedule
              </dt>
              <dd className="mt-1.5 font-mono text-sm font-semibold text-[var(--foreground)]">
                {GENESIS_TRANCHE.vestingSummary}
              </dd>
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
              <dt className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                Committed Volume
              </dt>
              <dd className="mt-1.5 font-mono text-sm font-semibold tabular-nums text-[var(--muted-foreground)]">
                {GENESIS_TRANCHE.committedUsd !== null
                  ? formatUsd(GENESIS_TRANCHE.committedUsd)
                  : "— (Pre-Activation)"}
              </dd>
            </div>
          </dl>

          {/* Accepted Assets */}
          <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
              Accepted Settlement Assets
            </div>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {GENESIS_TRANCHE.acceptedAssets.map((asset) => (
                <span
                  key={asset}
                  className="rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-1 font-mono text-xs font-semibold text-[var(--foreground)]"
                >
                  {asset}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs text-[var(--muted-foreground)]">
              Final pricing, per-invite ticket caps, and vesting cliffs publish exclusively via
              signed DAO governance notice upon Genesis Activation.
            </p>
          </div>
        </div>

        {/* Compliance & Eligibility Gate */}
        <div className="flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-7 lg:col-span-5">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
              <Shield className="h-4 w-4 text-[var(--foreground)]" />
              <span>Compliance & Eligibility Gate</span>
            </div>
            <h3 className="mt-2 text-lg font-semibold tracking-tight text-[var(--foreground)]">
              Authenticate via hanzo.ai/login
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted-foreground)]">
              All Genesis allocation commitments require verified Hanzo Identity authentication,
              jurisdiction screening, and wallet attestation prior to settlement.
            </p>

            <ol className="mt-5 space-y-3">
              {[
                {
                  step: "01",
                  title: "Invite Code Verified",
                  status: "Completed",
                  done: true,
                },
                {
                  step: "02",
                  title: "Hanzo Identity Sign-In",
                  status: "Required via hanzo.ai/login",
                  done: false,
                },
                {
                  step: "03",
                  title: "Jurisdiction & Eligibility Check",
                  status: "Opens with Tranche 1",
                  done: false,
                },
                {
                  step: "04",
                  title: "Settlement Rail Commitment",
                  status: "ETH · BTC · USDC · USDT · LUX · SOL",
                  done: false,
                },
              ].map((item) => (
                <li
                  key={item.step}
                  className="flex items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex h-6 w-6 items-center justify-center rounded-md border font-mono text-[10px] font-semibold ${
                        item.done
                          ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
                          : "border-[var(--border-strong)] bg-[var(--surface)] text-[var(--muted-foreground)]"
                      }`}
                    >
                      {item.done ? <Check className="h-3.5 w-3.5" /> : item.step}
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-[var(--foreground)]">
                        {item.title}
                      </div>
                      <div className="font-mono text-[10px] text-[var(--muted-foreground)]">
                        {item.status}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6 space-y-3 border-t border-[var(--border)] pt-5">
            <a
              href={loginHref}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-[var(--background)] transition-opacity hover:opacity-85"
            >
              Continue to hanzo.ai/login
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <p className="text-[11px] leading-relaxed text-[var(--muted-foreground)]">
              Not an offer to sell in restricted jurisdictions. Eligibility is verified exclusively
              through Hanzo IAM compliance flows prior to any commitment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Tab 3: Invite-Only Mining (hanzod + Cloud Adapter) ──────────────────────

function MiningTab({
  boundMiner,
  onSaveMiner,
}: {
  boundMiner: BoundMinerDraft | null;
  onSaveMiner: (draft: BoundMinerDraft) => void;
}) {
  const [nodeId, setNodeId] = useState(boundMiner?.nodeId ?? "");
  const [hardwareClass, setHardwareClass] = useState<HardwareClassId>(
    boundMiner?.hardwareClass ?? "datacenter-gpu"
  );
  const [payoutChain, setPayoutChain] = useState(boundMiner?.payoutChain ?? "Hanzo (36963)");
  const [region, setRegion] = useState(boundMiner?.region ?? "");
  const [formError, setFormError] = useState<string | null>(null);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const selectedHardware =
    HARDWARE_CLASSES.find((h) => h.id === hardwareClass) ?? HARDWARE_CLASSES[0];

  const handleBindNode = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const cleanId = nodeId.trim();
    if (cleanId.length < 12) {
      setFormError(
        "Enter your ML-DSA-65 node identity fingerprint or public key emitted by `hanzo fabric up` (min 12 chars)."
      );
      return;
    }

    onSaveMiner({
      nodeId: cleanId,
      hardwareClass,
      payoutChain,
      region: region.trim() || "Unspecified",
      stagedAt: new Date().toISOString(),
    });
  };

  const handleCopy = async (cmd: string) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopiedCmd(cmd);
      window.setTimeout(() => setCopiedCmd((prev) => (prev === cmd ? null : prev)), 1800);
    } catch {
      // Clipboard blocked in restricted browser contexts
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
            <Terminal className="h-3.5 w-3.5 text-[var(--foreground)]" />
            <span>Proof of AI · Whitelisted Operator Console</span>
          </div>
          <h2 className="mt-1.5 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
            Invite-Only Mining (hanzod + Cloud Adapter)
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-[var(--muted-foreground)]">
            Bind your post-quantum ML-DSA-65{" "}
            <code className="font-mono text-[var(--foreground)]">hanzod</code> identity, select
            your hardware class, and reserve an Era 1 queue slot across sovereign per-model chains.
          </p>
        </div>

        <a
          href="https://docs.hanzo.ai/docs/proof-of-ai/node-operator"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--background)] px-4 py-2.5 font-mono text-xs font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--surface-elevated)]"
        >
          <BookOpen className="h-4 w-4" />
          Node Operator Guide
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left 7 cols: Node Binding + Hardware Class Selector */}
        <div className="space-y-6 lg:col-span-7">
          {/* Hardware Class Picker */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
              <h3 className="text-base font-semibold text-[var(--foreground)]">
                1. Select Hardware Class
              </h3>
              <span className="font-mono text-[11px] text-[var(--muted-foreground)]">
                5 Supported Profiles
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {HARDWARE_CLASSES.map((hw) => {
                const Icon = hw.icon;
                const active = hardwareClass === hw.id;
                return (
                  <button
                    key={hw.id}
                    type="button"
                    onClick={() => setHardwareClass(hw.id)}
                    aria-pressed={active}
                    className={`flex items-start gap-3 rounded-xl border p-3.5 text-left transition-colors ${
                      active
                        ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
                        : "border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-elevated)]"
                    }`}
                  >
                    <Icon className="mt-0.5 h-4 w-4 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs font-semibold">{hw.name}</div>
                      <div
                        className={`mt-0.5 font-mono text-[10px] ${
                          active ? "opacity-80" : "text-[var(--muted-foreground)]"
                        }`}
                      >
                        {hw.category}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Hardware Profile Breakdown */}
            <div className="mt-4 grid grid-cols-1 gap-3 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 sm:grid-cols-2">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                  Workload Scope
                </div>
                <p className="mt-1 text-xs leading-relaxed text-[var(--foreground)]">
                  {selectedHardware.workloadScope}
                </p>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                  PoAI Verification Role
                </div>
                <p className="mt-1 text-xs leading-relaxed text-[var(--foreground)]">
                  {selectedHardware.verificationRole}
                </p>
              </div>
            </div>
          </div>

          {/* ML-DSA-65 Node Identity Binding Form */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
              <h3 className="text-base font-semibold text-[var(--foreground)]">
                2. Bind ML-DSA-65 Node Identity
              </h3>
              <span className="font-mono text-[11px] text-[var(--muted-foreground)]">
                FIPS 204 Post-Quantum
              </span>
            </div>

            <form onSubmit={handleBindNode} className="mt-4 space-y-4">
              <div>
                <label
                  htmlFor="mldsa-node-id"
                  className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]"
                >
                  hanzod ML-DSA-65 Identity / Node Fingerprint
                </label>
                <input
                  id="mldsa-node-id"
                  type="text"
                  value={nodeId}
                  onChange={(e) => {
                    setNodeId(e.target.value);
                    if (formError) setFormError(null);
                  }}
                  placeholder="mldsa65:NodeID-..."
                  className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--background)] px-3.5 py-2.5 font-mono text-xs text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--foreground)] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="miner-payout-chain"
                    className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]"
                  >
                    Receipt-Bound Payout Chain
                  </label>
                  <select
                    id="miner-payout-chain"
                    value={payoutChain}
                    onChange={(e) => setPayoutChain(e.target.value)}
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3.5 py-2.5 font-mono text-xs text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none"
                  >
                    <option value="Hanzo (36963)">Hanzo (36963)</option>
                    <option value="Lux Primary">Lux Primary</option>
                    <option value="Ethereum">Ethereum</option>
                    <option value="Base">Base</option>
                    <option value="Bitcoin">Bitcoin</option>
                    <option value="Solana">Solana</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="miner-region"
                    className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]"
                  >
                    Region / Cluster Label (Optional)
                  </label>
                  <input
                    id="miner-region"
                    type="text"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    placeholder="us-west / bare-metal-01"
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3.5 py-2.5 font-mono text-xs text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--foreground)] focus:outline-none"
                  />
                </div>
              </div>

              {formError ? (
                <p className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-3.5 py-2.5 text-xs text-[var(--foreground)]">
                  {formError}
                </p>
              ) : null}

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--foreground)] px-5 py-2.5 text-xs font-semibold text-[var(--background)] transition-opacity hover:opacity-85"
              >
                {boundMiner ? "Update Staged Node Binding" : "Stage ML-DSA-65 Node Binding"}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>

            {boundMiner ? (
              <div className="mt-4 rounded-xl border border-[var(--border-strong)] bg-[var(--background)] p-4 font-mono text-xs">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                  <span className="inline-flex items-center gap-1.5 text-[var(--foreground)]">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Node Identity Staged
                  </span>
                  <span>Endpoint: /v1/network/miners/bind</span>
                </div>
                <div className="mt-2 truncate text-[var(--foreground)]">{boundMiner.nodeId}</div>
                <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[var(--muted-foreground)]">
                  <span>Class: {selectedHardware.name}</span>
                  <span>Payout: {boundMiner.payoutChain}</span>
                  <span>Region: {boundMiner.region}</span>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Right 5 cols: Era 1 Queue Slot + 3-Command Setup */}
        <div className="space-y-6 lg:col-span-5">
          {/* Era 1 Queue Slot */}
          <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-6">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--foreground)]">
                <Activity className="h-4 w-4" />
                <span>Era 1 Mining Queue Slot</span>
              </div>
              <span className="rounded-md border border-[var(--border-strong)] bg-[var(--background)] px-2 py-0.5 font-mono text-[10px] uppercase text-[var(--foreground)]">
                500B AI Cap
              </span>
            </div>

            <dl className="mt-4 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between gap-2 border-b border-[var(--border)] pb-2.5">
                <dt className="text-[var(--muted-foreground)]">Queue Status</dt>
                <dd className="font-semibold text-[var(--foreground)]">
                  {boundMiner ? "Staged · Whitelist Cohort" : "Awaiting Node Binding"}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-2 border-b border-[var(--border)] pb-2.5">
                <dt className="text-[var(--muted-foreground)]">Era 1 Halving Cap</dt>
                <dd className="font-semibold tabular-nums text-[var(--foreground)]">
                  500,000,000,000 AI
                </dd>
              </div>
              <div className="flex items-center justify-between gap-2 border-b border-[var(--border)] pb-2.5">
                <dt className="text-[var(--muted-foreground)]">Halving Progression</dt>
                <dd className="tabular-nums text-[var(--foreground)]">500B → 250B → 125B → …</dd>
              </div>
              <div className="flex items-center justify-between gap-2 border-b border-[var(--border)] pb-2.5">
                <dt className="text-[var(--muted-foreground)]">Mining Authority</dt>
                <dd className="text-[var(--foreground)]">A-Chain PoAI → Z-Chain P3Q</dd>
              </div>
              <div className="flex items-center justify-between gap-2">
                <dt className="text-[var(--muted-foreground)]">Sovereign Chains</dt>
                <dd className="text-[var(--foreground)]">Per-Model Execution Ready</dd>
              </div>
            </dl>

            <p className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--background)] p-3.5 text-xs leading-relaxed text-[var(--muted-foreground)]">
              Only pre-admitted useful workloads with CPU-verifiable exact-integer transcripts mint
              AI. Raw GPU-hours, self-generated jobs, and unsigned outputs are rejected at A-Chain
              consensus.
            </p>
          </div>

          {/* 3-Command Setup */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
              <div className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]">
                3-Command Setup · hanzo fabric up
              </div>
              <span className="font-mono text-[10px] text-[var(--muted-foreground)]">
                macOS · Linux
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {MINING_COMMANDS.map((item) => {
                const isCopied = copiedCmd === item.cmd;
                return (
                  <div
                    key={item.step}
                    className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-3.5"
                  >
                    <div className="flex items-center justify-between gap-2 text-[11px] text-[var(--muted-foreground)]">
                      <span className="font-mono">
                        {item.step} · {item.label}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(item.cmd)}
                        aria-label={`Copy command ${item.step}`}
                        className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-[var(--foreground)] hover:opacity-75"
                      >
                        {isCopied ? (
                          <>
                            <Check className="h-3 w-3" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="mt-2 overflow-x-auto font-mono text-xs text-[var(--foreground)]">
                      <code>$ {item.cmd}</code>
                    </pre>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-4 text-xs">
              <span className="text-[var(--muted-foreground)]">Full operator spec & flags</span>
              <a
                href="https://docs.hanzo.ai/docs/proof-of-ai/node-operator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono font-semibold text-[var(--foreground)] underline-offset-2 hover:underline"
              >
                docs.hanzo.ai/docs/proof-of-ai/node-operator
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Tab 4: Leaderboard, Wallet Holders & Invite Squads ──────────────────────

function LeaderboardTab({ session }: { session: VerifiedSession }) {
  const [subTab, setSubTab] = useState<LeaderboardSubTab>("stakers");
  const [loading, setLoading] = useState(false);
  const [leaderboardRows, setLeaderboardRows] = useState<LeaderboardRow[]>([]);
  const [holderRows, setHolderRows] = useState<HolderRow[]>([]);
  const [feedState, setFeedState] = useState<"staging" | "live-empty" | "live">("staging");
  const [lastChecked, setLastChecked] = useState<string | null>(null);

  const activeMeta =
    LEADERBOARD_TABS.find((t) => t.id === subTab) ?? LEADERBOARD_TABS[0];

  const fetchFeed = useCallback(async (tab: LeaderboardSubTab, signal?: AbortSignal) => {
    setLoading(true);
    try {
      const url =
        tab === "holders"
          ? `${NETWORK_API}/holders`
          : `${NETWORK_API}/leaderboard?category=${tab}`;
      const res = await fetch(url, { signal });
      if (!res.ok) {
        setLeaderboardRows([]);
        setHolderRows([]);
        setFeedState("staging");
        setLastChecked(new Date().toISOString());
        return;
      }
      const json = await res.json();
      const rows = Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : [];
      if (tab === "holders") {
        setHolderRows(rows as HolderRow[]);
        setLeaderboardRows([]);
      } else {
        setLeaderboardRows(rows as LeaderboardRow[]);
        setHolderRows([]);
      }
      setFeedState(rows.length > 0 ? "live" : "live-empty");
      setLastChecked(new Date().toISOString());
    } catch {
      if (!signal?.aborted) {
        setLeaderboardRows([]);
        setHolderRows([]);
        setFeedState("staging");
        setLastChecked(new Date().toISOString());
      }
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchFeed(subTab, controller.signal);
    return () => controller.abort();
  }, [subTab, fetchFeed]);

  const hasRows =
    subTab === "holders" ? holderRows.length > 0 : leaderboardRows.length > 0;

  return (
    <div className="space-y-8">
      {/* Sub-Tabs + Live Feed Status */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <div className="flex flex-col justify-between gap-4 border-b border-[var(--border)] pb-5 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
              <Trophy className="h-3.5 w-3.5 text-[var(--foreground)]" />
              <span>Verified Rankings & Holder Ledger</span>
            </div>
            <h2 className="mt-1.5 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
              Leaderboard, Wallet Holders & Invite Squads
            </h2>
          </div>

          <button
            type="button"
            onClick={() => fetchFeed(subTab)}
            disabled={loading}
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl border border-[var(--border-strong)] bg-[var(--background)] px-4 py-2 font-mono text-xs font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-elevated)] disabled:opacity-50 md:self-auto"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh Feed</span>
          </button>
        </div>

        {/* 5 Sub-Tabs */}
        <div
          role="tablist"
          aria-label="Leaderboard and holder categories"
          className="mt-5 flex flex-wrap gap-2"
        >
          {LEADERBOARD_TABS.map((tab) => {
            const selected = subTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setSubTab(tab.id)}
                className={`rounded-xl border px-3.5 py-2 text-xs font-medium transition-colors ${
                  selected
                    ? "border-[var(--foreground)] bg-[var(--foreground)] font-semibold text-[var(--background)]"
                    : "border-[var(--border)] bg-[var(--background)] text-[var(--muted-foreground)] hover:border-[var(--border-strong)] hover:text-[var(--foreground)]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--muted-foreground)]">
          <p>{activeMeta.description}</p>
          <span className="font-mono text-[11px] text-[var(--foreground)]">
            GET {activeMeta.endpoint}
          </span>
        </div>

        {/* Table Container */}
        <div className="mt-5 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--background)]">
          <div className="overflow-x-auto">
            {subTab === "holders" ? (
              <table className="w-full min-w-[680px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--surface-elevated)] font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                    <th className="px-4 py-3 font-medium">Rank</th>
                    <th className="px-4 py-3 font-medium">Address / .hanzo Handle</th>
                    <th className="px-4 py-3 font-medium">Tier</th>
                    <th className="px-4 py-3 font-medium text-right">Allocation / Stake</th>
                    <th className="px-4 py-3 font-medium text-right">Share %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)] font-mono text-xs">
                  {holderRows.map((row) => (
                    <tr key={`${row.rank}-${row.address}`}>
                      <td className="px-4 py-3.5 tabular-nums text-[var(--muted-foreground)]">
                        #{row.rank}
                      </td>
                      <td className="px-4 py-3.5 text-[var(--foreground)]">
                        <div>{row.handle ?? truncateMiddle(row.address, 10, 8)}</div>
                        {row.handle ? (
                          <div className="text-[10px] text-[var(--muted-foreground)]">
                            {truncateMiddle(row.address, 10, 8)}
                          </div>
                        ) : null}
                      </td>
                      <td className="px-4 py-3.5 uppercase text-[var(--foreground)]">{row.tier}</td>
                      <td className="px-4 py-3.5 text-right tabular-nums text-[var(--foreground)]">
                        {row.balanceOrAllocationAi} ({formatUsd(row.stakedUsd)})
                      </td>
                      <td className="px-4 py-3.5 text-right tabular-nums text-[var(--foreground)]">
                        {row.sharePct.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full min-w-[700px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--surface-elevated)] font-mono text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
                    <th className="px-4 py-3 font-medium">Rank</th>
                    <th className="px-4 py-3 font-medium">Handle / Cluster</th>
                    <th className="px-4 py-3 font-medium text-right">
                      {subTab === "stakers" ? "Staked (USD)" : "Verified Work Units"}
                    </th>
                    <th className="px-4 py-3 font-medium text-right">Multiplier</th>
                    <th className="px-4 py-3 font-medium text-right">Direct Invites</th>
                    <th className="px-4 py-3 font-medium text-right">Genesis Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)] font-mono text-xs">
                  {leaderboardRows.map((row) => (
                    <tr key={`${row.rank}-${row.handle}`}>
                      <td className="px-4 py-3.5 tabular-nums text-[var(--muted-foreground)]">
                        #{row.rank}
                      </td>
                      <td className="px-4 py-3.5 text-[var(--foreground)]">
                        <div>{row.handle}</div>
                        {row.clusterName ? (
                          <div className="text-[10px] text-[var(--muted-foreground)]">
                            {row.clusterName}
                          </div>
                        ) : null}
                      </td>
                      <td className="px-4 py-3.5 text-right tabular-nums text-[var(--foreground)]">
                        {subTab === "stakers"
                          ? formatUsd(row.stakedUsd)
                          : formatNumber(row.verifiedWorkUnits)}
                      </td>
                      <td className="px-4 py-3.5 text-right tabular-nums text-[var(--foreground)]">
                        {row.multiplier.toFixed(2)}x
                      </td>
                      <td className="px-4 py-3.5 text-right tabular-nums text-[var(--muted-foreground)]">
                        {formatNumber(row.directInvites)}
                      </td>
                      <td className="px-4 py-3.5 text-right font-semibold tabular-nums text-[var(--foreground)]">
                        {formatNumber(row.points)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Honest Live-Empty / Staging State */}
          {!hasRows ? (
            <div className="px-6 py-12 text-center">
              <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--foreground)]">
                <Database className="h-4 w-4" />
              </div>
              <div className="mt-4 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]">
                {loading
                  ? "Querying Live Feed…"
                  : feedState === "live-empty"
                    ? "Live Endpoint Ready · 0 Entries Indexed Yet"
                    : "Staging · Awaiting Genesis Activation"}
              </div>
              <p className="mx-auto mt-2 max-w-lg text-xs leading-relaxed text-[var(--muted-foreground)]">
                {subTab === "holders" ? (
                  <>
                    Wallet holder records stream directly from{" "}
                    <code className="font-mono text-[var(--foreground)]">
                      /v1/network/holders
                    </code>{" "}
                    once Genesis vaults and allocations activate. No placeholder wallet addresses or
                    fabricated balances are displayed.
                  </>
                ) : (
                  <>
                    Live rankings stream directly from{" "}
                    <code className="font-mono text-[var(--foreground)]">
                      /v1/network/leaderboard
                    </code>{" "}
                    as verified staking, PoAI mining,{" "}
                    <code className="font-mono text-[var(--foreground)]">hanzo.market</code>, and{" "}
                    <code className="font-mono text-[var(--foreground)]">work.hanzo.network</code>{" "}
                    activity settles. No synthetic accounts or fake scores are displayed.
                  </>
                )}
              </p>
              {lastChecked ? (
                <div className="mt-3 font-mono text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] tabular-nums">
                  Last Checked: {new Date(lastChecked).toLocaleTimeString()}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      {/* Viral Invite Engine & Compute Cluster Multipliers */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-6 lg:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] pb-4">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--foreground)]">
              <Users className="h-4 w-4" />
              <span>Viral Invite Engine</span>
            </div>
            <span className="font-mono text-[11px] text-[var(--muted-foreground)]">
              Personal Invite Graph
            </span>
          </div>

          <h3 className="mt-4 text-xl font-semibold tracking-tight text-[var(--foreground)]">
            Grow your Compute Cluster. Match every point.
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted-foreground)]">
            Activated Genesis members receive personal{" "}
            <code className="font-mono text-[var(--foreground)]">HNZ-XXXXXX</code> invite codes.
            Every verified invitee you bring into staking,{" "}
            <code className="font-mono text-[var(--foreground)]">hanzod</code> mining,{" "}
            <code className="font-mono text-[var(--foreground)]">hanzo.market</code>, or{" "}
            <code className="font-mono text-[var(--foreground)]">work.hanzo.network</code> expands
            your two-tier points match and unlocks shared Compute Cluster milestones.
          </p>

          {/* +16% / +8% Cards */}
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--background)] p-4">
              <div className="font-mono text-3xl font-semibold tabular-nums text-[var(--foreground)]">
                +16%
              </div>
              <div className="mt-1 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]">
                Direct Invite Match
              </div>
              <p className="mt-1.5 text-xs text-[var(--muted-foreground)]">
                Matched on all Genesis Points earned by members who activate with your personal
                invite code.
              </p>
            </div>

            <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--background)] p-4">
              <div className="font-mono text-3xl font-semibold tabular-nums text-[var(--foreground)]">
                +8%
              </div>
              <div className="mt-1 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]">
                Second-Degree Match
              </div>
              <p className="mt-1.5 text-xs text-[var(--muted-foreground)]">
                Matched on Genesis Points earned by invitees of your direct invites across all four
                ecosystem surfaces.
              </p>
            </div>
          </div>

          {/* Personal Code Vault Status */}
          <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 font-mono text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                Your Personal Invite Codes
              </span>
              <span className="rounded border border-[var(--border-strong)] bg-[var(--surface)] px-2 py-0.5 text-[10px] uppercase text-[var(--foreground)]">
                Issued on Activation
              </span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {["SLOT 01", "SLOT 02", "SLOT 03", "SLOT 04"].map((slot) => (
                <div
                  key={slot}
                  className="flex items-center justify-between rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[11px] text-[var(--muted-foreground)]"
                >
                  <span>HNZ-······</span>
                  <Lock className="h-3 w-3" />
                </div>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[var(--muted-foreground)]">
              <span>Entry Code: {session.code}</span>
              <span>Cluster: {session.clusterName ?? "Pending Activation"}</span>
            </div>
          </div>
        </div>

        {/* Compute Cluster Milestone Multipliers */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 lg:col-span-5">
          <div className="flex items-center gap-2 border-b border-[var(--border)] pb-4 font-mono text-xs uppercase tracking-wider text-[var(--foreground)]">
            <Hash className="h-4 w-4" />
            <span>Compute Cluster Milestones</span>
          </div>

          <div className="mt-4 space-y-3">
            {CLUSTER_MILESTONES.map((milestone) => (
              <div
                key={milestone.tier}
                className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4"
              >
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                  <span>{milestone.tier}</span>
                  <span className="text-[var(--foreground)]">Activation-Gated</span>
                </div>
                <div className="mt-1 text-sm font-semibold text-[var(--foreground)]">
                  {milestone.name}
                </div>
                <div className="mt-1 font-mono text-[11px] text-[var(--muted-foreground)]">
                  Trigger: {milestone.requirement}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[var(--muted-foreground)]">
                  {milestone.benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Unlocked 4-Tab Monochrome Terminal ──────────────────────────────────────

function UnlockedGenesisTerminal({
  session,
  onLock,
}: {
  session: VerifiedSession;
  onLock: () => void;
}) {
  const [activeTab, setActiveTab] = useState<TerminalTab>("stake");
  const [boundWallets, setBoundWallets] = useState<BoundWalletDraft[]>([]);
  const [boundMiner, setBoundMiner] = useState<BoundMinerDraft | null>(null);

  const tabs: Array<{
    id: TerminalTab;
    index: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    { id: "stake", index: "01", label: "Stake to Earn", icon: Coins },
    { id: "sale", index: "02", label: "Token Sale", icon: ShieldCheck },
    { id: "mining", index: "03", label: "hanzod Mining", icon: Cpu },
    { id: "leaderboard", index: "04", label: "Leaderboard & Squads", icon: Trophy },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      {/* Dev Preview Disclosure Banner (Strictly impossible in production builds) */}
      {session.mode === "dev-preview" ? (
        <div className="mb-6 flex flex-col items-start justify-between gap-3 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-4 py-3 font-mono text-xs sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5 text-[var(--foreground)]">
            <Terminal className="h-4 w-4 shrink-0" />
            <span>
              LOCAL DEV PREVIEW (<code className="font-semibold">?preview=1</code>) — Production
              builds strictly require server verification via{" "}
              <code className="font-semibold">/v1/network/invite/verify</code>.
            </span>
          </div>
          <button
            type="button"
            onClick={onLock}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[var(--border-strong)] bg-[var(--background)] px-3 py-1.5 text-[11px] font-semibold text-[var(--foreground)] hover:bg-[var(--surface)]"
          >
            <Lock className="h-3 w-3" />
            View Locked Gate
          </button>
        </div>
      ) : null}

      {/* Session Command Header */}
      <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-6">
        <div className="flex flex-col justify-between gap-4 border-b border-[var(--border)] pb-5 md:flex-row md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[var(--foreground)]">
              <Unlock className="h-3.5 w-3.5" />
              <span>
                {session.mode === "dev-preview"
                  ? "Genesis Terminal · Local Preview Session"
                  : "Genesis Terminal · Invite Verified"}
              </span>
            </div>
            <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl">
              Hanzo Network Genesis Console
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-3.5 py-2 font-mono text-xs tabular-nums">
              <span className="text-[var(--muted-foreground)]">CODE </span>
              <span className="font-semibold text-[var(--foreground)]">{session.code}</span>
            </div>
            <button
              type="button"
              onClick={onLock}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border-strong)] bg-[var(--background)] px-3.5 py-2 font-mono text-xs font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-elevated)]"
            >
              <Lock className="h-3.5 w-3.5" />
              Lock Session
            </button>
          </div>
        </div>

        {/* Honest Summary Strip */}
        <div className="mt-5 grid grid-cols-2 gap-3 font-mono lg:grid-cols-4">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-3.5">
            <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
              Inviter / Squad
            </div>
            <div className="mt-1 truncate text-sm font-semibold text-[var(--foreground)]">
              {session.inviterHandle ?? "Genesis Cohort"}
            </div>
            <div className="mt-0.5 truncate text-[10px] text-[var(--muted-foreground)]">
              {session.clusterName ?? "Cluster pending activation"}
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-3.5">
            <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
              Unified Genesis Points
            </div>
            <div className="mt-1 text-sm font-semibold tabular-nums text-[var(--foreground)]">
              0
            </div>
            <div className="mt-0.5 text-[10px] text-[var(--muted-foreground)]">
              Accrual starts on activation
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-3.5">
            <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
              Staged Wallets / Nodes
            </div>
            <div className="mt-1 text-sm font-semibold tabular-nums text-[var(--foreground)]">
              {boundWallets.length} Wallets · {boundMiner ? "1" : "0"} Node
            </div>
            <div className="mt-0.5 text-[10px] text-[var(--muted-foreground)]">
              EVM · BTC · LUX · SOL · ML-DSA-65
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-3.5">
            <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
              Era 1 Mining Cap
            </div>
            <div className="mt-1 text-sm font-semibold tabular-nums text-[var(--foreground)]">
              500B AI
            </div>
            <div className="mt-0.5 text-[10px] text-[var(--muted-foreground)]">
              1T PoAI Pool · 1T DAO Treasury
            </div>
          </div>
        </div>
      </div>

      {/* 4-Tab Bar */}
      <div
        role="tablist"
        aria-label="Genesis Terminal sections"
        className="mt-6 grid grid-cols-2 gap-2 lg:grid-cols-4"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-between gap-2 rounded-xl border px-4 py-3.5 text-left transition-colors ${
                active
                  ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
                  : "border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-elevated)]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className="h-4 w-4 shrink-0" />
                <div>
                  <div
                    className={`font-mono text-[10px] uppercase tracking-wider ${
                      active ? "opacity-75" : "text-[var(--muted-foreground)]"
                    }`}
                  >
                    TAB {tab.index}
                  </div>
                  <div className="text-xs font-semibold sm:text-sm">{tab.label}</div>
                </div>
              </div>
              <ArrowRight className={`h-3.5 w-3.5 shrink-0 ${active ? "opacity-100" : "opacity-40"}`} />
            </button>
          );
        })}
      </div>

      {/* Active Tab Panel */}
      <div role="tabpanel" className="mt-8">
        {activeTab === "stake" ? (
          <StakeTab
            boundWallets={boundWallets}
            onAddWallet={(w) => setBoundWallets((prev) => [...prev, w])}
            onRemoveWallet={(id) =>
              setBoundWallets((prev) => prev.filter((item) => item.id !== id))
            }
          />
        ) : null}

        {activeTab === "sale" ? <TokenSaleTab /> : null}

        {activeTab === "mining" ? (
          <MiningTab boundMiner={boundMiner} onSaveMiner={setBoundMiner} />
        ) : null}

        {activeTab === "leaderboard" ? <LeaderboardTab session={session} /> : null}
      </div>
    </div>
  );
}

// ─── Page Entry (/early & /genesis) ──────────────────────────────────────────

export function EarlyAccess() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [verifiedSession, setVerifiedSession] = useState<VerifiedSession | null>(null);

  // Local dev-only design preview (?preview=1). Statically eliminated in production builds.
  const isDevPreview = Boolean(import.meta.env.DEV && searchParams.get("preview") === "1");

  const initialCodeSuffix = useMemo(() => {
    const raw = searchParams.get("invite") ?? searchParams.get("code") ?? "";
    return normalizeInviteSuffix(raw);
  }, [searchParams]);

  const activeSession: VerifiedSession | null = useMemo(() => {
    if (verifiedSession) return verifiedSession;
    if (isDevPreview) {
      return {
        code: "HNZ-DEVPRV",
        inviterHandle: "@dev-preview",
        clusterName: "Local Design Preview",
        mode: "dev-preview",
        verifiedAt: new Date().toISOString(),
      };
    }
    return null;
  }, [verifiedSession, isDevPreview]);

  const handleLock = () => {
    setVerifiedSession(null);
    if (isDevPreview) {
      const next = new URLSearchParams(searchParams);
      next.delete("preview");
      setSearchParams(next, { replace: true });
    }
  };

  return (
    <NetworkShell>
      <TelemetryStrip unlocked={activeSession !== null} isDevPreview={isDevPreview && !verifiedSession} />
      {activeSession ? (
        <UnlockedGenesisTerminal session={activeSession} onLock={handleLock} />
      ) : (
        <LockedInviteGate
          initialCodeSuffix={initialCodeSuffix}
          onVerified={(session) => setVerifiedSession(session)}
        />
      )}
    </NetworkShell>
  );
}

export default EarlyAccess;
