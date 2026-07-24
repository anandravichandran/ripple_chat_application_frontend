"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export const Textarea = React.forwardRef<
	HTMLTextAreaElement,
	React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
	<textarea
		ref={ref}
		className={cn(
			"flex min-h-[92px] w-full rounded-2xl border border-glass-border bg-white/[0.03] px-4 py-3 text-body text-text-primary placeholder:text-text-muted",
			"transition-colors focus:border-accent-primary/60 focus:outline-none focus:ring-2 focus:ring-accent-primary/30 resize-none",
			className,
		)}
		{...props}
	/>
))
Textarea.displayName = "Textarea"
