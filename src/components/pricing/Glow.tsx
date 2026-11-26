export default function Glow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -inset-y-16 -z-10"
      style={{ background: 'radial-gradient(ellipse at 50% 30%, color-mix(in oklab, var(--foreground) 6%, transparent), transparent 60%)' }}
    />
  )
}
