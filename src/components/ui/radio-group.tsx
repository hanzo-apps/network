import * as React from 'react'
import { RadioGroup as GuiRadioGroup } from '@hanzo/gui'
import { cn } from '@/lib/utils'

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof GuiRadioGroup>,
  React.ComponentPropsWithoutRef<typeof GuiRadioGroup> & { className?: string }
>(({ className, ...props }, ref) => (
  <GuiRadioGroup ref={ref} className={cn('hz-col hz-gap-2', className)} {...props} />
))
RadioGroup.displayName = 'RadioGroup'

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof GuiRadioGroup.Item>,
  React.ComponentPropsWithoutRef<typeof GuiRadioGroup.Item> & { className?: string }
>(({ className, ...props }, ref) => (
  <GuiRadioGroup.Item ref={ref} size="$4" className={className} {...props}>
    <GuiRadioGroup.Indicator />
  </GuiRadioGroup.Item>
))
RadioGroupItem.displayName = 'RadioGroupItem'

export { RadioGroup, RadioGroupItem }
