"use client"

import { motion } from "framer-motion"

const emojis = [
	"😊", "😂", "😍", "😎", "🤔", "😩", "😱", "🙌",
	"👍", "👎", "👏", "🙏", "👋", "💪", "🤝", "❤️",
	"🔥", "✨", "🎉", "🎈", "🚀", "⚡", "🌟", "🌊",
	"👀", "💀", "🤡", "🤯", "🤐", "🙃", "😐", "🙄",
]

export function EmojiPicker({ onPick }: { onPick: (e: string) => void }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 6, scale: 0.96 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			exit={{ opacity: 0, y: 6, scale: 0.96 }}
			className="absolute bottom-full right-0 z-20 mb-2 w-64 rounded-2xl border border-glass-border bg-[#0B0B0C]/95 p-2.5 shadow-float backdrop-blur-2xl"
		>
			<p className="px-1 pb-1.5 text-[10px] font-medium uppercase tracking-widest text-text-muted">Smileys & symbols</p>
			<div className="grid grid-cols-8 gap-1">
				{emojis.map((e) => (
					<button
						key={e}
						type="button"
						onClick={() => onPick(e)}
						className="flex h-7 w-7 items-center justify-center rounded-lg text-lg transition-colors hover:bg-glass-hover"
					>
						{e}
					</button>
				))}
			</div>
		</motion.div>
	)
}
