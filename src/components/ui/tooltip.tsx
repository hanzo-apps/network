import * as React from 'react'
import { Tooltip as GuiTooltip, TooltipGroup } from '@hanzo/gui'
import { cn } from '@/lib/utils'

const TooltipProvider = ({ children }: { children: React.ReactNode; delayDuration?: number }) => (
  <TooltipGroup delay={{ open: 200, close: 100 }}>{children}</TooltipGroup>
)
const Tooltip = GuiTooltip
const TooltipTrigger = GuiTooltip.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof GuiTooltip.Content>,
  React.ComponentPropsWithoutRef<typeof GuiTooltip.Content> & { className?: string; sideOffset?: number }
>(({ className, sideOffset, ...props }, ref) => (
  <GuiTooltip.Content
    ref={ref}
    unstyled
    className={cn('hz-z-overlay hz-card hz-card-tight hz-bg-raised hz-t-xs hz-shadow', className)}
    {...props}
  />
))
TooltipContent.displayName = 'TooltipContent'

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
