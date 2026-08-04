/* eslint-disable */
/**
 * `BRAND_COLOR = "#ffffff"` was declared in ~50 files and painted on through
 * ~180 inline `style` props. It is a token — `--primary` / `--foreground` — and
 * the design system already names every role it was standing in for. This
 * rewrites the mechanical forms onto classes and deletes the constant.
 *
 * Decorative radial-gradient washes keep their inline style: they are computed
 * geometry, not a colour role, and there is no class that means "a 70%-stop
 * radial glow at this exact offset".
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

// The style props this replaces, in the order they must be tried (longest
// first, so a two-property form is not half-matched by a one-property one).
const FORMS = [
  [/style=\{\{\s*backgroundColor:\s*BRAND_COLOR,\s*color:\s*["']#0{3,6}["']\s*\}\}/g, 'hz-bg-inverse'],
  [/style=\{\{\s*backgroundColor:\s*`\$\{BRAND_COLOR\}\d+`,\s*color:\s*BRAND_COLOR\s*\}\}/g, 'hz-bg-quiet hz-fg'],
  [/style=\{\{\s*color:\s*BRAND_COLOR,\s*borderColor:\s*[`"']?[^`"'}]*[`"']?\s*\}\}/g, 'hz-fg hz-bordered hz-border-strong'],
  [/style=\{\{\s*backgroundColor:\s*`\$\{BRAND_COLOR\}\d+`\s*\}\}/g, 'hz-bg-quiet'],
  [/style=\{\{\s*backgroundColor:\s*BRAND_COLOR\s*\}\}/g, 'hz-bg-inverse'],
  [/style=\{\{\s*color:\s*BRAND_COLOR\s*\}\}/g, 'hz-fg'],
  [/style=\{\{\s*borderColor:\s*BRAND_COLOR\s*\}\}/g, 'hz-bordered hz-border-strong'],
  [/style=\{\{\s*borderColor:\s*`\$\{BRAND_COLOR\}\w+`\s*\}\}/g, 'hz-bordered'],
]

/** Add `add` to the className of the JSX tag that owns the style prop at `at`. */
const mergeClass = (src, at, add) => {
  const open = src.lastIndexOf('<', at)
  if (open < 0) return null
  const head = src.slice(open, at)
  if (/>/.test(head)) return null // the style prop is not inside this tag
  const m = /className=(?:"([^"]*)"|'([^']*)')/.exec(head)
  if (m) {
    const q = m[0].includes('"') ? '"' : "'"
    const val = m[1] ?? m[2]
    const next = `className=${q}${[...new Set((val + ' ' + add).split(/\s+/).filter(Boolean))].join(' ')}${q}`
    return { start: open + m.index, end: open + m.index + m[0].length, text: next }
  }
  return { start: at, end: at, text: `className="${add}" ` } // no className yet
}

const walk = (dir, acc = []) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f)
    statSync(p).isDirectory() ? walk(p, acc) : /\.tsx$/.test(f) && acc.push(p)
  }
  return acc
}

let files = 0
let props = 0
for (const p of walk('src')) {
  let src = readFileSync(p, 'utf8')
  if (!src.includes('BRAND_COLOR')) continue
  const before = src
  for (const [re, cls] of FORMS) {
    for (;;) {
      re.lastIndex = 0
      const m = re.exec(src)
      if (!m) break
      const merged = mergeClass(src, m.index, cls)
      if (!merged) { break }
      // drop the style prop first, then splice the className (later offset first)
      let out = src.slice(0, m.index) + src.slice(m.index + m[0].length).replace(/^\s*/, '')
      const shift = 0
      out = out.slice(0, merged.start) + merged.text + out.slice(merged.end)
      if (out === src) break
      src = out
      props++
    }
  }
  // a constant nothing reads any more
  if (!/BRAND_COLOR/.test(src.replace(/^const BRAND_COLOR.*$/m, ''))) {
    src = src.replace(/^const BRAND_COLOR\s*=\s*["'][^"']*["'];?\n/m, '')
  }
  if (src !== before) { writeFileSync(p, src); files++ }
}
console.log(`BRAND_COLOR: ${props} inline style props → design-system classes, ${files} files`)
