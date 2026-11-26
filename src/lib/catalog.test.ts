import { afterEach, describe, expect, it, vi } from 'vitest'
import { FEATURED, context, fetchModels, price, sortModels, toModel } from './catalog'

const raw = (o: object = {}) => ({
  id: 'anthropic/claude-opus-5.5',
  name: 'Claude Opus 5.5',
  owned_by: 'anthropic',
  context_window: 1000000,
  pricing: { input_per_million: 4.4521, output_per_million: 22.2605 },
  ...o,
})

describe('toModel', () => {
  it('maps a full item', () => {
    expect(toModel(raw())).toEqual({
      id: 'anthropic/claude-opus-5.5',
      name: 'Claude Opus 5.5',
      lab: 'Anthropic',
      input: 4.4521,
      output: 22.2605,
      context: 1000000,
    })
  })
  it.each([
    ['zen6', 'Zen6'],
    ['zen6-max', 'Zen6 Max'],
    ['zen6-coder', 'Zen6 Coder'],
    ['anthropic/claude-haiku-5.5', 'Claude Haiku 5.5'],
  ])('derives a name for %s', (id, name) => {
    expect(toModel(raw({ id, name: null })).name).toBe(name)
  })
  it.each([
    ['anthropic', 'Anthropic'],
    ['openai', 'OpenAI'],
    ['google', 'Google'],
    ['zenlm', 'Hanzo'],
    ['hanzo', 'Hanzo'],
    ['qwen', 'Qwen'],
    ['mistralai', 'Mistral'],
    ['deepseek', 'DeepSeek'],
    ['x-ai', 'xAI'],
    ['meta', 'Meta'],
    ['meta-llama', 'Meta'],
    ['moonshotai', 'Moonshot'],
    ['z-ai', 'Z.ai'],
    ['cohere', 'Cohere'],
  ])('maps lab %s', (owned_by, lab) => {
    expect(toModel(raw({ owned_by })).lab).toBe(lab)
  })
  it('falls back to the id prefix, then to Hanzo for zen ids', () => {
    expect(toModel(raw({ owned_by: null })).lab).toBe('Anthropic')
    expect(toModel(raw({ id: 'zen6', owned_by: null })).lab).toBe('Hanzo')
  })
})

describe('price', () => {
  it.each([
    [0, 'Free'],
    [4.4521, '$4.45'],
    [22.2605, '$22.26'],
    [0.1113025, '$0.11'],
    [0.004, '<$0.01'],
    [0.005, '$0.01'],
  ])('%s -> %s', (n, s) => expect(price(n)).toBe(s))
})

describe('context', () => {
  it.each([
    [1000000, '1M'],
    [1048576, '1M'],
    [131072, '131K'],
    [200000, '200K'],
    [0, '—'],
  ])('%s -> %s', (n, s) => expect(context(n)).toBe(s))
})

describe('fetchModels', () => {
  afterEach(() => vi.unstubAllGlobals())
  it('drops :batch ids', async () => {
    const data = [raw(), raw({ id: 'anthropic/claude-opus-5.5:batch' })]
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ data }))))
    expect((await fetchModels()).map((m) => m.id)).toEqual(['anthropic/claude-opus-5.5'])
  })
  it('throws on a 500', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('down', { status: 500 })))
    await expect(fetchModels()).rejects.toThrow()
  })
  it('throws on bad JSON', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('nope')))
    await expect(fetchModels()).rejects.toThrow()
  })
})

it('features Zen6 first', () => expect(FEATURED[0]).toBe('zen6'))

describe('sortModels', () => {
  const m = (id: string, name: string, lab: string) => ({ id, name, lab, input: 1, output: 1, context: 1 })
  it('puts Hanzo first, then labs A-Z, then names A-Z, without mutating', () => {
    const list = [
      m('a', 'Nova', 'Amazon'),
      m('b', 'Claude Opus', 'Anthropic'),
      m('c', 'Zen6 Max', 'Hanzo'),
      m('d', 'Aion', 'Aion-labs'),
      m('e', 'Claude Haiku', 'Anthropic'),
      m('f', 'Zen6', 'Hanzo'),
    ]
    const copy = [...list]
    expect(sortModels(list).map((x) => x.name)).toEqual(['Zen6', 'Zen6 Max', 'Aion', 'Nova', 'Claude Haiku', 'Claude Opus'])
    expect(list).toEqual(copy)
  })
})
