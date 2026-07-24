import { AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

export function ErrorState({
	title = "Something went wrong",
	description = "Please try again in a moment.",
	onRetry,
	className,
}: {
	title?: string
	description?: string
	onRetry?: () => void
	className?: string
}) {
	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center rounded-2xl border border-state-danger/20 bg-state-danger/[0.06] px-8 py-14 text-center",
				className,
			)}
		>
			<div className="mb-4 rounded-2xl border border-state-danger/30 bg-state-danger/10 p-3">
				<AlertTriangle className="h-5 w-5 text-state-danger" />
			</div>
			<h3 className="text-lg font-semibold text-text-primary">{title}</h3>
			<p className="mt-1.5 max-w-sm text-sm text-text-secondary">{description}</p>
			{onRetry ? (
				<Button size="sm" variant="secondary" className="mt-6" onClick={onRetry}>
					Retry
				</Button>
			) : null}
		</div>
	)
}
