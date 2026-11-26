import { Link } from 'react-router-dom'
import { navLink } from '@/components/ui/button'
import { DISCORD, DOCS, HANZO, NODE_REPO, PRIVACY, TERMS } from '@/lib/links'
import { PrivacyChoicesIcon } from './Consent'

const LINKS = [
  { label: 'hanzo.ai', href: HANZO },
  { label: 'Build', href: '/build' },
  { label: 'Economics', href: '/economics' },
  { label: 'Ecosystem', href: '/ecosystem' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Docs', href: DOCS },
  { label: 'GitHub', href: NODE_REPO },
  { label: 'Discord', href: DISCORD },
  { label: 'Privacy', href: PRIVACY },
  { label: 'Terms', href: TERMS },
]

export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between md:px-8">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Hanzo AI, Inc.</p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3">
          {LINKS.map((l) =>
            l.href.startsWith('/') ? (
              <Link key={l.label} to={l.href} className={navLink}>{l.label}</Link>
            ) : (
              <a key={l.label} href={l.href} className={navLink}>{l.label}</a>
            ),
          )}
          {/* The cookie sheet: components/Consent.tsx answers #choices. */}
          <a href="#choices" className={`${navLink} inline-flex items-center gap-1.5`}>
            <PrivacyChoicesIcon height={12} />
            Your Privacy Choices
          </a>
        </nav>
      </div>
    </footer>
  )
}
