# hanzo.network

Marketing site for Hanzo Network, the decentralized AI compute marketplace (hanzo.network). Provides the public-facing site for distributed GPU compute, AI inference, and provider marketplace features.

## Stack

- React 19 + TypeScript (Vite 5, SWC)
- React Router v6 (client-side routing)
- **@hanzo/design** tokens + **@hanzo/ui** on the **@hanzo/gui** backend
- **@hanzo/logo** for the mark, **@hanzo/brand** for brand data
- Framer Motion (animations), Three.js (3D)

No Tailwind, no shadcn, no Radix: zero config, zero directives, zero utility
class names, zero `@radix-ui/*` dependencies.

### How styling works

`src/styles/index.css` imports exactly three things, in order:

1. `@hanzo/design/styles.css` — the tokens (colour, type, spacing, radius,
   elevation, motion, the z-ladder, element defaults, self-hosted Geist). The
   same file hanzo.ai, console, chat and app import. Dark is `:root`; `.light`
   is the light counterpart.
2. `src/styles/system.css` — this site's design-system class vocabulary
   (`hz-*`), written entirely in those tokens. Roles, not utilities: `hz-card`,
   `hz-btn`, `hz-container`, `hz-grid-3`, `hz-lede`. Mobile-first — the base
   rule is the phone and the class itself scales up, so no call site spells out
   a breakpoint. The 44px minimum tap target is declared here, once.
3. `src/styles/site.css` — the handful of named treatments this surface owns
   (ambient field, chrome wordmark, mega-menu transition, feature rail).

Nothing else. No per-page stylesheet, no utility framework, no inline colour —
`src/lib/brand.ts` is the one place a colour appears as a JS string, and every
value there is a design token.

### Components

`src/components/ui/*` is the component layer. Interactive parts (dialog, sheet,
select, popover, tooltip, dropdown, tabs, accordion, switch, slider, checkbox,
radio, progress, avatar, toggle-group) are built on **@hanzo/gui** primitives
and render inside `<Gui>` (`src/components/ui/gui.tsx`), which configures the
backend from `@hanzo/ui/gui-config` — @hanzo/ui's own gui configuration, so this
site's type ramp, radii and spacing are the ecosystem's, not a local copy.
Presentational parts (button, card, badge, input, label, textarea, table,
skeleton, separator) need no runtime and take their look from the same tokens.

They keep the part names the pages already used (`DialogHeader`,
`TabsTrigger`, …), so adopting the backend did not mean touching 268 call
sites.

`@hanzo/ui`'s DEFAULT entry still resolves to its shadcn/Radix backend at
8.0.26; this site imports only `@hanzo/ui/gui-config`, which pulls no Radix.
When the gui-backed `@hanzo/ui` publishes, `src/components/ui/gui.tsx` is the
one file that changes.

### The migration

`scripts/migrate.sh` runs it end to end, against the ORIGINAL sources in git, so
the codemod can be corrected and re-run without compounding earlier passes:

- `scripts/detailwind.mjs` — the Tailwind → design-system translation. It works
  on whole class SETS, not token by token: `border rounded-xl p-6 bg-neutral-900`
  becomes `hz-card`; `grid grid-cols-1 md:grid-cols-3` becomes
  `hz-grid hz-grid-3`, because the responsive behaviour lives in the class.
  1,850 Tailwind tokens over 52,000 occurrences collapsed to ~200 roles.
- `scripts/sweep-residual.mjs` — the few class names that live in strings the
  className walk cannot see.
- `scripts/debrandcolor.mjs` — 123 inline `style={{ … BRAND_COLOR … }}` props
  onto classes, and 27 copies of `const BRAND_COLOR = "#ffffff"` onto one
  token-backed `src/lib/brand.ts`.

`scripts/shots.mjs` is the check: it drives Playwright over 21 routes at 390px
and 1280px and reports horizontal overflow, sub-44px tap targets, empty pages
and page errors. Run it against a served `dist/`.

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
