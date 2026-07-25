"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Pin, Users, ArrowUpRight } from "lucide-react"
import { GlassCard } from "@/components/shared/glass-card"
import { Badge } from "@/components/ui/badge"
import { useRooms } from "@/hooks/use-rooms"

export function PinnedRooms() {
	const { data: rooms, isLoading } = useRooms()
	const pinned = (rooms ?? []).filter((r) => r.pinned)

	if (isLoading) return null

	return (
		<GlassCard className="p-5">
			<div className="mb-4 flex items-center justify-between">
				<h3 className="flex items-center gap-2 text-sm font-semibold tracking-tight">
					<Pin className="h-4 w-4 text-accent-primary" />Pinned rooms
				</h3>
				<Link href="/rooms" className="text-xs text-text-muted hover:text-text-primary">See all</Link>
			</div>
			{pinned.length === 0 ? (
				<p className="text-sm text-text-muted">No pinned rooms yet. Pin a room from the rooms page.</p>
			) : (
				<ul className="space-y-2">
					{pinned.map((r, i) => (
						<motion.li
							key={r.id}
							initial={{ opacity: 0, y: 6 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.03 * i }}
						>
							<Link
								href={`/rooms/${r.id}`}
								className="group flex items-center gap-3 rounded-2xl border border-glass-border bg-white/[0.02] p-3 transition-all hover:-translate-y-0.5 hover:bg-glass-hover"
							>
								<span className="flex h-10 w-10 items-center justify-center rounded-xl border border-glass-border bg-white/[0.04] text-lg">
									{r.icon ?? "#"}
								</span>
								<div className="min-w-0 flex-1">
									<p className="truncate text-sm font-medium text-text-primary">{r.name}</p>
									<p className="truncate text-xs text-text-muted">{r.lastMessage ?? "No messages yet"}</p>
								</div>
								<div className="flex flex-col items-end gap-1">
									<div className="flex items-center gap-1 text-[11px] text-text-muted">
										<Users className="h-3 w-3" />{r.online ?? 0}
									</div>
									{(r.unread ?? 0) > 0 ? <Badge variant="accent">{r.unread}</Badge> : null}
								</div>
								<ArrowUpRight className="h-4 w-4 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
							</Link>
						</motion.li>
					))}
				</ul>
			)}
		</GlassCard>
	)
}
