import { useRef, type HTMLAttributes, type PointerEvent } from 'react'

/** Hanzo glass: a translucent surface whose light follows the pointer. The one card, used everywhere. */
export default function Card({ className = '', children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null)
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || e.pointerType !== 'mouse') return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--x', `${e.clientX - r.left}px`)
    el.style.setProperty('--y', `${e.clientY - r.top}px`)
  }
  return (
    <div ref={ref} onPointerMove={move} className={`glass ${className}`} {...rest}>
      {children}
    </div>
  )
}
