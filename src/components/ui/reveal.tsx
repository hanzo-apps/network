import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

/** Fades a block up once as it scrolls in. `delay` staggers siblings (0.06 s each). */
export default function Reveal({ children, index = 0, id, className }: { children: ReactNode; index?: number; id?: string; className?: string }) {
  const still = useReducedMotion()
  if (still) return <div id={id} className={className}>{children}</div>
  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
    >
      {children}
    </motion.div>
  )
}
