import { useEffect, useRef, useState } from 'react'
import { buttonClass } from '@/components/ui/button'
import Live from '@/components/ui/live'

/** A Copy button. Says "Copied" on the button and in a polite live region; falls back to selecting `select` when the clipboard is blocked. */
export function CopyButton({ text, name, select }: { text: string; name: string; select?: () => void }) {
  const [done, setDone] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>()
  useEffect(() => () => clearTimeout(timer.current), [])
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      select?.()
      return
    }
    setDone(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setDone(false), 2000)
  }
  return (
    <>
      <button type="button" onClick={copy} className={`${buttonClass('tiny')} min-h-11 min-w-11`}>
        {done ? (
          'Copied'
        ) : (
          <>
            Copy<span className="sr-only"> {name}</span>
          </>
        )}
      </button>
      <Live>{done ? 'Copied' : ''}</Live>
    </>
  )
}

/** A copyable block: a mono label, a Copy button, and the text in a box that scrolls inside itself. */
export default function Code({ label, name = label, text, className = '' }: { label: string; name?: string; text: string; className?: string }) {
  const pre = useRef<HTMLPreElement>(null)
  const select = () => {
    const sel = getSelection()
    if (pre.current && sel) sel.selectAllChildren(pre.current)
  }
  return (
    <div className={`min-w-0 overflow-hidden rounded-lg border border-border bg-foreground/5 ${className}`}>
      <div className="flex items-center justify-between gap-3 border-b border-border py-1 pl-4 pr-2">
        <span className="min-w-0 font-mono text-xs text-muted-foreground">{label}</span>
        <CopyButton text={text} name={name} select={select} />
      </div>
      <pre ref={pre} tabIndex={0} aria-label={name} className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-foreground">
        {text}
      </pre>
    </div>
  )
}
