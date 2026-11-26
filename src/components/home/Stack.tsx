import { HANZO, LUX, ZEN, ZOO } from '@/lib/links'
import { container, Eyebrow } from '@/components/ui/section'

const PARTS = [
  { name: 'Hanzo AI', href: HANZO, domain: 'hanzo.ai' },
  { name: 'Zen models', href: ZEN, domain: 'hanzo.ai/zen' },
  { name: 'Lux Network', href: LUX, domain: 'lux.network' },
  { name: 'Zoo Labs', href: ZOO, domain: 'zoo.ngo' },
]

export default function Stack() {
  return (
    <div className={`${container} pb-16 md:pb-20`}>
      <Eyebrow>The Hanzo ecosystem</Eyebrow>
      <ul className="flex flex-wrap gap-x-8 gap-y-3">
        {PARTS.map((p) => (
          <li key={p.name}>
            <a href={p.href} className="inline-flex min-h-11 items-center gap-2 rounded-sm text-foreground hover:text-muted-foreground">
              <span className="font-medium">{p.name}</span>
              <span className="font-mono text-xs text-muted-foreground">{p.domain}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
