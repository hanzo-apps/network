import type { ReactNode } from 'react'

/** A polite live region: what it holds is announced to screen readers when it changes. Hidden by default; pass a className to show it. */
export default function Live({ children, className = 'sr-only' }: { children: ReactNode; className?: string }) {
  return (
    <p role="status" aria-live="polite" className={className}>
      {children}
    </p>
  )
}
