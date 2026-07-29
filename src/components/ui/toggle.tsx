import * as React from 'react'
import { cn } from '@/lib/utils'

/** A two-state control. `data-state` is kept so existing styling hooks work. */
export interface ToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  pressed?: boolean
  defaultPressed?: boolean
  onPressedChange?: (pressed: boolean) => void
  variant?: 'default' | 'outline'
  size?: 'default' | 'sm' | 'lg'
}

export const toggleVariants = ({ variant = 'default', size = 'default' }: Partial<ToggleProps> = {}) =>
  cn('hz-btn', variant === 'outline' ? '' : 'hz-btn-ghost', size === 'lg' && 'hz-btn-lg', size === 'sm' && 'hz-t-xs hz-px-3')

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, pressed, defaultPressed, onPressedChange, variant, size, ...props }, ref) => {
    const [internal, setInternal] = React.useState(!!defaultPressed)
    const on = pressed ?? internal
    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={on}
        data-state={on ? 'on' : 'off'}
        className={cn(toggleVariants({ variant, size }), on && 'hz-bg-surface', className)}
        onClick={(e) => {
          props.onClick?.(e)
          if (pressed === undefined) setInternal(!on)
          onPressedChange?.(!on)
        }}
        {...props}
      />
    )
  },
)
Toggle.displayName = 'Toggle'

export { Toggle }
