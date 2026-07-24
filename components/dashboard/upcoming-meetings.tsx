"use client"

import { motion } from "framer-motion"
import { GlassCard } from "@/components/shared/glass-card"
import { Calendar, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { upcomingMeetings } from "@/lib/mock"

export function UpcomingMeetings() {
	return (
		<GlassCard className="p-5">
			<div className="mb-4 flex items-center justify-between">
				<h3 className="flex items-center gap-2 text-sm font-semibold tracking-tight">
					<Calendar className="h-4 w-4 text-accent-secondary" />Upcoming meetings
				</h3>
				<Badge variant="outline">Placeholder</Badge>
			</div>
			<ul className="space-y-2">
				{upcomingMeetings.map((m, i) => (
					<motion.li
						key={m.id}
						initial={{ opacity: 0, y: 4 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.04 * i }}
						className="flex items-center gap-3 rounded-xl border border-glass-border bg-white/[0.02] p-3"
					>
						<div className="flex h-9 w-9 items-center justify-center rounded-xl border border-accent-secondary/25 bg-accent-secondary/10 text-accent-secondary">
							<Calendar className="h-4 w-4" />
						</div>
						<div className="min-w-0 flex-1">
							<p className="truncate text-sm font-medium">{m.title}</p>
							<p className="truncate text-xs text-text-muted">{m.at}</p>
						</div>
						<div className="flex items-center gap-1 text-xs text-text-muted">
							<Users className="h-3 w-3" />{m.attendees}
						</div>
					</motion.li>
				))}
			</ul>
		</GlassCard>
	)
}
