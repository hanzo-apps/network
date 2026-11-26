import type { ReactNode } from 'react'

export const container = 'mx-auto w-full max-w-[1200px] px-4 md:px-8'

/** A page section: the container, the vertical rhythm, an optional anchor. */
export default function Section({ id, children, className = '', glow = false }: { id?: string; children: ReactNode; className?: string; glow?: boolean }) {
  return (
    <section id={id} className={`relative isolate scroll-mt-14 border-t border-border py-[72px] md:py-32 ${className}`}>
      {glow && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: 'radial-gradient(ellipse at 50% 55%, var(--white-06), transparent 60%)' }}
        />
      )}
      <div className={container}>{children}</div>
    </section>
  )
}

export const Eyebrow = ({ children }: { children: ReactNode }) => (
  <p className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">{children}</p>
)

export const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="text-5xl font-semibold leading-[1.05] tracking-[-0.02em] md:text-6xl">{children}</h2>
)

/** The 40px round holder for a step or card icon. */
export const Disc = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <span aria-hidden className={`relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border transition-colors duration-500 ${className}`}>
    {children}
  </span>
)
