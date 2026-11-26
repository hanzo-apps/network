export default function Glow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -inset-y-16 -z-10"
      style={{ background: 'radial-gradient(ellipse at 50% 30%, var(--white-06), transparent 60%)' }}
    />
  )
}
