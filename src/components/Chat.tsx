import { useEffect, useRef, useState, type FormEvent } from 'react'
import { HanzoLogo } from '@hanzo/logo'
import { X } from 'lucide-react'
import { buttonClass } from '@/components/ui/button'
import Live from '@/components/ui/live'
import { ask, type Message } from '@/lib/chat'
import { HANZO_CHAT } from '@/lib/links'
import { RequestError } from '@/lib/request'

const KEEP = 10
const handoff = (q?: string) => (q ? `${HANZO_CHAT}/?q=${encodeURIComponent(q)}` : HANZO_CHAT)

type Failure = 'busy' | 'failed'

export default function Chat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [sending, setSending] = useState(false)
  const [failure, setFailure] = useState<Failure | null>(null)
  const [draft, setDraft] = useState('')
  const opener = useRef<HTMLButtonElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const inflight = useRef<AbortController>()

  const lastQuestion = [...messages].reverse().find((m) => m.role === 'user')?.content

  const stop = () => inflight.current?.abort()
  useEffect(() => stop, [])

  const close = () => {
    stop()
    setSending(false)
    setOpen(false)
    opener.current?.focus()
  }

  useEffect(() => {
    if (open && !sending) input.current?.focus()
  }, [open, sending])

  const send = async (thread: Message[]) => {
    stop()
    const ctl = (inflight.current = new AbortController())
    setFailure(null)
    setSending(true)
    try {
      const answer = await ask(thread.slice(-KEEP), ctl.signal)
      setMessages([...thread, { role: 'assistant', content: answer }])
    } catch (e) {
      // A closed dialog or a newer question aborted this one on purpose: stay silent. A timeout is a failure.
      if (e instanceof RequestError && e.kind === 'aborted') return
      setFailure(e instanceof RequestError && e.status === 429 ? 'busy' : 'failed')
    } finally {
      if (inflight.current === ctl) {
        setSending(false)
      }
    }
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const text = draft.trim()
    if (!text || sending) return
    const thread: Message[] = [...messages, { role: 'user', content: text }]
    setMessages(thread)
    setDraft('')
    void send(thread)
  }

  return (
    <div
      className="fixed z-[60] flex flex-col items-end gap-3"
      style={{
        bottom: 'calc(14px + env(safe-area-inset-bottom, 0px))',
        insetInlineEnd: 'calc(clamp(20px, 2.5vw, 36px) - 6px + env(safe-area-inset-right, 0px))',
      }}
    >
      {open && (
        <div
          role="dialog"
          aria-label="Ask Hanzo"
          onKeyDown={(e) => e.key === 'Escape' && close()}
          className="flex max-h-[70vh] w-[min(380px,calc(100vw-32px))] flex-col gap-3 rounded-lg border border-border-strong bg-background p-4"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Ask Hanzo</h2>
              <p className="text-sm text-muted-foreground">Free answers from Hanzo&rsquo;s public chat.</p>
            </div>
            <button type="button" onClick={close} aria-label="Close chat" className="grid h-11 w-11 shrink-0 place-items-center rounded-full hover:bg-foreground/10">
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          {messages.length > 0 && (
            <div
              role="log"
              aria-label="Conversation"
              tabIndex={0}
              className="flex max-h-[40vh] min-h-0 flex-col gap-3 overflow-y-auto rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            >
              {messages.map((m, i) => (
                <p
                  key={i}
                  className={`chat-in max-w-[85%] whitespace-pre-wrap break-words rounded-lg px-3 py-2 text-sm ${
                    m.role === 'user' ? 'self-end bg-primary text-primary-foreground' : 'self-start border border-border-strong text-foreground'
                  }`}
                >
                  {m.content}
                </p>
              ))}
            </div>
          )}

          <Live className="min-h-5 text-sm text-muted-foreground">{sending ? 'Thinking…' : ''}</Live>

          {failure && (
            <div className="flex flex-col gap-2 text-sm">
              <p>{failure === 'busy' ? 'Too many questions just now. Try again in a minute.' : 'The chat did not answer. Try again, or continue on Hanzo Chat.'}</p>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => void send(messages)} className={buttonClass('secondary')}>
                  Retry
                </button>
                {failure === 'failed' && (
                  <a href={handoff(lastQuestion)} target="_blank" rel="noopener" className={buttonClass('secondary')}>
                    Continue on Hanzo Chat<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
              </div>
            </div>
          )}

          <form onSubmit={submit} className="flex flex-col gap-3">
            <input
              ref={input}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              disabled={sending}
              aria-label="Message"
              placeholder="Ask about Hanzo Network"
              className="h-11 min-w-0 rounded-full border border-border-strong bg-background px-4 text-sm text-foreground disabled:opacity-60"
            />
            <button type="submit" disabled={sending} className={`${buttonClass('primary')} disabled:opacity-60`}>
              Ask
            </button>
          </form>

          <a href={handoff(lastQuestion)} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center self-start text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
            Open in Hanzo Chat<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      )}
      <button
        ref={opener}
        type="button"
        aria-label="Open chat"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="grid h-[34px] w-[34px] cursor-pointer place-items-center rounded-full border-0 bg-transparent p-0 text-foreground opacity-85 transition-[opacity,transform] duration-200 hover:scale-[1.06] hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
      >
        <HanzoLogo variant="current" size={22} aria-hidden="true" />
      </button>
    </div>
  )
}
