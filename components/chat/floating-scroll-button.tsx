"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

export function FloatingScrollButton({ show, unread, onClick }: { show: boolean; unread?: number; onClick: () => void }) {
	return (
		<AnimatePresence>
			{show ? (
				<motion.button
					type="button"
					initial={{ opacity: 0, y: 12, scale: 0.9 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					exit={{ opacity: 0, y: 12, scale: 0.9 }}
					onClick={onClick}
					className="absolute bottom-24 right-6 z-10 flex items-center gap-1.5 rounded-full border border-glass-border bg-[#0B0B0C]/95 px-3.5 py-2 text-xs font-medium text-text-primary shadow-float backdrop-blur-xl hover:bg-glass-hover"
				>
					<ArrowDown className="h-3.5 w-3.5" />
					Jump to latest
					{unread && unread > 0 ? (
						<span className="ml-1 rounded-full bg-accent-primary/20 px-1.5 py-0.5 text-[10px] text-accent-primary">{unread}</span>
					) : null}
				</motion.button>
			) : null}
		</AnimatePresence>
	)
}
