"use client"

import { useEffect, useLayoutEffect, useMemo, useRef, useState, useCallback } from "react"
import { AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { MessageBubble } from "./message-bubble"
import { TypingIndicator } from "./typing-indicator"
import { DayDivider, UnreadDivider } from "./day-divider"
import { MessageComposer } from "./message-composer"
import { PinnedMessages } from "./pinned-messages"
import { ReconnectBanner } from "./reconnect-banner"
import { FloatingScrollButton } from "./floating-scroll-button"
import { ChatSkeleton } from "./chat-skeleton"
import { ErrorState } from "@/components/ui/error-state"
import { useMessages, useSendMessage } from "@/hooks/use-messages"
import { useAuthStore } from "@/store/auth-store"
import { useRoomStore } from "@/store/room-store"
import { getSocket, SOCKET_EVENTS } from "@/lib/socket"
import { dayLabel } from "@/lib/format"
import { toMessage } from "@/lib/api"
import type { Message, Room, User } from "@/lib/types"

export function ChatWindow({ room }: { room: Room }) {
	const { data, isLoading, isError, refetch } = useMessages(room.id)
	const sendMessage = useSendMessage(room.id)
	const currentUser = useAuthStore((s) => s.user)
	const typingUsers = useRoomStore((s) => s.typingByRoom[room.id] ?? [])
	const setCurrentRoom = useRoomStore((s) => s.setCurrentRoom)
	const qc = useQueryClient()

	const [replyTo, setReplyTo] = useState<Message | null>(null)
	const [showScroll, setShowScroll] = useState(false)
	const [items, setItems] = useState<Message[]>([])
	const scrollerRef = useRef<HTMLDivElement>(null)
	const endRef = useRef<HTMLDivElement>(null)
	const isMountedRef = useRef(true)

	useEffect(() => {
		isMountedRef.current = true
		return () => { isMountedRef.current = false }
	}, [])

	useEffect(() => {
		if (data) setItems(data)
	}, [data])

	useEffect(() => {
		setCurrentRoom(room.id)
		const socket = getSocket()
		if (socket.connected) {
			socket.emit(SOCKET_EVENTS.JOIN_ROOM, { roomId: room.id }, (res: unknown) => {
				if ((res as { ok: boolean })?.ok && isMountedRef.current) {
					refetch()
				}
			})
		}
		return () => {
			setCurrentRoom(null)
			const socket = getSocket()
			if (socket.connected) {
				socket.emit(SOCKET_EVENTS.LEAVE_ROOM, { roomId: room.id })
			}
		}
	}, [room.id, setCurrentRoom, refetch])

	useEffect(() => {
		const socket = getSocket()
		if (!socket.connected) return

		const onReceiveMessage = (payload: { message: Record<string, unknown> }) => {
			if (!isMountedRef.current) return
			const msg = toMessage(payload.message as never)
			setItems((prev) => {
				if (prev.some((m) => m.id === msg.id)) return prev
				const filtered = prev.filter((m) => !(m.id.startsWith("local_") && m.authorId === msg.authorId && m.text === msg.text))
				return [...filtered, msg]
			})
			qc.invalidateQueries({ queryKey: ["rooms"] })
		}

		const onMessageEdited = (payload: { message: Record<string, unknown> }) => {
			if (!isMountedRef.current) return
			const msg = toMessage(payload.message as never)
			setItems((prev) => prev.map((m) => (m.id === msg.id ? { ...m, ...msg } : m)))
			qc.invalidateQueries({ queryKey: ["rooms"] })
		}

		const onMessageDeleted = (payload: { messageId: string }) => {
			if (!isMountedRef.current) return
			setItems((prev) => prev.filter((m) => m.id !== payload.messageId))
			qc.invalidateQueries({ queryKey: ["rooms"] })
		}

		socket.on(SOCKET_EVENTS.RECEIVE_MESSAGE, onReceiveMessage)
		socket.on(SOCKET_EVENTS.MESSAGE_EDITED, onMessageEdited)
		socket.on(SOCKET_EVENTS.MESSAGE_DELETED, onMessageDeleted)

		return () => {
			socket.off(SOCKET_EVENTS.RECEIVE_MESSAGE, onReceiveMessage)
			socket.off(SOCKET_EVENTS.MESSAGE_EDITED, onMessageEdited)
			socket.off(SOCKET_EVENTS.MESSAGE_DELETED, onMessageDeleted)
		}
	}, [room.id, qc])

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

	const handleSend = useCallback(async (text: string, opts?: { replyTo?: Message }) => {
		const optimisticId = `local_${Date.now()}`
		const optimistic: Message = {
			id: optimisticId,
			authorId: currentUser?.id ?? "",
			text,
			at: new Date().toISOString(),
			type: "text",
			status: "sending",
			reactions: [],
		}

		setItems((prev) => [...prev, optimistic])
		setReplyTo(null)

		try {
			const result = await sendMessage.mutateAsync({
				text,
				type: "TEXT",
				...(opts?.replyTo?.id ? { replyToId: opts.replyTo.id } : {}),
			})
			if (isMountedRef.current && result) {
				setItems((prev) => {
					if (prev.some((m) => m.id === result.id)) {
						return prev.filter((m) => m.id !== optimisticId)
					}
					return prev.map((m) => (m.id === optimisticId ? result : m))
				})
			}
		} catch {
			if (isMountedRef.current) {
				setItems((prev) => prev.map((m) => (m.id === optimisticId ? { ...m, status: "error" } : m)))
			}
			toast.error("Failed to send message")
		}
	}, [currentUser, sendMessage])

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
										author={m.authorName ? { id: m.authorId, name: m.authorName, avatar: m.avatar ?? "" } as User : undefined}
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
