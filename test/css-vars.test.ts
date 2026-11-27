import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { expect, test } from 'vitest'

const root = process.cwd()

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}

const read = (p: string) => readFileSync(p, 'utf8')
const names = (text: string, re: RegExp) => [...text.matchAll(re)].map((m) => m[1])

test('every CSS variable used in src/ is defined', () => {
  const sources = walk(join(root, 'src')).filter((f) => /\.(tsx?|css)$/.test(f))
  const used = new Map<string, number>()
  const defined = new Set<string>()

  for (const file of sources) {
    const text = read(file)
    // A property set inline in the same file counts as defined there.
    const local = new Set(names(text, /['"]?(--[\w-]+)['"]?\s*:/g))
    for (const name of names(text, /var\(\s*(--[\w-]+)/g)) {
      if (!local.has(name)) used.set(name, (used.get(name) ?? 0) + 1)
    }
    if (file.endsWith('.css')) local.forEach((n) => defined.add(n))
  }

  const definitions = [
    join(root, 'index.html'),
    join(root, 'node_modules/@hanzo/tokens/dist/tokens.css'),
    join(root, 'node_modules/@hanzo/font/dist/zen.css'),
  ]
  for (const file of definitions.filter(existsSync)) {
    names(read(file), /(--[\w-]+)\s*:/g).forEach((n) => defined.add(n))
  }

  // --tw-* is set by Tailwind at runtime, not by us.
  const missing = [...used].filter(([name]) => !defined.has(name) && !/^--tw-/.test(name))
  const report = missing.map(([name, n]) => `${name} (${n} uses)`).join('\n')
  expect(report, `${missing.length} undefined CSS variables`).toBe('')
})
