const base = 'inline-flex h-6 items-center rounded-full px-2.5 font-mono text-xs uppercase tracking-[0.14em]'

// Monochrome, told apart by fill and line, never by colour.
const looks = {
  Live: `${base} bg-foreground text-background`,
  'In progress': `${base} border border-border-strong text-foreground`,
  Designed: `${base} border border-dashed border-border-strong text-muted-foreground`,
} as const

export type Status = keyof typeof looks

/** How real a thing is today. The site's only status words: <Tag is="Designed" />. */
export default function Tag({ is }: { is: Status }) {
  return <span className={looks[is]}>{is}</span>
}
