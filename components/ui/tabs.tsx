"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

export const Tabs = TabsPrimitive.Root

export const TabsList = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.List>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.List
		ref={ref}
		className={cn(
			"inline-flex h-11 items-center gap-1 rounded-full border border-glass-border bg-white/[0.03] p-1 backdrop-blur-xl",
			className,
		)}
		{...props}
	/>
))
TabsList.displayName = "TabsList"

export const TabsTrigger = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.Trigger
		ref={ref}
		className={cn(
			"inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium text-text-secondary transition-all",
			"focus:outline-none focus:ring-2 focus:ring-accent-primary/30 data-[state=active]:bg-white/[0.08] data-[state=active]:text-text-primary",
			className,
		)}
		{...props}
	/>
))
TabsTrigger.displayName = "TabsTrigger"

export const TabsContent = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.Content
		ref={ref}
		className={cn("mt-6 focus:outline-none", className)}
		{...props}
	/>
))
TabsContent.displayName = "TabsContent"
