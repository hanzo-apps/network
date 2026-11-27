import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { buttonClass, navLink } from '@/components/ui/button'
import { DOCS } from '@/lib/links'
import { EARLY, INVITE_LABEL } from '@/lib/early'

const LINKS = [
  { label: 'Solutions', to: '/#solutions' },
  { label: 'Build', to: '/build' },
  { label: 'Economics', to: '/economics' },
  { label: 'Ecosystem', to: '/ecosystem' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Docs', href: DOCS },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { key } = useLocation()
  const toggle = useRef<HTMLButtonElement>(null)
  useEffect(() => setOpen(false), [key])
  useEffect(() => {
    if (!open) return
    const esc = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      toggle.current?.focus()
    }
    document.addEventListener('keydown', esc)
    return () => document.removeEventListener('keydown', esc)
  }, [open])

  const links = (cls: string) =>
    LINKS.map((l) =>
      'to' in l ? (
        <Link key={l.label} to={l.to!} className={cls}>{l.label}</Link>
      ) : (
        <a key={l.label} href={l.href} className={cls}>{l.label}</a>
      ),
    )

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="flex h-[60px] w-full items-center justify-between px-5 md:px-8 lg:px-9">
        <Link
          to="/"
          aria-label="Hanzo home"
          data-slot="wordmark"
          className="inline-flex items-center rounded-sm text-foreground no-underline"
          style={{
            fontSize: '28px',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            transform: 'translateY(-0.08em)',
          }}
        >
          hanzo
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-5 md:flex lg:gap-8">{links(navLink)}</nav>
        <div className="hidden md:block">
          {/* "Invite code" between md and lg keeps the row clear of the links at 768px; the name stays whole for everyone. */}
          <Link to={EARLY} aria-label={INVITE_LABEL} className={buttonClass('small')}>
            <span className="lg:hidden">Invite code</span>
            <span className="hidden lg:inline">{INVITE_LABEL}</span>
          </Link>
        </div>
        <div className="md:hidden">
          <button
            ref={toggle}
            type="button"
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-foreground"
            aria-expanded={open}
            aria-controls="menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(!open)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
              {open ? <path d="M4 4l12 12M16 4L4 16" /> : <path d="M3 6h14M3 14h14" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav id="menu" aria-label="Menu" className="flex flex-col border-t border-border px-[clamp(20px,2.5vw,36px)] pb-4 md:hidden">
          {links('flex h-12 items-center text-base text-foreground')}
          <Link to={EARLY} className={`${buttonClass('primary')} mt-2`}>
            {INVITE_LABEL}
          </Link>
        </nav>
      )}
    </header>
  )
}
