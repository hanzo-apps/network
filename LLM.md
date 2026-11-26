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
  components/ui/          button and glass card
  lib/chain.ts            block height from api.hanzo.network/v1/chain/hanzo (loading, live, down)
docs/proof-of-ai.md       the Proof of AI spec: designed, not live
```

## Live versus designed

Live: the Hanzo chain (block height on the hero) and the OpenAI-compatible API at api.hanzo.ai (pricing). Designed, not live: Proof of AI rewards and the AI token (see the spec). The page must never state the second as the first.

## Redirects

Any other path goes to `https://hanzo.ai<path>` from the client (`ToHanzo` in `App.tsx`), rendered outside the page frame so nothing flashes. They are client-side because hanzoai/static serves the SPA fallback (`-spa`) for every path. A real server 301 belongs in the static server or the ingress config if Hanzo wants one.

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm typecheck && pnpm lint && pnpm test
pnpm exec playwright test --grep-invert @network   # e2e on the production build
pnpm exec playwright test --grep @network          # live-internet link check (own CI step)
```

Tests: vitest for `src/lib` and CSS variables (`test/`); Playwright for axe (WCAG 2.2 AA), phone width, the font shipping, redirects, the heartbeat and the still hero. The home specs mock the chain, so CI never depends on it.

The chat widget is a plain form hand-off: `<form action="https://hanzo.chat/" method="get" target="_blank">` with a `q` field. It calls no API and holds no state.

`hanzoai/node` is source-available (Hanzo Ecosystem License), not open source; the site never says open source about it.

James's hero choices (26 Nov): no pause button; the hero picture does not react to the mouse; the art is inverted in light mode (one place); the globe sits below the words, not behind them.

## Serving chain

```
push to main
  -> .github/workflows/sync.yml     carries refs to git.hanzo.ai (nothing else)
  -> .hanzo/workflows/deploy.yml    runs natively on the forge
       docker build .               Dockerfile: pnpm build
                                    -> FROM ghcr.io/hanzoai/static:v0.5.1
       docker push                  ghcr.io/hanzoai/hanzo-network:<short-sha>
  -> hanzoai/universe               infra/k8s/operator/crs/hanzo-network.yaml
       spec.image.tag: <short-sha>  set by a human, never by the build
  -> hanzoai/ingress                hanzo.network -> Service hanzo-network:80 -> :3000
```

`hanzoai/static` is a Go binary on scratch, run with `-spa` because this is a
`BrowserRouter`: without the fallback every deep link such as `/pricing` 404s
instead of reaching `index.html`. Fonts are self-hosted (copied by Vite), so
`HANZO_STATIC_CSP` needs no font host. It does need `connect-src` for
`api.hanzo.ai` (pricing fetch) and `api.hanzo.network` (block
height), and `media-src 'self'` for the hero loop. Not yet proved: that the CR's
CSP allows exactly these.

## Not live from here yet

Measured 26 Nov 2026: **the live host is not the Pages project.** `hanzo.network` serves
`index-COkSZ4qy.js` with `last-modified`, `x-frame-options`, `permissions-policy` and
`s-maxage=60`; `hanzo-network.pages.dev` serves `index-BLqO7tE9.js` without those headers.
The live bundle contains analytics (`@hanzo/event`), a consent bar and `/v1/chat/public`,
none of which is on GitHub `main`. What actually serves `hanzo.network` is unconfirmed;
Zach confirms it. Do not assume the Pages project, or any path in the chain above, is the live one.

Reconcile BEFORE anyone pins a tag in the CR: **the live bytes are not built from
`main`.** The served `index.html` links `/favicon.svg`, `/favicon.ico` and
`/logo.svg`; `main`'s still links `img/28d53ec4-….png`. Those exact
lines come from `origin/fix/broken-links` (`0efe650`, the real @hanzo/brand
blocky-H). Building an image from `main` as it stands would regress branding, so
land that branch first.

Promotion order: publish an image -> set `spec.image.tag` in
`crs/hanzo-network.yaml` -> add `- hanzo-network.yaml` to
`crs/kustomization.yaml` -> confirm the pod is Running and a deep link returns
200 -> only then repoint hanzo.network DNS from whatever serves it now (unconfirmed, see above). The CR is committed
INERT (empty tag, absent from `kustomization.yaml`); promoting an App with no
image tag takes the host down instead of leaving it alone.
