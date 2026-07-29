#!/usr/bin/env bash
# The Tailwind → design-system migration, end to end and repeatable.
#
# It runs against the ORIGINAL sources in git, so the codemod can be corrected
# and re-run without compounding earlier passes. The hand-authored layer (the
# stylesheets, the @hanzo/gui component set, the logo, the app root) is never
# restored — those files are the destination, not the input.
set -euo pipefail
cd "$(dirname "$0")/.."

HAND=(
  src/styles/system.css src/styles/site.css src/styles/index.css
  src/lib/utils.ts src/App.tsx src/components/navigation/Logo.tsx
  src/components/ui/{gui,button,label,separator,tabs,switch,slider,checkbox}.tsx
  src/components/ui/{progress,avatar,scroll-area,dialog,popover,tooltip}.tsx
  src/components/ui/{accordion,dropdown-menu,sheet,select,radio-group}.tsx
  src/components/ui/{toggle,toggle-group,toast,table,textarea}.tsx
)

# 1. the codemod's inputs, back to their pre-migration state
git diff --name-only HEAD -- src \
  | grep -vxF -f <(printf '%s\n' "${HAND[@]}") \
  | xargs -r git checkout HEAD -- || true

# 2. translate every Tailwind class into the design-system vocabulary
node scripts/detailwind.mjs

# 3. the dead shadcn layer: components nothing imports, and the `radix-*`
#    duplicates of components that already exist under their real name
git rm -rqf --ignore-unmatch src/components/shadcn-v4 src/pages/ShadcnV4Page.tsx
git rm -qf --ignore-unmatch src/components/ui/{alert-dialog,alert,aspect-ratio,breadcrumb}.tsx \
  src/components/ui/{calendar,chart,collapsible,command,context-menu,drawer,form}.tsx \
  src/components/ui/{hover-card,input-otp,menubar,navigation-menu,pagination}.tsx \
  src/components/ui/{resizable,sidebar,sonner,theme-customizer,theme-switcher}.tsx \
  src/components/ui/radix-{popover,button,dialog,slider,switch,tooltip}.tsx
rm -f src/styles/{base,themes,typography,utilities}.css src/App.css
git rm -q --cached --ignore-unmatch src/styles/{base,themes,typography,utilities}.css src/App.css

# 4. `radix-button` was only ever `button` under another name
grep -rl 'ui/radix-' src 2>/dev/null | xargs -r sed -i \
  -e 's|@/components/ui/radix-button|@/components/ui/button|g' \
  -e 's|@/components/ui/radix-dialog|@/components/ui/dialog|g' \
  -e 's|@/components/ui/radix-slider|@/components/ui/slider|g' \
  -e 's|@/components/ui/radix-switch|@/components/ui/switch|g' \
  -e 's|@/components/ui/radix-tooltip|@/components/ui/tooltip|g' \
  -e 's|@/components/ui/radix-popover|@/components/ui/popover|g'

# 5. the last few classes that live in string concatenations the codemod's
#    className walk does not reach
node scripts/sweep-residual.mjs

echo "migration complete"
