import { readFileSync } from 'node:fs'
import { expect, test } from 'vitest'
import { EARLY, INVITE_LABEL } from './early'

const read = (f: string) => readFileSync(f, 'utf8')

test('the invite button label and the page path are written once, in early.ts', () => {
  expect(INVITE_LABEL).toBe('Enter invite code')
  expect(EARLY).toBe('/early')
  for (const f of ['src/components/Nav.tsx', 'src/components/home/Hero.tsx', 'src/components/home/Closing.tsx', 'src/App.tsx']) {
    expect(read(f), f).not.toContain(INVITE_LABEL)
    expect(read(f), f).not.toMatch(/['"`]\/early['"`]/)
  }
})

test('Nav (its stable name, its long text and the phone menu), Hero and Closing each draw the one constant', () => {
  const uses = (f: string) => read(f).split('{INVITE_LABEL}').length - 1
  expect(uses('src/components/Nav.tsx')).toBe(3)
  expect(uses('src/components/home/Hero.tsx')).toBe(1)
  expect(uses('src/components/home/Closing.tsx')).toBe(1)
})
