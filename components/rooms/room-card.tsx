"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Lock, Users, Pin, ArrowUpRight } from "lucide-react"
import { GlassCard } from "@/components/shared/glass-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Room } from "@/lib/types"

export function RoomCard({ room, index = 0 }: { room: Room; index?: number }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.03 * index, duration: 0.35, ease: "easeOut" }}
		>
			<GlassCard hoverLift className="group relative flex h-full flex-col p-5">
				<div className="flex items-start justify-between">
					<div className="flex items-center gap-3">
						<div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-glass-border bg-white/[0.04] text-xl">
							{room.icon}
						</div>
						<div className="min-w-0">
							<div className="flex items-center gap-1.5">
								<h3 className="truncate text-base font-semibold text-text-primary">{room.name}</h3>
								{room.pinned ? <Pin className="h-3 w-3 text-accent-primary" /> : null}
							</div>
							<p className="mt-0.5 flex items-center gap-1.5 text-xs text-text-muted">
								{room.visibility === "private" ? <Lock className="h-3 w-3" /> : null}
								<span className="capitalize">{room.visibility}</span>
								<span>·</span>
								<span>{room.category}</span>
							</p>
						</div>
					</div>
					{room.unread > 0 ? <Badge variant="accent">{room.unread}</Badge> : null}
				</div>

				<p className="mt-4 text-sm text-text-secondary line-clamp-2">{room.description}</p>
				<p className="mt-3 text-xs text-text-muted">
					<span className="text-text-secondary">{room.lastAuthor}:</span> {room.lastMessage}
				</p>

				<div className="mt-5 flex items-end justify-between">
					<div className="flex flex-col gap-1 text-[11px] text-text-muted">
						<span className="flex items-center gap-1"><Users className="h-3 w-3" />{room.members} members</span>
						<span className="flex items-center gap-1">
							<span className="h-1.5 w-1.5 rounded-full bg-state-success" />{room.online} online now
						</span>
					</div>
					<Button asChild size="sm" variant="secondary" className="group-hover:border-accent-primary/40 group-hover:text-accent-primary">
						<Link href={`/rooms/${room.id}`}>
							Join<ArrowUpRight className="h-3.5 w-3.5" />
						</Link>
					</Button>
				</div>
			</GlassCard>
		</motion.div>
	)
}
