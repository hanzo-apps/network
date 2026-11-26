import { useEffect, useRef, useState, type FormEvent } from 'react'
import { HanzoLogo } from '@hanzo/logo'
import { Send, X } from 'lucide-react'

const link = 'https://hanzo.chat/?q='

export default function GlobalChatWidget() {
  const [open, setOpen] = useState(false)
  const [asked, setAsked] = useState('')
  const [text, setText] = useState('')
  const opener = useRef<HTMLButtonElement>(null)
  const input = useRef<HTMLInputElement>(null)

  const close = () => {
    setOpen(false)
    opener.current?.focus()
  }

  useEffect(() => {
    if (open) input.current?.focus()
  }, [open])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const q = text.trim()
    if (!q) return
    setAsked(q)
    setText('')
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          role="dialog"
          aria-label="Ask Hanzo"
          onKeyDown={(e) => e.key === 'Escape' && close()}
          className="flex max-h-[70vh] w-[min(380px,calc(100vw-32px))] flex-col gap-4 rounded-lg border border-border-strong bg-card p-4"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Ask Hanzo</h2>
              <p className="text-sm text-muted-foreground">Answers come from Hanzo Chat, free, in a new tab.</p>
            </div>
            <button type="button" onClick={close} aria-label="Close chat" className="grid h-11 w-11 shrink-0 place-items-center rounded-full hover:bg-white/5">
              <X size={18} aria-hidden="true" />
            </button>
          </div>
          {asked && (
            <div className="flex flex-col gap-2 overflow-y-auto text-sm">
              <p className="max-w-[85%] self-end break-words rounded-lg bg-primary px-3 py-2 text-primary-foreground">{asked}</p>
              <p role="status" className="max-w-[85%] rounded-lg border border-border px-3 py-2">
                Hanzo Chat will answer this.{' '}
                <a
                  href={link + encodeURIComponent(asked)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4"
                >
                  Continue in Hanzo Chat
                </a>
              </p>
            </div>
          )}
          <form onSubmit={submit} className="flex gap-2">
            <input
              ref={input}
              aria-label="Message"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ask anything about Hanzo Network"
              className="h-11 min-w-0 flex-1 rounded-full border border-border-strong bg-background px-4 text-sm text-foreground"
            />
            <button type="submit" aria-label="Send" className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground">
              <Send size={18} aria-hidden="true" />
            </button>
          </form>
        </div>
      )}
      <button
        ref={opener}
        type="button"
        aria-label="Open chat"
        onClick={() => setOpen(true)}
        className="relative grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground"
      >
        <span aria-hidden="true" className="absolute inset-0 animate-ping [animation-iteration-count:3] rounded-full bg-primary opacity-20" />
        <HanzoLogo variant="current" size={20} aria-hidden="true" className="relative" />
      </button>
    </div>
  )
}
