import {
  API_KEYS,
  AUP,
  BLUESKY,
  CLI_RELEASES,
  DISCORD,
  DOCS,
  DOCS_CHOOSE_ARCH,
  DOCS_COOKBOOK,
  DOCS_GUIDES,
  DOCS_OPENAPI,
  DOCS_QUICKSTART,
  FACEBOOK,
  GITHUB_ORG,
  HANZO,
  HANZO_AGENCY,
  HANZO_APP,
  HANZO_APP_LEARN,
  HANZO_TEAM,
  HANZO_UNIVERSITY,
  INSTAGRAM,
  LINKEDIN,
  PRIVACY,
  REDDIT,
  STATUS_AI,
  TELEGRAM,
  TERMS,
  TIKTOK,
  X,
} from '@/lib/links'
import { PrivacyChoicesIcon } from './Consent'

type FooterLink = { label: string; href: string; external?: boolean }
type FooterColumn = { title: string; href: string; external?: boolean; links: FooterLink[] }

const h = (path: string) => `${HANZO}${path}`

const COLUMNS: FooterColumn[] = [
  {
    title: 'Models',
    href: h('/models'),
    links: [
      { label: 'All models', href: h('/models') },
      { label: 'Enso', href: h('/enso') },
      { label: 'Kai', href: h('/kai') },
      { label: 'Zen', href: h('/zen') },
      { label: 'Benchmarks', href: h('/benchmarks') },
      { label: 'Compare models', href: h('/compare') },
      { label: 'Open source', href: h('/open-source') },
    ],
  },
  {
    title: 'Apps',
    href: h('/products'),
    links: [
      { label: 'Hanzo App', href: HANZO_APP, external: true },
      { label: 'Hanzo Dev', href: h('/dev') },
      { label: 'Hanzo Design', href: h('/design') },
      { label: 'Hanzo Bot', href: h('/bot') },
      { label: 'Hanzo Team', href: HANZO_TEAM, external: true },
      { label: 'Hanzo CLI', href: h('/cli') },
      { label: 'Desktop app', href: h('/desktop') },
      { label: 'Browser extension', href: h('/extension') },
      { label: 'All downloads', href: h('/download') },
    ],
  },
  {
    title: 'Creative AI',
    href: h('/models#creative'),
    links: [
      { label: 'Video · Koma', href: h('/koma') },
      { label: 'Images · Iro', href: h('/iro') },
      { label: '3D · Mori', href: h('/mori') },
      { label: 'Sound effects · Oto', href: h('/oto') },
      { label: 'Voice · Koe', href: h('/koe') },
      { label: 'Music · Uta', href: h('/uta') },
    ],
  },
  {
    title: 'API Platform',
    href: h('/platform'),
    links: [
      { label: 'Overview', href: h('/platform') },
      { label: 'API keys', href: API_KEYS, external: true },
      { label: 'Gateway', href: h('/gateway') },
      { label: 'Agents', href: h('/agents') },
      { label: 'Playground', href: h('/playground') },
      { label: 'MCP', href: h('/mcp') },
      { label: 'Pricing', href: h('/pricing') },
    ],
  },
  {
    title: 'Cloud',
    href: h('/products'),
    links: [
      { label: 'Base', href: h('/base') },
      { label: 'Machines', href: h('/machines') },
      { label: 'Search', href: h('/search') },
      { label: 'Datastore', href: h('/datastore') },
      { label: 'Memory', href: h('/products/memory') },
      { label: 'Realtime', href: h('/realtime') },
      { label: 'Observability', href: h('/o11y') },
      { label: 'Insights', href: h('/insights') },
      { label: 'Commerce', href: h('/commerce') },
    ],
  },
  {
    title: 'Developers',
    href: DOCS,
    external: true,
    links: [
      { label: 'Documentation', href: DOCS, external: true },
      { label: 'API reference', href: DOCS_OPENAPI, external: true },
      { label: 'Quickstart', href: DOCS_QUICKSTART, external: true },
      { label: 'SDKs', href: h('/sdks') },
      { label: 'Integrations', href: h('/integrations') },
      { label: 'Skills', href: h('/skills') },
      { label: 'GitHub', href: GITHUB_ORG, external: true },
      { label: 'Status', href: STATUS_AI, external: true },
    ],
  },
  {
    title: 'Solutions',
    href: h('/solutions'),
    links: [
      { label: 'All solutions', href: h('/solutions') },
      { label: 'Enterprise', href: h('/enterprise') },
      { label: 'Agency', href: HANZO_AGENCY, external: true },
      { label: 'Customer stories', href: h('/customers') },
      { label: 'Contact sales', href: h('/contact-sales') },
    ],
  },
  {
    title: 'Teams',
    href: h('/solutions'),
    links: [
      { label: 'Finance', href: h('/solutions/finance') },
      { label: 'Data', href: h('/solutions/data') },
      { label: 'Sales', href: h('/solutions/sales') },
      { label: 'Marketing', href: h('/solutions/marketing') },
      { label: 'Operations', href: h('/solutions/operations') },
      { label: 'Engineering', href: h('/solutions/engineering') },
      { label: 'Design', href: h('/solutions/design') },
    ],
  },
  {
    title: 'Industries',
    href: h('/solutions'),
    links: [
      { label: 'Cybersecurity', href: h('/solutions/cybersecurity') },
      { label: 'Financial services', href: h('/solutions/financial-services') },
      { label: 'Healthcare', href: h('/solutions/healthcare') },
      { label: 'Law', href: h('/solutions/law') },
      { label: 'Retail', href: h('/solutions/retail') },
      { label: 'Government', href: h('/solutions/government') },
      { label: 'Education', href: h('/solutions/education') },
    ],
  },
  {
    title: 'Programs',
    href: h('/startups'),
    links: [
      { label: 'Startups', href: h('/startups') },
      { label: 'Partner network', href: h('/affiliate') },
      { label: 'Reserved tier', href: h('/solutions/reserved') },
      { label: 'Cost calculator', href: h('/calculator') },
      { label: 'OSS grants', href: h('/open-source') },
    ],
  },
  {
    title: 'Learn',
    href: h('/learn'),
    links: [
      { label: 'Blog', href: h('/blog') },
      { label: 'Practical Guides', href: DOCS_GUIDES, external: true },
      { label: 'Choose Architecture', href: DOCS_CHOOSE_ARCH, external: true },
      { label: 'Cookbook', href: DOCS_COOKBOOK, external: true },
      { label: 'Help center', href: h('/support') },
      { label: 'Hanzo University', href: HANZO_UNIVERSITY, external: true },
      { label: 'Start Free', href: HANZO_APP_LEARN, external: true },
      { label: 'Release notes', href: CLI_RELEASES, external: true },
    ],
  },
  {
    title: 'Company',
    href: h('/about'),
    links: [
      { label: 'About', href: h('/about') },
      { label: 'Careers', href: h('/careers') },
      { label: 'News', href: h('/press') },
      { label: 'Investors', href: h('/investors') },
      { label: 'Brand', href: h('/brand') },
      { label: 'Philosophy', href: h('/philosophy') },
      { label: 'Security', href: h('/security') },
      { label: 'Trust & transparency', href: h('/trust') },
      { label: 'Contact', href: h('/contact') },
    ],
  },
]

