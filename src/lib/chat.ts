export const CHAT_LANE = 'https://api.hanzo.ai/v1/chat/public'

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
    body: JSON.stringify({ messages }),
    credentials: 'omit',
    signal,
  })
  if (!res.ok) throw new ChatError(`chat answered ${res.status}`, res.status)
  const body = (await res.json()) as { choices?: { message?: { content?: unknown } }[] }
  const content = body.choices?.[0]?.message?.content
  if (typeof content !== 'string' || !content.trim()) throw new ChatError('chat gave no answer', res.status)
  return content
}
