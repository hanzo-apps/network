import { useRef, useState } from 'react'
import Card from '@/components/ui/card'
import { buttonClass } from '@/components/ui/button'

const CODE = `curl https://api.hanzo.ai/v1/chat/completions \\
  -H "Authorization: Bearer $HANZO_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"hanzo/zen","messages":[{"role":"user","content":"Hello"}]}'`

const num = 'text-5xl font-semibold text-foreground/90'

function Copy() {
  const [done, setDone] = useState(false)
  const pre = useRef<HTMLPreElement>(null)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CODE)
    } catch {
      const sel = getSelection()
      if (!pre.current || !sel) return
      sel.selectAllChildren(pre.current)
      return
    }
    setDone(true)
    setTimeout(() => setDone(false), 2000)
  }
  return (
    <div className="relative mt-4">
      <pre
        ref={pre}
        tabIndex={0}
        aria-label="curl command"
        className="overflow-x-auto rounded-lg border border-border bg-[var(--white-03)] p-4 pr-20 font-mono text-sm leading-relaxed text-foreground"
      >
        {CODE}
      </pre>
      <button
        type="button"
        onClick={copy}
        className="absolute right-2 top-2 h-8 rounded-full border border-border-strong bg-background px-3 text-xs font-medium text-foreground hover:bg-[var(--white-08)]"
      >
        {done ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}

export default function Start() {
  return (
    <>
      <div className="relative mt-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -inset-y-16 -z-10"
          style={{ background: 'radial-gradient(ellipse at 50% 30%, var(--white-06), transparent 60%)' }}
        />
        <ol className="grid gap-4 lg:grid-cols-[1fr_1.6fr_1fr]">
          <li>
            <Card className="h-full p-6">
              <p className={num}>01</p>
              <h3 className="mt-4 text-xl font-semibold">Get an API key</h3>
              <p className="mt-2 text-muted-foreground">Sign in with your Hanzo account and create a key.</p>
              <a href="https://platform.hanzo.ai/api-keys" className={`${buttonClass('primary')} mt-6`}>
                Get an API key
              </a>
            </Card>
          </li>
          <li className="min-w-0">
            <Card className="h-full p-6">
              <p className={num}>02</p>
              <h3 className="mt-4 text-xl font-semibold">Make your first call</h3>
              <Copy />
              <p className="mt-3 text-sm text-muted-foreground">
                OpenAI-compatible. Swap the model name to use any model below.
              </p>
            </Card>
          </li>
          <li>
            <Card className="h-full p-6">
              <p className={num}>03</p>
              <h3 className="mt-4 text-xl font-semibold">Pay for what you use</h3>
              <p className="mt-2 text-muted-foreground">
                No minimum. Each request is billed per token at the prices below.
              </p>
              <a href="#models" className="mt-6 inline-block text-foreground underline underline-offset-4">
                See all prices
              </a>
            </Card>
          </li>
        </ol>
      </div>
      <p className="mt-8 text-muted-foreground">
        Want to try first?{' '}
        <a href="https://hanzo.chat" className="text-foreground underline underline-offset-4">
          Ask Hanzo Chat, free, no sign-in.
        </a>
      </p>
    </>
  )
}
