"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

export const DropdownMenu = DropdownMenuPrimitive.Root
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
export const DropdownMenuGroup = DropdownMenuPrimitive.Group
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal
export const DropdownMenuSub = DropdownMenuPrimitive.Sub
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

export const DropdownMenuContent = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 8, ...props }, ref) => (
	<DropdownMenuPrimitive.Portal>
		<DropdownMenuPrimitive.Content
			ref={ref}
			sideOffset={sideOffset}
			className={cn(
				"z-50 min-w-[12rem] overflow-hidden rounded-2xl border border-glass-border bg-[#0F0F10]/90 p-1.5 shadow-float backdrop-blur-2xl",
				"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
				className,
			)}
			{...props}
		/>
	</DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = "DropdownMenuContent"

export const DropdownMenuItem = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
		inset?: boolean
		danger?: boolean
	}
>(({ className, inset, danger, ...props }, ref) => (
	<DropdownMenuPrimitive.Item
		ref={ref}
		className={cn(
			"relative flex cursor-pointer select-none items-center gap-2 rounded-xl px-3 py-2 text-sm text-text-secondary outline-none transition-colors",
			"focus:bg-glass-hover focus:text-text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
			danger && "text-state-danger focus:bg-state-danger/10 focus:text-state-danger",
			inset && "pl-8",
			className,
		)}
		{...props}
	/>
))
DropdownMenuItem.displayName = "DropdownMenuItem"

export const DropdownMenuLabel = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Label>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(({ className, ...props }, ref) => (
	<DropdownMenuPrimitive.Label
		ref={ref}
		className={cn("px-3 py-1.5 text-xs uppercase tracking-wider text-text-muted", className)}
		{...props}
	/>
))
DropdownMenuLabel.displayName = "DropdownMenuLabel"

export const DropdownMenuSeparator = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
	<DropdownMenuPrimitive.Separator
		ref={ref}
		className={cn("my-1 h-px bg-glass-border", className)}
		{...props}
	/>
))
DropdownMenuSeparator.displayName = "DropdownMenuSeparator"

export function DropdownMenuShortcut({
	className,
	...props
}: React.HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			className={cn("ml-auto text-xs text-text-muted", className)}
			{...props}
		/>
	)
}

export { Check, ChevronRight, Circle }
