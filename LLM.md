# hanzo.network

The site for Hanzo Network: the blockchain for global intelligence (hanzo.network). Six routes: `/`, `/build`, `/economics`, `/ecosystem`, `/pricing`, `/early`.

## Stack

- React 18 + TypeScript (strict, no unused locals or parameters; typechecked with the native compiler `tsgo`), Vite 5 (SWC), React Router v7 (imported from `react-router`)
- Every dependency in `package.json` is pinned to an exact version; the lockfile resolves the same one
- One override, in `pnpm-workspace.yaml`: `vitest>tinypool` is held at 2.1.2 for two security advisories vitest 3 cannot reach by its own range; the reason and when to remove it are written beside it
- Tailwind CSS 4 reading `@hanzo/tokens`; Zen and Zen Mono from `@hanzo/font` (imported in `src/main.tsx`); the mark from `@hanzo/logo`
- `motion` for animation; pure monochrome, no accent colour

## Structure

```
src/
  App.tsx                    the six routes inside Shell (nav, footer, browser title); the chain's old paths; `*` hands off to hanzo.ai
  pages/Home.tsx             `/`         hero + live telemetry, solutions, the six-part loop (lib/pillars.ts), how Proof of AI checks, gated phases, token, sources, closing
  pages/Build.tsx            `/build`     connect an agent, network details (with the native currency), run a validator, a first call, what builders can earn
  pages/Economics.tsx        `/economics` the 2T cap, halving eras (a bar list under 640px), fee burn, a Designed market section, rules, an illustrative calculator
  pages/Ecosystem.tsx        `/ecosystem` what exists around the network: three groups of cards from lib/ecosystem.ts
  pages/Pricing.tsx          `/pricing`   live model catalog from api.hanzo.ai/v1/models
  pages/Early.tsx            `/early`     the invite gate (components/early/Gate.tsx), the queue (Queue.tsx), where invites come from (see below)
  components/early/          the gate (Gate), the queue (Queue), the shared slots and segments
  components/home/           home sections
  components/build/          /build sections; components/economics/ the chart and calculator
  components/pricing/        /pricing sections: Models (the table)
  components/ui/             button (buttonClass, inlineLink, textLink, navLink), card, tag, code (copyable block), section (container, Section, Eyebrow, H1, H2, Label, Disc), reveal, glow, live (the polite status region), start (the three-step first call)
  components/Compare.tsx     the proof-versus-votes table, shared by home and /economics
  components/Shell.tsx       the frame every route shares (Nav, Footer, Scroll); sets the browser title (one map)
  components/Measure.tsx     @hanzo/event: the first-party stream and the tag manager, one pageview per route
  components/Consent.tsx     the cookie bar and sheet, and "Your Privacy Choices" (the footer links to #choices)
  components/Away.tsx        /login and /signup: replaces the location with LOGIN (from links.ts) carrying the visitor's id
  components/Chat.tsx        the chat dialog
  lib/links.ts               every outbound URL, once (LOGIN, the chat lane and the models URL stay whole strings: scripts/check.mjs looks for them in the build)
  lib/solutions.ts           the five home solutions, once (also held to public/llms.txt by a test)
  lib/pillars.ts             the six pillars, once (held to public/llms.txt by a test; the words are the CTO's spec: sovereign per-model chains, never "subnet")
  lib/ecosystem.ts           the /ecosystem entries, once, tagged by what each page showed; the home strip picks four; held to public/llms.txt by a test
  lib/status.ts              the three status words (a type; no component imports)
  lib/quickstart.ts          the first-call curl shown on /pricing and /build
  lib/request.ts             request(url, init, ms): the one way a network call is made; a deadline, the caller's cancel, no cookies, a typed RequestError (timeout, aborted, status, network)
  lib/format.ts              count(n) and decimals(n, max): the one number formatter (en-US)
  lib/catalog.ts             the model catalog: loadModels() fetches once per page (10 s deadline), countModels() is the one count
  lib/chain.ts               block height from the chain RPC (loading, live, down; 5 s deadline)
  lib/networks.ts            Mainnet, Testnet, Devnet: RPC and chain id
  lib/supply.ts              the whitepaper's supply formulas (eras, allowance, net change) and the short forms 2T AI, 500B
  lib/chat.ts                ask(): the public chat lane (30 s deadline)
  lib/invite.ts              verify() and join(): the whole contract of the invite and queue endpoints
docs/proof-of-ai.md          the Proof of AI spec: designed, not live
```

