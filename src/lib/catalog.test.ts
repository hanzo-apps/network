import { afterEach, describe, expect, it, vi } from 'vitest'
import { FEATURED, isZenFeatured, context, featured, fetchModels, freeModel, group, perToken, price, sortModels, toModel, topLabs } from './catalog'

const raw = (o: object = {}) => ({
  id: 'anthropic/claude-opus-5.5',
  name: 'Claude Opus 5.5',
  owned_by: 'anthropic',
  context_window: 1000000,
  pricing: { input_per_million: 4.4521, output_per_million: 22.2605 },
  ...o,
})

describe('toModel', () => {
  it('strips the ~ from latest-alias owners so the lab reads as its real name', () => {
    expect(toModel(raw({ id: '~anthropic/claude-fable-latest', owned_by: '~anthropic' })).lab).toBe('Anthropic')
    expect(toModel(raw({ id: '~x-ai/grok-latest', owned_by: '~x-ai' })).lab).toBe('xAI')
    expect(toModel(raw({ id: '~openai/gpt-sol-latest', owned_by: null })).lab).toBe('OpenAI')
  })
  it('maps a full item', () => {
    expect(toModel(raw())).toEqual({
      id: 'anthropic/claude-opus-5.5',
      name: 'Claude Opus 5.5',
      lab: 'Anthropic',
      input: 4.4521,
      output: 22.2605,
      context: 1000000,
      free: false,
      variable: false,
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
    ['black-forest-labs', 'Black Forest Labs'],
    ['stability-ai', 'Stability Ai'],
  ])('maps lab %s', (owned_by, lab) => {
    expect(toModel(raw({ owned_by })).lab).toBe(lab)
  })
  it('falls back to the id prefix, then to Hanzo for zen ids', () => {
    expect(toModel(raw({ owned_by: null })).lab).toBe('Anthropic')
    expect(toModel(raw({ id: 'zen6', owned_by: null })).lab).toBe('Hanzo')
  })
})

const video = {
  id: 'fal/flux-3-video',
  name: 'FLUX 3 Video',
  owned_by: 'black-forest-labs',
  pricing: { input_per_million: 0, output_per_million: 0, variable: true, rates: { duration_seconds: '0.189' } },
  free: false,
}
const unpriced = { id: 'hanzo/kai', name: 'Kai', owned_by: 'hanzo', free: false }
const zen = { id: 'hanzo/zen', name: 'Zen', owned_by: 'hanzo', free: true, pricing: { input_per_million: 0, output_per_million: 0 } }

describe('variable and unpriced models', () => {
  it('keeps free and variable from the API', () => {
    expect(toModel(video)).toMatchObject({ free: false, variable: true })
    expect(toModel(unpriced)).toMatchObject({ free: false, variable: true })
    expect(toModel(zen)).toMatchObject({ free: true, variable: false })
  })
  it('never shows Free for a paid model, and lists only per-token models', () => {
    const models = [video, unpriced, zen, raw()].map(toModel)
    const v = models[0]
    expect(price(v.input, v.free)).not.toBe('Free')
    expect(perToken(models).map((m) => m.id)).toEqual(['hanzo/zen', 'anthropic/claude-opus-5.5'])
  })
  it('a paid model priced at exactly 0 shows $0.00, not <$0.01', () => {
    expect(price(0, false)).toBe('$0.00')
    expect(price(0.004, false)).toBe('<$0.01')
    expect(price(0, true)).toBe('Free')
  })
  it('freeModel needs free === true', () => {
    expect(freeModel([toModel({ ...zen, free: false })])).toBeUndefined()
    expect(freeModel([toModel(zen)])?.id).toBe('hanzo/zen')
  })
})

describe('featured', () => {
  const m = (id: string) => toModel(raw({ id, name: id }))
  it('follows FEATURED order and skips missing ids', () => {
    const list = [m('openai/gpt-5.4'), m('zen6-max'), m('unrelated')]
    expect(featured(list).map((x) => x.id)).toEqual(['zen6-max', 'openai/gpt-5.4'])
  })
})

describe('price', () => {
  it.each([
    [4.4521, '$4.45'],
    [22.2605, '$22.26'],
    [0.1113025, '$0.11'],
    [0.004, '<$0.01'],
    [0.005, '$0.01'],
  ])('%s -> %s', (n, s) => expect(price(n)).toBe(s))
  it('says Free only when told free', () => {
    expect(price(0, true)).toBe('Free')
    expect(price(0)).not.toBe('Free')
  })
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
  const m = (id: string, name: string, lab: string) => ({ id, name, lab, input: 1, output: 1, context: 1, free: false, variable: false })
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

describe('freeModel', () => {
  const m = (id: string, input: number, output: number) => ({ id, name: id, lab: 'Hanzo', input, output, context: 1, free: input === 0 && output === 0, variable: false })
  it('returns hanzo/zen when it is free', () => {
    const zen = m('hanzo/zen', 0, 0)
    expect(freeModel([m('zen6', 0.6, 2.4), zen])).toBe(zen)
  })
  it('is undefined when zen is priced', () => {
    expect(freeModel([m('hanzo/zen', 0, 1)])).toBeUndefined()
    expect(freeModel([m('hanzo/zen', 1, 0)])).toBeUndefined()
  })
  it('is undefined when zen is absent, even if another model is free', () => {
    expect(freeModel([m('other/free', 0, 0)])).toBeUndefined()
  })
})

describe('topLabs', () => {
  const m = (lab: string) => ({ id: Math.random() + lab, name: lab, lab, input: 1, output: 1, context: 1, free: false, variable: false })
  it('ranks labs by model count, Hanzo first when present, ignoring blank labs', () => {
    const list = [m('A'), m('A'), m('A'), m('B'), m('B'), m('Hanzo'), m(''), m('C')]
    expect(topLabs(list, 3)).toEqual(['Hanzo', 'A', 'B'])
  })
  it('breaks ties A-Z and omits Hanzo when absent', () => {
    expect(topLabs([m('Z'), m('Y'), m('X')], 2)).toEqual(['X', 'Y'])
  })
})

describe('group', () => {
  const enso = (id: string, o: object = {}) => ({ id, name: 'Enso', lab: 'Hanzo', input: 1, output: 2, context: 128000, free: false, variable: false, ...o })
  it('merges identical aliases into one row with every id', () => {
    const rows = group([enso('enso'), enso('hanzo/enso'), enso('zenlm/enso')])
    expect(rows).toHaveLength(1)
    expect(rows[0].ids).toEqual(['enso', 'hanzo/enso', 'zenlm/enso'])
    expect(rows[0].name).toBe('Enso')
  })
  it('keeps a differently priced or sized Enso apart', () => {
    expect(group([enso('a'), enso('b', { output: 3 }), enso('c', { context: 8000 }), enso('d', { lab: 'Other' })])).toHaveLength(4)
  })
  it('keeps the order of first appearance', () => {
    expect(group([enso('a'), enso('x', { name: 'Kai' }), enso('b')]).map((r) => r.ids)).toEqual([['a', 'b'], ['x']])
  })
})

describe('isZenFeatured', () => {
  it('is true for bare zen ids and false for other labs', () => {
    expect(isZenFeatured('zen6')).toBe(true)
    expect(isZenFeatured('zen6-max')).toBe(true)
    expect(isZenFeatured('anthropic/claude-opus-5.5')).toBe(false)
  })
  it('splits FEATURED into 4 Zen and 6 others', () => {
    expect(FEATURED.filter(isZenFeatured)).toHaveLength(4)
    expect(FEATURED.filter((id) => !isZenFeatured(id))).toHaveLength(6)
  })
})
