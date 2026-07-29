/* eslint-disable */
/**
 * The tail of the migration: class names that sit in a string the codemod's
 * `className=` walk cannot see — a ternary's branch assembled elsewhere, a
 * `cn()` argument built from a variable. Small and explicit on purpose; if this
 * list grows, the rule belongs in detailwind.mjs instead.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const MAP = {
  'text-neutral-400': 'hz-fg-muted',
  'text-neutral-300': 'hz-fg-soft',
  'text-[var(--white)]/80': 'hz-fg-soft',
  'text-[var(--white)]': 'hz-fg',
  'border-b-2': 'hz-border-b',
  'border-neutral-500': 'hz-border-strong',
  'border-gray-700': 'hz-border-strong',
  'border-gray-800': '',
  'bg-neutral-600': 'hz-bg-raised',
  'bg-neutral-800/50': 'hz-bg-raised',
  'bg-gray-800': 'hz-bg-raised',
  'bg-[var(--white)]/5': 'hz-bg-quiet',
  'font-medium': 'hz-w-medium',
  'align-middle': '',
  'bottom-6': 'hz-bottom-0',
  'right-6': 'hz-right-0',
  'pointer-events-none': 'hz-no-pointer',
}

const pat = new RegExp(
  // The trailing `/` matters: `border-gray-800/30` is ONE token, and replacing
  // its prefix would leave a stray `/30` in the class list.
  '(?<![\\w-])(' + Object.keys(MAP).sort((a, b) => b.length - a.length)
    .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')(?![\\w/-])',
  'g',
)
const attr = /(?<=className=)(?:"[^"]*"|'[^']*'|\{(?:[^{}]|\{[^{}]*\})*\})/g

const walk = (dir, acc = []) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f)
    statSync(p).isDirectory() ? walk(p, acc) : /\.(tsx|ts)$/.test(f) && acc.push(p)
  }
  return acc
}

let n = 0
for (const p of walk('src')) {
  const src = readFileSync(p, 'utf8')
  const next = src.replace(attr, (m) => m.replace(pat, (_, k) => MAP[k]))
  if (next !== src) { writeFileSync(p, next); n++ }
}
console.log(`residual sweep: ${n} files`)
