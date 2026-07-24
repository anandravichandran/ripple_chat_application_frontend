"use client"

import { WelcomeCard } from "@/components/dashboard/welcome-card"
import { StatsGrid } from "@/components/dashboard/stats-grid"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { PinnedRooms } from "@/components/dashboard/pinned-rooms"
import { RecentConversations } from "@/components/dashboard/recent-conversations"
import { FriendActivity } from "@/components/dashboard/friend-activity"
import { NotificationsPreview } from "@/components/dashboard/notifications-preview"
import { RecentFiles } from "@/components/dashboard/recent-files"
import { RecentMentions } from "@/components/dashboard/recent-mentions"
import { UpcomingMeetings } from "@/components/dashboard/upcoming-meetings"

export default function DashboardPage() {
	return (
		<div className="space-y-6">
			<WelcomeCard />
			<StatsGrid />
			<div className="grid gap-6 lg:grid-cols-3">
				<div className="lg:col-span-2 space-y-6">
					<PinnedRooms />
					<RecentConversations />
					<RecentMentions />
				</div>
				<div className="space-y-6">
					<QuickActions />
					<FriendActivity />
					<NotificationsPreview />
				</div>
			</div>
			<div className="grid gap-6 lg:grid-cols-2">
				<RecentFiles />
				<UpcomingMeetings />
			</div>
		</div>
	)
}
