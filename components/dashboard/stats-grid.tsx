"use client"

import { motion } from "framer-motion"
import { Users, MessageSquare, Hash, Zap } from "lucide-react"
import { GlassCard } from "@/components/shared/glass-card"
import { AnimatedCounter } from "@/components/shared/animated-counter"
import type { LucideIcon } from "lucide-react"

type Stat = {
	icon: LucideIcon
	label: string
	value: number
	suffix?: string
	delta: string
	tone: "accent" | "aqua" | "success" | "warn"
}

const stats: Stat[] = [
	{ icon: Users, label: "Online now", value: 128, delta: "+12 this hour", tone: "success" },
	{ icon: MessageSquare, label: "Unread messages", value: 12, delta: "3 mentions", tone: "accent" },
	{ icon: Hash, label: "Active rooms", value: 24, delta: "6 joined by you", tone: "aqua" },
	{ icon: Zap, label: "Latency", value: 42, suffix: "ms", delta: "stable", tone: "warn" },
]

const toneMap = {
	accent: "bg-accent-primary/10 text-accent-primary border-accent-primary/25",
	aqua: "bg-accent-secondary/10 text-accent-secondary border-accent-secondary/25",
	success: "bg-state-success/10 text-state-success border-state-success/25",
	warn: "bg-state-warn/10 text-state-warn border-state-warn/25",
}

export function StatsGrid() {
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
