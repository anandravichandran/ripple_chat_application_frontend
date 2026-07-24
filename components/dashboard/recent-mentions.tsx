"use client"

import { motion } from "framer-motion"
import { GlassCard } from "@/components/shared/glass-card"
import { AtSign } from "lucide-react"
import { recentMentions } from "@/lib/mock"

export function RecentMentions() {
	return (
		<GlassCard className="p-5">
			<div className="mb-4 flex items-center justify-between">
				<h3 className="flex items-center gap-2 text-sm font-semibold tracking-tight">
					<AtSign className="h-4 w-4 text-accent-primary" />Recent mentions
				</h3>
				<span className="text-xs text-text-muted">Last 24h</span>
			</div>
			<ul className="space-y-3">
				{recentMentions.map((m, i) => (
					<motion.li
						key={m.id}
						initial={{ opacity: 0, y: 6 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.04 * i }}
						className="rounded-xl border border-glass-border bg-white/[0.02] p-3"
					>
						<div className="flex items-center justify-between">
							<p className="text-sm font-medium text-text-primary">{m.by}</p>
							<span className="text-[11px] text-text-muted">{m.at}</span>
						</div>
						<p className="mt-0.5 text-xs text-text-secondary">“{m.text}” in <span className="text-accent-primary">#{m.room.toLowerCase().replace(/\s+/g, "-")}</span></p>
					</motion.li>
				))}
			</ul>
		</GlassCard>
	)
}
