import { CHAT_LANE, DOCS, SITE, WHITEPAPER } from './links'

/** Sent first with every question and never shown or counted as part of the conversation. */
export const SYSTEM = `You answer questions about Hanzo Network for visitors to hanzo.network. Facts: the chain (ID 36963) and an OpenAI-compatible API at api.hanzo.ai are live; nodes run tools and agents and are paid per job in stablecoins. Proof of AI mining, the 2 trillion AI supply policy and P3Q settlement are designed and not active; no dates are set. Never state or guess a price, return, yield, stake, staking reward, listing, purchase, sale, airdrop or date for the AI token, and never give investment advice; say that is not available and point to ${SITE}/economics and the whitepaper at ${WHITEPAPER}. If you do not know, say so and point to ${DOCS}. Keep answers short and plain.`

/** The longest answer asked for, in tokens. */
const MAX_TOKENS = 800

export type Message = { role: 'user' | 'assistant'; content: string }

/** The lane refused or failed. `status` is the HTTP status, or 0 when nothing came back. */
export class ChatError extends Error {
  constructor(message: string, readonly status = 0) {
    super(message)
  }
}

/**
 * Asks Hanzo's public chat lane: keyless, no cookies, a few free answers a day.
 * Returns the answer text only. The model's private reasoning is never read.
 * Throws a ChatError on a refusal, on a bad body, or when the request fails.
 */
export async function ask(messages: Message[], signal?: AbortSignal): Promise<string> {
  const res = await fetch(CHAT_LANE, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ messages: [{ role: 'system', content: SYSTEM }, ...messages], max_tokens: MAX_TOKENS }),
    credentials: 'omit',
    signal,
  })
  if (!res.ok) throw new ChatError(`chat answered ${res.status}`, res.status)
  const body = (await res.json()) as { choices?: { message?: { content?: unknown } }[] }
  const content = body.choices?.[0]?.message?.content
  if (typeof content !== 'string' || !content.trim()) throw new ChatError('chat gave no answer', res.status)
  return content
}
