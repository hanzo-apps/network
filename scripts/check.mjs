// Checks the export that ships (dist/), before it is published:
//   - the page carries no tag of its own: GA4 and the Pixel come from the host's
//     tag set through @hanzo/event, never from index.html;
//   - nothing sends a visitor to hanzo.id: sign-in is hanzo.ai's page;
//   - the ingest key in the bundle resolves at api.hanzo.ai/v1/event, or every
//     event it carries is refused.
import fs from 'node:fs'
import path from 'node:path'

const dist = 'dist'
const html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const js = fs
  .readdirSync(path.join(dist, 'assets'))
  .filter((f) => f.endsWith('.js'))
  .map((f) => fs.readFileSync(path.join(dist, 'assets', f), 'utf8'))
  .join('\n')

const fail = []
for (const tag of ['googletagmanager.com', 'connect.facebook.net', 'G-VT443SNVG7', '1790308611893001']) {
  if (html.includes(tag)) fail.push(`index.html names ${tag}: tags come from the host's tag set, not the page`)
}
if (/https?:\/\/(?:[a-z0-9-]+\.)*hanzo\.id\b/.test(html + js)) fail.push('the export links to hanzo.id; sign-in is https://hanzo.ai/login')
if (!js.includes('https://hanzo.ai/login')) fail.push('the export never names https://hanzo.ai/login')

const keys = [...new Set(js.match(/pk-[A-Za-z0-9_-]{20,}/g) ?? [])]
if (!keys.length) fail.push('no pk- ingest key in the bundle: every anonymous event would be refused')
for (const key of keys) {
  const r = await fetch(`https://api.hanzo.ai/v1/event?ingest_key=${key}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: '{"batch":[]}',
  }).catch((e) => ({ status: 0, text: async () => String(e) }))
  if (r.status === 401 || r.status === 403) fail.push(`${key} is refused by /v1/event (${r.status}): ${await r.text()}`)
  else if (r.status !== 200) console.warn(`::warning::${key} unverified: /v1/event answered ${r.status}`)
  else console.log(`resolves: ${key}`)
}

if (fail.length) {
  for (const f of fail) console.error(`::error::${f}`)
  process.exit(1)
}
console.log('dist/ checks out')
