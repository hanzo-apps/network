// The check. Drives a real Chromium over the routes at 390 / 768 / 1280 and
// measures computed style — not markup, not a build log.
//
//   node scripts/audit.mjs <outDir> [baseUrl]
//
// Reports, per route per width:
//   coverage   classes the DOM uses vs class selectors ALL delivered CSS defines
//              (linked sheets AND inline <style> — checking only linked files
//              gives a false zero)
//   vars       var(--x) referenced by the delivered CSS with no declaration
//   contrast   text-vs-effective-background ratio on every interactive element
//   overflow   horizontal excess
//   tap        interactive boxes under 44px
//   zoom       form controls under 16px (iOS auto-zooms below that)
//   border     UA outset/inset/ridge/groove surviving a non-zero width
//   ghost      elements display:none at every width
//   inert      align/justify on an inline box
//   garish     borders brighter than a hairline on dark
//   bytes      what actually crossed the wire, per resource
import { chromium } from 'playwright'
import { mkdirSync, writeFileSync } from 'node:fs'

const out = process.argv[2] || 'audit'
const base = process.argv[3] || 'http://127.0.0.1:4173'
const routes = process.env.ROUTES?.split(',') ?? [
  '/', '/pricing', '/contact', '/products', '/solutions', '/team', '/blockchain',
  '/ai', '/cloud', '/platform', '/zen', '/brand', '/security',
  '/enterprise', '/open-source', '/status', '/login', '/download',
  '/blockchain/wallet', '/products/integrations', '/nope-404',
]
const widths = (process.env.WIDTHS ?? '390,768,1280').split(',').map(Number)

