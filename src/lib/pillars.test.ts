import { readFileSync } from 'node:fs'
import { expect, test } from 'vitest'
import { PILLARS } from './pillars'

const llms = readFileSync('public/llms.txt', 'utf8')

test('there are six pillars, each with a status word, one sentence and one source', () => {
  expect(PILLARS.map((p) => p.title)).toEqual([
    'Maximum utility per node',
    'Multi-intelligence consensus',
    'Sovereign per-model chains',
    'Decentralized agentic commerce',
    'Self-upgrading autonomous research',
    'DAO goal-setting and human de-work',
  ])
  expect(PILLARS.map((p) => p.tag)).toEqual(['Live', 'Designed', 'Designed', 'In progress', 'In progress', 'Designed'])
  for (const p of PILLARS) expect(p.href).toMatch(/^https:\/\//)
})

test('public/llms.txt lists the same six, with the same status word and address', () => {
  const lines = llms.split('## The six parts')[1].split('\n## ')[0].split('\n').filter((l) => l.startsWith('- ['))
  expect(lines).toHaveLength(PILLARS.length)
  for (const [i, p] of PILLARS.entries()) expect(lines[i]).toBe(`- [${p.title}](${p.href}): ${p.tag}. ${p.text}`)
})

test('the vocabulary: sovereign per-model chains, never "subnet"', () => {
  expect(llms).not.toMatch(/subnet/i)
  expect(llms).toMatch(/sovereign/i)
  expect(llms).toMatch(/per-model chains/i)
  expect(JSON.stringify(PILLARS)).not.toMatch(/subnet/i)
})
