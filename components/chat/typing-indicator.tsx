"use client"

import { motion } from "framer-motion"

export function TypingIndicator({ names }: { names: string[] }) {
	if (names.length === 0) return null
	const label = names.length === 1 ? `${names[0]} is typing` : `${names.slice(0, 2).join(", ")} are typing`
	return (
		<motion.div
			initial={{ opacity: 0, y: 4 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0 }}
			className="flex items-center gap-2 px-4 py-1 text-xs text-text-muted"
		>
			<span className="flex items-center gap-0.5">
				{[0, 1, 2].map((i) => (
					<motion.span
						key={i}
						animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
						transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
						className="h-1.5 w-1.5 rounded-full bg-accent-primary"
					/>
				))}
			</span>
			<span>{label}…</span>
		</motion.div>
	)
}
