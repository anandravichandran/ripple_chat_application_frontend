import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export function ChatSkeleton() {
	return (
		<div className="space-y-6 p-4">
			{[0, 1, 2, 3, 4].map((i) => {
				const isOwn = i % 2 === 1
				return (
					<div key={i} className={cn("flex gap-3", isOwn && "flex-row-reverse")}>
						<Skeleton className="h-8 w-8 rounded-full" />
						<div className={cn("flex-1 space-y-2", isOwn && "items-end flex flex-col")}>
							<Skeleton className="h-3 w-24" />
							<Skeleton className={cn("h-14 rounded-2xl", isOwn ? "w-64" : "w-72")} />
						</div>
					</div>
				)
			})}
		</div>
	)
}
