import * as React from 'react'
import { Popover as GuiPopover } from '@hanzo/gui'
import { cn } from '@/lib/utils'

const Popover = GuiPopover
const PopoverTrigger = GuiPopover.Trigger

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof GuiPopover.Content>,
  React.ComponentPropsWithoutRef<typeof GuiPopover.Content> & { className?: string; align?: string; sideOffset?: number }
>(({ className, align, sideOffset, ...props }, ref) => (
  <GuiPopover.Content
    ref={ref}
    unstyled
    className={cn('hz-z-overlay hz-card hz-bg-raised hz-shadow-lg hz-mw-sm', className)}
    {...props}
  />
))
PopoverContent.displayName = 'PopoverContent'

export { Popover, PopoverTrigger, PopoverContent }
