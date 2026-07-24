import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
	"inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
	{
		variants: {
			variant: {
				default:
					"border-glass-border bg-white/[0.04] text-text-secondary",
				accent:
					"border-accent-primary/30 bg-accent-primary/10 text-accent-primary",
				aqua:
					"border-accent-secondary/30 bg-accent-secondary/10 text-accent-secondary",
				success:
					"border-state-success/30 bg-state-success/10 text-state-success",
				danger:
					"border-state-danger/30 bg-state-danger/10 text-state-danger",
				warn:
					"border-state-warn/30 bg-state-warn/10 text-state-warn",
				outline: "border-glass-borderStrong bg-transparent text-text-primary",
			},
		},
		defaultVariants: { variant: "default" },
	},
)

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
	return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}
