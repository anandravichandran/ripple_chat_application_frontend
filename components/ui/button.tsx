"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-tight transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/40 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				primary:
					"bg-gradient-to-b from-accent-primary to-accent-hover text-black shadow-glow hover:brightness-105 active:brightness-95",
				secondary:
					"border border-glass-border bg-glass text-text-primary backdrop-blur-xl hover:bg-glass-hover hover:border-glass-borderStrong",
				ghost:
					"text-text-secondary hover:bg-glass-hover hover:text-text-primary",
				outline:
					"border border-glass-borderStrong bg-transparent text-text-primary hover:bg-glass",
				danger:
					"bg-state-danger text-white shadow-[0_0_30px_-8px_rgba(239,68,68,0.6)] hover:brightness-105",
				gradient:
					"bg-[conic-gradient(from_180deg_at_50%_50%,#D9FF66_0deg,#A8F5FF_140deg,#D9FF66_360deg)] text-black hover:brightness-105",
				link: "text-accent-primary underline-offset-4 hover:underline",
			},
			size: {
				sm: "h-9 px-4 text-sm",
				md: "h-11 px-5 text-btn",
				lg: "h-12 px-6 text-btn",
				icon: "h-10 w-10",
				iconSm: "h-8 w-8",
			},
		},
		defaultVariants: { variant: "primary", size: "md" },
	},
)

export interface ButtonProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
	loading?: boolean
	disabled?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ className, variant, size, asChild = false, loading, disabled, children, ...props },
		ref,
	) => {
		const Comp = asChild ? Slot : "button"
		const content = asChild ? (
			children
		) : (
			<>
				{loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
				{children}
			</>
		)
		return (
			<Comp
				ref={ref}
				className={cn(buttonVariants({ variant, size, className }))}
				disabled={disabled || loading}
				{...props}
			>
				{content}
			</Comp>
		)
	},
)
Button.displayName = "Button"

export { buttonVariants }
