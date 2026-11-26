import { useEffect, useRef, useState } from 'react'
import { HanzoLogo } from '@hanzo/logo'
import { X } from 'lucide-react'
import { buttonClass } from '@/components/ui/button'

export default function GlobalChatWidget() {
  const [open, setOpen] = useState(false)
  const opener = useRef<HTMLButtonElement>(null)
  const input = useRef<HTMLInputElement>(null)

  const close = () => {
    setOpen(false)
    opener.current?.focus()
  }

  useEffect(() => {
    if (open) input.current?.focus()
  }, [open])

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          role="dialog"
          aria-label="Ask Hanzo"
          onKeyDown={(e) => e.key === 'Escape' && close()}
          className="flex max-h-[70vh] w-[min(380px,calc(100vw-32px))] flex-col gap-4 rounded-lg border border-border-strong bg-background p-4"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Ask Hanzo</h2>
              <p className="text-sm text-muted-foreground">Answers come from Hanzo Chat, free, in a new tab.</p>
            </div>
            <button type="button" onClick={close} aria-label="Close chat" className="grid h-11 w-11 shrink-0 place-items-center rounded-full hover:bg-foreground/10">
              <X size={18} aria-hidden="true" />
            </button>
          </div>
          <form action="https://hanzo.chat/" method="get" target="_blank" rel="noopener" className="flex flex-col gap-3">
            <input
              ref={input}
              name="q"
              required
              pattern=".*\S.*"
              title="Type a question; spaces alone are not one."
              aria-label="Message"
              placeholder="Ask anything about Hanzo Network"
              className="h-11 min-w-0 rounded-full border border-border-strong bg-background px-4 text-sm text-foreground"
            />
            <button type="submit" className={buttonClass('primary')}>
              Ask in Hanzo Chat<span className="sr-only"> (opens in a new tab)</span>
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
        <span aria-hidden="true" className="absolute inset-0 animate-ping [animation-iteration-count:3] rounded-full bg-foreground opacity-20" />
        <HanzoLogo variant="current" size={20} aria-hidden="true" className="relative" />
      </button>
    </div>
  )
}
