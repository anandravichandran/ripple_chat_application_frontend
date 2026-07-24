"use client"

import { use, useEffect, useState } from "react"
import { notFound } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { X, Hash, Users, Tag } from "lucide-react"
import { ChatHeader } from "@/components/chat/chat-header"
import { ChatWindow } from "@/components/chat/chat-window"
import { OnlineMembers } from "@/components/chat/online-members"
import { GlassCard } from "@/components/shared/glass-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRoomStore } from "@/store/room-store"
import { rooms, users } from "@/lib/mock"

export default function RoomPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = use(params)
	const room = rooms.find((r) => r.id === id)
	const setCurrent = useRoomStore((s) => s.setCurrentRoom)
	const [infoOpen, setInfoOpen] = useState(false)

	useEffect(() => {
		if (room) setCurrent(room.id)
		return () => setCurrent(null)
	}, [room?.id, setCurrent])

	if (!room) return notFound()

	return (
		<div className="-mx-4 -mt-6 h-[calc(100vh-4rem)] overflow-hidden border-y border-glass-border bg-bg-primary/40 sm:-mx-6 lg:-mx-10 lg:mt-0 lg:h-[calc(100vh-4rem)] lg:rounded-3xl lg:border lg:border-glass-border lg:bg-white/[0.02]">
			<div className="flex h-full min-h-0">
				<div className="flex min-w-0 flex-1 flex-col">
					<ChatHeader room={room} onToggleInfo={() => setInfoOpen((v) => !v)} />
					<ChatWindow room={room} />
				</div>
				<AnimatePresence>
					{infoOpen ? (
						<motion.aside
							initial={{ width: 0, opacity: 0 }}
							animate={{ width: 280, opacity: 1 }}
							exit={{ width: 0, opacity: 0 }}
							transition={{ duration: 0.25, ease: "easeInOut" }}
							className="hidden overflow-hidden border-l border-glass-border lg:block"
						>
							<div className="flex h-full w-[280px] flex-col">
								<div className="flex items-center justify-between border-b border-glass-border px-5 py-4">
									<h3 className="text-sm font-semibold">Room info</h3>
									<Button variant="ghost" size="iconSm" onClick={() => setInfoOpen(false)}><X className="h-4 w-4" /></Button>
								</div>
								<div className="flex-1 space-y-5 overflow-y-auto p-5">
									<div className="flex flex-col items-center gap-2 text-center">
										<span className="flex h-16 w-16 items-center justify-center rounded-3xl border border-glass-border bg-white/[0.04] text-3xl">{room.icon}</span>
										<h2 className="text-lg font-semibold">{room.name}</h2>
										<Badge variant={room.visibility === "public" ? "outline" : "aqua"}>{room.visibility}</Badge>
									</div>
									<div>
										<p className="text-xs font-semibold uppercase tracking-widest text-text-muted">Description</p>
										<p className="mt-1 text-sm text-text-secondary">{room.description}</p>
									</div>
									<div className="space-y-2">
										<p className="text-xs font-semibold uppercase tracking-widest text-text-muted">Details</p>
										<div className="flex items-center gap-2 text-sm text-text-secondary"><Users className="h-4 w-4" />{room.members} members</div>
										<div className="flex items-center gap-2 text-sm text-text-secondary"><Hash className="h-4 w-4" />{room.category}</div>
										{room.tags?.map((t) => <Badge key={t} variant="outline"><Tag className="h-3 w-3" />{t}</Badge>)}
									</div>
								</div>
							</div>
						</motion.aside>
					) : null}
				</AnimatePresence>
				<OnlineMembers users={users} />
			</div>
		</div>
	)
}
