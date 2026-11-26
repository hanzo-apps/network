export type Model = { id: string; name: string; lab: string; input: number; output: number; context: number }

type Raw = {
  id: string
  name?: string | null
  owned_by?: string | null
  context_window?: number
  pricing?: { input_per_million?: number; output_per_million?: number }
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

const title = (id: string) =>
  id
    .split('/')
    .pop()!
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

function labOf(id: string, owner?: string | null) {
  const key = owner || (id.includes('/') ? id.split('/')[0] : '')
  if (!key) return id.startsWith('zen') ? 'Hanzo' : ''
  return LABS[key] ?? (key.startsWith('zen') ? 'Hanzo' : key.charAt(0).toUpperCase() + key.slice(1))
}

export const toModel = (r: Raw): Model => ({
  id: r.id,
  name: r.name || title(r.id),
  lab: labOf(r.id, r.owned_by),
  input: r.pricing?.input_per_million ?? 0,
  output: r.pricing?.output_per_million ?? 0,
  context: r.context_window ?? 0,
})

export async function fetchModels(signal?: AbortSignal): Promise<Model[]> {
  const res = await fetch(MODELS_URL, { signal })
  if (!res.ok) throw new Error(`models ${res.status}`)
  const body = (await res.json()) as { data?: Raw[] }
  if (!Array.isArray(body.data)) throw new Error('bad models response')
  return body.data.filter((r) => !r.id.endsWith(':batch')).map(toModel)
}

export function price(n: number) {
  if (n === 0) return 'Free'
  return n < 0.005 ? '<$0.01' : '$' + n.toFixed(2)
}

export function context(n: number) {
  if (!n) return '—'
  return n >= 1e6 ? +(n / 1e6).toFixed(1) + 'M' : Math.round(n / 1e3) + 'K'
}