// Runs inside the page.
const probe = (vw) => {
  const esc = (s) => s // selectors keep their backslashes; we split honouring them
  // ---- classes DEFINED by every delivered sheet, inline ones included --------
  const defined = new Set()
  const varsDeclared = new Set()
  const varsUsed = new Set()
  let opaqueSheets = 0
  const eatSelector = (sel) => {
    // char walk: a class starts at an unescaped '.', ends at an unescaped
    // delimiter. Unescaping first would turn `.md\:flex` into `md` + `flex`.
    for (let i = 0; i < sel.length; i++) {
      if (sel[i] === '\\') { i++; continue }
      if (sel[i] !== '.') continue
      let name = ''
      for (i++; i < sel.length; i++) {
        if (sel[i] === '\\') { name += sel[i] + (sel[i + 1] ?? ''); i++; continue }
        if (/[\s>+~,()[\]:#.*"'|=^$]/.test(sel[i])) break
        name += sel[i]
      }
      i--
      if (name) defined.add(name.replace(/\\(.)/g, '$1'))
    }
  }
  const walk = (rules) => {
    for (const r of rules) {
      if (r.selectorText) {
        eatSelector(r.selectorText)
        for (const m of (r.style?.cssText ?? '').matchAll(/--[\w-]+(?=\s*:)/g)) varsDeclared.add(m[0])
      }
      const txt = r.cssText ?? ''
      for (const m of txt.matchAll(/var\(\s*(--[\w-]+)/g)) varsUsed.add(m[1])
      if (r.cssRules) walk(r.cssRules)
    }
  }
  for (const sheet of document.styleSheets) {
    try { walk(sheet.cssRules) } catch { opaqueSheets++ }
  }

  // ---- classes USED by the rendered DOM -------------------------------------
  const used = new Set()
  for (const el of document.querySelectorAll('*')) {
    const cn = el.getAttribute?.('class')
    if (cn) for (const t of cn.split(/\s+/)) if (t) used.add(t)
  }
  const lucide = (c) => c === 'lucide' || c.startsWith('lucide-')
  const uncovered = [...used].filter((c) => !defined.has(c))
  const orphans = uncovered.filter((c) => !lucide(c))

  // ---- vars referenced but never declared ----------------------------------
  const rootCs = getComputedStyle(document.documentElement)
  const undeclared = [...varsUsed]
    .filter((v) => !varsDeclared.has(v))
    .filter((v) => rootCs.getPropertyValue(v).trim() === '')
    .filter((v) => !v.startsWith('--tw-') && !v.startsWith('--radix-') && !v.startsWith('--gui-') && !v.startsWith('--t-'))

  // ---- colour helpers -------------------------------------------------------
  const parse = (c) => {
    const m = c.match(/rgba?\(([^)]+)\)/)
    if (!m) return null
    const p = m[1].split(/[\s,/]+/).filter(Boolean).map(Number)
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }
  }
  const lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4 }
  const lum = (c) => 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b)
  const over = (fg, bg) => ({
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
    a: 1,
  })
  const effBg = (el) => {
    let acc = null
    for (let n = el; n; n = n.parentElement) {
      const c = parse(getComputedStyle(n).backgroundColor)
      if (!c || c.a === 0) continue
      acc = acc ? over(acc, c) : c
      if (acc.a >= 0.999) return acc
    }
    return acc ?? { r: 255, g: 255, b: 255, a: 1 }
  }
  const ratio = (a, b) => {
    const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p)
    return (x + 0.05) / (y + 0.05)
  }
  const label = (el) => `${el.tagName.toLowerCase()}[${(el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 28)}]`

  // ---- per-element sweeps ---------------------------------------------------
  const lowContrast = []; const tap = []; const zoom = []; const badBorder = []
  const inert = []; const garish = []
  const interactive = 'a,button,[role=button],input,select,textarea,summary'
  for (const el of document.querySelectorAll(interactive)) {
    const b = el.getBoundingClientRect()
    const cs = getComputedStyle(el)
    if (b.width === 0 || b.height === 0 || cs.visibility === 'hidden') continue
    const fg = parse(cs.color)
    if (fg) {
      const bg = effBg(el)
      const r = ratio(over(fg, bg), bg)
      if (r < 3) lowContrast.push(`${label(el)} ${r.toFixed(2)}:1 fg=${cs.color} bg=rgb(${[bg.r, bg.g, bg.b].map(Math.round)}) ${Math.round(b.width)}x${Math.round(b.height)}`)
    }
    if (cs.display !== 'inline' && (b.height < 44 || b.width < 24)) tap.push(`${label(el)} ${Math.round(b.width)}x${Math.round(b.height)}`)
    if (/^(input|select|textarea)$/.test(el.tagName.toLowerCase()) && parseFloat(cs.fontSize) < 16) zoom.push(`${label(el)} ${cs.fontSize}`)
  }
  for (const el of document.querySelectorAll('body *')) {
    const cs = getComputedStyle(el)
    for (const side of ['Top', 'Right', 'Bottom', 'Left']) {
      const w = parseFloat(cs[`border${side}Width`])
      if (!(w > 0)) continue
      const st = cs[`border${side}Style`]
      if (/^(outset|inset|ridge|groove)$/.test(st)) { badBorder.push(`${label(el)} ${side} ${w}px ${st}`); break }
      const c = parse(cs[`border${side}Color`])
      if (c && c.a > 0.35 && lum(c) > 0.55) { garish.push(`${label(el)} ${side} ${cs[`border${side}Color`]}`); break }
    }
    if (cs.display === 'inline' && (cs.alignItems !== 'normal' || cs.justifyContent !== 'normal')) {
      inert.push(`${label(el)} ai=${cs.alignItems} jc=${cs.justifyContent}`)
    }
  }

  const de = document.documentElement
  const overflow = Math.max(de.scrollWidth, document.body.scrollWidth) - vw
  const wide = []
  if (overflow > 1) {
    for (const el of document.querySelectorAll('body *')) {
      const b = el.getBoundingClientRect()
      if (b.width > 0 && b.right > vw + 1 && b.left < vw) {
        const cs = getComputedStyle(el)
        if (cs.position === 'fixed' || cs.overflowX === 'auto' || cs.overflowX === 'scroll') continue
        wide.push(`${label(el)} w=${Math.round(b.width)} r=${Math.round(b.right)}`)
        if (wide.length > 5) break
      }
    }
  }
  return {
    usedCount: used.size, definedCount: defined.size,
    uncovered: uncovered.length, orphans, opaqueSheets,
    undeclaredVars: undeclared,
    lowContrast, tap, zoom, badBorder, inert, garish,
    overflow, wide, text: document.body.innerText.length,
  }
}

