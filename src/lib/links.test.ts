import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { expect, test } from 'vitest'

const files = (dir: string): string[] =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f)
    return statSync(p).isDirectory() ? files(p) : /\.(ts|tsx)$/.test(p) ? [p] : []
  })

// links.ts holds every address. Consent.tsx and Measure.tsx are the only other files that may write one: they are kept byte-identical to the upstream hanzo-apps/network copies they mirror, so upstream changes merge cleanly.
const ALLOWED = ['src/components/Consent.tsx', 'src/components/Measure.tsx', 'src/lib/links.ts']

const HAS_URL = /https?:\/\//

/** The lines of `source` that write an address. */
const addresses = (source: string) => source.split('\n').flatMap((l, i) => (HAS_URL.test(l) ? [`${i + 1}: ${l.trim()}`] : []))

test('the check sees an address however it is quoted', () => {
  expect(addresses(`a\nconst x = 'https://a.test'\nconst y = \`go \${z}http://b.test\`\nplain`)).toHaveLength(2)
  expect(addresses('no address here')).toEqual([])
})

test('the allow-list files exist', () => {
  for (const f of ALLOWED) expect(files('src')).toContain(f)
})

test('every https:// literal in src is in links.ts, or in one of the two upstream-mirrored files', () => {
  const stray = files('src')
    .filter((f) => !/\.test\.tsx?$/.test(f) && !ALLOWED.includes(f))
    .flatMap((f) => addresses(readFileSync(f, 'utf8')).map((a) => `${f}:${a}`))
  expect(stray).toEqual([])
})
