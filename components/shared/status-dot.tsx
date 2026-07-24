import { cn } from "@/lib/utils"
import type { UserStatus } from "@/lib/types"

const tone: Record<UserStatus, string> = {
	online: "bg-state-success shadow-[0_0_10px_2px_rgba(34,197,94,0.55)]",
	idle: "bg-state-warn shadow-[0_0_10px_2px_rgba(245,158,11,0.5)]",
	dnd: "bg-state-danger shadow-[0_0_10px_2px_rgba(239,68,68,0.55)]",
	offline: "bg-white/25",
}

export function StatusDot({
	status,
	className,
}: {
	status: UserStatus
	className?: string
}) {
	return (
		<span
			aria-label={`status: ${status}`}
			className={cn("inline-block h-2.5 w-2.5 rounded-full ring-2 ring-bg-primary", tone[status], className)}
		/>
	)
}
