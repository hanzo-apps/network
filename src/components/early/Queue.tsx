import { useEffect, useRef, useState, type FormEvent } from 'react'
import Segments, { type Option } from './Segments'
import Section, { H2 } from '@/components/ui/section'
import { buttonClass, textLink } from '@/components/ui/button'
import Card from '@/components/ui/card'
import { useAnalytics } from '@hanzo/event/react'
import { drift, join, wait, InviteError, ROLES, X_HANDLE, type Role } from '@/lib/invite'
import { PRIVACY } from '@/lib/links'

type Mode = 'email' | 'xHandle'
type Phase = 'idle' | 'sending' | 'done' | 'limited' | 'unavailable'

const MODES: Option<Mode>[] = [
  { value: 'email', label: 'Email' },
  { value: 'xHandle', label: 'X handle' },
]

/** What the status says. `after` is the seconds the server asked for, when it did. */
const says = (phase: Phase, after: number | null) =>
  ({
    idle: '',
    sending: 'Sending…',
    done: 'You are on the list.',
    limited: `Too many tries. Try again ${wait(after)}.`,
    unavailable: 'Your entry could not be saved. Try again later.',
  })[phase]

const FIELD = {
  email: { label: 'Email address', error: 'Enter an email address like name@example.com.' },
  xHandle: { label: 'X handle', error: 'Use 1 to 15 letters, numbers or underscores.' },
}

const REJECTED = 'Check your email or handle.'

const eyebrow = 'block font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground'
const errorText = 'mt-3 font-mono text-sm text-foreground'

