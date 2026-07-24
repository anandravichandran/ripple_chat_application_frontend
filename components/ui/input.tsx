"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type = "text", ...props }, ref) => (
		<input
			type={type}
			ref={ref}
			className={cn(
				"flex h-11 w-full rounded-2xl border border-glass-border bg-white/[0.03] px-4 text-body text-text-primary placeholder:text-text-muted",
				"transition-colors focus:border-accent-primary/60 focus:outline-none focus:ring-2 focus:ring-accent-primary/30",
				"disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			{...props}
		/>
	),
)
Input.displayName = "Input"
