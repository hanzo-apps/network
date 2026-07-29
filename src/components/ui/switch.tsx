import * as React from 'react'
import { Switch as GuiSwitch } from '@hanzo/gui'

const Switch = React.forwardRef<
  React.ElementRef<typeof GuiSwitch>,
  React.ComponentPropsWithoutRef<typeof GuiSwitch> & { className?: string }
>(({ className, ...props }, ref) => (
  <GuiSwitch ref={ref} size="$3" className={className} {...props}>
    <GuiSwitch.Thumb />
  </GuiSwitch>
))
Switch.displayName = 'Switch'

export { Switch }
