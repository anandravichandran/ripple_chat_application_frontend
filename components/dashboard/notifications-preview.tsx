"use client"

import { motion } from "framer-motion"
import { GlassCard } from "@/components/shared/glass-card"
import { UserAvatar } from "@/components/shared/user-avatar"
import { Bell } from "lucide-react"
import { useNotificationStore } from "@/store/notification-store"
import { relative } from "@/lib/format"
import { Button } from "@/components/ui/button"

export function NotificationsPreview() {
	const items = useNotificationStore((s) => s.items).slice(0, 4)
	const open = useNotificationStore((s) => s.setDrawer)
	return (
		<GlassCard className="p-5">
			<div className="mb-4 flex items-center justify-between">
				<h3 className="flex items-center gap-2 text-sm font-semibold tracking-tight">
					<Bell className="h-4 w-4 text-accent-primary" />Recent notifications
				</h3>
				<Button variant="ghost" size="sm" onClick={() => open(true)}>Open drawer</Button>
			</div>
			<ul className="space-y-2">
				{items.map((n, i) => (
					<motion.li
						key={n.id}
						initial={{ opacity: 0, y: 4 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.04 * i }}
						className="flex items-start gap-3 rounded-xl border border-glass-border bg-white/[0.02] p-3"
					>
						{n.actor ? (
							<UserAvatar src={n.actor.avatar} initials={n.actor.name?.charAt(0)?.toUpperCase()} size="xs" />
						) : (
							<div className="flex h-6 w-6 items-center justify-center rounded-full border border-glass-border bg-white/[0.04]">
								<Bell className="h-3 w-3 text-text-muted" />
							</div>
						)}
						<div className="min-w-0 flex-1">
							<p className="truncate text-xs font-medium text-text-primary">{n.title}</p>
							<p className="truncate text-xs text-text-muted">{relative(n.at)}</p>
						</div>
					</motion.li>
				))}
			</ul>
		</GlassCard>
	)
}
