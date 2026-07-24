"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Bell, Check, Trash2, AtSign, MessageSquare, UserPlus, Hash } from "lucide-react"
import { GlassCard } from "@/components/shared/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EmptyState } from "@/components/ui/empty-state"
import { UserAvatar } from "@/components/shared/user-avatar"
import { PageHeader } from "@/components/shared/page-header"
import { useNotificationStore } from "@/store/notification-store"
import { relative } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { Notification } from "@/lib/types"

const filters = ["all", "mentions", "messages", "invites"] as const
type Filter = (typeof filters)[number]

const iconMap: Record<string, typeof AtSign> = {
	mention: AtSign,
	message: MessageSquare,
	invite: UserPlus,
	room: Hash,
}

function bucketOf(iso: string): "Today" | "Yesterday" | "This week" | "Older" {
	const d = new Date(iso)
	const now = new Date()
	const diff = (now.getTime() - d.getTime()) / 86400000
	if (d.toDateString() === now.toDateString()) return "Today"
	const yest = new Date(now); yest.setDate(now.getDate() - 1)
	if (d.toDateString() === yest.toDateString()) return "Yesterday"
	if (diff < 7) return "This week"
	return "Older"
}

export default function NotificationsPage() {
	const { items, markAllRead, remove, markRead } = useNotificationStore()
	const [filter, setFilter] = useState<Filter>("all")

	const filtered = useMemo(() => {
		return items.filter((n) => filter === "all" || (filter === "mentions" && n.kind === "mention") || (filter === "messages" && n.kind === "message") || (filter === "invites" && (n.kind === "invite" || n.kind === "room")))
	}, [items, filter])

	const grouped = useMemo(() => {
		const map: Record<string, Notification[]> = { Today: [], Yesterday: [], "This week": [], Older: [] }
		for (const n of filtered) map[bucketOf(n.at)].push(n)
		return map
	}, [filtered])

	return (
		<div className="space-y-6">
			<PageHeader
				eyebrow="Inbox"
				title="Notifications"
				description="Mentions, messages, and invites, grouped by recency."
				actions={
					<Button variant="secondary" size="sm" onClick={markAllRead}>
						<Check className="h-4 w-4" />Mark all read
					</Button>
				}
			/>

			<div className="flex flex-wrap gap-1.5 rounded-full border border-glass-border bg-white/[0.03] p-1 w-fit">
				{filters.map((f) => (
					<button
						key={f}
						type="button"
						onClick={() => setFilter(f)}
						className={cn(
							"rounded-full px-3.5 py-1.5 text-xs font-medium capitalize transition-colors",
							filter === f ? "bg-white/[0.08] text-text-primary" : "text-text-secondary hover:bg-glass-hover hover:text-text-primary",
						)}
					>
						{f}
					</button>
				))}
			</div>

			{filtered.length === 0 ? (
				<EmptyState icon={Bell} title="You're all caught up" description="New notifications will appear here." />
			) : (
				<div className="space-y-6">
					{(Object.keys(grouped) as (keyof typeof grouped)[]).map((bucket) => {
						const arr = grouped[bucket]
						if (arr.length === 0) return null
						return (
							<section key={bucket}>
								<div className="mb-2 flex items-center gap-2 px-1">
									<h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted">{bucket}</h3>
									<span className="text-xs text-text-muted">· {arr.length}</span>
								</div>
								<GlassCard className="p-2">
									<ul className="space-y-1">
										{arr.map((n, i) => {
											const Icon = iconMap[n.kind] ?? Bell
											return (
												<motion.li
													key={n.id}
													initial={{ opacity: 0, y: 4 }}
													animate={{ opacity: 1, y: 0 }}
													transition={{ delay: 0.02 * i }}
													onClick={() => !n.read && markRead(n.id)}
													className={cn(
														"group flex items-start gap-3 rounded-2xl border border-transparent p-3 transition-colors",
														!n.read ? "bg-accent-primary/[0.04] hover:bg-accent-primary/[0.07]" : "hover:bg-glass-hover",
													)}
												>
													{n.actor ? (
														<UserAvatar initials={n.actor.avatar} size="sm" />
													) : (
														<div className="flex h-8 w-8 items-center justify-center rounded-full border border-glass-border bg-white/[0.04] text-accent-primary">
															<Icon className="h-3.5 w-3.5" />
														</div>
													)}
													<div className="min-w-0 flex-1">
														<div className="flex items-center gap-2">
															<p className="truncate text-sm font-medium text-text-primary">{n.title}</p>
															{!n.read ? <Badge variant="accent">New</Badge> : null}
														</div>
														<p className="text-xs text-text-secondary line-clamp-2">{n.body}</p>
														<p className="mt-1 text-[11px] text-text-muted">{relative(n.at)}</p>
													</div>
													<button type="button" onClick={(e) => { e.stopPropagation(); remove(n.id) }} className="invisible flex h-7 w-7 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-state-danger/10 hover:text-state-danger group-hover:visible">
														<Trash2 className="h-3.5 w-3.5" />
													</button>
												</motion.li>
											)
										})}
									</ul>
								</GlassCard>
							</section>
						)
					})}
				</div>
			)}
		</div>
	)
}
