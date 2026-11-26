# hanzo.network

The site for Hanzo Network: provable AI compute (hanzo.network). Two pages.

## Stack

- React 18 + TypeScript, Vite 5 (SWC), React Router v6
- Tailwind CSS 4 reading `@hanzo/tokens`; Zen and Zen Mono from `@hanzo/font` (imported in `src/main.tsx`); the mark from `@hanzo/logo`
- `motion` for animation; pure monochrome, no accent colour

## Structure

```
src/
  App.tsx                 two routes inside Shell (nav, footer); `*` hands off to hanzo.ai
  pages/NetworkLanding.tsx   `/`  hero, how it works, doors, token, closing, then a quiet row of Hanzo stack links
  pages/Pricing.tsx          `/pricing`  live model catalog from api.hanzo.ai/v1/models
  components/home/        the home sections; Section.tsx holds container, Eyebrow, H2
  components/Measure.tsx  @hanzo/event: the first-party stream and the tag manager, one pageview per route
  components/Consent.tsx  the cookie bar and sheet, and "Your Privacy Choices" (the footer links to #choices)
  components/Try.tsx      LOGIN (https://hanzo.ai/login), useLogin, and Away for /login and /signup
  components/ui/          button and glass card
  lib/chain.ts            block height from api.hanzo.network/v1/chain/hanzo (loading, live, down)
docs/proof-of-ai.md       the Proof of AI spec: designed, not live
```

## Live versus designed

Live: the Hanzo chain (block height on the hero) and the OpenAI-compatible API at api.hanzo.ai (pricing). Designed, not live: Proof of AI rewards and the AI token (see the spec). The page must never state the second as the first.

## Redirects

`/login` and `/signup` render `Away` (`Try.tsx`), which replaces the location with `https://hanzo.ai/login` carrying the visitor's anonymous id. `/index`, `/home2` and `/original` (old copies of this site's home page) stay on this site and go to `/`. Every other path hands off to `https://hanzo.ai<path>` from the client (`ToHanzo` in `App.tsx`), rendered outside the page frame so nothing flashes. They are client-side because hanzoai/static serves the SPA fallback (`-spa`) for every path. A real server 301 belongs in the static server or the ingress config if Hanzo wants one.

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm typecheck && pnpm lint && pnpm test
pnpm exec playwright test --grep-invert @network   # e2e on the production build
pnpm exec playwright test --grep @network          # live-internet link check (own CI step)
```

Tests: vitest for `src/lib` and CSS variables (`test/`); Playwright for axe (WCAG 2.2 AA), phone width, the font shipping, redirects, the heartbeat, the still hero, and privacy (`e2e/privacy.spec.ts`: Your Privacy Choices in the footer, the opt-in bar, no hanzo.id link, sign-in to hanzo.ai/login). The home specs mock the chain, so CI never depends on it.

The chat widget is a plain form hand-off: `<form action="https://hanzo.chat/" method="get" target="_blank">` with a `q` field. It calls no API and holds no state.

`node scripts/check.mjs` is the gate CI runs over `dist/` (no tag in index.html, no hanzo.id, the ingest key resolves). It also asserts the export names `https://api.hanzo.ai/v1/chat/public`; the plain-form widget calls no API, so that one assertion fails until it is decided whether the widget asks the public chat lane or the assertion goes.

`hanzoai/node` is source-available (Hanzo Ecosystem License), not open source; the site never says open source about it.

James's hero choices (26 Nov): no pause button; the hero picture does not react to the mouse; the art is inverted in light mode (one place); the globe sits below the words, not behind them.

## Serving chain

```
push to main (hanzo-apps/network, GitHub is home)
  -> .github/workflows/cicd.yml   hanzoai/ci build.yml@v2, reads hanzo.yml
       test:  build + scripts/check.mjs, then typecheck, lint, unit, e2e (Playwright, not @network)
       site:  slug `network`, dir dist -> Sites plane (api.hanzo.ai/v1/projects)
  -> s3://hanzo-sites/hanzo/network   org hanzo (hanzo-apps maps to it) + slug
  -> hanzoai/ingress staticFiles      universe infra/aws/routes/sites.yaml,
                                      hanzo-network-static, spaMode (deep links
                                      reach index.html for the router)
```

No image and no pod. Cloudflare proxies hanzo.network to the AWS balancer. The
`@network` link check runs on demand (`pnpm exec playwright test --grep @network`), not in CI.

## Sign-in and measurement

- Sign-in is hanzo.ai's page: `LOGIN` in `src/components/Try.tsx` (`https://hanzo.ai/login`).
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
  in the footer (both pages share it); a page without one gets it fixed to the foot of the window. Theme tokens for every colour and state, 12px buttons in a
  16px card, 13px type.
- API calls go to api.hanzo.ai/v1 (models, event, tags); the block height comes from api.hanzo.network.
