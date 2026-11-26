import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Check } from 'lucide-react'
import { buttonClass, textLink } from '@/components/ui/button'
import Card from '@/components/ui/card'
import { verify, InviteError } from '@/lib/invite'

/** The one place an accepted code is kept: this tab's session, never the URL, never local storage. */
const KEY = 'hn.invite'
const kept = () => {
  try {
    return sessionStorage.getItem(KEY)
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

type Phase = 'idle' | 'empty' | 'checking' | 'invalid' | 'limited' | 'unavailable'

const SAYS: Record<Phase, string> = {
  idle: '',
  empty: 'Enter a code.',
  checking: 'Checking…',
  invalid: 'That code is not valid.',
  limited: 'Too many tries. Wait an hour and try again.',
  unavailable: 'The invite service did not answer. Try again.',
}

const label = 'font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground'

/** The invite code gate. It shows accepted only when the endpoint said valid:true, rejected only on valid:false, and says nothing else about a code. */
export default function Gate() {
  const [accepted, setAccepted] = useState<string | null>(kept)
  const [value, setValue] = useState('')
  const [phase, setPhase] = useState<Phase>('idle')
  const input = useRef<HTMLInputElement>(null)
  const inflight = useRef<AbortController>()
  const checking = phase === 'checking'

  useEffect(() => () => inflight.current?.abort(), [])

  // The input is disabled while checking, so it takes focus back once the answer is in.
  useEffect(() => {
    if (phase === 'invalid' || phase === 'limited' || phase === 'unavailable') {
      input.current?.focus()
      if (phase === 'invalid') input.current?.select()
    }
  }, [phase])

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const code = value.trim()
    if (!code) {
      setPhase('empty')
      input.current?.focus()
      return
    }
    inflight.current?.abort()
    const ctl = (inflight.current = new AbortController())
    setPhase('checking')
    try {
      if (await verify(code, ctl.signal)) {
        keep(code.toUpperCase())
        setAccepted(code.toUpperCase())
        setPhase('idle')
      } else setPhase('invalid')
    } catch (err) {
      if (ctl.signal.aborted) return
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
      <Card className="max-w-3xl p-6 md:p-10">
        <form onSubmit={submit} noValidate>
          {!accepted && (
            <div aria-busy={checking}>
              <label htmlFor="invite-code" className={label}>
                Invite code
              </label>
              <input
                ref={input}
                id="invite-code"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={checking}
                placeholder="HNZ-______"
                maxLength={32}
                autoCapitalize="characters"
                autoComplete="off"
                spellCheck={false}
                inputMode="text"
                aria-invalid={phase === 'invalid' || phase === 'empty'}
                aria-describedby="invite-hint"
                className="mt-3 h-16 w-full min-w-0 rounded-lg border border-border-strong bg-transparent px-4 font-mono text-2xl uppercase tracking-[0.06em] text-foreground placeholder:text-muted-foreground disabled:opacity-60 md:text-3xl"
              />
              <p id="invite-hint" className="mt-3 font-mono text-sm text-muted-foreground">
                HNZ- and six characters.
              </p>
            </div>
          )}

          <p role="status" aria-live="polite" className={`font-mono text-sm ${accepted ? 'flex items-center gap-2 text-base tracking-[0.14em]' : 'mt-6 min-h-5 text-foreground'}`}>
            {accepted ? (
              <>
                <Check size={18} aria-hidden="true" />
                CODE ACCEPTED
              </>
            ) : (
              SAYS[phase]
            )}
          </p>

          {!accepted && (
            <div className="mt-6">
              <button type="submit" disabled={checking} className={`${buttonClass('primary')} disabled:opacity-60`}>
                Check code
              </button>
            </div>
          )}

          {accepted && (
            <div className="mt-6">
              <p className="font-mono text-3xl tabular-nums tracking-[0.06em] md:text-4xl">{accepted}</p>
              <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-muted-foreground">
                This code is valid. Keep it: you will bind it to your wallet when the private terminal opens. Nothing is unlocked yet.
              </p>
              <button type="button" onClick={another} className={`${textLink} mt-4`}>
                Use a different code
              </button>
            </div>
          )}
        </form>
      </Card>
    </div>
  )
}
