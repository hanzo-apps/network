import * as React from 'react'
import { cn } from '@/lib/utils'

/** A multi-line field. `hz-input` carries the 44px floor and the focus ring. */
const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} className={cn('hz-input hz-t-sm', className)} {...props} />
  ),
)
Textarea.displayName = 'Textarea'

export { Textarea }