## Shared pieces

- `Tag` (`<Tag is="Designed" />`) is the only status marker. Its one prop is `Live`, `In progress` or `Designed`.
- `links.ts` is the only place a URL is written; pages import the constant. `src/lib/links.test.ts` fails on any `https://` literal in `src/` outside `links.ts`, tests and two files (`Consent.tsx` and `Measure.tsx` keep their own: they must stay byte-identical to the upstream hanzo-apps/network copies they mirror, so upstream changes merge cleanly; that allow-list is exactly those two plus `links.ts`).
- Never link `github.com/luxfi/*`: that organisation is hidden on GitHub and 404s for visitors. Link Lux code at `https://git.hanzo.ai/luxfi/*` or `https://github.com/luxdao/*`; the same test fails on `github.com/luxfi` anywhere in `src/` or `public/` (including `llms.txt`).
- `solutions.ts` holds the five home solutions once; the cards draw them and a test holds `public/llms.txt` to the same titles, statuses and addresses.
- "Get an API key" goes through `useAnalytics().link()` in `ui/start.tsx`, so the visitor's id travels, as it does for `/login`.
- `Code` (`components/ui/code.tsx`) is the one copyable block; Pricing and /build both use it. `commands.ts` holds /build's commands, and `public/llms.txt` must contain every one (a unit test checks).
- `Compare` is the one proof-versus-votes table.
- `request.ts` is the one place a network call is made (chain, models, chat); each caller names its own deadline and the timeout never lives in a component.
- `format.ts` is the one number formatter; `supply.ts` is the one place the supply formulas and their short forms live; the calculator and chart call them.
- `networks.ts` is the one list of chains, with each chain's native currency (mainnet "AI"; none for testnet and devnet, which no source names); /build and `llms.txt` agree with it (a unit test checks).
- The validator command (`hanzo chain up testnet`) is `VALIDATOR_COMMAND` in `commands.ts`; `hanzo fabric` is a deprecated alias and is never printed.
- Numbers become text in `format.ts` (`count`, `decimals`, `significant`) and `supply.ts` (`short`, `shortAI`); components do not retype chain ids or supply figures.
- One style per thing: `H1` and `H2` (the home `H1` has a `big` size), `Label` (small mono uppercase), `Glow`, `Live` (every polite announcement), `textLink` (a link on its own line; it composes `inlineLink`, a link inside a sentence), `navLink` (Nav and Footer). Do not retype them.
- Page heads and the first section of each page have no entrance animation (`e2e/site.spec.ts`), so the heading paints in the first frame.
- `chat.ts` is the one place the chat endpoint is called.
- `catalog.ts`: Home's telemetry and Pricing both call `loadModels()` (one request) and `countModels()` (one number).
- The browser title of each route is one map in `Shell.tsx`.

## The honesty rule

Every status on the site is `Live`, `In progress` or `Designed`; no other word (not "Beta", "Soon", "Proposed"). Every figure is either read live (block height, model counts) or taken from the whitepaper and sourced. Live today: the Hanzo chain (block height) and the OpenAI-compatible API at api.hanzo.ai (pricing, chat). Designed, not live: Proof of AI rewards and the AI token (see the spec). A designed thing is never written as live. The calculator is labelled illustrative. No prices are hard-coded except the two plan prices the CTO asked for (Pro $15 and Max $95 on /pricing), which link to their source, hanzo.ai/pricing. No returns, dates or invented numbers.

## `/build` proof

On 26 Nov 2026 `npx -y hanzo mcp` (npm `hanzo` 9.0.3) answered MCP `initialize` as server "hanzo-mcp" version 1.1.40 and `tools/list` with 19 tools. The locally installed hanzo 8.5 CLI has no stdio `mcp` command, so the page prints the `npx` form.

