"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, Phone, Video, MoreHorizontal, SendHorizontal, Smile, Paperclip } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserAvatar } from "@/components/shared/user-avatar"
import { TypingIndicator } from "@/components/chat/typing-indicator"
import { time } from "@/lib/format"
import { useAuthStore } from "@/store/auth-store"
import { messagesApi } from "@/lib/api"
import type { Conversation, Message } from "@/lib/types"
import { cn } from "@/lib/utils"

export function DmWindow({ conversation, seed }: { conversation: Conversation; seed: Message[] }) {
	const [items, setItems] = useState<Message[]>(seed)
	const [text, setText] = useState("")
	const [typing, setTyping] = useState<string[]>([])
	const endRef = useRef<HTMLDivElement>(null)
	const currentUser = useAuthStore((s) => s.user)

	useEffect(() => {
		endRef.current?.scrollIntoView({ behavior: "smooth" })
	}, [items.length])

	useEffect(() => {
		if (conversation.typing) {
			setTyping([conversation.user.name.split(" ")[0]])
			const t = setTimeout(() => setTyping([]), 3500)
			return () => clearTimeout(t)
		}
	}, [conversation])

	async function send() {
		const v = text.trim()
		if (!v || !currentUser) return
		const optimistic: Message = {
			id: `dm_${Date.now()}`,
			authorId: currentUser.id,
			text: v,
			at: new Date().toISOString(),
			type: "text",
			status: "sent",
		}
		setItems((p) => [...p, optimistic])
		setText("")
		try {
			await messagesApi.create(conversation.id, { text: v, type: "TEXT" })
			setItems((p) => p.map((x) => (x.id === optimistic.id ? { ...x, status: "delivered" } : x)))
		} catch {
			setItems((p) => p.map((x) => (x.id === optimistic.id ? { ...x, status: "error" } : x)))
		}
	}

	if (!currentUser) return null

	return (
		<div className="flex h-full min-w-0 flex-1 flex-col">
			<div className="flex items-center gap-3 border-b border-glass-border bg-white/[0.02] px-4 py-3">
				<Button asChild variant="ghost" size="iconSm" className="md:hidden">
					<Link href="/messages" aria-label="Back to conversations"><ArrowLeft className="h-4 w-4" /></Link>
				</Button>
				<UserAvatar initials={conversation.user.avatar} status={conversation.user.status} size="sm" />
				<div className="min-w-0 flex-1">
					<p className="truncate text-sm font-semibold">{conversation.user.name}</p>
					<p className="truncate text-[11px] text-text-muted">
						{conversation.user.status === "online" ? "Active now" : `Last seen ${conversation.user.lastSeen}`}
					</p>
				</div>
				<Button variant="ghost" size="iconSm" aria-label="Call"><Phone className="h-4 w-4" /></Button>
				<Button variant="ghost" size="iconSm" aria-label="Video call"><Video className="h-4 w-4" /></Button>
				<Button variant="ghost" size="iconSm" aria-label="More"><MoreHorizontal className="h-4 w-4" /></Button>
			</div>

			<div className="flex-1 space-y-2 overflow-y-auto p-4">
				<AnimatePresence initial={false}>
					{items.map((m) => {
						const isOwn = m.authorId === currentUser.id
						return (
							<motion.div
								key={m.id}
								initial={{ opacity: 0, y: 4 }}
								animate={{ opacity: 1, y: 0 }}
								className={cn("flex", isOwn ? "justify-end" : "justify-start")}
							>
								<div
									className={cn(
										"max-w-[75%] rounded-2xl border px-4 py-2 text-sm",
										isOwn
											? "border-accent-primary/25 bg-accent-primary/[0.12] text-text-primary"
											: "border-glass-border bg-white/[0.04] text-text-primary",
									)}
								>
									<p className="whitespace-pre-wrap break-words">{m.text}</p>
									<p className={cn("mt-1 text-[10px]", isOwn ? "text-accent-primary/70" : "text-text-muted")}>
										{time(m.at)}
										{isOwn && m.status === "seen" ? " · Seen" : m.status === "error" ? " · Failed" : ""}
									</p>
								</div>
							</motion.div>
						)
					})}
				</AnimatePresence>
				<TypingIndicator names={typing} />
				<div ref={endRef} />
			</div>

			<div className="border-t border-glass-border bg-white/[0.02] p-3">
				<div className="flex items-end gap-2 rounded-2xl border border-glass-border bg-white/[0.03] p-2 focus-within:border-accent-primary/40">
					<Button variant="ghost" size="iconSm" aria-label="Attach"><Paperclip className="h-4 w-4" /></Button>
					<input
						value={text}
						onChange={(e) => setText(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), send())}
						placeholder={`Message ${conversation.user.name.split(" ")[0]}…`}
						className="flex-1 bg-transparent px-2 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
					/>
					<Button variant="ghost" size="iconSm" aria-label="Emoji"><Smile className="h-4 w-4" /></Button>
					<Button variant="gradient" size="iconSm" onClick={send} disabled={!text.trim()} aria-label="Send">
						<SendHorizontal className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	)
}