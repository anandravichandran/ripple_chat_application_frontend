import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function Loader({ className }: { className?: string }) {
	return <Loader2 className={cn("h-4 w-4 animate-spin", className)} />
}

export function FullPageLoader({ label = "Loading…" }: { label?: string }) {
	return (
		<div className="flex min-h-[50vh] flex-col items-center justify-center gap-3">
			<div className="relative h-10 w-10">
				<div className="absolute inset-0 rounded-full border-2 border-white/10" />
				<div className="absolute inset-0 rounded-full border-2 border-t-accent-primary animate-spin" />
			</div>
			<p className="text-sm text-text-muted">{label}</p>
		</div>
	)
}
