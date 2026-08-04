import * as React from 'react'
import { Avatar as GuiAvatar } from '@hanzo/gui'

const Avatar = React.forwardRef<
  React.ElementRef<typeof GuiAvatar>,
  React.ComponentPropsWithoutRef<typeof GuiAvatar> & { className?: string }
>(({ className, ...props }, ref) => (
  <GuiAvatar ref={ref} circular size="$4" className={className} {...props} />
))
Avatar.displayName = 'Avatar'

const AvatarImage = GuiAvatar.Image
const AvatarFallback = GuiAvatar.Fallback

export { Avatar, AvatarImage, AvatarFallback }
