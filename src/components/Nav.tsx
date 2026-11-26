import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HanzoLogo } from '@hanzo/logo'
import { buttonClass } from '@/components/ui/button'

const LINKS = [
  { label: 'How it works', to: '/#how' },
  { label: 'Providers', to: '/#provide' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Docs', href: 'https://docs.hanzo.ai' },
]

const item = 'rounded-sm text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { key } = useLocation()
  useEffect(() => setOpen(false), [key])
  useEffect(() => {
    if (!open) return
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
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
      <div className="mx-auto flex h-14 w-full max-w-[1200px] items-center justify-between px-4 md:px-8">
        <Link to="/" aria-label="Hanzo Network home" className="flex items-center gap-2.5 rounded-sm text-lg font-semibold tracking-[-0.01em] text-foreground">
          <HanzoLogo variant="current" size={20} />
          Hanzo Network
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-8 sm:flex">{links(item)}</nav>
        <div className="hidden sm:block">
          <a href="https://platform.hanzo.ai/api-keys" className={buttonClass('small')}>
            Get an API key
          </a>
        </div>
        <div className="sm:hidden">
        <button
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
        <nav id="menu" aria-label="Menu" className="flex flex-col border-t border-border px-4 pb-4 sm:hidden">
          {links('flex h-12 items-center text-base text-foreground')}
        </nav>
      )}
    </header>
  )
}
