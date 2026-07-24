import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { StatusDot } from "./status-dot"
import { cn } from "@/lib/utils"
import type { UserStatus } from "@/lib/types"

const sizeMap = {
	xs: "h-6 w-6 text-[10px]",
	sm: "h-8 w-8 text-xs",
	md: "h-10 w-10 text-sm",
	lg: "h-14 w-14 text-base",
	xl: "h-20 w-20 text-xl",
} as const

export function UserAvatar({
	initials,
	size = "md",
	status,
	ring,
	className,
}: {
	initials: string
	size?: keyof typeof sizeMap
	status?: UserStatus
	ring?: boolean
	className?: string
}) {
	return (
		<div className={cn("relative shrink-0", className)}>
			<Avatar
				className={cn(
					sizeMap[size],
					ring && "ring-4 ring-bg-primary ring-offset-0",
				)}
			>
				<AvatarFallback>{initials}</AvatarFallback>
			</Avatar>
			{status ? (
				<span className="absolute -bottom-0.5 -right-0.5">
					<StatusDot status={status} />
				</span>
			) : null}
		</div>
	)
}
