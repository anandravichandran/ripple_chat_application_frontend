"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, CheckCheck, Reply, Trash2, Pencil, Copy, Smile, MoreHorizontal, Pin } from "lucide-react"
import { toast } from "sonner"
import { UserAvatar } from "@/components/shared/user-avatar"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useProfileDrawer } from "@/store/profile-drawer-store"
import { cn } from "@/lib/utils"
import { time } from "@/lib/format"
import type { Message, User } from "@/lib/types"

const quickReactions = ["👍", "❤️", "😂", "🎉", "🔥", "👀"]

export function MessageBubble({
	message,
	author,
	isOwn,
	showAvatar,
	showMeta,
	onReply,
	onEdit,
	onDelete,
	onReact,
	onPin,
}: {
	message: Message
	author?: User
	isOwn: boolean
	showAvatar: boolean
	showMeta: boolean
	onReply?: (m: Message) => void
	onEdit?: (m: Message) => void
	onDelete?: (m: Message) => void
	onReact?: (m: Message, emoji: string) => void
	onPin?: (m: Message) => void
}) {
	const [hovered, setHovered] = useState(false)
	const { openProfile } = useProfileDrawer()

	return (
		<motion.div
			initial={{ opacity: 0, y: 4 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.2 }}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			className={cn("group relative flex gap-3 px-2 py-1", isOwn && "flex-row-reverse")}
		>
			<div className="w-9 shrink-0">
				{showAvatar ? (
					<UserAvatar src={author?.avatar} initials={author?.name?.charAt(0)?.toUpperCase() ?? message.authorId.slice(0, 2)} status={author?.status ?? "offline"} size="sm" onClick={author ? () => openProfile(author.id) : undefined} />
				) : null}
			</div>

			<div className={cn("flex min-w-0 flex-1 flex-col", isOwn && "items-end")}>
				{showMeta ? (
					<div className={cn("mb-1 flex items-center gap-2 text-[11px]", isOwn && "flex-row-reverse")}>
						<button type="button" className="font-medium text-text-primary hover:underline" onClick={author ? () => openProfile(author.id) : undefined}>{isOwn ? "You" : author?.name ?? "Unknown"}</button>
						<span className="text-text-muted">{time(message.at)}</span>
					</div>
				) : null}

				{message.replyTo ? (
					<div className={cn("mb-1 max-w-full rounded-xl border-l-2 border-accent-primary/60 bg-white/[0.03] px-3 py-1.5 text-xs text-text-muted", isOwn && "text-right")}>
						<span className="text-accent-primary">{message.replyTo.author}</span> · {message.replyTo.preview}
					</div>
				) : null}

				<div
					className={cn(
						"relative max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
						isOwn
							? "bg-accent-primary/[0.12] text-text-primary border border-accent-primary/25"
							: "bg-white/[0.05] text-text-primary border border-glass-border",
					)}
				>
					{message.pinned ? (
						<span className="absolute -top-2 left-3 flex items-center gap-0.5 rounded-full border border-accent-primary/30 bg-bg-primary px-1.5 py-0.5 text-[9px] font-medium text-accent-primary">
							<Pin className="h-2.5 w-2.5" />Pinned
						</span>
					) : null}

					{message.type === "image" ? (
						<div className="mb-2 h-40 w-64 rounded-xl bg-gradient-to-br from-accent-primary/25 via-accent-secondary/20 to-transparent" />
					) : null}
					{message.type === "file" ? (
						<div className="mb-2 flex items-center gap-2 rounded-xl border border-glass-border bg-white/[0.04] p-2">
							<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05] text-accent-secondary">📎</span>
							<div className="min-w-0">
								<p className="truncate text-xs font-medium">{message.fileName ?? "attachment.pdf"}</p>
								<p className="text-[10px] text-text-muted">{message.fileSize ?? "2.4 MB"}</p>
							</div>
						</div>
					) : null}

					<p className="whitespace-pre-wrap break-words">
						{message.text.split(/(@[a-zA-Z0-9_]+)/g).map((part, i) =>
							part.startsWith("@") ? (
								<span key={i} className="font-medium text-accent-primary">{part}</span>
							) : (
								<span key={i}>{part}</span>
							),
						)}
					</p>
					{message.edited ? <span className="ml-1.5 text-[10px] text-text-muted">(edited)</span> : null}
				</div>

				{message.reactions && message.reactions.length > 0 ? (
					<div className={cn("mt-1.5 flex flex-wrap gap-1", isOwn && "justify-end")}>
						{message.reactions.map((r) => (
							<button
								key={r.emoji}
								type="button"
								onClick={() => onReact?.(message, r.emoji)}
								className={cn(
									"flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] transition-colors",
									r.byMe
										? "border-accent-primary/40 bg-accent-primary/10 text-accent-primary"
										: "border-glass-border bg-white/[0.03] text-text-secondary hover:bg-glass-hover",
								)}
							>
								<span>{r.emoji}</span>
								<span>{r.count}</span>
							</button>
						))}
					</div>
				) : null}

				{isOwn ? (
					<div className="mt-1 flex items-center gap-1 text-[10px] text-text-muted">
						<span>{time(message.at)}</span>
						{message.status === "sent" ? <Check className="h-3 w-3" /> : null}
						{message.status === "delivered" ? <CheckCheck className="h-3 w-3" /> : null}
						{message.status === "seen" ? <CheckCheck className="h-3 w-3 text-accent-secondary" /> : null}
					</div>
				) : null}
			</div>

			<div
				className={cn(
					"absolute top-1 flex items-center gap-0.5 rounded-full border border-glass-border bg-[#0B0B0C]/95 p-0.5 shadow-lg backdrop-blur-xl transition-opacity",
					hovered ? "opacity-100" : "opacity-0 pointer-events-none",
					isOwn ? "left-14" : "right-2",
				)}
			>
				{quickReactions.slice(0, 4).map((e) => (
					<button
						key={e}
						type="button"
						onClick={() => onReact?.(message, e)}
						className="flex h-7 w-7 items-center justify-center rounded-full text-sm transition-colors hover:bg-glass-hover"
						aria-label={`React ${e}`}
					>
						{e}
					</button>
				))}
				<Tooltip><TooltipTrigger asChild>
					<button type="button" onClick={() => onReply?.(message)} className="flex h-7 w-7 items-center justify-center rounded-full text-text-muted hover:bg-glass-hover hover:text-text-primary" aria-label="Reply">
						<Reply className="h-3.5 w-3.5" />
					</button>
				</TooltipTrigger><TooltipContent>Reply</TooltipContent></Tooltip>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button type="button" className="flex h-7 w-7 items-center justify-center rounded-full text-text-muted hover:bg-glass-hover hover:text-text-primary" aria-label="More">
							<MoreHorizontal className="h-3.5 w-3.5" />
						</button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align={isOwn ? "start" : "end"}>
						<DropdownMenuItem onClick={() => onReact?.(message, "😊")}><Smile className="h-4 w-4" />Add reaction</DropdownMenuItem>
						<DropdownMenuItem onClick={() => { navigator.clipboard.writeText(message.text); toast("Copied") }}><Copy className="h-4 w-4" />Copy text</DropdownMenuItem>
						<DropdownMenuItem onClick={() => onPin?.(message)}><Pin className="h-4 w-4" />{message.pinned ? "Unpin" : "Pin message"}</DropdownMenuItem>
						{isOwn ? <DropdownMenuItem onClick={() => onEdit?.(message)}><Pencil className="h-4 w-4" />Edit</DropdownMenuItem> : null}
						{isOwn ? <DropdownMenuItem danger onClick={() => onDelete?.(message)}><Trash2 className="h-4 w-4" />Delete</DropdownMenuItem> : null}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</motion.div>
	)
}
