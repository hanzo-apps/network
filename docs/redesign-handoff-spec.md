# Hanzo Network — Redesign Handoff Response, Master Site Spec & `/v1/network/*` Contract

**For:** James · **From:** Zach · **Date:** 26 Nov 2026
**Canonical Repo:** `https://github.com/hanzo-apps/network` (mirror: `https://git.hanzo.ai/hanzo-apps/network`)

> This file complements `LLM.md` and `docs/proof-of-ai.md` with the approved redesign scope, answers to the 26 Nov 2026 handoff questions, and the typed `/v1/network/*` API contract for the invite-only Genesis terminal.

## 1. Handoff Answers

1. **Canonical repo:** `hanzo-apps/network` `main` (`77473f2`, 30 Oct 2026). `hanzoai/hanzo.network` (`db1e36a`, 24 Sep 2026) is stale. Rebase `job/network-redesign` onto `hanzo-apps/network` `main`.
2. **Analytics & consent:** Keep `@hanzo/event@^0.3.67` (`pk-YJ2eiA_7ckLStMPte8Ar8FsmRp_ycmeIeRbpGprZYmM`, `domains: ['hanzo.network', 'hanzo.ai']`, GPC/DNT respected), region-aware `Consent` + *Your Privacy Choices*, `useAnalytics().link('https://hanzo.ai/login')` (zero links to `hanzo.id`), and `scripts/check.mjs` (relax `/v1/chat/public` check only if the launcher hands off cleanly to `https://hanzo.app`).
3. **Monetary policy:** Lock `papers.hanzo.ai/hanzo-ai-chain/` (§3 & §10.6): **2T AI hard cap** (**1T** permanent non-mineable Hanzo DAO + **1T** proof-earned PoAI miner/validator pool; **500B / 250B / 125B** geometric halvings; **0** destination-chain inflation; permanent fee burn `ΔS = PoAI issuance − β·settled fees`). Explicitly note that PoAI rewards & monetary activation are audit/governance-gated.
4. **Deploy path:** Merging to `hanzo-apps/network` `main` runs `hanzo.yml` (`site: slug: network, dir: dist`) and publishes directly to `s3://hanzo-sites/hanzo/network` served by `universe/infra/sites/sites.yaml` (`hanzo-network-static`, `spa: true`). No Docker image, pod, CR, or DNS change.

## 2. Hard Brand & Vocabulary Rules

- **Monochrome only:** Black & white via `@hanzo/tokens`, `Zen` / `Zen Mono` (`@hanzo/font`), block-H (`@hanzo/logo`), light & dark following device. **No Hanzo Red (`#d81c33` / `#fd4444`), no Blast yellow, no cyan/emerald/purple neon.**
- **Vocabulary:** Always use **sovereign chains / per-model chains / intelligence chains** — **never "subnet"**.
- **Receipts only:** All numbers must be live (`api.hanzo.network/v1/bc/hanzo/rpc`, `api.hanzo.ai/v1/models`, `status.hanzo.network`, `/v1/network/*`) or cited to whitepaper/HIPs.

## 3. Core Narrative — "The blockchain for global intelligence."

Six compounding pillars closing into one flywheel:
1. **Maximum Utility Per Node (`hanzod`):** One Rust binary runs k3s/Hanzo Cloud, native inference/training (`hanzo-engine` + PoAI), Dev/Bot/Team runtimes, reactive tasks, `/v1/research`, and chain validation.
2. **Multi-Intelligence Consensus (`HIP-0901`):** Distinct models on bonded nodes settle leaderless on-chain verdicts (`AIGovernor`) and continuous parameters (`AIParams` sortition median) under timelock + guardian veto + `AIPolicy`, verified by CPU-verifiable PoAI (exact int8 Freivalds over `F_{2^61-1}`, `O(n²)` check, `≤ 2^-122` cheat probability, ~768 B MMR trace).
3. **Sovereign Per-Model / Per-Intelligence Chains:** Polymorphic chains (`CreateChainTx`) on Lux per model family or domain, with independent validators, frozen research gates, EVM composability, Lux Quasar PQ finality, and Warp/Teleport omnichain settlement.
4. **Decentralized Agentic Commerce:** Agent wallets, cryptographic spend guardrails (`AIPolicy`), Hamiltonian Market Maker (`H(Ψ,Θ)=κ`), real customer revenue ("Compute Once, Earn Twice"), and permanent protocol fee burn.
5. **Self-Upgrading Autonomous Research (`/v1/research`, HIP-1334 / HIP-1400):** Lineage-bound experiments promoted only when beating prospectively frozen gates (PoT + PoC / DeltaSoup).
6. **DAO Goal-Setting + Human De-Work (`https://work.hanzo.network`):** Live Hanzo DAO Work Board setting chain goals, bounties, datasets, and frozen evaluation gates alongside autonomous agents.

