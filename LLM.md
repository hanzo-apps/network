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
  pages/NetworkLanding.tsx   `/`  hero, how it works, doors, token, stack, closing
  pages/Pricing.tsx          `/pricing`  live model catalog from api.hanzo.ai/v1/models
  components/home/        the home sections; Section.tsx holds container, Eyebrow, H2
  components/ui/          button and glass card
  lib/chain.ts            block height from api.hanzo.network/v1/chain/hanzo (loading, live, down)
docs/proof-of-ai.md       the Proof of AI spec: designed, not live
```

## Live versus designed

Live: the Hanzo chain (block height on the hero) and the OpenAI-compatible API at api.hanzo.ai (pricing, chat widget). Designed, not live: Proof of AI rewards and the AI token (see the spec). The page must never state the second as the first.

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

Tests: vitest for `src/lib` and CSS variables (`test/`); Playwright for axe (WCAG 2.2 AA), phone width, the font shipping, redirects, the heartbeat and the pause control. The home specs mock the chain, so CI never depends on it.

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
`api.hanzo.ai` (pricing fetch, chat widget) and `api.hanzo.network` (block
height), and `media-src 'self'` for the hero loop. Not yet proved: that the CR's
CSP allows exactly these.

## Not live from here yet

hanzo.network is served today by the Cloudflare Pages project `hanzo-network`
(`hanzo-network.pages.dev` is byte-identical to the live host), built through CF's
Git integration — outside every workflow file in this repo. That is the deploy
path this migration retires.

Reconcile BEFORE anyone pins a tag in the CR: **the live bytes are not built from
`main`.** The served `index.html` links `/favicon.svg`, `/favicon.ico` and
`/logo.svg`; `main`'s still links `img/28d53ec4-….png`. Those exact
lines come from `origin/fix/broken-links` (`0efe650`, the real @hanzo/brand
blocky-H). Building an image from `main` as it stands would regress branding, so
land that branch first. CF Pages is not rebuilding `main` on push — `main` has
been pushed repeatedly since 2026-06-23 and the live bytes never changed — which
is also why pushing this migration cannot disturb the live site.

Promotion order: publish an image -> set `spec.image.tag` in
`crs/hanzo-network.yaml` -> add `- hanzo-network.yaml` to
`crs/kustomization.yaml` -> confirm the pod is Running and a deep link returns
200 -> only then repoint hanzo.network DNS off CF Pages. The CR is committed
INERT (empty tag, absent from `kustomization.yaml`); promoting an App with no
image tag takes the host down instead of leaving it alone.
