"use client"

import { use, useEffect } from "react"
import { notFound } from "next/navigation"
import { ChatHeader } from "@/components/chat/chat-header"
import { ChatWindow } from "@/components/chat/chat-window"
import { OnlineMembers } from "@/components/chat/online-members"
import { useRoomStore } from "@/store/room-store"
import { rooms, users } from "@/lib/mock"

export default function RoomPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = use(params)
	const room = rooms.find((r) => r.id === id)
	const setCurrent = useRoomStore((s) => s.setCurrent)

	useEffect(() => {
		if (room) setCurrent(room.id)
		return () => setCurrent(null)
	}, [room, setCurrent])

	if (!room) return notFound()

	return (
		<div className="-mx-4 -mt-6 h-[calc(100vh-4rem)] overflow-hidden border-y border-glass-border bg-bg-primary/40 sm:-mx-6 lg:-mx-10 lg:mt-0 lg:h-[calc(100vh-4rem)] lg:rounded-3xl lg:border lg:border-glass-border lg:bg-white/[0.02]">
			<div className="flex h-full min-h-0">
				<div className="flex min-w-0 flex-1 flex-col">
					<ChatHeader room={room} />
					<ChatWindow room={room} />
				</div>
				<OnlineMembers users={users} />
			</div>
		</div>
	)
}
