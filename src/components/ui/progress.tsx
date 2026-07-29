import * as React from 'react'
import { Progress as GuiProgress } from '@hanzo/gui'

const Progress = React.forwardRef<
  React.ElementRef<typeof GuiProgress>,
  Omit<React.ComponentPropsWithoutRef<typeof GuiProgress>, 'value'> & { value?: number | null; className?: string }
>(({ className, value, ...props }, ref) => (
  <GuiProgress ref={ref} value={value ?? 0} size="$2" className={className} {...props}>
    <GuiProgress.Indicator />
  </GuiProgress>
))
Progress.displayName = 'Progress'

export { Progress }
