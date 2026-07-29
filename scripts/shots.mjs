// Route screenshots + a mobile-overflow / touch-target audit at 390px.
// Usage: node scripts/shots.mjs <outDir> [baseUrl]
import { chromium } from 'playwright'
import { mkdirSync, writeFileSync } from 'node:fs'

const out = process.argv[2] || 'shots'
const base = process.argv[3] || 'http://127.0.0.1:4173'
const routes = [
  '/', '/pricing', '/products', '/solutions', '/team', '/blockchain',
  '/ai', '/cloud', '/platform', '/zen', '/brand', '/security', '/contact',
  '/enterprise', '/open-source', '/status', '/login', '/download',
  '/blockchain/wallet', '/products/integrations', '/nope-404',
]

mkdirSync(out, { recursive: true })
const browser = await chromium.launch()
const report = []

for (const [label, width, height] of [['m', 390, 844], ['d', 1280, 900]]) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    isMobile: label === 'm',
    hasTouch: label === 'm',
  })
  const page = await ctx.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(String(e).slice(0, 200)))
  for (const r of routes) {
    const name = r === '/' ? 'root' : r.slice(1).replace(/\//g, '_')
    errors.length = 0
    await page.goto(base + r, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => {})
    await page.waitForTimeout(500)
    const audit = await page.evaluate((vw) => {
      const de = document.documentElement
      const overflow = Math.max(de.scrollWidth, document.body.scrollWidth) - vw
      const wide = []
      if (overflow > 1) {
        for (const el of document.querySelectorAll('body *')) {
          const b = el.getBoundingClientRect()
          if (b.width > 0 && b.right > vw + 1 && b.left < vw) {
            const cs = getComputedStyle(el)
            if (cs.position === 'fixed' || cs.overflowX === 'auto' || cs.overflowX === 'scroll') continue
            wide.push(`${el.tagName.toLowerCase()}.${(el.className || '').toString().slice(0, 60)} w=${Math.round(b.width)} r=${Math.round(b.right)}`)
            if (wide.length > 6) break
          }
        }
      }
      const small = []
      for (const el of document.querySelectorAll('a,button,[role=button],input,select,summary')) {
        const b = el.getBoundingClientRect()
        if (b.width === 0 || b.height === 0) continue
        const cs = getComputedStyle(el)
        if (cs.display === 'inline' || cs.visibility === 'hidden') continue
        if (b.height < 44 || b.width < 24) {
          small.push(`${el.tagName.toLowerCase()}[${(el.textContent || '').trim().slice(0, 24)}] ${Math.round(b.width)}x${Math.round(b.height)}`)
        }
      }
      return { overflow, wide, smallCount: small.length, small: small.slice(0, 12), text: document.body.innerText.length }
    }, width)
    await page.screenshot({ path: `${out}/${label}-${name}.png`, fullPage: false })
    report.push({ view: label, route: r, ...audit, errors: [...errors] })
  }
  await ctx.close()
}
await browser.close()
writeFileSync(`${out}/report.json`, JSON.stringify(report, null, 1))
const bad = report.filter((r) => r.view === 'm' && r.overflow > 1)
console.log('routes:', routes.length)
console.log('mobile horizontal overflow on:', bad.length, bad.map((b) => `${b.route}(+${b.overflow})`).join(' '))
console.log('touch targets <44px tall (mobile):', report.filter((r) => r.view === 'm').reduce((a, b) => a + b.smallCount, 0))
console.log('empty pages:', report.filter((r) => r.text < 200).map((r) => r.view + r.route).join(' ') || 'none')
console.log('page errors:', report.filter((r) => r.errors.length).map((r) => r.view + r.route + ':' + r.errors[0]).join(' | ') || 'none')
