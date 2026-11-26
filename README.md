# hanzo.network

The site for Hanzo Network: the blockchain for global intelligence. Five routes:

| Route | What it is |
|---|---|
| `/` | Hero with live chain and model counts, five solutions, the six-part loop, how Proof of AI checks work, gated phases, the token, sources |
| `/build` | Connect an agent, network details, a first call, what builders earn today |
| `/economics` | The 2T cap, halving eras, fee burn, and an illustrative calculator |
| `/pricing` | Live per-token model prices from api.hanzo.ai |
| `/early` | The invite gate: a code checked by `api.hanzo.ai/v1/network/invite/verify`, and a queue form (`/v1/network/waitlist`) |

Every other path hands off to hanzo.ai (except `/status` and `/explorer`, which redirect to status.hanzo.network and explore.hanzo.network, and `/blockchain` and `/web3`, which go to this site's home).

Live: https://hanzo.network. Every status on the site is Live, In progress or Designed. Proof of AI is designed, not live: see `docs/proof-of-ai.md`. `LLM.md` has the structure, the shared pieces and the honesty rule.

## Run

```bash
pnpm install
pnpm dev          # Vite dev server
pnpm build        # production build to dist/
pnpm typecheck && pnpm lint && pnpm test
pnpm exec playwright test --grep-invert @network   # e2e on the production build
pnpm exec playwright test --grep @network          # live-internet link check, all five routes
```

## Publish

Merging to `main` publishes: GitHub runs the checks, then the Sites plane serves `dist/` at hanzo.network. See `LLM.md` for the serving chain, and what is not yet proved.

## Style

- **Tokens:** colour, radius, type scale and spacing come from `@hanzo/tokens`; Tailwind reads them in `src/styles/index.css`. Do not restate a value the package already has.
- **Font:** Zen and Zen Mono from `@hanzo/font`, imported in `src/main.tsx` so Vite ships the files.
- **Logo:** the block-H mark from `@hanzo/logo`.
- **Colour:** pure monochrome, no accent. Dark is true black; cards are glass (`.glass`, `src/components/ui/card.tsx`).
- **Type:** eyebrows and small tags are Zen Mono, uppercase, letter-spaced (`Eyebrow` in `src/components/home/Section.tsx`).
- **Motion:** `motion` (motion/react). Everything stills under `prefers-reduced-motion`; the hero art is still and never follows the pointer.
- **Accessibility:** WCAG 2.2 AA, checked with axe in `e2e/`.
