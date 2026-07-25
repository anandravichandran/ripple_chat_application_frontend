"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/shared/glass-card"
import { UserAvatar } from "@/components/shared/user-avatar"
import { Badge } from "@/components/ui/badge"
import { useRooms } from "@/hooks/use-rooms"
import { useAuthStore } from "@/store/auth-store"

export function RecentConversations() {
	const { data: rooms, isLoading } = useRooms()
	const user = useAuthStore((s) => s.user)

	const directRooms = (rooms ?? []).filter((r) => r.isDirect).slice(0, 5)

	if (isLoading) return null

	return (
		<GlassCard className="p-5">
			<div className="mb-4 flex items-center justify-between">
				<h3 className="text-sm font-semibold tracking-tight">Recent conversations</h3>
				<Link href="/messages" className="text-xs text-text-muted hover:text-text-primary">All DMs</Link>
			</div>
			{directRooms.length === 0 ? (
				<p className="text-sm text-text-muted">No direct messages yet. Start a conversation from the members list.</p>
			) : (
				<ul className="space-y-1">
					{directRooms.map((r, i) => (
						<motion.li
							key={r.id}
							initial={{ opacity: 0, y: 6 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.03 * i }}
						>
							<Link
								href={`/messages/${r.id}`}
								className="flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-glass-hover"
							>
								<UserAvatar initials={r.name?.charAt(0)?.toUpperCase() ?? "?"} status={r.online && r.online > 0 ? "online" : "offline"} size="sm" />
								<div className="min-w-0 flex-1">
									<div className="flex items-center justify-between gap-2">
										<p className="truncate text-sm font-medium text-text-primary">{r.name}</p>
										{r.lastActivity && <span className="shrink-0 text-[11px] text-text-muted">{r.lastActivity}</span>}
									</div>
									<div className="flex items-center gap-2">
										<p className="truncate text-xs text-text-secondary">{r.lastMessage ?? "No messages yet"}</p>
										{(r.unread ?? 0) > 0 ? <Badge variant="accent">{r.unread}</Badge> : null}
									</div>
								</div>
							</Link>
						</motion.li>
					))}
				</ul>
			)}
		</GlassCard>
	)
}
