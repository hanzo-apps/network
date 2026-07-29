import * as React from 'react'
import { cn } from '@/lib/utils'

/* A badge names a ROLE from src/styles/system.css. No framework utilities and
   no variant runtime — the whole vocabulary is four class combinations. */
const VARIANTS = {
  default: 'hz-bg-inverse',
  secondary: 'hz-bg-surface hz-fg',
  destructive: 'hz-bg-surface hz-fg-muted',
  outline: 'hz-bordered hz-fg',
} as const

export type BadgeVariant = keyof typeof VARIANTS

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant
}

const badgeVariants = ({ variant = 'default' }: { variant?: BadgeVariant } = {}) =>
  cn('hz-badge', VARIANTS[variant])

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
