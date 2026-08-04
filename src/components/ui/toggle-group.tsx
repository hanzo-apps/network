import * as React from 'react'
import { ToggleGroup as GuiToggleGroup } from '@hanzo/gui'
import { cn } from '@/lib/utils'

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof GuiToggleGroup>,
  React.ComponentPropsWithoutRef<typeof GuiToggleGroup> & { className?: string }
>(({ className, ...props }, ref) => (
  <GuiToggleGroup ref={ref} unstyled className={cn('hz-row hz-nowrap hz-gap-1', className)} {...props} />
))
ToggleGroup.displayName = 'ToggleGroup'

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof GuiToggleGroup.Item>,
  React.ComponentPropsWithoutRef<typeof GuiToggleGroup.Item> & { className?: string }
>(({ className, ...props }, ref) => (
  <GuiToggleGroup.Item ref={ref} unstyled className={cn('hz-btn hz-btn-ghost', className)} {...props} />
))
ToggleGroupItem.displayName = 'ToggleGroupItem'

export { ToggleGroup, ToggleGroupItem }
