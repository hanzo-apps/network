import * as React from 'react'
import { Select as GuiSelect, Adapt, Sheet as GuiSheet } from '@hanzo/gui'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Select on the gui backend. `Adapt` is why this one is worth the primitive:
 * on a phone the same markup becomes a bottom sheet instead of a 200px
 * dropdown pinned to a 44px trigger.
 */
type Ctx = { placeholder?: string }
const SelectCtx = React.createContext<Ctx>({})

const Select = ({ children, ...props }: React.ComponentPropsWithoutRef<typeof GuiSelect>) => (
  <GuiSelect {...props}>{children}</GuiSelect>
)

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof GuiSelect.Trigger>,
  React.ComponentPropsWithoutRef<typeof GuiSelect.Trigger> & { className?: string }
>(({ className, children, ...props }, ref) => (
  <GuiSelect.Trigger
    ref={ref}
    unstyled
    iconAfter={<ChevronDown className="hz-sq-2 hz-fg-muted" />}
    className={cn('hz-row hz-nowrap hz-ai-center hz-jc-between hz-gap-2 hz-input hz-tap hz-pointer', className)}
    {...props}
  >
    {children}
  </GuiSelect.Trigger>
))
SelectTrigger.displayName = 'SelectTrigger'

const SelectValue = ({
  placeholder,
  children,
  ...props
}: { placeholder?: string; className?: string; children?: React.ReactNode }) => (
  <SelectCtx.Provider value={{ placeholder }}>
    <GuiSelect.Value placeholder={placeholder} {...props}>
      {children}
    </GuiSelect.Value>
  </SelectCtx.Provider>
)

const SelectContent = ({ className, children }: { className?: string; children?: React.ReactNode }) => {
  let i = 0
  const indexed = React.Children.map(children, (c) =>
    React.isValidElement(c) && (c.type as { displayName?: string })?.displayName === 'SelectItem'
      ? React.cloneElement(c as React.ReactElement<{ index?: number }>, { index: i++ })
      : c,
  )
  return (
  <>
    <Adapt when={"maxMd" as never} platform="touch">
      <GuiSheet modal dismissOnSnapToBottom snapPointsMode="fit">
        <GuiSheet.Frame className={cn('hz-card hz-r-none hz-bg-raised', className)}>
          <Adapt.Contents />
        </GuiSheet.Frame>
        <GuiSheet.Overlay className="hz-bg-scrim" />
      </GuiSheet>
    </Adapt>
    <GuiSelect.Content>
      <GuiSelect.Viewport className={cn('hz-card hz-card-flush hz-bg-raised hz-shadow-lg hz-clip', className)}>
        {indexed}
      </GuiSelect.Viewport>
    </GuiSelect.Content>
  </>
  )
}

/* gui addresses an option by its position, so a caller that only knows the
   value gets the index from the content order. */
const SelectItem = React.forwardRef<
  React.ElementRef<typeof GuiSelect.Item>,
  Omit<React.ComponentPropsWithoutRef<typeof GuiSelect.Item>, 'index'> & { className?: string; index?: number }
>(({ className, children, index = 0, ...props }, ref) => (
  <GuiSelect.Item ref={ref} unstyled index={index} className={cn('hz-row hz-nowrap hz-ai-center hz-gap-2 hz-px-4 hz-tap hz-t-sm hz-link', className)} {...props}>
    <GuiSelect.ItemText>{children}</GuiSelect.ItemText>
    <GuiSelect.ItemIndicator marginLeft="auto">
      <Check className="hz-sq-2" />
    </GuiSelect.ItemIndicator>
  </GuiSelect.Item>
))
SelectItem.displayName = 'SelectItem'

const SelectGroup = GuiSelect.Group
const SelectLabel = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('hz-px-4 hz-py-2 hz-t-xs hz-fg-faint hz-upper hz-tracking-widest', className)} {...props} />
)
const SelectSeparator = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('hz-divider', className)} {...props} />
)
const SelectScrollUpButton = () => null
const SelectScrollDownButton = () => null

export {
  Select, SelectGroup, SelectValue, SelectTrigger, SelectContent,
  SelectLabel, SelectItem, SelectSeparator, SelectScrollUpButton, SelectScrollDownButton,
}
