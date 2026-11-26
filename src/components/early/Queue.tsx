import { useEffect, useRef, useState, type FormEvent } from 'react'
import Segments, { type Option } from './Segments'
import Section, { H2 } from '@/components/home/Section'
import { buttonClass, textLink } from '@/components/ui/button'
import Card from '@/components/ui/card'
import { join, InviteError, type Role } from '@/lib/invite'
import { PRIVACY } from '@/lib/links'

type Mode = 'email' | 'handle'
type Phase = 'idle' | 'sending' | 'done' | 'limited' | 'unavailable'

const MODES: Option<Mode>[] = [
  { value: 'email', label: 'Email' },
  { value: 'handle', label: 'Handle' },
]
const ROLES: Option<Role>[] = [
  { value: 'operator', label: 'Node operator' },
  { value: 'builder', label: 'Builder' },
  { value: 'holder', label: 'Holder' },
]

const SAYS: Record<Phase, string> = {
  idle: '',
  sending: 'Sending…',
  done: 'You are on the list.',
  limited: 'Too many tries. Try again later.',
  unavailable: 'The queue did not answer. Try again.',
}

const FIELD = {
  email: { label: 'Email address', error: 'Enter an email address like name@example.com.' },
  handle: { label: 'Hanzo handle', error: 'Use 2 to 32 lower-case letters, numbers or underscores.' },
}

const eyebrow = 'font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground'
const errorText = 'mt-3 font-mono text-sm text-foreground'

/** The queue: an email or a handle, a role, and nothing else. The server answers the same for a new and a repeat entry, so the page does too. */
export default function Queue() {
  const [mode, setMode] = useState<Mode>('email')
  const [value, setValue] = useState('')
  const [role, setRole] = useState<Role | ''>('')
  const [fieldError, setFieldError] = useState(false)
  const [roleError, setRoleError] = useState(false)
  const [phase, setPhase] = useState<Phase>('idle')
  const contact = useRef<HTMLInputElement>(null)
  const roles = useRef<HTMLDivElement>(null)
  const inflight = useRef<AbortController>()
  const sending = phase === 'sending'

  useEffect(() => () => inflight.current?.abort(), [])

  const pickMode = (m: Mode) => {
    setMode(m)
    setValue('')
    setFieldError(false)
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const el = contact.current!
    const badContact = !el.checkValidity()
    setFieldError(badContact)
    setRoleError(role === '')
    if (badContact) return el.focus()
    if (role === '') return roles.current?.querySelector('input')?.focus()

    inflight.current?.abort()
    const ctl = (inflight.current = new AbortController())
    setPhase('sending')
    try {
      await join(mode === 'email' ? { email: value.trim(), role } : { handle: value, role }, ctl.signal)
      setPhase('done')
    } catch (err) {
      if (ctl.signal.aborted) return
      setPhase(err instanceof InviteError && err.kind === 'limited' ? 'limited' : 'unavailable')
    }
  }

  const f = FIELD[mode]
  return (
    <Section id="queue">
      <H2>No code? Join the queue.</H2>
      <Card className="mt-12 max-w-3xl p-6 md:p-10">
        {phase !== 'done' && (
          <form onSubmit={submit} noValidate aria-busy={sending} className="flex flex-col gap-8">
            <Segments legend="Sign up with" hideLegend name="contact" options={MODES} value={mode} onChange={pickMode} />
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
                  setValue(mode === 'handle' ? e.target.value.toLowerCase() : e.target.value)
                  setFieldError(false)
                }}
                disabled={sending}
                required
                type={mode === 'email' ? 'email' : 'text'}
                autoComplete={mode === 'email' ? 'email' : 'off'}
                inputMode={mode === 'email' ? 'email' : 'text'}
                pattern={mode === 'handle' ? '[a-z0-9_]{2,32}' : undefined}
                autoCapitalize="none"
                spellCheck={false}
                aria-invalid={fieldError}
                aria-describedby={fieldError ? 'queue-contact-error' : undefined}
                className="mt-3 h-12 w-full min-w-0 rounded-lg border border-border-strong bg-transparent px-4 font-mono text-lg text-foreground disabled:opacity-60"
              />
              {fieldError && (
                <p id="queue-contact-error" className={errorText}>
                  {f.error}
                </p>
              )}
            </div>
            <div ref={roles}>
              <Segments legend="I am a" name="role" options={ROLES} value={role} onChange={(r) => { setRole(r); setRoleError(false) }} describedBy={roleError ? 'queue-role-error' : undefined}>
                {roleError && (
                  <p id="queue-role-error" className={errorText}>
                    Choose a role.
                  </p>
                )}
              </Segments>
            </div>
            <div>
              <button type="submit" disabled={sending} className={`${buttonClass('secondary')} disabled:opacity-60`}>
                Join the queue
              </button>
            </div>
          </form>
        )}

        <p role="status" aria-live="polite" className={`font-mono text-sm empty:min-h-0 ${phase === 'done' ? 'text-xl' : 'mt-6 min-h-5 empty:mt-0'}`}>
          {SAYS[phase]}
        </p>
        {phase === 'done' && <p className={`${eyebrow} mt-3`}>Role: {ROLES.find((r) => r.value === role)?.label}</p>}

        <div className="mt-8 border-t border-border pt-6">
          <p className="max-w-[64ch] text-base text-muted-foreground">We store your email or handle, your role and that you signed up here. Nothing else.</p>
          <a href={PRIVACY} className={`${textLink} mt-1`}>
            Privacy
          </a>
        </div>
      </Card>
    </Section>
  )
}
