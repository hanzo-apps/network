import { useEffect, useState } from 'react'

/** `variable` is true when the model is not priced per token (per second, per image, or no price at all). */
export type Model = { id: string; name: string; lab: string; input: number; output: number; context: number; free: boolean; variable: boolean }

type Raw = {
  id: string
  name?: string | null
  owned_by?: string | null
  context_window?: number
  free?: boolean
  pricing?: { input_per_million?: number; output_per_million?: number; variable?: boolean }
}

export const MODELS_URL = 'https://api.hanzo.ai/v1/models'

export const FEATURED = [
  'zen6',
  'zen6-max',
  'zen6-flash',
  'zen6-coder',
  'anthropic/claude-opus-5.5',
  'anthropic/claude-sonnet-5.5',
  'anthropic/claude-haiku-5.5',
  'anthropic/claude-fable-5.2',
  'openai/gpt-5.4',
  'google/gemini-3.8-flash',
]

/** The one rule for Zen versus other labs among FEATURED: Zen ids have no "lab/" prefix. */
export const isZenFeatured = (id: string) => !id.includes('/')

const LABS: Record<string, string> = {
  anthropic: 'Anthropic',
  openai: 'OpenAI',
  google: 'Google',
  zenlm: 'Hanzo',
  hanzo: 'Hanzo',
  qwen: 'Qwen',
  mistralai: 'Mistral',
  deepseek: 'DeepSeek',
  'x-ai': 'xAI',
  meta: 'Meta',
  'meta-llama': 'Meta',
  moonshotai: 'Moonshot',
  'z-ai': 'Z.ai',
}

const cap = (w: string) => w.charAt(0).toUpperCase() + w.slice(1)
const words = (s: string) => s.split('-').map(cap).join(' ')
const title = (id: string) => words(id.split('/').pop()!)

function labOf(id: string, owner?: string | null) {
  // "~lab" marks a "latest" alias of that lab's model.
  const key = (owner || (id.includes('/') ? id.split('/')[0] : '')).replace(/^~/, '')
  if (!key) return id.startsWith('zen') ? 'Hanzo' : ''
  return LABS[key] ?? (key.startsWith('zen') ? 'Hanzo' : words(key))
}

export const toModel = (r: Raw): Model => ({
  id: r.id,
  name: r.name || title(r.id),
  lab: labOf(r.id, r.owned_by),
  input: r.pricing?.input_per_million ?? 0,
  output: r.pricing?.output_per_million ?? 0,
  context: r.context_window ?? 0,
  free: r.free === true,
  variable:
    r.pricing?.variable === true ||
    typeof r.pricing?.input_per_million !== 'number' ||
    typeof r.pricing?.output_per_million !== 'number',
})

export async function fetchModels(signal?: AbortSignal): Promise<Model[]> {
  const res = await fetch(MODELS_URL, { signal })
  if (!res.ok) throw new Error(`models ${res.status}`)
  const body = (await res.json()) as { data?: Raw[] }
  if (!Array.isArray(body.data)) throw new Error('bad models response')
  return body.data.filter((r) => !r.id.endsWith(':batch')).map(toModel)
}

export function price(n: number, free = false) {
  if (free) return 'Free'
  return n > 0 && n < 0.005 ? '<$0.01' : '$' + n.toFixed(2)
}

export function context(n: number) {
  if (!n) return '—'
  return n >= 1e6 ? +(n / 1e6).toFixed(1) + 'M' : Math.round(n / 1e3) + 'K'
}

/** Hanzo first, then labs A-Z, then names A-Z. */
export const sortModels = (list: Model[]) =>
  [...list].sort(
    (a, b) =>
      Number(b.lab === 'Hanzo') - Number(a.lab === 'Hanzo') ||
      a.lab.localeCompare(b.lab) ||
      a.name.localeCompare(b.name),
  )

/** The one rule behind every "free" claim: hanzo/zen is in the live catalog with free: true at input 0 and output 0. */
export const freeModel = (models: Model[]) => models.find((m) => m.id === 'hanzo/zen' && m.free && m.input === 0 && m.output === 0)

/** The n labs with the most models (A-Z on ties), Hanzo first when present. */
export function topLabs(models: Model[], n: number) {
  const count = new Map<string, number>()
  for (const m of models) if (m.lab) count.set(m.lab, (count.get(m.lab) ?? 0) + 1)
  const ranked = [...count].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([lab]) => lab)
  const top = ranked.slice(0, n)
  return count.has('Hanzo') ? ['Hanzo', ...top.filter((l) => l !== 'Hanzo')].slice(0, n) : top
}

/** Models billed per token; the rest are per second or per image. */
export const perToken = (models: Model[]) => models.filter((m) => !m.variable)

/** The FEATURED models present in the catalog, in FEATURED order. */
export const featured = (models: Model[]) =>
  FEATURED.map((id) => models.find((m) => m.id === id)).filter((m): m is Model => !!m)

/** One row per distinct model: ids that share name, lab, prices and context are aliases of the same model. */
export type Row = Model & { ids: string[] }
export function group(models: Model[]): Row[] {
  const rows = new Map<string, Row>()
  for (const m of models) {
    const key = JSON.stringify([m.name, m.lab, m.input, m.output, m.context, m.free])
    const row = rows.get(key)
    if (row) row.ids.push(m.id)
    else rows.set(key, { ...m, ids: [m.id] })
  }
  return [...rows.values()]
}

/** A Zen model: any id with "zen" in it, so zen6, hanzo/zen and zenlm/zen6-max all count. */
export const isZen = (id: string) => /zen/i.test(id)

/** The one model count on the site: distinct per-token models (aliases merged) and how many of them are Zen. Pricing's header stat is the first number. */
export function countModels(models: Model[]) {
  const rows = group(perToken(models))
  return { models: rows.length, zen: rows.filter((r) => r.ids.some(isZen)).length }
}

let catalog: Promise<Model[]> | undefined

/** The catalog, fetched once for the whole page however many callers ask. A failure is forgotten so the next call tries again. */
export function loadModels(): Promise<Model[]> {
  catalog ??= fetchModels().catch((e) => {
    catalog = undefined
    throw e
  })
  return catalog
}

export type Counts = { status: 'loading' } | { status: 'live'; models: number; zen: number } | { status: 'down' }

/** loading until the catalog answers, then live with the counts or down. Waits for the page to finish loading before asking, so it never competes with first paint. */
export function useCounts(): Counts {
  const [state, setState] = useState<Counts>({ status: 'loading' })
  useEffect(() => {
    let gone = false
    const ask = () =>
      loadModels().then(
        (m) => gone || setState({ status: 'live', ...countModels(m) }),
        () => gone || setState({ status: 'down' }),
      )
    if (document.readyState === 'complete') ask()
    else window.addEventListener('load', ask, { once: true })
    return () => {
      gone = true
      window.removeEventListener('load', ask)
    }
  }, [])
  return state
}