## `/early`

The invite gate. A code input is checked by `POST https://api.hanzo.ai/v1/network/invite/verify`; a queue form posts to `POST https://api.hanzo.ai/v1/network/waitlist`. Both are anonymous JSON (`credentials: 'omit'`, no Authorization), built by the backend in another repo. **This branch is merged only after both endpoints are live.** The page never answers for them: accepted shows only on `{"valid":true}`, "not valid" only on `{"valid":false}`, and anything else (a 500, a 200 without a boolean, a timeout) says the service did not answer.

The contract lives in `src/lib/invite.ts` and nowhere else (codes are `HNZ-XXXXX-XXXXX`: `normalize()` before sending, `body()` for the input; the queue body is `{email|xHandle, role, source}`; verify reads only a boolean `valid`, never who issued a code; the page route and the button label are `EARLY` and `INVITE_LABEL` in `early.ts`); `src/lib/invite.test.ts` pins the URLs, headers, bodies and every outcome (429 is `limited`, anything unexpected is `unavailable`, 15 s timeout). The URLs are `INVITE_VERIFY` and `WAITLIST` in `links.ts`. A valid code is kept upper-cased in `sessionStorage` under `hn.invite` (so a reload shows the accepted state) and nowhere else, never in the URL; "Use a different code" clears it. Nothing is unlocked by a code yet; the page says so, and promises nothing else about codes (no wallet, no terminal, no dates; a forbidden-words test holds it). The queue keeps an email or an X handle, a role (miner, builder, researcher, staker: `ROLES` in `invite.ts`) and the source, and the page says so beside a Privacy link. A 400 from the queue is shown as a field error (kind `rejected`), never as "did not answer". An unexpected status from either endpoint is reported through `@hanzo/event` `captureError` as the endpoint name and the status only (`drift()` in `invite.ts`), never a body, code, email or handle. Each form has one polite live region outside any `aria-busy` element. The nav, hero and closing buttons read "Enter invite code" and go to `/early`; `public/llms.txt` names both endpoints. Tests: `e2e/early.spec.ts` mocks both endpoints with `page.route` and never reaches the real ones.

## Redirects

`/login` and `/signup` render `Away` (`Away.tsx`), which replaces the location with LOGIN (`https://hanzo.ai/login`) carrying the visitor's anonymous id. `/index`, `/home2` and `/original` (old copies of this site's home page) stay on this site and go to `/`. The chain's own paths stay with the chain: `/status` goes to status.hanzo.network, `/explorer` to explore.hanzo.network, and `/blockchain`, `/blockchain/*` and `/web3` go to this site's `/`. Every other path hands off to `https://hanzo.ai<path>` from the client (`ToHanzo` in `App.tsx`), rendered outside the page frame so nothing flashes. They are client-side because hanzoai/static serves the SPA fallback (`-spa`) for every path. A real server 301 belongs in the static server or the ingress config if Hanzo wants one.

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm typecheck && pnpm lint && pnpm test
pnpm exec playwright test --grep-invert @network   # e2e on the production build
pnpm links                                          # live-internet link check (on demand; covers all six routes)
```

Tests: vitest for `src/lib` and CSS variables (`test/`); Playwright (`e2e/`: home, sections, build, economics, early, pricing, chat, site, privacy) for axe (WCAG 2.2 AA), phone width, the font shipping, redirects, the live telemetry strip, the still hero, the page titles, no console errors, and privacy (`e2e/privacy.spec.ts`: Your Privacy Choices in the footer, the opt-in bar, no hanzo.id link, sign-in to hanzo.ai/login). The home specs mock the chain, so CI never depends on it.

The chat widget answers in place. `src/lib/chat.ts` `ask(messages, signal)` POSTs `{messages}` to `https://api.hanzo.ai/v1/chat/public` (keyless, `credentials: 'omit'`, no Authorization) and returns only `choices[0].message.content`; it throws a `RequestError` on non-200, a timeout or a cancel, throws on an empty answer, and never reads `reasoning_content`. Every request opens with a fixed system message (`SYSTEM` in `chat.ts`: what is live, what is designed, never a price or a date for the AI token) and sets `max_tokens`; the message is never shown or counted in the 10. The widget keeps the conversation in component state (gone on reload), sends the last 10 messages, shows "Thinking…" in a polite status region, and on failure (a 30 s timeout is one, set in `chat.ts` through `request.ts`) says so with Retry and a hanzo.chat link; a 429 says to wait a minute. "Open in Hanzo Chat" (`https://hanzo.chat/?q=<last question>`) is always in the dialog. Tests: `src/lib/chat.test.ts`, `e2e/chat.spec.ts` (endpoint mocked with `page.route`).