/** The queue: an email or a handle, a role, and nothing else. The server answers the same for a new and a repeat entry, so the page does too. */
export default function Queue() {
  const [mode, setMode] = useState<Mode>('email')
  const [value, setValue] = useState('')
  const [role, setRole] = useState<Role | ''>('')
  const [fieldError, setFieldError] = useState<string | null>(null)
  const [focus, setFocus] = useState<{ on: 'field' | 'role' | 'done' | 'button' } | null>(null)
  const [roleError, setRoleError] = useState(false)
  const [phase, setPhase] = useState<Phase>('idle')
  const [sent, setSent] = useState<Role | null>(null) // the role that went out, not whatever is picked now
  const [after, setAfter] = useState<number | null>(null)
  const contact = useRef<HTMLInputElement>(null)
  const roles = useRef<HTMLDivElement>(null)
  const button = useRef<HTMLButtonElement>(null)
  const confirmation = useRef<HTMLDivElement>(null)
  const analytics = useAnalytics()
  const inflight = useRef<AbortController>()
  const sending = phase === 'sending'

  useEffect(() => () => inflight.current?.abort(), [])

  // Focus moves after the render that holds the answer: the error and aria-invalid, the confirmation, or the re-enabled button.
  useEffect(() => {
    if (focus?.on === 'field') contact.current?.focus()
    else if (focus?.on === 'role') roles.current?.querySelector('input')?.focus()
    else if (focus?.on === 'done') confirmation.current?.focus()
    else if (focus?.on === 'button') button.current?.focus()
  }, [focus])

  const pickMode = (m: Mode) => {
    setMode(m)
    setValue('')
    setFieldError(null)
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const el = contact.current!
    const badContact = !el.checkValidity()
    setFieldError(badContact ? FIELD[mode].error : null)
    setRoleError(role === '')
    if (badContact || role === '') return setFocus({ on: badContact ? 'field' : 'role' })

    inflight.current?.abort()
    const ctl = (inflight.current = new AbortController())
    setSent(role)
    setPhase('sending')
    try {
      await join(mode === 'email' ? { email: value.trim(), role } : { xHandle: value, role }, ctl.signal)
      setPhase('done')
      setFocus({ on: 'done' })
    } catch (err) {
      if (ctl.signal.aborted) return
      const d = drift(err)
      if (d) analytics.captureError(d)
      if (err instanceof InviteError && err.kind === 'rejected') {
        setFieldError(REJECTED)
        setPhase('idle')
        setFocus({ on: 'field' })
      } else {
        setAfter(err instanceof InviteError ? err.retryAfter : null)
        setPhase(err instanceof InviteError && err.kind === 'limited' ? 'limited' : 'unavailable')
        setFocus({ on: 'button' })
      }
    }
  }

  const f = FIELD[mode]
  return (
    <Section id="queue">
      <H2>No code? Join the queue.</H2>
      <Card className="mt-12 grid lg:grid-cols-[7fr_5fr]">
        <div className="min-w-0 p-6 md:p-10">
        {phase !== 'done' && (
          <form onSubmit={submit} noValidate aria-busy={sending} className="flex flex-col gap-8">
            <Segments legend="Sign up with" hideLegend name="contact" options={MODES} value={mode} onChange={pickMode} disabled={sending} />
            <div>
              <label htmlFor="queue-contact" className={eyebrow}>
                {f.label}
              </label>
              <input
                ref={contact}
                key={mode}
                id="queue-contact"
                value={value}
                onChange={(e) => {
                  setValue(mode === 'xHandle' ? e.target.value.replace(/^@/, '') : e.target.value)
                  setFieldError(null)
                }}
                disabled={sending}
                required
                type={mode === 'email' ? 'email' : 'text'}
                autoComplete={mode === 'email' ? 'email' : 'off'}
                inputMode={mode === 'email' ? 'email' : 'text'}
                pattern={mode === 'xHandle' ? X_HANDLE : undefined}
                maxLength={mode === 'email' ? 254 : undefined}
                autoCapitalize="none"
                spellCheck={false}
                aria-invalid={fieldError !== null}
                aria-describedby={[mode === 'xHandle' && 'queue-contact-hint', fieldError && 'queue-contact-error'].filter(Boolean).join(' ') || undefined}
                className="mt-3 h-12 w-full min-w-0 max-w-[32rem] rounded-lg border border-border-strong bg-transparent px-4 font-mono text-lg text-foreground disabled:opacity-60"
              />
              {mode === 'xHandle' && (
                <p id="queue-contact-hint" className="mt-3 font-mono text-sm text-muted-foreground">
                  Without the @.
                </p>
              )}
              {fieldError && (
                <p id="queue-contact-error" className={errorText}>
                  {fieldError}
                </p>
              )}
            </div>
            <div ref={roles}>
              <Segments legend="I am a" name="role" options={[...ROLES]} value={role} disabled={sending} onChange={(r) => { setRole(r); setRoleError(false) }} describedBy={roleError ? 'queue-role-error' : undefined}>
                {roleError && (
                  <p id="queue-role-error" className={errorText}>
                    Choose a role.
                  </p>
                )}
              </Segments>
            </div>
            <div>
              <button ref={button} type="submit" disabled={sending} className={`${buttonClass('secondary')} disabled:opacity-60`}>
                Join the queue
              </button>
            </div>
          </form>
        )}

        <div ref={confirmation} tabIndex={phase === 'done' ? -1 : undefined} className="outline-offset-8">
          <p role="status" aria-live="polite" className={`font-mono text-sm empty:min-h-0 ${phase === 'done' ? 'text-xl' : 'mt-6 min-h-5 empty:mt-0'}`}>
            {says(phase, after)}
          </p>
          {phase === 'done' && <p className={`${eyebrow} mt-3`}>Role: {ROLES.find((r) => r.value === sent)?.label}</p>}
        </div>

        </div>
        <aside className="border-t border-border p-6 md:p-10 lg:border-l lg:border-t-0">
          <p className={eyebrow}>What we store</p>
          <p className="mt-6 max-w-[64ch] text-base text-muted-foreground">We keep your email or handle, your role and that you signed up here.</p>
          <a href={PRIVACY} className={`${textLink} mt-1`}>
            Privacy
          </a>
        </aside>
      </Card>
    </Section>
  )
}