## 4. Routes (Base Outside × Blast Invite-Only Inside)

- **`/` (Home):** Base.org institutional clarity — headline, live telemetry strip, 6-pillar flywheel, outcome cards, CPU-verifies-GPU PoAI explainer, Hanzo vs. subjective AI networks comparison, activation phases (whitepaper §10), verified live links.
- **`/build`:** Agent-first DX (`https://docs.hanzo.ai/mcp`, `npx -y hanzo mcp`, `docs.hanzo.ai/llms.txt`), Network Details table (`36963` Mainnet / `36962` Testnet / `36964` Devnet), incentivized building, and verified live docs/whitepaper/HIPs/proofs/work-board index.
- **`/economics`:** 2T monetary policy, HMM mechanics, anti-farming rules, interactive monochrome halving/burn/node-utility calculator (marked illustrative until launch weights lock).
- **`/pricing`:** Live `/v1/models` catalog (552 models, 26 Zen), Zen at $0 when confirmed live, 3-step copyable `curl`, link to `https://hanzo.ai/pricing`.
- **`/early` (Strict Invite-Only Portal):** Hard 6-char invite gate (`POST /v1/network/invite/verify`) — no invite, no view of Token Sale, Multi-Asset Staking (`ETH`, `BTC`/`wBTC`, `USDC`, `USDT`, `LUX`, `SOL`), Invite-Only `hanzod` Mining Whitelist (Era 1 `500B AI` queue), Leaderboard (Stakers / Miners / Builders / Researchers), Wallet Holders, or Viral Invite Codes (+16% / +8% cluster multipliers). Optional `VITE_GATE_HOME=true` toggle for launch week.
- **`public/llms.txt`:** Upgraded agent-first index (included on this branch).

## 5. `/v1/network/*` API Contract (`https://api.hanzo.ai/v1/network/*`)

All gated endpoints return `403 { "error": "invite_required" }` before invite redemption:
- `POST /v1/network/invite/verify` — validate 6-char invite code.
- `POST /v1/network/invite/redeem` — bind wallet signature (EVM/BTC/Lux/Solana) & issue session.
- `POST /v1/network/waitlist` — queue uninvited operators/builders/stakers.
- `GET  /v1/network/me` & `POST /v1/network/identity/link` — linked wallets, X/Discord/`hanzo.ai` dev org, points breakdown, multiplier, cluster progress, personal invite codes.
- `GET  /v1/network/stake/vaults` & `POST /v1/network/stake/intent` — multi-asset staking (`ETH`, `BTC`, `WBTC`, `USDC`, `USDT`, `LUX`, `SOL`).
- `GET  /v1/network/sale/tranches` & `POST /v1/network/sale/commit` — invite-only Genesis sale tranches (strictly from 1T DAO treasury).
- `GET  /v1/network/miners/me` & `POST /v1/network/miners/register` — `hanzod` ML-DSA node / cloud-adapter registration & Era 1 queue slot.
- `GET  /v1/network/leaderboard?tab=stakers|miners|builders|researchers` — live ranked leaderboard.
- `GET  /v1/network/holders` — invite-only wallet holder rankings & distribution.
