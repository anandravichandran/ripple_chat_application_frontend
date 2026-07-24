import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

export function EmptyState({
	icon: Icon,
	title,
	description,
	action,
	className,
}: {
	icon?: LucideIcon
	title: string
	description?: string
	action?: React.ReactNode
	className?: string
}) {
	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center rounded-2xl border border-dashed border-glass-border bg-white/[0.02] px-8 py-16 text-center",
				className,
			)}
		>
			{Icon ? (
				<div className="mb-4 rounded-2xl border border-glass-border bg-white/[0.04] p-3">
					<Icon className="h-5 w-5 text-text-secondary" />
				</div>
			) : null}
			<h3 className="text-lg font-semibold text-text-primary">{title}</h3>
			{description ? (
				<p className="mt-1.5 max-w-sm text-sm text-text-secondary">{description}</p>
			) : null}
			{action ? <div className="mt-6">{action}</div> : null}
		</div>
	)
}
