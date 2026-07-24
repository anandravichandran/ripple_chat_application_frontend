"use client"

import { MessageCircle } from "lucide-react"
import { ConversationList } from "@/components/dm/conversation-list"
import { EmptyState } from "@/components/ui/empty-state"

export default function MessagesIndex() {
	return (
		<div className="-mx-4 -mt-6 h-[calc(100vh-4rem)] overflow-hidden border-y border-glass-border bg-bg-primary/40 sm:-mx-6 lg:-mx-10 lg:mt-0 lg:h-[calc(100vh-4rem)] lg:rounded-3xl lg:border lg:border-glass-border lg:bg-white/[0.02]">
			<div className="flex h-full">
				<ConversationList />
				<div className="hidden flex-1 items-center justify-center p-8 md:flex">
					<EmptyState
						icon={MessageCircle}
						title="Pick a conversation"
						description="Select someone from the left to start chatting, or search to find a new contact."
					/>
				</div>
			</div>
		</div>
	)
}
