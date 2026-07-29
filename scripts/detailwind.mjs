/* eslint-disable */
/**
 * One-shot migration: rewrite every Tailwind class in src/ into the Hanzo
 * design-system vocabulary declared in src/styles/system.css.
 *
 * It is a set-level translation, not a token-for-token one. A cluster that
 * means "card" (`border border-neutral-800 rounded-xl p-6 bg-neutral-900`)
 * comes out as `hz-card`; `grid grid-cols-1 md:grid-cols-3` comes out as
 * `hz-grid hz-grid-3`, because the responsive behaviour lives in the class.
 * That is the point of the move — 1,850 Tailwind tokens collapse to ~200
 * design-system roles, and the breakpoints stop being copy-pasted per element.
 *
 * Run: node scripts/detailwind.mjs [--dry]
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const DRY = process.argv.includes('--dry')
const unmapped = new Map()

/* ── spacing: Tailwind's 30 numbers → the 7-step ramp ──────────────────── */
const step = (n) => {
  const v = parseFloat(n)
  if (!isFinite(v)) return null
  if (v === 0) return 0
  if (v <= 1) return 1
  if (v <= 2.5) return 2
  if (v <= 3.5) return 3
  if (v <= 5) return 4
  if (v <= 7) return 5
  if (v <= 11) return 6
  return 7
}
const pstep = (n) => Math.min(step(n) ?? 0, 6) // padding ramp stops at 6
const sq = (n) => {
  const v = parseFloat(n)
  if (!isFinite(v)) return null
  if (v <= 3) return 1
  if (v <= 4) return 2
  if (v <= 5) return 3
  if (v <= 6) return 4
  if (v <= 9) return 5
  if (v <= 11) return 6
  if (v <= 14) return 7
  return 8
}
const TSIZE = {
  xs: 'hz-t-xs', sm: 'hz-t-sm', base: 'hz-t-base', lg: 'hz-t-lg', xl: 'hz-t-xl',
  '2xl': 'hz-t-2xl', '3xl': 'hz-t-3xl', '4xl': 'hz-t-4xl', '5xl': 'hz-t-5xl',
  '6xl': 'hz-t-6xl', '7xl': 'hz-t-7xl', '8xl': 'hz-t-7xl', '9xl': 'hz-t-7xl',
}
const TRANK = Object.keys(TSIZE)
const MAXW = {
  xs: 'hz-mw-xs', sm: 'hz-mw-xs', md: 'hz-mw-sm', lg: 'hz-mw-sm', xl: 'hz-mw-md',
  '2xl': 'hz-mw-md', '3xl': 'hz-mw-lg', '4xl': 'hz-mw-lg', '5xl': 'hz-mw-xl',
  '6xl': 'hz-mw-2xl', '7xl': 'hz-mw-3xl', full: 'hz-mw-full', none: null,
  prose: 'hz-mw-lg', screen: 'hz-mw-full',
}
const RADIUS = {
  none: 'hz-r-none', sm: 'hz-r-sm', '': 'hz-r-md', md: 'hz-r-md', lg: 'hz-r-lg',
  xl: 'hz-r-lg', '2xl': 'hz-r-xl', '3xl': 'hz-r-2xl', full: 'hz-r-full',
}

/* A foreground colour is a role, not a hue: the ladder is fg → soft → muted →
   faint. Every Tailwind palette lands on one of the four (this site is
   monochrome by design; @hanzo/design ships no accent). */
const fgRole = (c) => {
  if (/^(white|black)$/.test(c)) return c === 'white' ? 'hz-fg' : 'hz-fg-inverse'
  if (/\[var\(--white\)\]|\[var\(--foreground\)\]|foreground$|^primary$/.test(c)) return 'hz-fg'
  if (/\[var\(--black\)\]|^background$/.test(c)) return 'hz-fg-inverse'
  if (/transparent/.test(c)) return null
  const n = (c.match(/-(\d{2,3})(?:\/|$)/) || [])[1]
  if (n) {
    const v = +n
    if (v <= 200) return 'hz-fg'
    if (v <= 300) return 'hz-fg-soft'
    if (v <= 500) return 'hz-fg-muted'
    return 'hz-fg-faint'
  }
  if (/muted|secondary|tertiary/.test(c)) return 'hz-fg-muted'
  return 'hz-fg-soft'
}
const bgRole = (c) => {
  if (/transparent|none/.test(c)) return 'hz-bg-none'
  if (/^white(\/|$)|\[var\(--white\)\](?!\/)|^primary$|^foreground$/.test(c)) {
    return /\// .test(c) ? 'hz-bg-quiet' : 'hz-bg-inverse'
  }
  if (/^black$|\[var\(--black\)\]|^background$/.test(c)) return /\//.test(c) ? 'hz-bg-overlay' : 'hz-bg'
  const n = (c.match(/-(\d{2,3})(?:\/|$)/) || [])[1]
  if (n) {
    const v = +n
    if (v >= 900) return 'hz-bg-surface'
    if (v >= 700) return 'hz-bg-raised'
    if (v >= 400) return 'hz-bg-raised'
    return 'hz-bg-inverse'
  }
  if (/card|muted|secondary|accent|popover/.test(c)) return 'hz-bg-surface'
  return 'hz-bg-surface'
}

