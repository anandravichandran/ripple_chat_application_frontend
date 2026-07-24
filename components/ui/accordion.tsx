"use client"
import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export const Accordion = AccordionPrimitive.Root

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("glass rounded-3xl px-6 py-1 transition-colors", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-5 text-left text-base font-medium text-fg focus-ring [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-5 w-5 shrink-0 text-fg-muted transition-transform duration-300" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = "AccordionTrigger"

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-fg-muted data-[state=closed]:animate-[accordion-up_0.25s_ease] data-[state=open]:animate-[accordion-down_0.25s_ease]"
    {...props}
  >
    <div className={cn("pb-5 pr-8 text-[15px] leading-relaxed", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = "AccordionContent"
