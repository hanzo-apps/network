/** A soft foreground-tinted radial glow behind a block. The defaults sit behind a content block (Pricing, the first call); a section or the hero places its own. */
export default function Glow({
  at = '50% 30%',
  className = 'inset-x-0 -inset-y-16 -z-10',
  size = 'ellipse',
  strength = 6,
  reach = '60%',
}: {
  at?: string
  className?: string
  size?: string
  strength?: number
  reach?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      style={{ background: `radial-gradient(${size} at ${at}, color-mix(in oklab, var(--foreground) ${strength}%, transparent), transparent ${reach})` }}
    />
  )
}
