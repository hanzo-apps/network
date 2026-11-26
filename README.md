# hanzo.network

The site for Hanzo Network: provable AI compute. Two pages, `/` and `/pricing`. Every other path hands off to hanzo.ai.

Live: https://hanzo.network. Proof of AI is designed, not live: see `docs/proof-of-ai.md`.

## Run

```bash
pnpm install
pnpm dev          # Vite dev server
pnpm build        # production build to dist/
pnpm typecheck && pnpm lint && pnpm test
pnpm exec playwright test --grep-invert @network   # e2e on the production build
pnpm exec playwright test --grep @network          # live-internet link check
```

Deploy: see `LLM.md` (serving chain, and what is not yet proved).

## Style

- **Tokens:** colour, radius, type scale and spacing come from `@hanzo/tokens`; Tailwind reads them in `src/styles/index.css`. Do not restate a value the package already has.
- **Font:** Zen and Zen Mono from `@hanzo/font`, imported in `src/main.tsx` so Vite ships the files.
- **Logo:** the block-H mark from `@hanzo/logo`.
- **Colour:** pure monochrome, no accent. Dark is true black; cards are glass (`.glass`, `src/components/ui/card.tsx`).
- **Type:** eyebrows and small tags are Zen Mono, uppercase, letter-spaced (`Eyebrow` in `src/components/home/Section.tsx`).
- **Motion:** `motion` (motion/react). Everything stills under `prefers-reduced-motion`; the hero loop has a pause button.
- **Accessibility:** WCAG 2.2 AA, checked with axe in `e2e/`.
