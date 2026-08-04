import * as React from 'react'
import { Tabs as GuiTabs } from '@hanzo/gui'
import { cn } from '@/lib/utils'

/**
 * Tabs on the gui backend. The shadcn shape (Tabs / TabsList / TabsTrigger /
 * TabsContent, `value` + `onValueChange`) is kept so the pages that use it did
 * not have to change; the roving focus, keyboard handling and ARIA come from
 * @hanzogui/tabs instead of Radix.
 */
const Tabs = React.forwardRef<
  React.ElementRef<typeof GuiTabs>,
  React.ComponentPropsWithoutRef<typeof GuiTabs> & { className?: string }
>(({ className, ...props }, ref) => (
  <GuiTabs ref={ref} unstyled className={cn('hz-col', className)} {...props} />
))
Tabs.displayName = 'Tabs'

const TabsList = React.forwardRef<
  React.ElementRef<typeof GuiTabs.List>,
  React.ComponentPropsWithoutRef<typeof GuiTabs.List> & { className?: string }
>(({ className, ...props }, ref) => (
  <GuiTabs.List ref={ref} unstyled className={cn('mono-tabs', className)} {...props} />
))
TabsList.displayName = 'TabsList'

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof GuiTabs.Tab>,
  React.ComponentPropsWithoutRef<typeof GuiTabs.Tab> & { className?: string }
>(({ className, ...props }, ref) => (
  <GuiTabs.Tab ref={ref} unstyled className={cn('mono-tab', className)} {...props} />
))
TabsTrigger.displayName = 'TabsTrigger'

const TabsContent = React.forwardRef<
  React.ElementRef<typeof GuiTabs.Content>,
  React.ComponentPropsWithoutRef<typeof GuiTabs.Content> & { className?: string }
>(({ className, ...props }, ref) => (
  <GuiTabs.Content ref={ref} unstyled className={cn('hz-mt-4', className)} {...props} />
))
TabsContent.displayName = 'TabsContent'

export { Tabs, TabsList, TabsTrigger, TabsContent }