`node scripts/check.mjs` is the gate CI runs over `dist/` (no tag in index.html, no hanzo.id, the ingest key resolves). It also asserts the export names `https://api.hanzo.ai/v1/chat/public`, which the widget does.

`hanzoai/node` is source-available (Hanzo Ecosystem License), not open source; the site never says open source about it.

James's hero choices (26 Nov): no pause button; the hero picture does not react to the mouse; the art is inverted in light mode (one place); the globe sits below the words, not behind them.

## Where each claim comes from

Checked on 26 Nov 2026 against Hanzo's repos and the public `hanzoai/papers` repo.

| Claim on the site | Source |
|---|---|
| About 95% matrix multiplication, the check A(Br) = Cr, 1/p with p = 2^61 - 1, at most 2^-122 for two vectors, a trace frontier of about 768 bytes | Proof of AI paper, https://papers.hanzo.ai/pdfs/hanzo-proof-of-ai.pdf |
| Validator-voted networks such as Bittensor (named once, in Compare) | `hanzo-consensus-ai/sections/09-related-work.tex` in `hanzoai/papers` |
| The market maker H(Psi,Theta) = Psi*Theta = kappa (a design; no contract) | `sections/hmm.tex` in `hanzoai/papers` |
| Mainnet's coin is AI | the explorer config (`NETWORK_CURRENCY_SYMBOL: "AI"`, 18 decimals). No source states a symbol for testnet or devnet, so the table shows none |
| Chain ids 36963, 36962, 36964 | `README.md` of `hanzoai/node` and each RPC's `eth_chainId` |
| `hanzo chain up <network>`, `status`, `down` | `hanzo chain --help` and `hanzo chain up --help` (the CLI) |
| hanzod is one Rust daemon per machine; the post-quantum handshake and ML-DSA validator identities | `hanzoai/node` (public): `daemon/src/main.rs` lines 4 to 10 ("the single unified Hanzo daemon per machine", "One Rust binary for": the Dev runtime, local inference, the opt-in blockchain validator) and `bot` and `team` subsystems built in `main.rs` (lines 189 and 190); `README.md` line 8 ("post-quantum handshake") and line 47 ("ML-DSA-65 identity") |
| The six pillars and their tags: Live for "Maximum utility per node" (the node operator guide and `hanzoai/node`), Designed for "Multi-intelligence consensus" (HIP-0901, a draft), In progress for agentic commerce (docs.hanzo.ai/docs/agents) and for research (HIP-1334, a draft partly built), Designed for the DAO work board (work.hanzo.network says no bounties are live) | each page named; checked 26 Nov 2026 |
| "Sovereign per-model chains" is Designed | No public page describes per-model chains. The source is the CTO's redesign handoff spec (`docs/redesign-handoff-spec.md`, branch `feat/network-v2` of hanzo-apps/network). HIP-0024 (https://hips.hanzo.ai/docs/hip-0024-hanzo-sovereign-l1-chain-architecture/) describes only the live chain as a sovereign L1 with its own validator set, so the pillar links the explorer for that half |
| Phase 0: a Go verifier for the matrix checks, 22 tests | `luxfi/crypto`, `poi/`, on the Hanzo forge (https://git.hanzo.ai/luxfi/crypto/src/branch/main/poi): 22 `func Test` counted from a shallow clone on 26 Nov 2026. No claim of a Rust or Solidity implementation |
| /ecosystem entries and tags | Each link loaded and read on 26 Nov 2026. hanzo.vote was opened in a browser: it shows a dashboard that says no address is on record for the Governor (so In progress). work.hanzo.network's board is up; the site's own earlier check found no Hanzo bounties (so Designed). Lux Network and Zoo Labs are tagged Live as sites only; nothing the Lux site says about its chains is repeated as fact. `github.com/luxdao/contracts` is a public repo whose README describes the Lux Governor Protocol, a Safe Zodiac module |
| Author royalty: prove control of a repository; a ledger; payouts settled by hand | HIP-1000, https://hips.hanzo.ai/docs/hip-1000-author-royalty. The public page gives no percentage, so the site gives none |

Left off the site on purpose:

- `hanzo fabric` is a deprecated alias of `hanzo chain`. The site prints `hanzo chain` only, and a test forbids "fabric".
- Hosted MCP tool counts differ by source (115, 127, 128), so the site prints no count.
- Named hardware tiers, an invite points programme and Phase 1 "early miners" have no source and stay off the site.
- The token sale (`hanzo-inc/token`) is legal-gated and must not be mentioned.

## Analytics version

`@hanzo/event` stays at 0.3.66. 0.3.73 (checked 26 Nov 2026) no longer calls Google consent mode (`gtag("consent", ...)`) or the Meta pixel's `consent` revoke and grant that 0.3.66 makes, so the bump changes consent behaviour; `Consent.tsx` and `Measure.tsx` stay byte-identical to upstream and are not changed for it. Revisit when Hanzo says where consent signalling moved.

## Serving chain

```
push to main (hanzo-apps/network, GitHub is home)
  -> .github/workflows/cicd.yml   hanzoai/ci build.yml@v2, reads hanzo.yml
       test:  one step: frozen install, typecheck, lint, unit, build, scripts/check.mjs, Playwright (not @network)
       site:  slug `network`, dir dist -> Sites plane (api.hanzo.ai/v1/projects)
  -> s3://hanzo-sites/hanzo/network   org hanzo (hanzo-apps maps to it) + slug
  -> hanzoai/ingress staticFiles      universe infra/aws/routes/sites.yaml,
                                      hanzo-network-static, spaMode (deep links
                                      reach index.html for the router)
```

No image and no pod. Cloudflare proxies hanzo.network to the AWS balancer. The
`@network` link check (all six routes) runs on demand (`pnpm links`), not in CI.

## Sign-in and measurement

- Sign-in is hanzo.ai's page: `LOGIN` in `src/lib/links.ts` (`https://hanzo.ai/login`).
  `Away` carries the visitor's anonymous id there (`useAnalytics().link`). Nothing links
  to hanzo.id; `check.mjs` and `e2e/privacy.spec.ts` fail a build that does.
- Measurement is @hanzo/event, mounted by `Measure` in `src/components/Measure.tsx`:
  the stream to api.hanzo.ai/v1/event (one pageview per route) and the tag
  manager, which loads GA4 and the Meta Pixel from project `network`'s tag set
  (`/v1/project/tags?key=pk-YJ2e…`) as cloud's rule allows (@hanzo/event 0.3.66:
  Global Privacy Control loads neither). Both name that project's key;
  before @hanzo/event 0.3.58 the tag request carried none and got no tags, and
  the stream was filed under hanzo.ai's project. No platform id lives
  in this repo; `scripts/check.mjs` fails a build whose index.html names one.
  The stream is first party and runs for every visitor; `Consent` (this site's
  Tailwind copy of @hanzo/ui/consent: bar, Manage preferences sheet, Accept all,
  × for essential only) words and draws what @hanzo/ui's says and draws, by the
  rule cloud serves (@hanzo/event `consentPolicy().mode`): eu the bar and opt-in
  sheet, us_privacy no bar and an opt-out sheet saved as each switch moves, global
  a notice whose × records it seen. "Your Privacy Choices" (California's icon) is
  in the footer (every page shares it); a page without one gets it fixed to the foot of the window. Theme tokens for every colour and state, 12px buttons in a
  16px card, 13px type.
- API calls go to api.hanzo.ai/v1 (models, event, tags); the block height comes from api.hanzo.network.
