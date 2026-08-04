import * as React from 'react'
import { Dialog as GuiDialog } from '@hanzo/gui'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * A sheet is a dialog anchored to an edge. Same primitive, one extra class —
 * there is no second overlay implementation on this site.
 */
const SIDE = {
  top: 'hz-top-0 hz-left-0 hz-right-0',
  bottom: 'hz-bottom-0 hz-left-0 hz-right-0',
  left: 'hz-top-0 hz-bottom-0 hz-left-0 hz-mw-sm hz-h-full',
  right: 'hz-top-0 hz-bottom-0 hz-right-0 hz-mw-sm hz-h-full',
} as const

const Sheet = GuiDialog
const SheetTrigger = GuiDialog.Trigger
const SheetClose = GuiDialog.Close
const SheetPortal = GuiDialog.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof GuiDialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof GuiDialog.Overlay> & { className?: string }
>(({ className, ...props }, ref) => (
  <GuiDialog.Overlay ref={ref} unstyled className={cn('hz-fixed hz-inset hz-z-overlay hz-bg-scrim', className)} {...props} />
))
SheetOverlay.displayName = 'SheetOverlay'

const SheetContent = React.forwardRef<
  React.ElementRef<typeof GuiDialog.Content>,
  React.ComponentPropsWithoutRef<typeof GuiDialog.Content> & { className?: string; side?: keyof typeof SIDE }
>(({ className, children, side = 'right', ...props }, ref) => (
  <GuiDialog.Portal>
    <SheetOverlay />
    <GuiDialog.Content
      ref={ref}
      unstyled
      className={cn('hz-fixed hz-z-overlay hz-col hz-gap-4 hz-card hz-r-none hz-bg-raised hz-shadow-lg hz-scroll-y', SIDE[side], className)}
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
SheetContent.displayName = 'SheetContent'

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('hz-col hz-gap-2', className)} {...props} />
)
const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('hz-col-row hz-gap-2 hz-jc-end', className)} {...props} />
)
const SheetTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => <h2 ref={ref} className={cn('hz-t-xl hz-w-semibold', className)} {...props} />,
)
SheetTitle.displayName = 'SheetTitle'
const SheetDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => <p ref={ref} className={cn('hz-t-sm hz-fg-muted', className)} {...props} />,
)
SheetDescription.displayName = 'SheetDescription'

export {
  Sheet, SheetPortal, SheetOverlay, SheetTrigger, SheetClose,
  SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription,
}