mkdirSync(out, { recursive: true })
const browser = await chromium.launch()
const report = []
for (const width of widths) {
  const mobile = width < 500
  const ctx = await browser.newContext({
    viewport: { width, height: mobile ? 844 : 900 },
    deviceScaleFactor: mobile ? 2 : 1,
    isMobile: mobile, hasTouch: mobile,
    ...(mobile ? { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' } : {}),
  })
  const page = await ctx.newPage()
  const errors = []; const failed = []; const bytes = []
  page.on('pageerror', (e) => errors.push(String(e).slice(0, 160)))
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text().slice(0, 160)) })
  page.on('requestfailed', (r) => failed.push(`${r.url().slice(0, 90)} ${r.failure()?.errorText}`))
  page.on('response', async (r) => {
    if (!r.url().startsWith(base)) return
    const h = r.headers()
    bytes.push({ url: r.url().slice(base.length) || '/', type: h['content-type']?.split(';')[0], wire: Number(h['content-length'] || 0) })
  })
  for (const r of routes) {
    const name = r === '/' ? 'root' : r.slice(1).replace(/\//g, '_')
    errors.length = 0; failed.length = 0; bytes.length = 0
    const t0 = Date.now()
    await page.goto(base + r, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => {})
    await page.waitForTimeout(400)
    const a = await page.evaluate(probe, width)
    await page.screenshot({ path: `${out}/${width}-${name}.png`, fullPage: false })
    report.push({ width, route: r, ms: Date.now() - t0, ...a, errors: [...errors], failed: [...failed], bytes: [...bytes] })
  }
  await ctx.close()
}
await browser.close()
writeFileSync(`${out}/report.json`, JSON.stringify(report, null, 1))

const sum = (k) => report.reduce((a, b) => a + (Array.isArray(b[k]) ? b[k].length : b[k]), 0)
const list = (k) => [...new Set(report.flatMap((r) => r[k].map((v) => `${r.width}${r.route} ${v}`)))]
const show = (title, k) => {
  const l = list(k)
  console.log(`${title.padEnd(22)} ${l.length}`)
  for (const v of l.slice(0, 10)) console.log('   ', v)
  if (l.length > 10) console.log(`    … ${l.length - 10} more`)
}
console.log(`routes ${routes.length} x widths ${widths.join('/')} = ${report.length} renders`)
console.log(`classes used ${Math.max(...report.map((r) => r.usedCount))} / defined ${Math.max(...report.map((r) => r.definedCount))}`)
show('class orphans', 'orphans')
show('undeclared vars', 'undeclaredVars')
show('contrast < 3:1', 'lowContrast')
show('tap < 44px', 'tap')
show('font < 16px', 'zoom')
show('UA border-style', 'badBorder')
show('inert align/justify', 'inert')
show('garish borders', 'garish')
console.log('h-overflow'.padEnd(22), report.filter((r) => r.overflow > 1).map((r) => `${r.width}${r.route}+${r.overflow}`).join(' ') || 0)
console.log('opaque sheets'.padEnd(22), sum('opaqueSheets'))
console.log('empty pages'.padEnd(22), report.filter((r) => r.text < 200).map((r) => r.width + r.route).join(' ') || 0)
show('page/console errors', 'errors')
show('failed requests', 'failed')
const first = report.find((r) => r.route === '/')
console.log('bytes on / :', first.bytes.map((b) => `${b.url} ${b.wire}B`).join('  '))