/* ── single-token rules ────────────────────────────────────────────────── */
const RULES = [
  // flow
  [/^flex$/, () => ['hz-row']],
  [/^inline-flex$/, () => ['hz-inline']],
  [/^flex-col$/, () => ['hz-col']],
  [/^flex-row$/, () => ['hz-row']],
  [/^flex-wrap$/, () => ['hz-wrap']],
  [/^flex-nowrap$/, () => ['hz-nowrap']],
  [/^flex-1$|^flex-auto$|^flex-grow$|^grow$/, () => ['hz-grow']],
  [/^flex-none$|^shrink-0$|^flex-shrink-0$/, () => ['hz-none']],
  [/^items-(start|center|end|stretch|baseline)$/, (m) => ['hz-ai-' + (m[1] === 'start' ? 'start' : m[1])]],
  [/^justify-(start|center|end|between|around|evenly)$/, (m) => ['hz-jc-' + (m[1] === 'evenly' ? 'around' : m[1])]],
  [/^self-(start|center|end)$/, (m) => ['hz-self-' + m[1]]],
  [/^order-first$|^order-1$/, () => ['hz-order-first']],
  [/^order-/, () => []],
  [/^flex-row-reverse$/, () => ['hz-row', 'hz-row-reverse']],
  [/^flex-col-reverse$/, () => ['hz-col', 'hz-col-reverse']],
  [/^object-(cover|contain|fill|none|scale-down)$/, (m) => ['hz-object-' + (m[1] === 'contain' ? 'contain' : 'cover')]],
  [/^object-/, () => []],
  [/^ml-auto$/, () => ['hz-ml-auto']],
  [/^mr-auto$/, () => ['hz-mr-auto']],
  [/^mt-auto$/, () => ['hz-mt-auto']],
  [/^mb-auto$/, () => ['hz-mb-auto']],
  [/^-z-\d+$/, () => ['hz-z-behind']],
  [/^basis-/, () => []],
  [/^placeholder-/, () => []],
  [/^prose-/, () => []],
  [/^tracking-\[/, () => ['hz-tracking-widest']],
  [/^opacity-\[/, () => ['hz-dim-more']],
  [/^(block|inline-block|inline|contents|flow-root)$/, () => []],
  [/^hidden$/, () => ['hz-hide']],
  [/^sr-only$/, () => ['hz-sr']],
  [/^col-span-2$/, () => ['hz-span-2']],
  [/^col-span-(full|3|4|5|6|12)$/, () => ['hz-span-full']],
  [/^(row-span|col-start|row-start|auto-|place-|content-|justify-items)/, () => []],
  // spacing
  [/^gap(-x|-y)?-(\d+(?:\.\d+)?)$/, (m) => ['hz-gap-' + step(m[2])]],
  [/^space-y-(\d+(?:\.\d+)?)$/, (m) => ['hz-stack-' + Math.min(step(m[1]), 6)]],
  [/^space-x-(\d+(?:\.\d+)?)$/, (m) => ['hz-inline-' + Math.min(step(m[1]), 4)]],
  [/^-?m-(\d+(?:\.\d+)?)$/, (m) => (m[1] === '0' ? ['hz-m-0'] : [])],
  [/^m-auto$/, () => ['hz-mx-auto', 'hz-my-auto']],
  [/^mx-auto$/, () => ['hz-mx-auto']],
  [/^my-auto$/, () => ['hz-my-auto']],
  [/^-?mt-(\d+(?:\.\d+)?)$/, (m) => ['hz-mt-' + step(m[1])]],
  [/^-?mb-(\d+(?:\.\d+)?)$/, (m) => ['hz-mb-' + step(m[1])]],
  [/^-?ml-(\d+(?:\.\d+)?)$/, (m) => ['hz-ml-' + Math.min(step(m[1]), 4)]],
  [/^-?mr-(\d+(?:\.\d+)?)$/, (m) => ['hz-mr-' + Math.min(step(m[1]), 4)]],
  [/^-?my-(\d+(?:\.\d+)?)$/, (m) => ['hz-mt-' + step(m[1]), 'hz-mb-' + step(m[1])]],
  [/^-?mx-(\d+(?:\.\d+)?)$/, () => []],
  [/^p-(\d+(?:\.\d+)?)$/, (m) => ['hz-p-' + pstep(m[1])]],
  [/^px-(\d+(?:\.\d+)?)$/, (m) => ['hz-px-' + pstep(m[1])]],
  [/^py-(\d+(?:\.\d+)?)$/, (m) => ['hz-py-' + step(m[1])]],
  [/^pt-(\d+(?:\.\d+)?)$/, (m) => (step(m[1]) >= 5 ? ['hz-pt-6'] : ['hz-pt-4'])],
  [/^pb-(\d+(?:\.\d+)?)$/, (m) => (step(m[1]) >= 5 ? ['hz-pb-6'] : ['hz-pb-4'])],
  [/^p[lr]-(\d+(?:\.\d+)?)$/, (m) => ['hz-px-' + pstep(m[1])]],
  // size
  [/^w-full$|^w-screen$/, () => ['hz-w-full']],
  [/^w-auto$/, () => ['hz-w-auto']],
  [/^w-fit$|^w-max$|^w-min$/, () => ['hz-w-fit']],
  [/^h-full$/, () => ['hz-h-full']],
  [/^h-screen$|^h-\[100dvh\]$/, () => ['hz-h-screen']],
  [/^min-h-screen$|^min-h-\[100dvh\]$/, () => ['hz-min-h-screen']],
  [/^size-(\d+(?:\.\d+)?)$/, (m) => ['hz-sq-' + sq(m[1])]],
  [/^w-(\d+(?:\.\d+)?)$/, (m) => ['hz-bw-' + sq(m[1])]],
  [/^h-(\d+(?:\.\d+)?)$/, (m) => ['hz-bh-' + sq(m[1])]],
  [/^h-\[var\(--header-height\)\]$/, () => ['hz-h-header']],
  [/^max-w-(\S+)$/, (m) => (MAXW[m[1]] !== undefined ? (MAXW[m[1]] ? [MAXW[m[1]]] : []) : ['hz-mw-full'])],
  [/^(min-w|max-h|min-h|w|h|size)-/, () => []],
  [/^aspect-/, () => []],
  // position
  [/^relative$/, () => ['hz-rel']],
  [/^absolute$/, () => ['hz-abs']],
  [/^fixed$/, () => ['hz-fixed']],
  [/^sticky$/, () => ['hz-sticky']],
  [/^static$/, () => ['hz-static']],
  [/^inset-0$/, () => ['hz-inset']],
  [/^top-0$/, () => ['hz-top-0']],
  [/^bottom-0$/, () => ['hz-bottom-0']],
  [/^left-0$/, () => ['hz-left-0']],
  [/^right-0$/, () => ['hz-right-0']],
  [/^-?(top|bottom|left|right|inset|start|end)-/, () => []],
  [/^z-(\d+)$/, (m) => (+m[1] >= 50 ? ['hz-z-overlay'] : +m[1] >= 30 ? ['hz-z-header'] : +m[1] >= 10 ? ['hz-z-raised'] : ['hz-z-base'])],
  [/^z-\[/, () => ['hz-z-overlay']],
  // type
  [/^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/, (m) => [TSIZE[m[1]]]],
  [/^text-\[(\d+)px\]$/, (m) => [+m[1] <= 12 ? 'hz-t-xs' : +m[1] <= 15 ? 'hz-t-sm' : 'hz-t-base']],
  [/^text-(left|center|right)$/, (m) => ['hz-align-' + m[1]]],
  [/^font-(normal|medium|semibold|bold|extrabold|black|light|thin)$/, (m) =>
    ['hz-w-' + ({ extrabold: 'bold', black: 'bold', light: 'normal', thin: 'normal' }[m[1]] || m[1])]],
  [/^font-mono$/, () => ['hz-mono']],
  [/^font-(sans|serif|display|heading)$/, (m) => (m[1] === 'display' || m[1] === 'heading' ? ['hz-display'] : [])],
  [/^italic$/, () => ['hz-italic']],
  [/^not-italic$/, () => []],
  [/^tracking-(tighter|tight)$/, () => ['hz-tracking-tight']],
  [/^tracking-(wide|wider)$/, () => ['hz-tracking-wide']],
  [/^tracking-widest$/, () => ['hz-tracking-widest']],
  [/^tracking-normal$/, () => []],
  [/^leading-(none|3|4)$/, () => ['hz-leading-none']],
  [/^leading-(tight|snug)$/, () => ['hz-leading-tight']],
  [/^leading-(relaxed|loose|7|8|9|10)$/, () => ['hz-leading-relaxed']],
  [/^leading-/, () => []],
  [/^uppercase$/, () => ['hz-upper']],
  [/^(lowercase|capitalize|normal-case)$/, (m) => (m[0] === 'normal-case' ? ['hz-nocase'] : [])],
  [/^underline$/, () => ['hz-underline']],
  [/^no-underline$/, () => ['hz-no-underline']],
  [/^whitespace-nowrap$/, () => ['hz-whitespace-nowrap']],
  [/^whitespace-/, () => []],
  [/^(break-words|break-all|break-normal)$/, () => ['hz-break']],
  [/^truncate$/, () => ['hz-truncate']],
  [/^line-clamp-2$/, () => ['hz-clamp-2']],
  [/^line-clamp-\d$/, () => ['hz-clamp-3']],
  [/^text-transparent$/, () => []],
  [/^text-(.+)$/, (m) => { const r = fgRole(m[1]); return r ? [r] : [] }],
  // surface
  [/^bg-clip-text$/, () => ['hz-chrome']],
  [/^bg-gradient|^bg-\[radial|^bg-\[linear|^from-|^via-|^to-/, () => []],
  [/^bg-(.+)$/, (m) => { const r = bgRole(m[1]); return r ? [r] : [] }],
  [/^border$/, () => ['hz-bordered']],
  [/^border-0$|^border-none$/, () => ['hz-border-none']],
  [/^border-[tblr]$/, (m) => ['hz-border-' + m[0].slice(-1)]],
  [/^border-(2|4|8)$/, () => ['hz-bordered', 'hz-border-strong']],
  [/^border-[xy]$/, () => ['hz-bordered']],
  [/^border-(solid|dashed|dotted)$/, () => []],
  [/^border-(.+)$/, (m) => {
    const n = (m[1].match(/-(\d{2,3})(?:\/|$)/) || [])[1]
    return n && +n <= 600 ? ['hz-border-strong'] : []
  }],
  [/^rounded$/, () => ['hz-r-md']],
  [/^rounded-(none|sm|md|lg|xl|2xl|3xl|full)$/, (m) => [RADIUS[m[1]]]],
  [/^rounded-[tblrse]{1,2}-/, () => []],
  [/^rounded-/, () => ['hz-r-md']],
  [/^shadow-(lg|xl|2xl)$/, () => ['hz-shadow-lg']],
  [/^shadow(-.*)?$/, () => ['hz-shadow']],
  [/^ring-\d$|^ring$/, () => ['hz-ring']],
  [/^ring-/, () => []],
  [/^divide-/, () => []],
  [/^outline/, () => []],
  // behaviour
  [/^overflow-hidden$|^overflow-clip$/, () => ['hz-clip']],
  [/^overflow-x-(auto|scroll)$/, () => ['hz-scroll-x']],
  [/^overflow-y-(auto|scroll)$/, () => ['hz-scroll-y']],
  [/^overflow-auto$|^overflow-scroll$/, () => ['hz-scroll-y']],
  [/^overflow-/, () => []],
  [/^cursor-pointer$/, () => ['hz-pointer']],
  [/^cursor-/, () => []],
  [/^pointer-events-none$/, () => ['hz-no-pointer']],
  [/^pointer-events-/, () => []],
  [/^transition/, () => ['hz-transition']],
  [/^(duration|ease|delay)-/, () => []],
  [/^opacity-(\d+)$/, (m) => (+m[1] === 0 ? ['hz-invisible'] : +m[1] <= 50 ? ['hz-dim-more'] : +m[1] < 100 ? ['hz-dim'] : [])],
  [/^blur-/, () => ['hz-blur-bg']],
  [/^backdrop-blur/, () => ['hz-glass']],
  [/^backdrop-/, () => []],
  [/^(animate|motion|will-change|transform|scale|rotate|translate|skew|origin|perspective|preserve|backface)/, () => []],
  [/^(select|resize|appearance|list|align|isolate|mix-blend|filter|grayscale|invert|saturate|sepia|brightness|contrast|drop-shadow|hue-rotate)/, () => []],
  [/^(snap|scroll|touch|caret|accent|fill|stroke|table|border-collapse|border-spacing|columns|float|clear)/, () => []],
  [/^(group|peer)$/, () => []],
  [/^(container|prose)$/, (m) => (m[0] === 'prose' ? ['hz-prose'] : ['hz-container'])],
  [/^(antialiased|subpixel-antialiased|tabular-nums|slashed-zero|ordinal|oldstyle-nums)$/, () => []],
  [/^\[/, () => []], // arbitrary property — the design system covers the role
]

/* Tokens the site owns — `glass-card`, `chrome-text`, `feature-card`, the
   `language-*` highlighter hooks. They are NOT Tailwind and must survive. */
const TW_NAMESPACE = /^-?(?:flex|grid|gap|space|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|w|h|min|max|size|text|font|leading|tracking|bg|from|via|to|border|rounded|shadow|ring|divide|outline|opacity|z|inset|top|bottom|left|right|order|col|row|basis|grow|shrink|object|overflow|cursor|pointer|transition|duration|ease|delay|animate|backdrop|blur|filter|scale|rotate|translate|skew|origin|transform|items|justify|self|place|content|aspect|line|whitespace|break|truncate|uppercase|lowercase|capitalize|italic|underline|prose|sr|snap|scroll|touch|select|resize|appearance|list|align|isolate|fill|stroke|table|columns|float|clear|placeholder|caret|accent|invisible|visible|hidden|block|inline|absolute|relative|fixed|sticky|static|container|group|peer|antialiased)(?:-|$)/

const mapToken = (t) => {
  for (const [re, fn] of RULES) {
    const m = t.match(re)
    if (m) return fn(m).filter(Boolean)
  }
  if (!TW_NAMESPACE.test(t) && !/[[\]/():]/.test(t)) return [t] // the site's own class
  unmapped.set(t, (unmapped.get(t) || 0) + 1)
  return []
}

/* ── the set-level translation ─────────────────────────────────────────── */
const VARIANT = /^(hover|focus|focus-visible|focus-within|active|disabled|visited|group-hover|group-focus|peer-|dark|light|first|last|odd|even|placeholder|selection|before|after|file|marker|aria-|data-|has-|not-|open|checked|motion-|print|supports-|\[)/
const BP = /^(xs|sm|md|lg|xl|2xl)$/

export function translate(value) {
  const raw = value.split(/\s+/).filter(Boolean)
  if (!raw.length) return ''
  const base = []
  const bp = [] // [breakpoint, token]
  const state = [] // hover/focus/group-hover tokens
  for (const t of raw) {
    const i = t.indexOf(':')
    if (i < 0) { base.push(t); continue }
    const head = t.slice(0, t.lastIndexOf(':'))
    const tail = t.slice(t.lastIndexOf(':') + 1)
    const first = head.split(':')[0]
    if (BP.test(first)) bp.push([first, tail])
    else if (VARIANT.test(head)) state.push([head, tail])
    else base.push(tail)
  }
  const has = (re) => base.some((t) => re.test(t))
  const take = (re) => { const out = base.filter((t) => re.test(t)); for (const t of out) base.splice(base.indexOf(t), 1); return out }
  const out = []
  const bpTok = (re) => bp.filter(([, t]) => re.test(t)).map(([, t]) => t)
  const dropBp = (re) => { for (let i = bp.length - 1; i >= 0; i--) if (re.test(bp[i][1])) bp.splice(i, 1) }

  // hidden + md:block  →  desktop-only ;  md:hidden  →  mobile-only
  if (has(/^hidden$/) && bpTok(/^(block|flex|grid|inline|inline-flex|inline-block)$/).length) {
    // the breakpoint's display is the element's real display — keep it, and let
    // `hz-desktop-only` do nothing but hide below the breakpoint.
    const disp = bpTok(/^(block|flex|grid|inline|inline-flex|inline-block)$/)[0]
    take(/^hidden$/); dropBp(/^(block|flex|grid|inline|inline-flex|inline-block)$/)
    out.push('hz-desktop-only', ...mapToken(disp))
  } else if (bpTok(/^hidden$/).length && !has(/^hidden$/)) {
    dropBp(/^hidden$/); out.push('hz-mobile-only')
  }

  // `flex flex-col` is one role, not two: the bare `flex` is subsumed.
  if (has(/^flex-(col|row)$/)) take(/^flex$/)

  // `absolute left-1/2 -translate-x-1/2` is one intent: centre me on that axis.
  const cx = has(/^left-1\/2$/) && has(/^-translate-x-1\/2$/)
  const cy = has(/^top-1\/2$/) && has(/^-translate-y-1\/2$/)
  if (cx || cy) {
    take(/^(left-1\/2|top-1\/2|-translate-[xy]-1\/2)$/)
    out.push(cx && cy ? 'hz-center-xy' : cx ? 'hz-center-x' : 'hz-center-y')
  }

  // `w-4 h-4` is a square box (an icon); `h-16` on its own is a height.
  for (const t of [...base]) {
    const m = t.match(/^w-(\d+(?:\.\d+)?)$/)
    if (m && base.includes('h-' + m[1])) {
      take(new RegExp('^[wh]-' + m[1].replace('.', '\\.') + '$'))
      out.push('hz-sq-' + sq(m[1]))
    }
  }

  // grid + grid-cols-N (+ responsive) → one role
  if (has(/^grid$/) || bpTok(/^grid-cols-/).length) {
    const cols = [...take(/^grid-cols-\d+$/), ...bpTok(/^grid-cols-\d+$/)]
      .map((t) => +t.split('-').pop()).filter((n) => n > 0)
    dropBp(/^grid-cols-/)
    take(/^grid$/); take(/^grid-cols-/); take(/^grid-rows-/)
    const n = cols.length ? Math.max(...cols) : 1
    out.push('hz-grid')
    if (n >= 2) out.push('hz-grid-' + Math.min(n, 6))
  }

  // flex-col + md:flex-row  → stacks on a phone, row on a tablet
  if (has(/^flex-col$/) && bpTok(/^flex-row$/).length) {
    take(/^flex-col$/); take(/^flex$/); dropBp(/^flex-row$/); out.push('hz-col-row')
  }

  // mx-auto + max-w-* + px-* → the one container
  if (has(/^mx-auto$/) && has(/^max-w-/)) {
    const mw = take(/^max-w-/)[0] || ''
    const k = mw.replace('max-w-', '')
    take(/^mx-auto$/); take(/^px-\d/); dropBp(/^px-\d/)
    out.push(/^(7xl|full|screen)$/.test(k) || /^\[/.test(k) ? 'hz-container' : /^(5xl|6xl)$/.test(k) ? 'hz-container-wide' : 'hz-container-narrow')
    if (/^(xs|sm|md|lg|xl|2xl)$/.test(k)) out.push(MAXW[k])
  }

  // border + rounded + all-round padding + surface → the card.
  // Uniform `p-N` only: `px-3 py-1.5` is a control's padding, and treating it
  // as a card is what turned the header's search button into a 32px-padded
  // panel floating over the nav.
  const cardPad = base.find((t) => /^p-\d/.test(t))
  if (has(/^border$/) && has(/^rounded/) && cardPad && step(cardPad.slice(2)) >= 3 && has(/^bg-/)) {
    take(/^p-\d/)
    take(/^border$/); take(/^rounded/); take(/^bg-/); take(/^border-/)
    out.push('hz-card')
    if (pstep(cardPad.slice(2)) <= 3) out.push('hz-card-tight')
  }

  // a control: inline-flex + rounded + padding → the button
  // A control has real vertical padding or a height. `py-0.5` is a `<kbd>`
  // chip, not a button, and must not inherit the 44px control box.
  const vpad = base.find((t) => /^py-\d/.test(t))
  const btnish = has(/^(inline-flex|flex)$/) && has(/^items-center$/) && has(/^rounded/) && has(/^px-\d/) &&
    ((vpad && step(vpad.slice(3)) >= 2) || has(/^h-\d+$/))
  if (btnish) {
    const bg = base.find((t) => /^bg-/.test(t)) || ''
    const big = has(/^(px-8|px-10|px-12|py-4|py-5|py-6|h-12|h-14|text-lg)$/)
    take(/^(inline-flex|flex)$/); take(/^items-center$/); take(/^justify-center$/)
    take(/^rounded/); take(/^px-\d/); take(/^py-\d/); take(/^h-\d+$/); take(/^border$/); take(/^border-/)
    take(/^bg-/); take(/^font-(medium|semibold|bold)$/); take(/^text-(sm|base|lg)$/); take(/^whitespace-nowrap$/)
    out.push('hz-btn')
    if (/^bg-(white|primary|foreground|\[var\(--white\)\])/.test(bg)) out.push('hz-btn-primary')
    else if (!bg || /transparent/.test(bg)) out.push('hz-btn-ghost')
    if (big) out.push('hz-btn-lg')
    if (has(/^w-full$/)) { take(/^w-full$/); out.push('hz-btn-block') }
  }

  for (const t of base) out.push(...mapToken(t))

  // A hover on colour/background is the design system's own interaction, not a
  // per-element declaration: it becomes the interactive variant of the role.
  const hoverCol = state.some(([h, t]) => /^(hover|group-hover)$/.test(h) && /^(bg-|border-|text-)/.test(t))
  if (hoverCol) {
    if (out.includes('hz-card')) out.push('hz-card-interactive')
    else if (!out.some((c) => c.startsWith('hz-btn'))) out.push(out.includes('hz-fg-muted') || out.includes('hz-fg-faint') ? 'hz-link' : 'hz-hoverable')
  }
  // Anything the design system does not model responsively keeps its base rule;
  // the breakpoint copies are dropped on purpose (the classes clamp instead).
  for (const [, t] of bp) if (!base.includes(t)) mapToken(t)

  const seen = new Set()
  const final = []
  for (const c of out) if (c && !seen.has(c)) { seen.add(c); final.push(c) }
  // a role that also carries its own text colour does not need a second one
  if (final.includes('hz-bg-inverse')) {
    const i = final.findIndex((c) => c === 'hz-fg' || c === 'hz-fg-soft')
    if (i >= 0) final.splice(i, 1)
  }
  return final.join(' ')
}

/* ── rewriting the source ──────────────────────────────────────────────── */

const TW = /(^|\s)(?:-?(?:[a-z][a-z0-9]*:)*)(?:flex|grid|hidden|block|absolute|relative|fixed|sticky|inline-flex|container|truncate|uppercase|italic|underline|border|rounded(?:-|$)|shadow(?:-|$)|ring(?:-|$)|(?:text|bg|from|via|to|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|w|h|min-w|max-w|min-h|max-h|gap|space-[xy]|items|justify|self|order|col|row|z|opacity|leading|tracking|font|whitespace|overflow|cursor|transition|duration|ease|delay|animate|backdrop|blur|scale|rotate|translate|inset|top|bottom|left|right|size|aspect|line-clamp|divide|outline|sr|place|content|flex|grow|shrink|basis|object|fill|stroke|snap|touch|select|resize|appearance|list|align|isolate|antialiased|prose|group|peer)-)/

const looksLikeClasses = (s) => {
  if (!s || s.length > 4000) return false
  const parts = s.split(/\s+/).filter(Boolean)
  if (!parts.length) return false
  if (s.includes('${')) return false
  // Parentheses are legal inside an arbitrary value (`bg-[var(--black)]`,
  // `max-w-[calc(100vw-48px)]`); rejecting them skipped every class list that
  // reached for a CSS variable, which was most of this site's colours.
  if (/[<>{};=]/.test(s)) return false
  return parts.some((p) => TW.test(' ' + p))
}

// Replace every string literal inside `text` (a className expression). Template
// literals are translated chunk by chunk: the static spans between `${…}` are
// class lists in their own right, and skipping them was how the first pass left
// Tailwind behind in every conditional className.
const rewriteLiterals = (text) =>
  text
    .replace(/`((?:\\.|[^\\`])*)`/g, (all, body) => {
      if (!body.includes('${')) return looksLikeClasses(body) ? '`' + translate(body) + '`' : all
      let out = ''
      let i = 0
      while (i < body.length) {
        const start = body.indexOf('${', i)
        if (start < 0) { out += chunk(body.slice(i)); break }
        out += chunk(body.slice(i, start))
        let d = 0
        let j = start + 1
        for (; j < body.length; j++) {
          if (body[j] === '{') d++
          else if (body[j] === '}') { d--; if (!d) break }
        }
        out += body.slice(start, j + 1)
        i = j + 1
      }
      return '`' + out + '`'
    })
    .replace(/(["'])((?:\\.|(?!\1)[^\\])*)\1/g, (all, q, body, at, whole) => {
      if (!looksLikeClasses(body)) return all
      // A literal sitting against a comparison is a VALUE being tested, not a
      // class list: `viewMode === 'grid' ? … : …` inside a className must
      // survive intact, or the condition silently stops matching.
      const before = whole.slice(Math.max(0, at - 4), at)
      const after = whole.slice(at + all.length, at + all.length + 4)
      if (/[=!]=+\s*$/.test(before) || /^\s*[=!]=+/.test(after)) return all
      return q + translate(body) + q
    })

// One static span of a template literal. Leading/trailing space is load-bearing
// (it separates this span's classes from the interpolated ones), so keep it.
const chunk = (s) => {
  if (!s.trim()) return s
  const lead = s.match(/^\s*/)[0]
  const tail = s.match(/\s*$/)[0]
  const body = s.slice(lead.length, s.length - tail.length)
  if (!looksLikeClasses(body)) return s
  return lead + translate(body) + tail
}

const matchBrace = (s, i) => {
  let d = 0
  for (let j = i; j < s.length; j++) {
    const c = s[j]
    if (c === '{') d++
    else if (c === '}') { d--; if (!d) return j }
    else if (c === '"' || c === "'" || c === '`') {
      const q = c
      j++
      while (j < s.length && s[j] !== q) { if (s[j] === '\\') j++; j++ }
    }
  }
  return -1
}

function rewriteFile(src) {
  let out = ''
  let i = 0
  const attr = /\bclassName\s*=\s*/g
  let m
  while ((m = attr.exec(src))) {
    if (m.index < i) continue
    out += src.slice(i, m.index + m[0].length)
    let j = m.index + m[0].length
    const c = src[j]
    const close = c === '{' ? matchBrace(src, j) : (c === '"' || c === "'") ? src.indexOf(c, j + 1) : -1
    if (close < 0) { i = j; attr.lastIndex = j + 1; continue }
    if (c === '"' || c === "'") {
      const end = close
      out += c + translate(src.slice(j + 1, end)) + c
      i = end + 1
      attr.lastIndex = i
    } else if (c === '{') {
      const end = close
      out += rewriteLiterals(src.slice(j, end + 1))
      i = end + 1
      attr.lastIndex = i
    } else {
      // not a literal we can read — leave the expression alone and move on
      i = j
      attr.lastIndex = j + 1
      continue
    }
  }
  out += src.slice(i)

  // class strings that live outside a className attribute: `cn(...)`, `cva(...)`,
  // and object fields literally named class / className / classes.
  out = out.replace(/\b(cn|cva|clsx|twMerge)\(([\s\S]*?)\)/g, (all, fn, args) =>
    args.includes('(') ? all : fn + '(' + rewriteLiterals(args) + ')')
  out = out.replace(/(\b(?:className|class|classes|classNames)\s*:\s*)(["'])((?:\\.|(?!\2)[^\\])*)\2/g,
    (all, head, q, body) => (looksLikeClasses(body) ? head + q + translate(body) + q : all))
  return out
}

const walk = (dir, acc = []) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f)
    const st = statSync(p)
    if (st.isDirectory()) walk(p, acc)
    else if (/\.(tsx|ts|jsx|js)$/.test(f)) acc.push(p)
  }
  return acc
}

if (process.argv[1] && process.argv[1].endsWith('detailwind.mjs')) {
  const files = walk('src')
  let changed = 0
  for (const f of files) {
    const src = readFileSync(f, 'utf8')
    if (!src.includes('className') && !/\b(cn|cva)\(/.test(src)) continue
    const next = rewriteFile(src)
    if (next !== src) { changed++; if (!DRY) writeFileSync(f, next) }
  }
  console.log(`files changed: ${changed}/${files.length}`)
  const top = [...unmapped.entries()].sort((a, b) => b[1] - a[1])
  console.log(`unmapped distinct tokens: ${top.length}, occurrences: ${top.reduce((a, b) => a + b[1], 0)}`)
  console.log(top.slice(0, 40).map(([k, v]) => `${k}:${v}`).join('  '))
}
