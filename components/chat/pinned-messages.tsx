"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Pin, X } from "lucide-react"
import type { Message, User } from "@/lib/types"

export function PinnedMessages({
	messages,
	usersById,
	onUnpin,
}: {
	messages: Message[]
	usersById: Record<string, User>
	onUnpin?: (m: Message) => void
}) {
	if (messages.length === 0) return null
	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0, height: 0 }}
				animate={{ opacity: 1, height: "auto" }}
				exit={{ opacity: 0, height: 0 }}
				className="border-b border-glass-border bg-accent-primary/[0.04] px-4 py-2.5"
			>
				<div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-widest text-accent-primary">
					<Pin className="h-3 w-3" />Pinned
				</div>
				<ul className="space-y-1">
					{messages.map((m) => {
						const u = usersById[m.authorId]
						return (
							<li key={m.id} className="group flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-white/[0.03]">
								<span className="text-xs text-accent-primary">{u?.name ?? "Unknown"}</span>
								<span className="truncate text-xs text-text-secondary">{m.text}</span>
								<button
									type="button"
									onClick={() => onUnpin?.(m)}
									className="ml-auto flex h-5 w-5 items-center justify-center rounded text-text-muted opacity-0 transition-opacity hover:text-text-primary group-hover:opacity-100"
									aria-label="Unpin"
								>
									<X className="h-3 w-3" />
								</button>
							</li>
						)
					})}
				</ul>
			</motion.div>
		</AnimatePresence>
	)
}
