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

// The luxfi organisation is hidden on GitHub and answers 404 to visitors. Lux code is linked at git.hanzo.ai/luxfi or github.com/luxdao.
const HIDDEN = /github\.com\/luxfi/i

/** Every file under `dir`, whatever its type, skipping binaries by extension. */
const everything = (dir: string): string[] =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f)
    return statSync(p).isDirectory() ? everything(p) : /\.(png|ico|jpe?g|webp|woff2?|mp4|webm)$/i.test(p) ? [] : [p]
  })

test('the hidden luxfi organisation is matched however it is written', () => {
  expect(HIDDEN.test('https://github.com/luxfi/node')).toBe(true)
  expect(HIDDEN.test('github.com/LuxFi/x')).toBe(true)
  expect(HIDDEN.test('https://git.hanzo.ai/luxfi/node')).toBe(false)
  expect(HIDDEN.test('https://github.com/luxdao/dao')).toBe(false)
})

test('no file in src or public links github.com/luxfi', () => {
  const found = [...everything('src'), ...everything('public')].filter((f) => f !== 'src/lib/links.test.ts' && HIDDEN.test(readFileSync(f, 'utf8')))
  expect(found).toEqual([])
})
