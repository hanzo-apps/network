import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import Glow from './glow'

export const container = 'mx-auto w-full max-w-[1200px] px-4 md:px-8'

/** A page section: the container, the vertical rhythm, an optional anchor. */
export default function Section({ id, children, className = '', glow = false }: { id?: string; children: ReactNode; className?: string; glow?: boolean }) {
  return (
    <section id={id} className={`relative isolate border-t border-border py-[72px] md:py-32 ${className}`}>
      {glow && <Glow at="50% 55%" className="inset-0 -z-10" />}
      <div className={container}>{children}</div>
    </section>
  )
}

/** The one small mono uppercase label: eyebrows, table heads, captions, units. `tone` is its ink; `as` its element. */
export function Label({
  as = 'p',
  tone = 'muted',
  className = '',
  children,
  ...rest
}: { as?: 'p' | 'span' | 'dt' | 'th' | 'figcaption'; tone?: 'muted' | 'strong'; className?: string; children: ReactNode; scope?: 'col' | 'row' } & HTMLAttributes<HTMLElement>) {
  const Tag: ElementType = as
  return (
    <Tag className={`font-mono text-xs font-normal uppercase tracking-[0.18em] ${tone === 'strong' ? 'text-foreground' : 'text-muted-foreground'} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

export const Eyebrow = ({ children }: { children: ReactNode }) => <Label className="mb-4">{children}</Label>

/** The page heading. `big` is the home page's larger size. */
export const H1 = ({ children, big = false, className = '' }: { children: ReactNode; big?: boolean; className?: string }) => (
  <h1 className={`text-6xl font-[560] leading-[1.0] tracking-[-0.045em] ${big ? 'md:text-8xl' : 'md:text-7xl'} ${className}`}>{children}</h1>
)

export const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="text-5xl font-[560] leading-[1.05] tracking-[-0.035em] md:text-6xl">{children}</h2>
)

/** The 40px round holder for a step or card icon. */
export const Disc = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <span aria-hidden className={`relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border transition-colors duration-500 ${className}`}>
    {children}
  </span>
)
