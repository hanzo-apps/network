import * as React from 'react'
import { Accordion as GuiAccordion } from '@hanzo/gui'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const Accordion = GuiAccordion

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof GuiAccordion.Item>,
  React.ComponentPropsWithoutRef<typeof GuiAccordion.Item> & { className?: string }
>(({ className, ...props }, ref) => (
  <GuiAccordion.Item ref={ref} className={cn('hz-border-b', className)} {...props} />
))
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof GuiAccordion.Trigger>,
  React.ComponentPropsWithoutRef<typeof GuiAccordion.Trigger> & { className?: string }
>(({ className, children, ...props }, ref) => (
  <GuiAccordion.Header>
    <GuiAccordion.Trigger
      ref={ref}
      unstyled
      className={cn('hz-row hz-nowrap hz-w-full hz-ai-center hz-jc-between hz-py-4 hz-tap hz-w-medium hz-align-left', className)}
      {...props}
    >
      {(open: boolean) => (
        <>
          {children}
          <ChevronDown
            className="hz-sq-2 hz-fg-muted hz-transition"
            style={{ transform: open ? 'rotate(180deg)' : undefined }}
          />
        </>
      )}
    </GuiAccordion.Trigger>
  </GuiAccordion.Header>
))
AccordionTrigger.displayName = 'AccordionTrigger'

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof GuiAccordion.Content>,
  React.ComponentPropsWithoutRef<typeof GuiAccordion.Content> & { className?: string }
>(({ className, ...props }, ref) => (
  <GuiAccordion.Content ref={ref} unstyled className={cn('hz-pb-4 hz-t-sm hz-fg-muted', className)} {...props} />
))
AccordionContent.displayName = 'AccordionContent'

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
