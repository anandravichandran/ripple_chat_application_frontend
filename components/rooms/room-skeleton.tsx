import { Skeleton } from "@/components/ui/skeleton"
import { GlassCard } from "@/components/shared/glass-card"

export function RoomSkeleton() {
	return (
		<GlassCard className="p-5">
			<div className="flex items-center gap-3">
				<Skeleton className="h-12 w-12 rounded-2xl" />
				<div className="flex-1 space-y-2">
					<Skeleton className="h-4 w-32" />
					<Skeleton className="h-3 w-24" />
				</div>
			</div>
			<div className="mt-4 space-y-2">
				<Skeleton className="h-3 w-full" />
				<Skeleton className="h-3 w-4/5" />
			</div>
			<div className="mt-5 flex justify-between">
				<Skeleton className="h-3 w-24" />
				<Skeleton className="h-8 w-20 rounded-full" />
			</div>
		</GlassCard>
	)
}
