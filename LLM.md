# hanzo.network

The site for Hanzo Network: the blockchain for global intelligence (hanzo.network). Five routes: `/`, `/build`, `/economics`, `/pricing`, `/early`.

## Stack

- React 18 + TypeScript, Vite 5 (SWC), React Router v6
- Tailwind CSS 4 reading `@hanzo/tokens`; Zen and Zen Mono from `@hanzo/font` (imported in `src/main.tsx`); the mark from `@hanzo/logo`
- `motion` for animation; pure monochrome, no accent colour

## Structure

```
src/
  App.tsx                    the five routes inside Shell (nav, footer, browser title); the chain's old paths; `*` hands off to hanzo.ai
  pages/NetworkLanding.tsx   `/`         hero + live telemetry, solutions, the six-part loop, how Proof of AI checks, gated phases, token, sources, closing
  pages/Build.tsx            `/build`     connect an agent, network details, a first call, what builders can earn
  pages/Economics.tsx        `/economics` the 2T cap, halving eras, fee burn, rules, an illustrative calculator
  pages/Pricing.tsx          `/pricing`   live model catalog from api.hanzo.ai/v1/models
  pages/Early.tsx            `/early`     the invite gate (components/early/Gate.tsx), the queue (Queue.tsx), where invites come from (see below)
  components/home/           home sections; Section.tsx holds container, Eyebrow, H2, Disc
  components/build/          /build sections; components/economics/ the chart and calculator
  components/ui/             button (buttonClass, textLink), card, tag, code (copyable block)
  components/Compare.tsx     the proof-versus-votes table, shared by home and /economics
  components/Shell.tsx       the frame every route shares; sets the browser title (one map)
  components/Measure.tsx     @hanzo/event: the first-party stream and the tag manager, one pageview per route
  components/Consent.tsx     the cookie bar and sheet, and "Your Privacy Choices" (the footer links to #choices)
  components/Away.tsx        /login and /signup: replaces the location with LOGIN (from links.ts) carrying the visitor's id
  components/GlobalChatWidget.tsx   the chat dialog
  lib/links.ts               every outbound URL, once (LOGIN, the chat lane and the models URL stay whole strings: scripts/check.mjs looks for them in the build)
  lib/solutions.ts           the five home solutions, once (also held to public/llms.txt by a test)
  lib/catalog.ts             the model catalog: loadModels() fetches once per page, countModels() is the one count
  lib/chain.ts               block height from the chain RPC (loading, live, down)
  lib/networks.ts            Mainnet, Testnet, Devnet: RPC and chain id
  lib/supply.ts              the whitepaper's supply formulas (eras, allowance, net change)
  lib/chat.ts                ask(): the public chat lane
  lib/invite.ts              verify() and join(): the whole contract of the invite and queue endpoints
docs/proof-of-ai.md          the Proof of AI spec: designed, not live
```

## Shared pieces

- `Tag` (`<Tag is="Designed" />`) is the only status marker. Its one prop is `Live`, `In progress` or `Designed`.
- `links.ts` is the only place a URL is written; pages import the constant. `src/lib/links.test.ts` fails on any other `https://` literal in `src/` (`Consent.tsx` and `Measure.tsx` keep their own: they must stay byte-identical to upstream hanzo-apps/network main so upstream changes merge cleanly, and the test asserts the allow-list is exactly those two plus `links.ts`).
- `solutions.ts` holds the five home solutions once; the cards draw them and a test holds `public/llms.txt` to the same titles, statuses and addresses.
- "Get an API key" goes through `useAnalytics().link()` in `Start.tsx`, so the visitor's id travels, as it does for `/login`.
- `Code` (`components/ui/code.tsx`) is the one copyable block; Pricing and /build both use it. `commands.ts` holds /build's commands, and `public/llms.txt` must contain every one (a unit test checks).
- `Compare` is the one proof-versus-votes table.
- `supply.ts` is the one place the supply formulas live; the calculator and chart call it.
- `networks.ts` is the one list of chains; /build and `llms.txt` agree with it (a unit test checks).
- `chat.ts` is the one place the chat endpoint is called.
- `catalog.ts`: Home's telemetry and Pricing both call `loadModels()` (one request) and `countModels()` (one number).
- The browser title of each route is one map in `Shell.tsx`.

## The honesty rule

Every status on the site is `Live`, `In progress` or `Designed`; no other word (not "Beta", "Soon", "Proposed"). Every figure is either read live (block height, model counts) or taken from the whitepaper and sourced. Live today: the Hanzo chain (block height) and the OpenAI-compatible API at api.hanzo.ai (pricing, chat). Designed, not live: Proof of AI rewards and the AI token (see the spec). A designed thing is never written as live. The calculator is labelled illustrative. No prices, returns, dates or invented numbers.

## `/build` proof

On 26 Nov 2026 `npx -y hanzo mcp` (npm `hanzo` 9.0.3) answered MCP `initialize` as server "hanzo-mcp" version 1.1.40 and `tools/list` with 19 tools. The locally installed hanzo 8.5 CLI has no stdio `mcp` command, so the page prints the `npx` form.

## `/early`

