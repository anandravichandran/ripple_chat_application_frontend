"use client"

import { motion } from "framer-motion"

export function FloatingShapes() {
	return (
		<div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
			<div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(217,255,102,0.08),transparent_70%)]" />
			<div className="absolute inset-0 bg-[radial-gradient(800px_500px_at_100%_10%,rgba(168,245,255,0.06),transparent_70%)]" />
			<motion.div
				aria-hidden
				animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
				transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
				className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-accent-primary/15 blur-3xl"
			/>
			<motion.div
				aria-hidden
				animate={{ y: [0, 20, 0], x: [0, -14, 0] }}
				transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
				className="absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-accent-secondary/15 blur-3xl"
			/>
			<motion.div
				aria-hidden
				animate={{ y: [0, -14, 0] }}
				transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
				className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl"
			/>
			<div className="absolute inset-0 opacity-[0.05] mix-blend-overlay [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:56px_56px]" />
		</div>
	)
}
