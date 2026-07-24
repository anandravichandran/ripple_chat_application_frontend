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
import { useRoom } from "@/hooks/use-rooms"
import { FullPageLoader } from "@/components/shared/loader"
import type { Room } from "@/lib/types"

export default function RoomPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = use(params)
	const { data: room, isLoading } = useRoom(id)
	const r = room as Record<string, unknown> | undefined
	const setCurrent = useRoomStore((s) => s.setCurrentRoom)
	const [infoOpen, setInfoOpen] = useState(false)

	useEffect(() => {
		if (r) setCurrent(r.id as string)
		return () => setCurrent(null)
	}, [r?.id, setCurrent])

	if (isLoading) return <FullPageLoader label="Loading room…" />
	if (!r) return notFound()

	const roomData: Room = {
		id: r.id as string,
		name: r.name as string,
		description: (r.description as string) ?? "",
		icon: (r.icon as string) ?? "",
		category: (r.category as string) ?? "",
		visibility: ((r.visibility as string)?.toLowerCase() ?? "public") as "public" | "private",
		members: (r.memberCount as number) ?? 0,
		online: 0,
		unread: 0,
		lastMessage: "",
		lastAuthor: "",
		lastAt: "",
	}

	return (
		<div className="-mx-4 -mt-6 h-[calc(100vh-4rem)] overflow-hidden border-y border-glass-border bg-bg-primary/40 sm:-mx-6 lg:-mx-10 lg:mt-0 lg:h-[calc(100vh-4rem)] lg:rounded-3xl lg:border lg:border-glass-border lg:bg-white/[0.02]">
			<div className="flex h-full min-h-0">
				<div className="flex min-w-0 flex-1 flex-col">
					<ChatHeader room={roomData} onToggleInfo={() => setInfoOpen((v) => !v)} />
					<ChatWindow room={roomData} />
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
										<span className="flex h-16 w-16 items-center justify-center rounded-3xl border border-glass-border bg-white/[0.04] text-3xl">{(r.icon as string) ?? "#"}</span>
										<h2 className="text-lg font-semibold">{r.name as string}</h2>
										<Badge variant={(r.visibility as string) === "PUBLIC" ? "outline" : "aqua"}>{(r.visibility as string)?.toLowerCase()}</Badge>
									</div>
									<div>
										<p className="text-xs font-semibold uppercase tracking-widest text-text-muted">Description</p>
										<p className="mt-1 text-sm text-text-secondary">{(r.description as string) ?? ""}</p>
									</div>
									<div className="space-y-2">
										<p className="text-xs font-semibold uppercase tracking-widest text-text-muted">Details</p>
										<div className="flex items-center gap-2 text-sm text-text-secondary"><Users className="h-4 w-4" />{(r.memberCount as number) ?? 0} members</div>
										<div className="flex items-center gap-2 text-sm text-text-secondary"><Hash className="h-4 w-4" />{(r.category as string) ?? "general"}</div>
									</div>
								</div>
							</div>
						</motion.aside>
					) : null}
				</AnimatePresence>
				<OnlineMembers />
			</div>
		</div>
	)
}
