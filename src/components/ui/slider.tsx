import * as React from 'react'
import { Slider as GuiSlider } from '@hanzo/gui'

const Slider = React.forwardRef<
  React.ElementRef<typeof GuiSlider>,
  React.ComponentPropsWithoutRef<typeof GuiSlider> & { className?: string }
>(({ className, ...props }, ref) => (
  <GuiSlider ref={ref} size="$2" className={className} {...props}>
    <GuiSlider.Track>
      <GuiSlider.TrackActive />
    </GuiSlider.Track>
    <GuiSlider.Thumb index={0} circular />
  </GuiSlider>
))
Slider.displayName = 'Slider'

export { Slider }