The invite gate. A code input is checked by `POST https://api.hanzo.ai/v1/network/invite/verify`; a queue form posts to `POST https://api.hanzo.ai/v1/network/waitlist`. Both are anonymous JSON (`credentials: 'omit'`, no Authorization), built by the backend in another repo. **This branch is merged only after both endpoints are live.** The page never answers for them: accepted shows only on `{"valid":true}`, "not valid" only on `{"valid":false}`, and anything else (a 500, a 200 without a boolean, a timeout) says the service did not answer.

The contract lives in `src/lib/invite.ts` and nowhere else; `src/lib/invite.test.ts` pins the URLs, headers, bodies and every outcome (429 is `limited`, anything unexpected is `unavailable`, 15 s timeout). The URLs are `INVITE_VERIFY` and `WAITLIST` in `links.ts`. A valid code is kept upper-cased in `sessionStorage` under `hn.invite` (so a reload shows the accepted state) and nowhere else, never in the URL; "Use a different code" clears it. Nothing is unlocked by a code yet; the page says so. The queue stores an email or a handle, a role and the source, and the page says exactly that beside a Privacy link. Each form has one polite live region outside any `aria-busy` element. The nav, hero and closing buttons read "Enter invite code" and go to `/early`; `public/llms.txt` names both endpoints. Tests: `e2e/early.spec.ts` mocks both endpoints with `page.route` and never reaches the real ones.

## Redirects

`/login` and `/signup` render `Away` (`Away.tsx`), which replaces the location with LOGIN (`https://hanzo.ai/login`) carrying the visitor's anonymous id. `/index`, `/home2` and `/original` (old copies of this site's home page) stay on this site and go to `/`. The chain's own paths stay with the chain: `/status` goes to status.hanzo.network, `/explorer` to explore.hanzo.network, and `/blockchain`, `/blockchain/*` and `/web3` go to this site's `/`. Every other path hands off to `https://hanzo.ai<path>` from the client (`ToHanzo` in `App.tsx`), rendered outside the page frame so nothing flashes. They are client-side because hanzoai/static serves the SPA fallback (`-spa`) for every path. A real server 301 belongs in the static server or the ingress config if Hanzo wants one.

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm typecheck && pnpm lint && pnpm test
pnpm exec playwright test --grep-invert @network   # e2e on the production build
pnpm exec playwright test --grep @network          # live-internet link check (on demand; covers all five routes)
```

Tests: vitest for `src/lib` and CSS variables (`test/`); Playwright (`e2e/`: home, sections, build, economics, early, pricing, chat, site, privacy) for axe (WCAG 2.2 AA), phone width, the font shipping, redirects, the live telemetry strip, the still hero, the page titles, no console errors, and privacy (`e2e/privacy.spec.ts`: Your Privacy Choices in the footer, the opt-in bar, no hanzo.id link, sign-in to hanzo.ai/login). The home specs mock the chain, so CI never depends on it.

The chat widget answers in place. `src/lib/chat.ts` `ask(messages, signal)` POSTs `{messages}` to `https://api.hanzo.ai/v1/chat/public` (keyless, `credentials: 'omit'`, no Authorization) and returns only `choices[0].message.content`; it throws on non-200 or an empty answer and never reads `reasoning_content`. Every request opens with a fixed system message (`SYSTEM` in `chat.ts`: what is live, what is designed, never a price or a date for the AI token) and sets `max_tokens`; the message is never shown or counted in the 10. The widget keeps the conversation in component state (gone on reload), sends the last 10 messages, shows "Thinking…" in a polite status region, times out at 30 s, and on failure says so with Retry and a hanzo.chat link; a 429 says to wait a minute. "Open in Hanzo Chat" (`https://hanzo.chat/?q=<last question>`) is always in the dialog. Tests: `src/lib/chat.test.ts`, `e2e/chat.spec.ts` (endpoint mocked with `page.route`).

`node scripts/check.mjs` is the gate CI runs over `dist/` (no tag in index.html, no hanzo.id, the ingest key resolves). It also asserts the export names `https://api.hanzo.ai/v1/chat/public`, which the widget does.

`hanzoai/node` is source-available (Hanzo Ecosystem License), not open source; the site never says open source about it.

James's hero choices (26 Nov): no pause button; the hero picture does not react to the mouse; the art is inverted in light mode (one place); the globe sits below the words, not behind them.

## Serving chain

```
push to main (hanzo-apps/network, GitHub is home)
  -> .github/workflows/cicd.yml   hanzoai/ci build.yml@v2, reads hanzo.yml
       test:  one step: install, typecheck, lint, unit, build, scripts/check.mjs, Playwright (not @network)
       site:  slug `network`, dir dist -> Sites plane (api.hanzo.ai/v1/projects)
  -> s3://hanzo-sites/hanzo/network   org hanzo (hanzo-apps maps to it) + slug
  -> hanzoai/ingress staticFiles      universe infra/aws/routes/sites.yaml,
                                      hanzo-network-static, spaMode (deep links
                                      reach index.html for the router)
```

No image and no pod. Cloudflare proxies hanzo.network to the AWS balancer. The
`@network` link check (all five routes) runs on demand (`pnpm exec playwright test --grep @network`), not in CI.

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
