"use client"

import { motion } from "framer-motion"
import { UserAvatar } from "@/components/shared/user-avatar"
import { GlassCard } from "@/components/shared/glass-card"
import type { User } from "@/lib/types"

export function OnlineMembers({ users }: { users: User[] }) {
	const online = users.filter((u) => u.status === "online")
	const others = users.filter((u) => u.status !== "online")
	return (
		<div className="hidden w-72 shrink-0 border-l border-glass-border bg-white/[0.02] xl:block">
			<div className="sticky top-0 h-full overflow-y-auto p-4">
				<GlassCard className="p-4">
					<h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted">Online · {online.length}</h3>
					<ul className="mt-3 space-y-2">
						{online.map((u, i) => (
							<motion.li
								key={u.id}
								initial={{ opacity: 0, x: -4 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.03 * i }}
								className="flex items-center gap-3"
							>
								<UserAvatar initials={u.avatar} status={u.status} size="sm" />
								<div className="min-w-0">
									<p className="truncate text-sm font-medium text-text-primary">{u.name}</p>
									<p className="truncate text-[11px] text-text-muted">@{u.username}</p>
								</div>
							</motion.li>
						))}
					</ul>
				</GlassCard>
				{others.length > 0 ? (
					<GlassCard className="mt-4 p-4">
						<h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted">Away · {others.length}</h3>
						<ul className="mt-3 space-y-2">
							{others.map((u) => (
								<li key={u.id} className="flex items-center gap-3 opacity-70">
									<UserAvatar initials={u.avatar} status={u.status} size="sm" />
									<div className="min-w-0">
										<p className="truncate text-sm text-text-secondary">{u.name}</p>
										<p className="truncate text-[11px] text-text-muted">{u.lastSeen}</p>
									</div>
								</li>
							))}
						</ul>
					</GlassCard>
				) : null}
			</div>
		</div>
	)
}
