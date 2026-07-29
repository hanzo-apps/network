import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * The one button. Its appearance is the design system's `hz-btn` role — which
 * is also where the 44px minimum tap target is declared, so every button on
 * the site clears it without a per-call-site height. `asChild` renders the
 * child element carrying the button's classes: the job Radix's Slot did, in
 * four lines and no dependency.
 */
const VARIANT = {
  default: 'hz-btn-primary',
  primary: 'hz-btn-primary',
  destructive: 'hz-btn-primary',
  outline: '',
  secondary: 'hz-bg-surface',
  ghost: 'hz-btn-ghost',
  link: 'hz-btn-ghost hz-underline',
} as const

const SIZE = {
  default: '',
  sm: 'hz-t-xs hz-px-3',
  lg: 'hz-btn-lg',
  icon: 'hz-btn-icon',
} as const

export type ButtonVariant = keyof typeof VARIANT
export type ButtonSize = keyof typeof SIZE

export const buttonVariants = ({
  variant = 'default',
  size = 'default',
}: { variant?: ButtonVariant | null; size?: ButtonSize | null } = {}) =>
  cn('hz-btn', VARIANT[variant || 'default'], SIZE[size || 'default'])

const RADIUS = {
  none: 'hz-r-none',
  sm: 'hz-r-sm',
  md: 'hz-r-md',
  lg: 'hz-r-lg',
  xl: 'hz-r-xl',
  full: '',
} as const

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant | null
  size?: ButtonSize | null
  /** Corner treatment. The pill is the default; this opts out of it. */
  radius?: keyof typeof RADIUS
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, radius, asChild = false, children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size }), radius && RADIUS[radius], className)
    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>
      return React.cloneElement(child, { className: cn(classes, child.props.className) })
    }
    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'

export { Button }
