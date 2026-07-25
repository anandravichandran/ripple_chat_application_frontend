"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Search, Pin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { UserAvatar } from "@/components/shared/user-avatar"
import { useConversations } from "@/hooks/use-conversations"
import type { Conversation } from "@/lib/types"
import { cn } from "@/lib/utils"

export function ConversationList() {
	const [q, setQ] = useState("")
	const pathname = usePathname()
	const { data: conversations = [], isLoading } = useConversations()
	const filtered = conversations.filter((c) => c.user.name.toLowerCase().includes(q.trim().toLowerCase()))
	const pinned = filtered.filter((c) => c.pinned)
	const others = filtered.filter((c) => !c.pinned)
	return (
		<aside className="flex h-full w-full max-w-sm shrink-0 flex-col border-r border-glass-border bg-white/[0.02]">
			<div className="border-b border-glass-border p-4">
				<h2 className="mb-3 text-lg font-semibold tracking-tight">Messages</h2>
				<div className="relative">
					<Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
					<Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search people…" className="pl-10" />
				</div>
			</div>
			<div className="flex-1 overflow-y-auto p-2">
				{isLoading ? (
					<p className="p-4 text-sm text-text-muted">Loading conversations…</p>
				) : filtered.length === 0 ? (
					<p className="p-4 text-sm text-text-muted">No conversations yet</p>
				) : (
					<>
						{pinned.length > 0 ? (
							<>
								<p className="flex items-center gap-1 px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-widest text-text-muted">
									<Pin className="h-2.5 w-2.5" />Pinned
								</p>
								{pinned.map((c) => <ConvItem key={c.id} c={c} active={pathname === `/messages/${c.id}`} />)}
							</>
						) : null}
						{others.length > 0 ? (
							<>
								<p className="px-3 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-widest text-text-muted">All conversations</p>
								{others.map((c, i) => <ConvItem key={c.id} c={c} active={pathname === `/messages/${c.id}`} index={i} />)}
							</>
						) : null}
					</>
				)}
			</div>
		</aside>
	)
}

function ConvItem({ c, active, index = 0 }: { c: Conversation; active: boolean; index?: number }) {
	return (
		<motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.02 * index }}>
			<Link
				href={`/messages/${c.id}`}
				className={cn(
					"flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors",
					active ? "bg-white/[0.06] text-text-primary" : "hover:bg-glass-hover",
				)}
			>
				<UserAvatar initials={c.user.avatar} status={c.user.status} size="md" />
				<div className="min-w-0 flex-1">
					<div className="flex items-center justify-between">
						<p className="truncate text-sm font-medium">{c.user.name}</p>
						<span className="shrink-0 text-[10px] text-text-muted">{c.lastAt}</span>
					</div>
					<div className="flex items-center gap-2">
						<p className="truncate text-xs text-text-secondary">
							{c.typing ? <span className="text-accent-primary">typing…</span> : c.lastMessage}
						</p>
						{c.unread > 0 ? <Badge variant="accent" className="ml-auto">{c.unread}</Badge> : null}
					</div>
				</div>
			</Link>
		</motion.div>
	)
}