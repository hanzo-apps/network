import * as React from 'react'
import { Popover as GuiPopover, YStack } from '@hanzo/gui'
import { cn } from '@/lib/utils'

/**
 * A dropdown menu. gui models this as an anchored popover, so that is what it
 * is here — one primitive, not a second menu implementation with its own
 * positioning code.
 */
const DropdownMenu = GuiPopover
const DropdownMenuTrigger = GuiPopover.Trigger

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof GuiPopover.Content>,
  React.ComponentPropsWithoutRef<typeof GuiPopover.Content> & { className?: string; align?: string; sideOffset?: number }
>(({ className, align, sideOffset, children, ...props }, ref) => (
  <GuiPopover.Content
    ref={ref}
    unstyled
    className={cn('hz-z-overlay hz-card hz-card-flush hz-bg-raised hz-shadow-lg hz-clip hz-mw-xs', className)}
    {...props}
  >
    <YStack role="menu">{children}</YStack>
  </GuiPopover.Content>
))
DropdownMenuContent.displayName = 'DropdownMenuContent'

const DropdownMenuItem = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <button
    ref={ref}
    role="menuitem"
    className={cn('hz-row hz-nowrap hz-ai-center hz-gap-2 hz-w-full hz-px-4 hz-tap hz-t-sm hz-link hz-align-left hz-bg-none hz-border-none hz-pointer', inset && 'hz-pl-6', className)}
    {...props}
  />
))
DropdownMenuItem.displayName = 'DropdownMenuItem'

const DropdownMenuLabel = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('hz-px-4 hz-py-2 hz-t-xs hz-fg-faint hz-upper hz-tracking-widest', className)} {...props} />
)
const DropdownMenuSeparator = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('hz-divider', className)} {...props} />
)
const DropdownMenuGroup = ({ children }: { children?: React.ReactNode }) => <>{children}</>
const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn('hz-ml-auto hz-t-xs hz-fg-faint', className)} {...props} />
)

export {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuShortcut,
}
