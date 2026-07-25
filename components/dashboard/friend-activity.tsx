"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/shared/glass-card"
import { UserAvatar } from "@/components/shared/user-avatar"
import { useOnlineStore } from "@/store/online-store"
import { useAuthStore } from "@/store/auth-store"
import { useUserSearch } from "@/hooks/use-user-search"
import { useProfileDrawer } from "@/store/profile-drawer-store"

const statusLabel: Record<string, string> = {
	online: "Active now",
	idle: "Away — back soon",
	dnd: "In deep work",
	offline: "Offline",
}

export function FriendActivity() {
	const onlineIds = useOnlineStore((s) => s.onlineIds)
	const currentUser = useAuthStore((s) => s.user)

	// Use a known online user list to show avatars
	const onlineArr = useMemo(() => Array.from(onlineIds).slice(0, 5), [onlineIds])

	// If no one is online, show a subset of known room members
	const { data: allUsers } = useUserSearch("")

	const displayUsers = useMemo(() => {
		if (onlineArr.length > 0) {
			return onlineArr.map((id) => ({ id, name: id, status: "online" as const }))
		}
		return []
	}, [onlineArr])
	const { openProfile } = useProfileDrawer()

	return (
		<GlassCard className="p-5">
			<div className="mb-4 flex items-center justify-between">
				<h3 className="text-sm font-semibold tracking-tight">Friend activity</h3>
				<span className="text-xs text-text-muted">{onlineIds.size > 0 ? `${onlineIds.size} online` : "Live"}</span>
			</div>
			{displayUsers.length === 0 ? (
				<p className="text-sm text-text-muted">No one is online right now.</p>
			) : (
				<ul className="space-y-3">
					{displayUsers.map((u, i) => (
						<motion.li
							key={u.id}
							initial={{ opacity: 0, x: -6 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.04 * i }}
							className="flex items-center gap-3"
						>
							<UserAvatar initials={u.name.charAt(0).toUpperCase()} status={u.status as any} size="sm" onClick={() => openProfile(u.id)} />
							<div className="min-w-0 flex-1">
								<p className="truncate text-sm font-medium text-text-primary">{u.name}</p>
								<p className="truncate text-xs text-text-muted">{statusLabel[u.status]}</p>
							</div>
						</motion.li>
					))}
				</ul>
			)}
		</GlassCard>
	)
}
