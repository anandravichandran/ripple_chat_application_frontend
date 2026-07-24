"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Paperclip, Smile, Image as ImageIcon, Mic, SendHorizontal, X, AtSign, Sparkles } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { EmojiPicker } from "./emoji-picker"
import type { Message, User } from "@/lib/types"
import { cn } from "@/lib/utils"

export function MessageComposer({
	onSend,
	replyTo,
	onCancelReply,
	mentionCandidates,
	disabled,
}: {
	onSend: (text: string, options?: { replyTo?: Message }) => void
	replyTo?: Message | null
	onCancelReply?: () => void
	mentionCandidates: User[]
	disabled?: boolean
}) {
	const [text, setText] = useState("")
	const [showEmoji, setShowEmoji] = useState(false)
	const [mentionOpen, setMentionOpen] = useState(false)
	const [mentionQuery, setMentionQuery] = useState("")
	const inputRef = useRef<HTMLTextAreaElement>(null)

	useEffect(() => {
		if (replyTo) inputRef.current?.focus()
	}, [replyTo])

	useEffect(() => {
		const match = /@(\w*)$/.exec(text)
		if (match) {
			setMentionOpen(true)
			setMentionQuery(match[1].toLowerCase())
		} else {
			setMentionOpen(false)
		}
	}, [text])

	function send() {
		const v = text.trim()
		if (!v) return
		onSend(v, { replyTo: replyTo ?? undefined })
		setText("")
		setShowEmoji(false)
	}

	function insertMention(u: User) {
		setText((t) => t.replace(/@(\w*)$/, `@${u.username} `))
		setMentionOpen(false)
		inputRef.current?.focus()
	}

	const filteredMentions = mentionCandidates.filter((u) =>
		u.username.toLowerCase().startsWith(mentionQuery),
	)

	return (
		<div className="relative border-t border-glass-border bg-white/[0.02] p-3 sm:p-4">
			<AnimatePresence>
				{replyTo ? (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						className="mb-2 flex items-center gap-2 rounded-xl border border-glass-border bg-white/[0.03] px-3 py-2 text-xs text-text-secondary"
					>
						<Sparkles className="h-3 w-3 text-accent-primary" />
						<span>Replying to <span className="text-accent-primary">{replyTo.replyTo?.author ?? "message"}</span> · {replyTo.text.slice(0, 60)}</span>
						<button type="button" onClick={onCancelReply} className="ml-auto flex h-5 w-5 items-center justify-center rounded hover:bg-glass-hover" aria-label="Cancel reply">
							<X className="h-3 w-3" />
						</button>
					</motion.div>
				) : null}
			</AnimatePresence>

			<AnimatePresence>
				{mentionOpen && filteredMentions.length > 0 ? (
					<motion.div
						initial={{ opacity: 0, y: 6 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 6 }}
						className="absolute bottom-full left-3 mb-2 w-64 rounded-2xl border border-glass-border bg-[#0B0B0C]/95 p-2 shadow-float backdrop-blur-2xl"
					>
						<p className="mb-1 flex items-center gap-1 px-1 text-[10px] font-medium uppercase tracking-widest text-text-muted">
							<AtSign className="h-2.5 w-2.5" />Mentions
						</p>
						<ul className="space-y-0.5">
							{filteredMentions.slice(0, 5).map((u) => (
								<li key={u.id}>
									<button type="button" onClick={() => insertMention(u)} className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm text-text-primary hover:bg-glass-hover">
										<span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.06] text-xs">{u.avatar}</span>
										<span className="font-medium">{u.name}</span>
										<span className="ml-auto text-xs text-text-muted">@{u.username}</span>
									</button>
								</li>
							))}
						</ul>
					</motion.div>
				) : null}
			</AnimatePresence>

			<div className={cn("flex items-end gap-2 rounded-2xl border border-glass-border bg-white/[0.03] p-2 transition-colors focus-within:border-accent-primary/40", disabled && "opacity-60")}>
				<div className="flex items-center gap-0.5">
					<Tooltip><TooltipTrigger asChild>
						<Button variant="ghost" size="iconSm" onClick={() => toast("File picker coming soon")} aria-label="Attach file"><Paperclip className="h-4 w-4" /></Button>
					</TooltipTrigger><TooltipContent>Attach file</TooltipContent></Tooltip>
					<Tooltip><TooltipTrigger asChild>
						<Button variant="ghost" size="iconSm" onClick={() => toast("Image upload coming soon")} aria-label="Upload image"><ImageIcon className="h-4 w-4" /></Button>
					</TooltipTrigger><TooltipContent>Upload image</TooltipContent></Tooltip>
					<Tooltip><TooltipTrigger asChild>
						<Button variant="ghost" size="iconSm" onClick={() => toast("GIF picker coming soon")} aria-label="Add GIF">
							<span className="text-[10px] font-bold">GIF</span>
						</Button>
					</TooltipTrigger><TooltipContent>Add GIF</TooltipContent></Tooltip>
				</div>

				<textarea
					ref={inputRef}
					value={text}
					onChange={(e) => setText(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault()
							send()
						}
					}}
					rows={1}
					placeholder="Message the room… use @ to mention"
					className="min-h-[36px] max-h-40 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
					disabled={disabled}
				/>

				<div className="relative flex items-center gap-0.5">
					<Tooltip><TooltipTrigger asChild>
						<Button variant="ghost" size="iconSm" onClick={() => setShowEmoji((s) => !s)} aria-label="Emoji"><Smile className="h-4 w-4" /></Button>
					</TooltipTrigger><TooltipContent>Emoji</TooltipContent></Tooltip>
					<Tooltip><TooltipTrigger asChild>
						<Button variant="ghost" size="iconSm" onClick={() => toast("Voice notes coming soon")} aria-label="Voice note"><Mic className="h-4 w-4" /></Button>
					</TooltipTrigger><TooltipContent>Voice note</TooltipContent></Tooltip>
					<Button size="iconSm" variant="gradient" onClick={send} aria-label="Send" disabled={disabled || !text.trim()}>
						<SendHorizontal className="h-4 w-4" />
					</Button>
					<AnimatePresence>{showEmoji ? <EmojiPicker onPick={(e) => setText((t) => t + e)} /> : null}</AnimatePresence>
				</div>
			</div>
			<p className="mt-1.5 px-1 text-[10px] text-text-muted">Press <kbd className="rounded border border-glass-border bg-white/[0.05] px-1">Enter</kbd> to send · <kbd className="rounded border border-glass-border bg-white/[0.05] px-1">Shift + Enter</kbd> for a new line</p>
		</div>
	)
}
