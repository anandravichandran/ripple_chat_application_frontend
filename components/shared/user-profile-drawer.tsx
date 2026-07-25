"use client"

import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { X, Mail, Calendar, Clock, MessageSquare, Copy, Ban, Flag, ExternalLink } from "lucide-react"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import { GlassCard } from "@/components/shared/glass-card"
import { UserAvatar } from "@/components/shared/user-avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { usersApi } from "@/lib/api"

type Props = {
	userId: string | null
	onClose: () => void
}

export function UserProfileDrawer({ userId, onClose }: Props) {
	const router = useRouter()

	const { data: user } = useQuery({
		queryKey: ["user-profile", userId],
		queryFn: () => usersApi.get(userId!),
		enabled: !!userId,
	})

	return (
		<AnimatePresence>
			{userId && (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
						onClick={onClose}
					/>
					<motion.div
						initial={{ x: "100%" }}
						animate={{ x: 0 }}
						exit={{ x: "100%" }}
						transition={{ type: "spring", damping: 25, stiffness: 250 }}
						className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-glass-border bg-[#0F0F10]/95 backdrop-blur-2xl"
					>
						<div className="flex h-full flex-col overflow-y-auto">
							<div className="flex items-center justify-between border-b border-glass-border px-5 py-4">
								<h2 className="text-sm font-semibold">Profile</h2>
								<Button variant="ghost" size="iconSm" onClick={onClose}><X className="h-4 w-4" /></Button>
							</div>

							{user ? (
								<div className="flex-1 space-y-5 p-5">
									<div className="flex flex-col items-center gap-3 pt-4 text-center">
										<UserAvatar src={user.avatar} initials={user.name?.charAt(0)?.toUpperCase() ?? "?"} size="xl" status={user.status} ring />
										<div>
											<h3 className="text-lg font-semibold">{user.name}</h3>
											<p className="text-sm text-text-muted">@{user.username}</p>
											<div className="mt-1.5">
												<Badge variant={user.status === "online" ? "success" : user.status === "idle" ? "warn" : "outline"} className="capitalize text-xs">{user.status}</Badge>
											</div>
										</div>
									</div>

									{user.bio && (
										<GlassCard tone="subtle" className="p-4">
											<p className="text-sm text-text-primary">{user.bio}</p>
										</GlassCard>
									)}

									<div className="space-y-2">
										{user.email && (
											<div className="flex items-center gap-3 text-sm text-text-secondary">
												<Mail className="h-4 w-4 shrink-0" />{user.email}
											</div>
										)}
										<div className="flex items-center gap-3 text-sm text-text-secondary">
											<Calendar className="h-4 w-4 shrink-0" />Joined {user.joinedAt ? new Date(user.joinedAt).toLocaleDateString("en-US", { year: "numeric", month: "long" }) : "Unknown"}
										</div>
										{user.lastSeen && (
											<div className="flex items-center gap-3 text-sm text-text-secondary">
												<Clock className="h-4 w-4 shrink-0" />Last seen {user.lastSeen}
											</div>
										)}
									</div>

									{user.socials && user.socials.length > 0 && (
										<div>
											<h4 className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-muted">Links</h4>
											<div className="flex flex-wrap gap-2">
												{user.socials.map((s) => (
													<a key={s.label} href={s.url.startsWith("http") ? s.url : `https://${s.url}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-full border border-glass-border px-3 py-1 text-xs text-text-secondary hover:bg-glass-hover hover:text-text-primary">
														<ExternalLink className="h-3 w-3" />{s.label}
													</a>
												))}
											</div>
										</div>
									)}

									<div className="flex flex-wrap gap-2 pt-2">
										<Button size="sm" className="flex-1" onClick={() => { router.push(`/messages/${userId}`); onClose() }}>
											<MessageSquare className="h-4 w-4 mr-1" /> Message
										</Button>
										<Button variant="secondary" size="sm" onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/profile/${userId}`); toast.success("Profile link copied") }}>
											<Copy className="h-4 w-4" />
										</Button>
									</div>

									<div className="border-t border-glass-border pt-4">
										<div className="flex gap-2">
											<Button variant="ghost" size="sm" className="text-state-danger hover:bg-state-danger/10" onClick={() => toast.info("Block user — coming soon")}>
												<Ban className="h-4 w-4 mr-1" /> Block
											</Button>
											<Button variant="ghost" size="sm" className="text-state-warn hover:bg-state-warn/10" onClick={() => toast.info("Report user — coming soon")}>
												<Flag className="h-4 w-4 mr-1" /> Report
											</Button>
										</div>
									</div>
								</div>
							) : (
								<div className="flex flex-1 items-center justify-center">
									<p className="text-sm text-text-muted">Loading profile…</p>
								</div>
							)}
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}
