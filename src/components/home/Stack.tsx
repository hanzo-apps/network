const PARTS = [
  { name: 'Hanzo AI', href: 'https://hanzo.ai', domain: 'hanzo.ai' },
  { name: 'Zen models', href: 'https://hanzo.ai/zen', domain: 'hanzo.ai/zen' },
  { name: 'Lux Network', href: 'https://lux.network', domain: 'lux.network' },
  { name: 'Zoo Labs', href: 'https://zoo.ngo', domain: 'zoo.ngo' },
]

export default function Stack() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 pb-16 md:px-8 md:pb-20">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">Part of the Hanzo stack</p>
      <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
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
