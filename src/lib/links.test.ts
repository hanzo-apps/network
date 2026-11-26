import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { expect, test } from 'vitest'

const files = (dir: string): string[] =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f)
    return statSync(p).isDirectory() ? files(p) : /\.(ts|tsx)$/.test(p) ? [p] : []
  })

// Consent.tsx and Measure.tsx must stay byte-identical to upstream hanzo-apps/network main so future upstream changes merge cleanly, so they keep their own addresses and are not edited here.
const KEPT = ['src/components/Consent.tsx', 'src/components/Measure.tsx', 'src/lib/links.ts']

test('the allow-list is exactly Consent.tsx, Measure.tsx and links.ts', () => {
  expect([...KEPT].sort()).toEqual(['src/components/Consent.tsx', 'src/components/Measure.tsx', 'src/lib/links.ts'])
})

test('every outbound address is written once, in src/lib/links.ts', () => {
  const stray = files('src')
    .filter((f) => !f.endsWith('.test.ts') && !KEPT.includes(f))
    .flatMap((f) => readFileSync(f, 'utf8').split('\n').map((l, i) => [`${f}:${i + 1}`, l] as const))
    .filter(([, l]) => /['"`]https?:\/\//.test(l))
    .map(([at, l]) => `${at}: ${l.trim()}`)
  expect(stray).toEqual([])
})
