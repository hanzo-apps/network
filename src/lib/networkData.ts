import { useEffect, useState, useCallback } from "react";

export const CHAIN_RPC = "https://api.hanzo.network/v1/bc/hanzo/rpc";
export const MODELS_API = "https://api.hanzo.ai/v1/models";
export const NETWORK_API = "https://api.hanzo.ai/v1/network";

export interface LiveChainState {
  status: "loading" | "live" | "error";
  chainId: number | null;
  blockNumber: number | null;
  latencyMs: number | null;
  updatedAt: string | null;
}

export function useLiveChain(pollMs = 15000): LiveChainState {
  const [state, setState] = useState<LiveChainState>({
    status: "loading",
    chainId: null,
    blockNumber: null,
    latencyMs: null,
    updatedAt: null,
  });

  useEffect(() => {
    let active = true;

    async function fetchChain() {
      const start = performance.now();
      try {
        const res = await fetch(CHAIN_RPC, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify([
            { jsonrpc: "2.0", id: 1, method: "eth_chainId", params: [] },
            { jsonrpc: "2.0", id: 2, method: "eth_blockNumber", params: [] },
          ]),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const elapsed = Math.round(performance.now() - start);

        let chainHex: string | undefined;
        let blockHex: string | undefined;

        if (Array.isArray(json)) {
          chainHex = json.find((x) => x.id === 1)?.result;
          blockHex = json.find((x) => x.id === 2)?.result;
        } else if (json?.result) {
          blockHex = json.result;
        }

        // Fallback single call if batch RPC isn't enabled
        if (!blockHex) {
          const single = await fetch(CHAIN_RPC, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ jsonrpc: "2.0", id: 2, method: "eth_blockNumber", params: [] }),
          });
          const sJson = await single.json();
          blockHex = sJson?.result;
          chainHex = "0x9063";
        }

        const blockNumber = blockHex ? parseInt(blockHex, 16) : null;
        const chainId = chainHex ? parseInt(chainHex, 16) : 36963;

        if (active && blockNumber !== null && !Number.isNaN(blockNumber)) {
          setState({
            status: "live",
            chainId,
            blockNumber,
            latencyMs: elapsed,
            updatedAt: new Date().toISOString(),
          });
        } else if (active) {
          setState((prev) => ({ ...prev, status: "error" }));
        }
      } catch {
        if (active) {
          setState((prev) => (prev.blockNumber ? prev : { ...prev, status: "error" }));
        }
      }
    }

    fetchChain();
    const id = window.setInterval(fetchChain, pollMs);
    return () => {
      active = false;
      window.clearInterval(id);
    };
  }, [pollMs]);

  return state;
}

export interface CatalogModel {
  id: string;
  ownedBy: string;
  isZen: boolean;
  inputPerMillion: number | null;
  outputPerMillion: number | null;
  contextLength: number | null;
}

export interface LiveModelsState {
  status: "loading" | "live" | "error";
  models: CatalogModel[];
  totalCount: number;
  zenCount: number;
  retry: () => void;
}

function parsePricePerMillion(raw: unknown): number | null {
  if (typeof raw === "number" && Number.isFinite(raw)) {
    // Handle per-token (< 0.01) vs already per-million
    return raw > 0 && raw < 0.01 ? raw * 1_000_000 : raw;
  }
  if (typeof raw === "string" && raw.trim() !== "") {
    const n = Number(raw);
    if (Number.isFinite(n)) {
      return n > 0 && n < 0.01 ? n * 1_000_000 : n;
    }
  }
  return null;
}

export function useLiveModels(): LiveModelsState {
  const [status, setStatus] = useState<"loading" | "live" | "error">("loading");
  const [models, setModels] = useState<CatalogModel[]>([]);
  const [attempt, setAttempt] = useState(0);

  const retry = useCallback(() => {
    setStatus("loading");
    setAttempt((n) => n + 1);
  }, []);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const res = await fetch(MODELS_API);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const rawList = Array.isArray(json?.data) ? json.data : [];
        const parsed: CatalogModel[] = rawList
          .filter((m: Record<string, unknown>) => typeof m?.id === "string")
          .map((m: Record<string, unknown>) => {
            const id = String(m.id);
            const ownedBy = typeof m.owned_by === "string" ? m.owned_by : id.includes("/") ? id.split("/")[0] : "hanzo";
            const isZen = id.toLowerCase().includes("zen");
            const pricing = (m.pricing as Record<string, unknown> | undefined) ?? undefined;
            const inputPerMillion = parsePricePerMillion(
              pricing?.prompt ?? pricing?.input ?? m.input_price_per_million
            );
            const outputPerMillion = parsePricePerMillion(
              pricing?.completion ?? pricing?.output ?? m.output_price_per_million
            );
            const ctx = typeof m.context_length === "number" ? m.context_length : null;
            return {
              id,
              ownedBy,
              isZen,
              inputPerMillion,
              outputPerMillion,
              contextLength: ctx,
            };
          })
          .sort((a: CatalogModel, b: CatalogModel) => {
            if (a.isZen !== b.isZen) return a.isZen ? -1 : 1;
            return a.id.localeCompare(b.id);
          });

        if (active) {
          setModels(parsed);
          setStatus("live");
        }
      } catch {
        if (active) setStatus("error");
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [attempt]);

  const zenCount = models.filter((m) => m.isZen).length;
  return { status, models, totalCount: models.length, zenCount, retry };
}

