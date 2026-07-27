# hanzo.network

Marketing site for Hanzo Network, the decentralized AI compute marketplace (hanzo.network). Provides the public-facing site for distributed GPU compute, AI inference, and provider marketplace features.

## Stack

- React 18 + TypeScript (Vite 5, SWC)
- React Router v6 (client-side routing)
- Tailwind CSS v4 + Radix UI primitives
- Framer Motion (animations), Three.js (3D)

## Structure

```
src/
  App.tsx              # Root router -- NetworkLanding as homepage
  pages/
    NetworkLanding.tsx  # Homepage (/) -- GPU compute marketplace landing
    ...                 # Shared pages (same as other Hanzo sites)
  components/          # Shared component library
```

## Key Routes

- `/` -- NetworkLanding (decentralized compute: GPU marketplace, pricing, provider network)
- All other routes -- Shared product/marketing/account pages from common codebase

## Commands

```bash
pnpm install
pnpm dev            # Vite dev server
pnpm build          # Production build to dist/
pnpm preview
pnpm lint
```

## NetworkLanding Focus

The homepage highlights:
- Distributed GPU compute (training + inference)
- Cryptographic verification of workloads
- Decentralized P2P infrastructure (no single point of failure)
- Instant scaling (1 to 1000 GPUs)
- Global edge network (sub-100ms latency)
- Provider marketplace (contribute idle compute, set prices)
- Stats: 100K+ GPU hours, 50+ regions, 99.9% SLA, $0.10/GPU-hour

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
98-route `BrowserRouter`: without the fallback every deep link 404s instead of
reaching `index.html` for the router (and for the app's own `path="*"`
NotFound). `HANZO_STATIC_CSP` in the CR allows `fonts.googleapis.com` /
`fonts.gstatic.com` for the Inter stylesheet `index.html` links, and
`api.hanzo.ai` in `connect-src` for the pricing fetch and the chat widgets.

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

## Notes

- Shares the same component library and routes as hanzo.app, hanzo.id, hanzo.one, and sensei.group. Only `NetworkLanding.tsx` and `index.html` metadata are unique.
- Brand color is cyan (#06b6d4) in the dev console message, vs red for other Hanzo sites.
