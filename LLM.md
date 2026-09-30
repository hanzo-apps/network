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
node scripts/check.mjs  # the gate CI runs over dist/
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
push to main (hanzo-apps/network, GitHub is home)
  -> .github/workflows/cicd.yml   hanzoai/ci build.yml@v2, reads hanzo.yml
       test:  pnpm build + scripts/check.mjs over dist/
       site:  slug `network`, dir dist -> Sites plane (api.hanzo.ai/v1/projects)
  -> s3://hanzo-sites/hanzo/network   org hanzo (hanzo-apps maps to it) + slug
  -> hanzoai/ingress staticFiles      universe infra/aws/routes/sites.yaml,
                                      hanzo-network-static, spaMode (deep links
                                      reach index.html for the router)
```

No image and no pod. Cloudflare proxies hanzo.network to the AWS balancer.

## Sign-in, CTAs, measurement

- Sign-in is hanzo.ai's page: `LOGIN` in `src/components/Try.tsx`
  (`https://hanzo.ai/login`, which goes on to pay). `/login`, `/signup`,
  `/account/*`, `/dashboard`, `/user-profile` and `/organization-profile`
  render `Away`, which replaces the location with it. Nothing links to hanzo.id.
- Every call to action is `<Try>`: it reads "Try Hanzo" and carries the
  visitor's anonymous id to hanzo.ai (@hanzo/event `link`) while Analytics is
  allowed.
- Measurement is @hanzo/event, mounted by `Measure` in `src/components/Measure.tsx`:
  the stream to api.hanzo.ai/v1/event (one pageview per route) and the tag
  manager, which loads GA4 and the Meta Pixel from the host's tag set
  (`/v1/project/tags?host=hanzo.network`) after consent. No platform id lives
  in this repo; `scripts/check.mjs` fails a build whose index.html names one.
  `Consent` asks visitors in opt-in regions.
- API calls go to api.hanzo.ai/v1 only.

## Notes

- Shares the same component library and routes as hanzo.app, hanzo.id, hanzo.one, and sensei.group. Only `NetworkLanding.tsx` and `index.html` metadata are unique.
- Brand color is cyan (#06b6d4) in the dev console message, vs red for other Hanzo sites.