const SOCIALS: FooterLink[] = [
  { label: 'Discord', href: DISCORD, external: true },
  { label: 'Telegram', href: TELEGRAM, external: true },
  { label: 'X', href: X, external: true },
  { label: 'GitHub', href: GITHUB_ORG, external: true },
  { label: 'LinkedIn', href: LINKEDIN, external: true },
  { label: 'Facebook', href: FACEBOOK, external: true },
  { label: 'Bluesky', href: BLUESKY, external: true },
  { label: 'Reddit', href: REDDIT, external: true },
  { label: 'TikTok', href: TIKTOK, external: true },
  { label: 'Instagram', href: INSTAGRAM, external: true },
]

export default function Footer() {
  return (
    <footer
      data-slot="footer"
      className="flex w-full flex-col gap-3.5 overflow-hidden border-t border-border bg-background px-[clamp(20px,2.5vw,36px)] pt-[clamp(28px,3vw,40px)] pb-[18px]"
    >
      <div className="grid w-full grid-cols-2 gap-x-3 gap-y-4 min-[390px]:grid-cols-3 sm:gap-x-6 lg:grid-cols-[repeat(6,max-content)] lg:justify-between lg:gap-x-5">
        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title} className="flex min-w-0 flex-col gap-0.5">
            <a
              href={col.href}
              {...(col.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="inline-flex min-h-6 min-w-6 items-center pb-1 text-[13.5px] font-semibold text-foreground no-underline"
            >
              {col.title}
              {col.external ? ' ↗' : ''}
            </a>
            <div className="flex flex-col">
              {col.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex min-h-6 min-w-6 items-center py-0.5 text-[13px] leading-[1.38] text-muted-foreground no-underline transition-colors duration-150 hover:text-foreground"
                >
                  {l.label}
                  {l.external ? ' ↗' : ''}
                </a>
              ))}
            </div>
          </nav>
        ))}
      </div>

      <div className="flex w-full flex-col border-t border-border pt-3">
        <nav
          aria-label="Hanzo Social Channels"
          data-slot="footer-socials"
          className="flex w-full flex-wrap items-center gap-x-5 gap-y-2 md:justify-between md:gap-x-4"
        >
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-6 min-w-6 items-center py-0.5 text-[13px] leading-[1.35] text-muted-foreground no-underline transition-colors duration-150 hover:text-foreground"
            >
              {s.label} ↗
            </a>
          ))}
        </nav>
      </div>

      <div className="flex min-h-[30px] w-full flex-wrap items-center gap-x-4 gap-y-2 pt-0.5 pr-[36px] sm:pr-[42px]">
        <span className="text-[13px] text-muted-foreground">© {new Date().getFullYear()} Hanzo AI Inc</span>
        <nav aria-label="Terms & Policies" className="flex min-w-0 flex-wrap items-center gap-x-[22px] gap-y-2 sm:ml-auto">
          <a href={TERMS} className="inline-flex min-h-6 items-center text-[13px] leading-[1.35] text-muted-foreground no-underline transition-colors duration-150 hover:text-foreground">
            Terms
          </a>
          <a href={PRIVACY} className="inline-flex min-h-6 items-center text-[13px] leading-[1.35] text-muted-foreground no-underline transition-colors duration-150 hover:text-foreground">
            Privacy
          </a>
          <a href={AUP} className="inline-flex min-h-6 items-center text-[13px] leading-[1.35] text-muted-foreground no-underline transition-colors duration-150 hover:text-foreground">
            Usage policy
          </a>
          {/* The cookie sheet: components/Consent.tsx answers #choices. */}
          <a href="#choices" className="inline-flex min-h-6 items-center gap-1.5 text-[13px] leading-[1.35] text-muted-foreground no-underline transition-colors duration-150 hover:text-foreground">
            <PrivacyChoicesIcon height={12} />
            Privacy choices
          </a>
        </nav>
      </div>
    </footer>
  )
}
