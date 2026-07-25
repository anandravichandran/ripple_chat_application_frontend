"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import { ConversationList } from "@/components/dm/conversation-list"
import { DmWindow } from "@/components/dm/dm-window"
import { useConversations, useDmMessages } from "@/hooks/use-conversations"

export default function DmPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = use(params)
	const { data: conversations = [], isLoading: loadingConvs } = useConversations()
	const conv = conversations.find((c) => c.id === id)
	const { data: seed = [] } = useDmMessages(id)

	if (!loadingConvs && !conv) return notFound()
	if (!conv) return null

	return (
		<div className="-mx-4 -mt-6 h-[calc(100vh-4rem)] overflow-hidden border-y border-glass-border bg-bg-primary/40 sm:-mx-6 lg:-mx-10 lg:mt-0 lg:h-[calc(100vh-4rem)] lg:rounded-3xl lg:border lg:border-glass-border lg:bg-white/[0.02]">
			<div className="flex h-full">
				<div className="hidden md:block">
					<ConversationList />
				</div>
				<DmWindow conversation={conv} seed={seed} />
			</div>
		</div>
	)
}