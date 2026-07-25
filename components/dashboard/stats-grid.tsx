"use client"

import { motion } from "framer-motion"
import { Users, MessageSquare, Hash, Zap } from "lucide-react"
import { GlassCard } from "@/components/shared/glass-card"
import { AnimatedCounter } from "@/components/shared/animated-counter"
import { useRooms } from "@/hooks/use-rooms"
import { useOnlineStore } from "@/store/online-store"
import { useSocketStore } from "@/store/socket-store"
import type { LucideIcon } from "lucide-react"

export function StatsGrid() {
	const { data: rooms } = useRooms()
	const onlineCount = useOnlineStore((s) => s.onlineIds.size)
	const latency = useSocketStore((s) => s.latencyMs)
	const roomCount = rooms?.length ?? 0

	const stats = [
		{ icon: Users, label: "Online now", value: onlineCount, delta: onlineCount === 1 ? "1 user connected" : `${onlineCount} users connected`, tone: "success" as const },
		{ icon: MessageSquare, label: "Unread messages", value: rooms?.reduce((sum, r) => sum + (r.unread ?? 0), 0) ?? 0, delta: "across all rooms", tone: "accent" as const },
		{ icon: Hash, label: "Active rooms", value: roomCount, delta: roomCount === 1 ? "1 room joined" : `${roomCount} rooms joined`, tone: "aqua" as const },
		{ icon: Zap, label: "Latency", value: latency ?? 0, suffix: "ms", delta: latency ? `socket ${latency < 100 ? "healthy" : "degraded"}` : "pending", tone: "warn" as const },
	]

	const toneMap = {
		accent: "bg-accent-primary/10 text-accent-primary border-accent-primary/25",
		aqua: "bg-accent-secondary/10 text-accent-secondary border-accent-secondary/25",
		success: "bg-state-success/10 text-state-success border-state-success/25",
		warn: "bg-state-warn/10 text-state-warn border-state-warn/25",
	}

	return (
		<div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
			{stats.map((s, i) => {
				const Icon = s.icon
				return (
					<motion.div
						key={s.label}
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.05 * i, duration: 0.4, ease: "easeOut" }}
					>
						<GlassCard hoverLift className="p-5">
							<div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-2xl border ${toneMap[s.tone]}`}>
								<Icon className="h-4 w-4" />
							</div>
							<p className="text-xs uppercase tracking-widest text-text-muted">{s.label}</p>
							<p className="mt-1.5 text-3xl font-semibold tracking-tight text-text-primary">
								<AnimatedCounter value={s.value} suffix={s.suffix} />
							</p>
							<p className="mt-1 text-xs text-text-secondary">{s.delta}</p>
						</GlassCard>
					</motion.div>
				)
			})}
		</div>
	)
}
