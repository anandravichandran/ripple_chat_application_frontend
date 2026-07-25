"use client"

import { GlassCard } from "@/components/shared/glass-card"
import { CalendarCheck } from "lucide-react"

export function UpcomingMeetings() {
	return (
		<GlassCard className="p-5">
			<div className="mb-4 flex items-center justify-between">
				<h3 className="flex items-center gap-2 text-sm font-semibold tracking-tight">
					<CalendarCheck className="h-4 w-4 text-state-warn" />Upcoming
				</h3>
				<span className="text-xs text-text-muted">Calendar</span>
			</div>
			<p className="text-sm text-text-muted">Calendar integration coming soon.</p>
		</GlassCard>
	)
}