// ─── Typed /v1/network/* Client (Invite-Only Genesis Terminal) ───────────────

export type ChainFamily = "evm" | "btc" | "lux" | "sol";

export interface InviteVerifyResponse {
  valid: boolean;
  backendLive: boolean;
  inviterHandle?: string;
  clusterName?: string;
  reason?: string;
}

export interface StakeVault {
  id: string;
  asset: "ETH" | "BTC" | "WBTC" | "USDC" | "USDT" | "LUX" | "SOL";
  chain: "ethereum" | "bitcoin" | "lux" | "base" | "solana";
  depositAddress: string;
  minDeposit: string;
  pointsPerUsdPerDay: number;
  lockRule: string;
  totalDepositedUsd: number | null;
  userDeposited: string;
  userDepositedUsd: number;
  status: "open" | "paused" | "upcoming";
}

export interface SaleTranche {
  id: string;
  name: string;
  priceUsdPerAi: string;
  capUsd: number | null;
  committedUsd: number | null;
  minTicketUsd: number | null;
  maxTicketUsd: number | null;
  vestingSummary: string;
  acceptedAssets: Array<"ETH" | "BTC" | "USDC" | "USDT" | "LUX" | "SOL">;
  status: "upcoming" | "open" | "filled" | "closed";
}

export interface LeaderboardRow {
  rank: number;
  handle: string;
  clusterName?: string;
  points: number;
  multiplier: number;
  stakedUsd: number;
  verifiedWorkUnits: number;
  directInvites: number;
}

export interface HolderRow {
  rank: number;
  address: string;
  handle?: string;
  tier: "genesis" | "operator" | "builder" | "validator";
  balanceOrAllocationAi: string;
  stakedUsd: number;
  sharePct: number;
}

export async function verifyInviteCode(code: string): Promise<InviteVerifyResponse> {
  const clean = code.trim().toUpperCase();
  if (!clean) return { valid: false, backendLive: true, reason: "Enter an invite code." };
  try {
    const res = await fetch(`${NETWORK_API}/invite/verify`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ code: clean }),
    });
    if (res.status === 404 || res.status === 501 || res.status === 502 || res.status === 503) {
      return {
        valid: false,
        backendLive: false,
        reason:
          "Invite verification endpoint is staging before Genesis opens. Join the invite queue below to receive a Phase 1 code.",
      };
    }
    const data = await res.json();
    return {
      valid: Boolean(data?.valid),
      backendLive: true,
      inviterHandle: data?.inviterHandle,
      clusterName: data?.clusterName,
      reason: data?.valid ? undefined : data?.error || "Invite code not recognized or already redeemed.",
    };
  } catch {
    return {
      valid: false,
      backendLive: false,
      reason:
        "Could not reach api.hanzo.ai/v1/network/invite/verify. Join the queue below or try again shortly.",
    };
  }
}

export async function submitInviteWaitlist(payload: {
  email?: string;
  walletAddress?: string;
  role: "staker" | "miner" | "builder" | "researcher";
  xHandle?: string;
}): Promise<{ ok: boolean; message: string }> {
  try {
    const res = await fetch(`${NETWORK_API}/waitlist`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      return { ok: true, message: "Registered for an invite code. Watch Discord and X for wave drops." };
    }
    return {
      ok: false,
      message:
        "Queue endpoint is provisioning. Join Discord (discord.gg/CJCyAsm9Vr) or follow @hanzoai for Genesis invite waves.",
    };
  } catch {
    return {
      ok: false,
      message:
        "Queue endpoint is provisioning. Join Discord (discord.gg/CJCyAsm9Vr) or follow @hanzoai for Genesis invite waves.",
    };
  }
}
