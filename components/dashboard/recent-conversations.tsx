"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/shared/glass-card"
import { UserAvatar } from "@/components/shared/user-avatar"
import { Badge } from "@/components/ui/badge"
import { conversations } from "@/lib/mock"

export function RecentConversations() {
	return (
		<GlassCard className="p-5">
			<div className="mb-4 flex items-center justify-between">
				<h3 className="text-sm font-semibold tracking-tight">Recent conversations</h3>
				<Link href="/messages" className="text-xs text-text-muted hover:text-text-primary">All DMs</Link>
			</div>
			<ul className="space-y-1">
				{conversations.slice(0, 5).map((c, i) => (
					<motion.li
						key={c.id}
						initial={{ opacity: 0, y: 6 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.03 * i }}
					>
						<Link
							href={`/messages/${c.id}`}
							className="flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-glass-hover"
						>
							<UserAvatar initials={c.user.avatar} status={c.user.status} size="sm" />
							<div className="min-w-0 flex-1">
								<div className="flex items-center justify-between gap-2">
									<p className="truncate text-sm font-medium text-text-primary">{c.user.name}</p>
									<span className="shrink-0 text-[11px] text-text-muted">{c.lastAt}</span>
								</div>
								<div className="flex items-center gap-2">
									<p className="truncate text-xs text-text-secondary">
										{c.typing ? <span className="text-accent-primary">typing…</span> : c.lastMessage}
									</p>
									{c.unread > 0 ? <Badge variant="accent">{c.unread}</Badge> : null}
								</div>
							</div>
						</Link>
					</motion.li>
				))}
			</ul>
		</GlassCard>
	)
}
