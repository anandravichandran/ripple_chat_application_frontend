"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Bell, Check, Trash2, X } from "lucide-react"
import { useNotificationStore } from "@/store/notification-store"
import { Button } from "@/components/ui/button"
import { UserAvatar } from "@/components/shared/user-avatar"
import { EmptyState } from "@/components/ui/empty-state"
import { relative } from "@/lib/format"
import { cn } from "@/lib/utils"

export function NotificationDrawer() {
	const { drawerOpen, setDrawer, items, markAllRead, remove } = useNotificationStore()
	return (
		<AnimatePresence>
			{drawerOpen ? (
				<>
					<motion.div
						key="overlay"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md"
						onClick={() => setDrawer(false)}
					/>
					<motion.aside
						key="drawer"
						initial={{ x: "100%" }}
						animate={{ x: 0 }}
						exit={{ x: "100%" }}
						transition={{ type: "spring", stiffness: 260, damping: 30 }}
						className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-glass-border bg-[#0B0B0C]/95 backdrop-blur-2xl"
						role="dialog"
						aria-label="Notifications"
					>
						<header className="flex items-center justify-between border-b border-glass-border p-5">
							<div className="flex items-center gap-2.5">
								<div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-glass-border bg-white/[0.04]">
									<Bell className="h-4 w-4 text-accent-primary" />
								</div>
								<div>
									<h2 className="text-base font-semibold tracking-tight">Notifications</h2>
									<p className="text-xs text-text-muted">Grouped by recency</p>
								</div>
							</div>
							<div className="flex items-center gap-1.5">
								<Button variant="ghost" size="sm" onClick={markAllRead}>
									<Check className="h-4 w-4" />Mark all read
								</Button>
								<Button variant="ghost" size="iconSm" onClick={() => setDrawer(false)} aria-label="Close">
									<X className="h-4 w-4" />
								</Button>
							</div>
						</header>

						<div className="flex-1 overflow-y-auto p-4">
							{items.length === 0 ? (
								<EmptyState icon={Bell} title="You're all caught up" description="New notifications will appear here." />
							) : (
								<ul className="space-y-2">
									{items.map((n) => (
										<li
											key={n.id}
											className={cn(
												"group flex items-start gap-3 rounded-2xl border border-glass-border bg-white/[0.03] p-4 transition-colors hover:bg-glass-hover",
												!n.read && "border-accent-primary/25",
											)}
										>
											{n.actor ? (
												<UserAvatar initials={n.actor.avatar} size="sm" />
											) : (
												<div className="flex h-8 w-8 items-center justify-center rounded-full border border-glass-border bg-white/[0.04]">
													<Bell className="h-3.5 w-3.5 text-text-muted" />
												</div>
											)}
											<div className="min-w-0 flex-1">
												<p className="text-sm font-medium text-text-primary">{n.title}</p>
												<p className="mt-0.5 text-xs text-text-secondary line-clamp-2">{n.body}</p>
												<p className="mt-1 text-[11px] text-text-muted">{relative(n.at)}</p>
											</div>
											<button
												type="button"
												onClick={() => remove(n.id)}
												className="invisible flex h-7 w-7 items-center justify-center rounded-lg border border-glass-border bg-white/[0.03] text-text-muted transition-colors hover:bg-state-danger/10 hover:text-state-danger group-hover:visible"
												aria-label="Delete notification"
											>
												<Trash2 className="h-3.5 w-3.5" />
											</button>
										</li>
									))}
								</ul>
							)}
						</div>
					</motion.aside>
				</>
			) : null}
		</AnimatePresence>
	)
}
