import * as React from 'react'
import { Checkbox as GuiCheckbox } from '@hanzo/gui'
import { Check } from 'lucide-react'

const Checkbox = React.forwardRef<
  React.ElementRef<typeof GuiCheckbox>,
  React.ComponentPropsWithoutRef<typeof GuiCheckbox> & { className?: string }
>(({ className, ...props }, ref) => (
  <GuiCheckbox ref={ref} size="$4" className={className} {...props}>
    <GuiCheckbox.Indicator>
      <Check className="hz-sq-2" />
    </GuiCheckbox.Indicator>
  </GuiCheckbox>
))
Checkbox.displayName = 'Checkbox'

export { Checkbox }
