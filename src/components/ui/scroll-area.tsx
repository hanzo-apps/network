import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * A scroll region. The design system's `hz-scroll-y` (plus `scrollbar-hide`)
 * is the whole implementation — a native scroller keeps momentum scrolling on
 * iOS, which the overlay-scrollbar version did not.
 */
const ScrollArea = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('hz-scroll-y scrollbar-hide', className)} {...props}>
      {children}
    </div>
  ),
)
ScrollArea.displayName = 'ScrollArea'

const ScrollBar = () => null

export { ScrollArea, ScrollBar }
