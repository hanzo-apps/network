import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { expect, test } from 'vitest'

const files = (dir: string): string[] =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f)
    return statSync(p).isDirectory() ? files(p) : /\.(ts|tsx)$/.test(p) ? [p] : []
  })

// Consent and Measure are the privacy and measurement code this site copies from @hanzo/ui and @hanzo/event; they keep their own addresses.
const KEPT = ['src/components/Consent.tsx', 'src/components/Measure.tsx', 'src/lib/links.ts']

test('every outbound address is written once, in src/lib/links.ts', () => {
  const stray = files('src')
    .filter((f) => !f.endsWith('.test.ts') && !KEPT.includes(f))
    .flatMap((f) => readFileSync(f, 'utf8').split('\n').map((l, i) => [`${f}:${i + 1}`, l] as const))
    .filter(([, l]) => /['"`]https?:\/\//.test(l))
    .map(([at, l]) => `${at}: ${l.trim()}`)
  expect(stray).toEqual([])
})
