import type { ReactNode } from 'react'
import Footer from './Footer'
import Nav from './Nav'

/** The page frame both routes share: skip link, nav, content, footer. */
export default function Shell({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </>
  )
}
