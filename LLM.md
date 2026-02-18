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

## Notes

- Shares the same component library and routes as hanzo.app, hanzo.id, hanzo.one, and sensei.group. Only `NetworkLanding.tsx` and `index.html` metadata are unique.
- No Cloudflare Pages middleware (unlike hanzo.id). Standard static SPA deployment.
- Brand color is cyan (#06b6d4) in the dev console message, vs red for other Hanzo sites.
