import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import Footer from './Footer'
import Nav from './Nav'

/** The browser title of each page. */
const TITLES: Record<string, string> = {
  '/': 'Hanzo Network: the blockchain for global intelligence',
  '/build': 'Build on Hanzo Network',
  '/economics': 'Economics of the AI token · Hanzo Network',
  '/ecosystem': 'Ecosystem · Hanzo Network',
  '/pricing': 'Pricing · Hanzo Network',
  '/early': 'Early access · Hanzo Network',
}

/** The page frame every route shares: skip link, nav, content, footer. Sets the browser title. */
export default function Shell() {
  const { pathname } = useLocation()
  useEffect(() => {
    document.title = TITLES[pathname] ?? TITLES['/']
  }, [pathname])
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main"><Outlet /></main>
      <Footer />
    </>
  )
}
