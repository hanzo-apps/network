import type { ReactNode } from 'react'

export const container = 'mx-auto w-full max-w-[1200px] px-4 md:px-8'

/** A page section: the container, the vertical rhythm, an optional anchor. */
export default function Section({ id, children, className = '' }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`scroll-mt-14 border-t border-border py-[72px] md:py-32 ${className}`}>
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
