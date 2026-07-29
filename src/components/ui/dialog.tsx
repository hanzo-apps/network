import * as React from 'react'
import { Dialog as GuiDialog } from '@hanzo/gui'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Dialog on the gui backend, keeping the shadcn part names the pages already
 * use. Focus trapping, the scrim, escape-to-close and the ARIA wiring come
 * from @hanzogui/dialog; the look comes from the design system.
 */
const Dialog = GuiDialog
const DialogTrigger = GuiDialog.Trigger
const DialogPortal = GuiDialog.Portal
const DialogClose = GuiDialog.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof GuiDialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof GuiDialog.Overlay> & { className?: string }
>(({ className, ...props }, ref) => (
  <GuiDialog.Overlay ref={ref} unstyled className={cn('hz-fixed hz-inset hz-z-overlay hz-bg-scrim', className)} {...props} />
))
DialogOverlay.displayName = 'DialogOverlay'

const DialogContent = React.forwardRef<
  React.ElementRef<typeof GuiDialog.Content>,
  React.ComponentPropsWithoutRef<typeof GuiDialog.Content> & { className?: string }
>(({ className, children, ...props }, ref) => (
  <GuiDialog.Portal>
    <DialogOverlay />
    <GuiDialog.Content
      ref={ref}
      unstyled
      className={cn(
        'hz-fixed hz-center-xy hz-z-overlay hz-col hz-gap-4 hz-w-full hz-mw-sm hz-card hz-bg-raised hz-shadow-lg',
        className,
      )}
      {...props}
    >
      {children}
      <GuiDialog.Close asChild>
        <button aria-label="Close" className="hz-abs hz-top-0 hz-right-0 hz-mt-3 hz-mr-3 hz-btn hz-btn-ghost hz-btn-icon">
          <X className="hz-sq-2" />
        </button>
      </GuiDialog.Close>
    </GuiDialog.Content>
  </GuiDialog.Portal>
))
DialogContent.displayName = 'DialogContent'

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('hz-col hz-gap-2', className)} {...props} />
)
const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('hz-col-row hz-gap-2 hz-jc-end', className)} {...props} />
)
const DialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => <h2 ref={ref} className={cn('hz-t-xl hz-w-semibold', className)} {...props} />,
)
DialogTitle.displayName = 'DialogTitle'
const DialogDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => <p ref={ref} className={cn('hz-t-sm hz-fg-muted', className)} {...props} />,
)
DialogDescription.displayName = 'DialogDescription'

export {
  Dialog, DialogPortal, DialogOverlay, DialogClose, DialogTrigger,
  DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription,
}
