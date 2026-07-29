import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Toast presentation. The queue, timers and dismissal already live in
 * `hooks/use-toast`; this file is only the shape they render as, so there is
 * no second state machine hiding inside a primitive.
 */
const ToastProvider = ({ children }: { children?: React.ReactNode }) => <>{children}</>

const ToastViewport = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="region"
      aria-label="Notifications"
      className={cn('hz-fixed hz-bottom-0 hz-left-0 hz-right-0 hz-z-overlay hz-col hz-gap-2 hz-p-4 hz-no-pointer', className)}
      {...props}
    />
  ),
)
ToastViewport.displayName = 'ToastViewport'

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive'
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, open, onOpenChange, ...props }, ref) =>
    open === false ? null : (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn('hz-row hz-nowrap hz-ai-center hz-jc-between hz-gap-4 hz-card hz-bg-raised hz-shadow-lg hz-mw-sm hz-mx-auto hz-w-full', className)}
        {...props}
      />
    ),
)
Toast.displayName = 'Toast'

const ToastTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('hz-t-sm hz-w-semibold', className)} {...props} />,
)
ToastTitle.displayName = 'ToastTitle'

const ToastDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('hz-t-sm hz-fg-muted', className)} {...props} />,
)
ToastDescription.displayName = 'ToastDescription'

const ToastClose = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => (
    <button ref={ref} aria-label="Dismiss" className={cn('hz-btn hz-btn-ghost hz-btn-icon', className)} {...props}>
      <X className="hz-sq-2" />
    </button>
  ),
)
ToastClose.displayName = 'ToastClose'

const ToastAction = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => <button ref={ref} className={cn('hz-btn', className)} {...props} />,
)
ToastAction.displayName = 'ToastAction'

export type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  ToastProvider, ToastViewport, Toast, ToastTitle,
  ToastDescription, ToastClose, ToastAction,
}
