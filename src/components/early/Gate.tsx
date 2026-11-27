import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Check } from 'lucide-react'
import { buttonClass, inlineLink, textLink } from '@/components/ui/button'
import Card from '@/components/ui/card'
import { useAnalytics } from '@hanzo/event/react'
import Slots from './Slots'
import { Link } from 'react-router'
import { body, drift, normalize, verify, wait, InviteError } from '@/lib/invite'

/** The one place an accepted code is kept: this tab's session, never the URL, never local storage. */
const KEY = 'hn.invite'
const kept = () => {
  try {
    return normalize(sessionStorage.getItem(KEY) ?? '') // anything that is not a code is not remembered
  } catch {
    return null // storage blocked: the code is simply not remembered
  }
}
const keep = (code: string | null) => {
  try {
    if (code === null) sessionStorage.removeItem(KEY)
    else sessionStorage.setItem(KEY, code)
  } catch {
    // storage blocked: nothing to do
  }
}

type Phase = 'idle' | 'empty' | 'short' | 'checking' | 'invalid' | 'limited' | 'unavailable'

/** What the status says. `after` is the seconds the server asked for, when it did. */
const says = (phase: Phase, after: number | null) =>
  ({
    idle: '',
    empty: 'Enter a code.',
    short: 'Enter HNZ- and ten characters.',
    checking: 'Checking…',
    invalid: 'That code is not valid.',
    limited: `Too many tries. Try again ${wait(after)}.`,
    unavailable: 'Invite checking is not available right now. Try again later.',
  })[phase]

const STEPS = ['Check your code here.', 'Keep it. It is not used up by checking.', 'It does not unlock anything yet.']

const label = 'block font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground'

/** The invite code gate. It shows accepted only when the endpoint said valid:true, rejected only on valid:false, and says nothing else about a code. */
export default function Gate() {
  const [accepted, setAccepted] = useState<string | null>(kept)
  const [value, setValue] = useState('')
  const [phase, setPhase] = useState<Phase>('idle')
  const [after, setAfter] = useState<number | null>(null)
  const [focused, setFocused] = useState(false)
  const [all, setAll] = useState(false)
  const input = useRef<HTMLInputElement>(null)
  const inflight = useRef<AbortController>()
  const checking = phase === 'checking'
  const [fresh, setFresh] = useState(0)
  const explanation = useRef<HTMLDivElement>(null)
  const analytics = useAnalytics()

  useEffect(() => () => inflight.current?.abort(), [])

  // A code accepted just now moves focus to the explanation; one restored from the session does not.
  useEffect(() => {
    if (fresh) explanation.current?.focus()
  }, [fresh])

  // The input is disabled while checking, so it takes focus back once the answer is in.
  useEffect(() => {
    if (phase === 'invalid' || phase === 'limited' || phase === 'unavailable') {
      input.current?.focus()
      if (phase === 'invalid') input.current?.select()
    }
  }, [phase])

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const code = normalize(`HNZ${value}`)
    if (!code) {
      setPhase(value ? 'short' : 'empty')
      input.current?.focus()
      return
    }
    inflight.current?.abort()
    const ctl = (inflight.current = new AbortController())
    setPhase('checking')
    try {
      if (await verify(code, ctl.signal)) {
        keep(code)
        setAccepted(code)
        setPhase('idle')
        setFresh((n) => n + 1)
      } else setPhase('invalid')
    } catch (err) {
      if (ctl.signal.aborted) return
      const d = drift(err)
      if (d) analytics.captureError(d)
      setAfter(err instanceof InviteError ? err.retryAfter : null)
      setPhase(err instanceof InviteError && err.kind === 'limited' ? 'limited' : 'unavailable')
    }
  }

  const another = () => {
    keep(null)
    setAccepted(null)
    setValue('')
    setPhase('idle')
    requestAnimationFrame(() => input.current?.focus())
  }

  return (
    <div id="gate" className="mx-auto w-full max-w-[1200px] px-4 pb-[72px] md:px-8 md:pb-32">
      <Card className="grid lg:grid-cols-[7fr_5fr]">
        <form onSubmit={submit} noValidate className="min-w-0 p-6 md:p-10">
          {!accepted && (
            <div aria-busy={checking}>
              <label htmlFor="invite-code" className={label}>
                Invite code
              </label>
              <div className="relative mt-3 max-w-[32rem] rounded-md has-[input:disabled]:opacity-60 has-[input:focus-visible]:outline has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-4 has-[input:focus-visible]:outline-ring">
                <Slots value={value} active={focused ? Math.min(value.length, 9) : -1} selected={focused && all} />
                <input
                  ref={input}
                  id="invite-code"
                  value={value}
                  onChange={(e) => setValue(body(e.target.value))}
                  onSelect={(e) => setAll(e.currentTarget.value.length > 0 && e.currentTarget.selectionStart === 0 && e.currentTarget.selectionEnd === e.currentTarget.value.length)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  disabled={checking}
                  maxLength={20}
                  autoCapitalize="characters"
                  autoComplete="off"
                  spellCheck={false}
                  inputMode="text"
                  aria-invalid={phase === 'invalid' || phase === 'empty' || phase === 'short'}
                  aria-describedby="invite-hint invite-status"
                  className="absolute inset-0 h-full w-full cursor-text font-mono opacity-0"
                />
              </div>
              <p id="invite-hint" className="mt-3 font-mono text-sm text-muted-foreground">
                HNZ- and ten characters.
              </p>
            </div>
          )}

          <p id="invite-status" role="status" aria-live="polite" className={`font-mono text-sm ${accepted ? 'flex items-center gap-2 text-base uppercase tracking-[0.14em]' : 'mt-4 min-h-5 text-foreground empty:mt-0 empty:min-h-0'}`}>
            {accepted ? (
              <>
                <Check size={18} aria-hidden="true" />
                Code accepted
              </>
            ) : (
              says(phase, after)
            )}
          </p>

          {phase === 'unavailable' && (
            <p className="mt-2 max-w-[56ch] text-base leading-relaxed text-muted-foreground">
              You can{' '}
              <Link to={{ hash: '#queue' }} className={inlineLink}>
                join the queue
              </Link>{' '}
              or see{' '}
              <Link to={{ hash: '#invites' }} className={inlineLink}>
                where invites come from
              </Link>
              .
            </p>
          )}

          {!accepted && (
            <div className="mt-6">
              <button type="submit" disabled={checking} className={`${buttonClass('primary')} disabled:opacity-60`}>
                Check code
              </button>
            </div>
          )}

          {accepted && (
            <div ref={explanation} tabIndex={-1} className="mt-6 outline-offset-8">
              <div className="max-w-[32rem]">
                <Slots value={body(accepted)} />
                <span className="sr-only">{accepted}</span>
              </div>
              <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-muted-foreground">
                This code is valid. It does not unlock anything yet.
              </p>
              <button type="button" onClick={another} className={`${textLink} mt-4`}>
                Use a different code
              </button>
            </div>
          )}
        </form>
        <aside className="border-t border-border p-6 md:p-10 lg:border-l lg:border-t-0">
          <p className={label}>How it works</p>
          <ol className="mt-6 flex flex-col gap-5">
            {STEPS.map((t, i) => (
              <li key={t} className="flex gap-4 text-base leading-relaxed text-muted-foreground">
                <span className="font-mono text-sm tabular-nums text-foreground">{String(i + 1).padStart(2, '0')}</span>
                {t}
              </li>
            ))}
          </ol>
        </aside>
      </Card>
    </div>
  )
}
