"use client"

import { AnimatePresence, motion } from "framer-motion"
import { WifiOff, RotateCw } from "lucide-react"
import { useSocketStore } from "@/store/socket-store"

export function ReconnectBanner() {
	const status = useSocketStore((s) => s.status)
	const reconnect = useSocketStore((s) => s.reconnect)
	const show = status === "disconnected" || status === "reconnecting"
	return (
		<AnimatePresence>
			{show ? (
				<motion.div
					initial={{ opacity: 0, y: -6 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -6 }}
					className="flex items-center justify-between gap-3 border-b border-state-warn/25 bg-state-warn/[0.08] px-4 py-2 text-xs text-state-warn"
				>
					<span className="flex items-center gap-2">
						<WifiOff className="h-3.5 w-3.5" />
						{status === "reconnecting" ? "Reconnecting to Ripple…" : "You appear to be offline"}
					</span>
					<button
						type="button"
						onClick={reconnect}
						className="flex items-center gap-1 rounded-full border border-state-warn/40 bg-state-warn/10 px-2.5 py-1 font-medium hover:bg-state-warn/20"
					>
						<RotateCw className="h-3 w-3" />Retry
					</button>
				</motion.div>
			) : null}
		</AnimatePresence>
	)
}
