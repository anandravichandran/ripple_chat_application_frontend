"use client"

import { motion } from "framer-motion"
import { GlassCard } from "@/components/shared/glass-card"
import { UserAvatar } from "@/components/shared/user-avatar"
import { users } from "@/lib/mock"

const statusLabel: Record<string, string> = {
	online: "Active in Design Systems",
	idle: "Away — back soon",
	dnd: "In deep work",
	offline: "Offline",
}

export function FriendActivity() {
	return (
		<GlassCard className="p-5">
			<div className="mb-4 flex items-center justify-between">
				<h3 className="text-sm font-semibold tracking-tight">Friend activity</h3>
				<span className="text-xs text-text-muted">Live</span>
			</div>
			<ul className="space-y-3">
				{users.slice(1, 6).map((u, i) => (
					<motion.li
						key={u.id}
						initial={{ opacity: 0, x: -6 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.04 * i }}
						className="flex items-center gap-3"
					>
						<UserAvatar initials={u.avatar} status={u.status} size="sm" />
						<div className="min-w-0 flex-1">
							<p className="truncate text-sm font-medium text-text-primary">{u.name}</p>
							<p className="truncate text-xs text-text-muted">{statusLabel[u.status]}</p>
						</div>
						<span className="text-[11px] text-text-muted">{u.lastSeen}</span>
					</motion.li>
				))}
			</ul>
		</GlassCard>
	)
}
