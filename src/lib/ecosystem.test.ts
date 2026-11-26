import { readFileSync } from 'node:fs'
import { expect, test } from 'vitest'
import { ENTRIES, entry, GROUPS } from './ecosystem'

const llms = readFileSync('public/llms.txt', 'utf8')

test('three groups, in this order', () => {
  expect(GROUPS.map((g) => g.title)).toEqual(['Hanzo', 'Lux', 'Community and research'])
})

test('every entry has a status word, one sentence ending in a full stop, and an https address', () => {
  expect(ENTRIES.length).toBeGreaterThan(10)
  for (const e of ENTRIES) {
    expect(['Live', 'In progress', 'Designed']).toContain(e.tag)
    expect(e.text).toMatch(/\.$/)
    expect(e.href).toMatch(/^https:\/\//)
    expect(e.href.replace(/^https:\/\//, '').startsWith(e.host)).toBe(true)
  }
  expect(new Set(ENTRIES.map((e) => e.name)).size).toBe(ENTRIES.length)
  expect(new Set(ENTRIES.map((e) => e.href)).size).toBe(ENTRIES.length)
})

test('nothing here is a sale, a stake, a reward or an unread claim', () => {
  expect(JSON.stringify(GROUPS)).not.toMatch(/staking|sale|mining|reward|Era 1|subnet|finalizes|github\.com\/luxfi/i)
})

test('the home strip can find its four', () => {
  for (const n of ['Hanzo AI', 'Zen models', 'Lux Network', 'Zoo Labs']) expect(entry(n).name).toBe(n)
  expect(() => entry('nobody')).toThrow()
})

test('public/llms.txt lists every entry with the same name, status word, sentence and address', () => {
  const lines = llms.split('## Ecosystem')[1].split('\n## ')[0].split('\n').filter((l) => l.startsWith('- ['))
  expect(lines).toHaveLength(ENTRIES.length)
  for (const [i, e] of ENTRIES.entries()) expect(lines[i]).toBe(`- [${e.name}](${e.href}): ${e.tag}. ${e.text}`)
})
