import * as React from 'react'
import { cn } from '@/lib/utils'

/** A form label. A plain <label> already does everything Radix's did. */
const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label ref={ref} className={cn('hz-t-sm hz-w-medium hz-leading-none', className)} {...props} />
  ),
)
Label.displayName = 'Label'

export { Label }
