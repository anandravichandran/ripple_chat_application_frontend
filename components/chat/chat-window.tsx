"use client"

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { MessageBubble } from "./message-bubble"
import { TypingIndicator } from "./typing-indicator"
import { DayDivider, UnreadDivider } from "./day-divider"
import { MessageComposer } from "./message-composer"
import { PinnedMessages } from "./pinned-messages"
import { ReconnectBanner } from "./reconnect-banner"
import { FloatingScrollButton } from "./floating-scroll-button"
import { ChatSkeleton } from "./chat-skeleton"
import { ErrorState } from "@/components/ui/error-state"
import { useMessages } from "@/hooks/use-messages"
import { useAuthStore } from "@/store/auth-store"
import { useRoomStore } from "@/store/room-store"
import { dayLabel } from "@/lib/format"
import type { Message, Room } from "@/lib/types"

export function ChatWindow({ room }: { room: Room }) {
	const { data, isLoading, isError, refetch } = useMessages(room.id)
	const currentUser = useAuthStore((s) => s.user)
	const typingUsers = useRoomStore((s) => s.typingByRoom[room.id] ?? [])
	const [items, setItems] = useState<Message[]>([])
	const [replyTo, setReplyTo] = useState<Message | null>(null)
	const [showScroll, setShowScroll] = useState(false)
	const scrollerRef = useRef<HTMLDivElement>(null)
	const endRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (data) setItems(data)
	}, [data])

	useLayoutEffect(() => {
		endRef.current?.scrollIntoView({ behavior: "auto" })
	}, [room.id])

	useEffect(() => {
		if (!showScroll) endRef.current?.scrollIntoView({ behavior: "smooth" })
	}, [items.length, showScroll])

	const pinned = useMemo(() => items.filter((m) => m.pinned), [items])

	function handleScroll(e: React.UIEvent<HTMLDivElement>) {
		const target = e.currentTarget
		const distanceFromBottom = target.scrollHeight - target.scrollTop - target.clientHeight
		setShowScroll(distanceFromBottom > 220)
	}

	function handleSend(text: string, opts?: { replyTo?: Message }) {
		const m: Message = {
			id: `local_${Date.now()}`,
			authorId: currentUser?.id ?? "",
			text,
			at: new Date().toISOString(),
			type: "text",
			status: "sent",
			reactions: [],
			replyTo: opts?.replyTo
				? { author: opts.replyTo.authorId, preview: opts.replyTo.text.slice(0, 80) }
				: undefined,
		}
		setItems((prev) => [...prev, m])
		setReplyTo(null)
	}

	function handleReact(m: Message, emoji: string) {
		setItems((prev) =>
			prev.map((x) => {
				if (x.id !== m.id) return x
				const existing = x.reactions?.find((r) => r.emoji === emoji)
				if (existing) {
					return {
						...x,
						reactions: x.reactions!.map((r) =>
							r.emoji === emoji
								? { ...r, count: r.byMe ? Math.max(0, r.count - 1) : r.count + 1, byMe: !r.byMe }
								: r,
						).filter((r) => r.count > 0),
					}
				}
				return { ...x, reactions: [...(x.reactions ?? []), { emoji, count: 1, byMe: true }] }
			}),
		)
	}

	function handleEdit(m: Message) {
		const next = window.prompt("Edit message", m.text)
		if (!next || next.trim() === "") return
		setItems((prev) => prev.map((x) => (x.id === m.id ? { ...x, text: next, edited: true } : x)))
	}

	function handleDelete(m: Message) {
		setItems((prev) => prev.filter((x) => x.id !== m.id))
		toast("Message deleted")
	}

	function handlePin(m: Message) {
		setItems((prev) => prev.map((x) => (x.id === m.id ? { ...x, pinned: !x.pinned } : x)))
	}

	if (isError) {
		return (
			<div className="flex h-full items-center justify-center p-6">
				<ErrorState title="Couldn't load messages" description="Something went sideways." onRetry={() => refetch()} />
			</div>
		)
	}

	return (
		<div className="relative flex h-full min-w-0 flex-1 flex-col">
			<ReconnectBanner />
			<PinnedMessages messages={pinned} onUnpin={handlePin} />

			<div ref={scrollerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto">
				{isLoading ? (
					<ChatSkeleton />
				) : (
					<div className="space-y-1 p-3 sm:p-4">
						<AnimatePresence initial={false}>
							{items.map((m, i) => {
								const prev = items[i - 1]
								const isOwn = m.authorId === currentUser?.id
								const sameAuthor = prev?.authorId === m.authorId
								const dayChanged = !prev || new Date(prev.at).toDateString() !== new Date(m.at).toDateString()
								const unreadInsert = i > 0 && items[i - 1].id === room.unreadFromMessageId
								return (
									<div key={m.id}>
										{dayChanged ? <DayDivider label={dayLabel(m.at)} /> : null}
										{unreadInsert && room.unread > 0 ? <UnreadDivider count={room.unread} /> : null}
										<MessageBubble
											message={m}
											isOwn={isOwn}
											showAvatar={!sameAuthor || dayChanged}
											showMeta={!sameAuthor || dayChanged}
											onReply={setReplyTo}
											onEdit={handleEdit}
											onDelete={handleDelete}
											onReact={handleReact}
											onPin={handlePin}
										/>
									</div>
								)
							})}
						</AnimatePresence>
						<TypingIndicator names={typingUsers} />
						<div ref={endRef} />
					</div>
				)}
			</div>

			<FloatingScrollButton
				show={showScroll}
				unread={room.unread}
				onClick={() => endRef.current?.scrollIntoView({ behavior: "smooth" })}
			/>

			<MessageComposer onSend={handleSend} replyTo={replyTo} onCancelReply={() => setReplyTo(null)} />
		</div>
	)
}
