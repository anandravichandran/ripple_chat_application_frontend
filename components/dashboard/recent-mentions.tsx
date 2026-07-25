"use client"

import { motion } from "framer-motion"
import { GlassCard } from "@/components/shared/glass-card"
import { UserAvatar } from "@/components/shared/user-avatar"
import { AtSign } from "lucide-react"
import { useNotifications } from "@/hooks/use-notifications"

export function RecentMentions() {
	const { data } = useNotifications({ filter: "mentions" })
	const mentions = (data?.notifications ?? []).slice(0, 5)

	return (
		<GlassCard className="p-5">
			<div className="mb-4 flex items-center justify-between">
				<h3 className="flex items-center gap-2 text-sm font-semibold tracking-tight">
					<AtSign className="h-4 w-4 text-accent-primary" />Recent mentions
				</h3>
				<span className="text-xs text-text-muted">Last 24h</span>
			</div>
			{mentions.length === 0 ? (
				<p className="text-sm text-text-muted">No recent mentions.</p>
			) : (
				<ul className="space-y-3">
					{mentions.map((m, i) => (
						<motion.li
							key={m.id}
							initial={{ opacity: 0, y: 6 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.04 * i }}
							className="rounded-xl border border-glass-border bg-white/[0.02] p-3"
						>
							<div className="flex items-center gap-3">
								<UserAvatar src={m.actor?.avatar} initials={m.actor?.name?.charAt(0)?.toUpperCase()} size="xs" />
								<div className="flex-1 min-w-0">
									<div className="flex items-center justify-between gap-2">
										<p className="truncate text-sm font-medium text-text-primary">{m.actor?.name ?? "Someone"}</p>
										<span className="shrink-0 text-[11px] text-text-muted">{m.at ?? ""}</span>
									</div>
									<p className="mt-0.5 truncate text-xs text-text-secondary">{m.body ?? m.title}</p>
								</div>
							</div>
						</motion.li>
					))}
				</ul>
			)}
		</GlassCard>
	)
}
