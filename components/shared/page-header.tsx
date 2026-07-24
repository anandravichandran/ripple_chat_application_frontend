"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function PageHeader({
	eyebrow,
	title,
	description,
	actions,
	className,
}: {
	eyebrow?: string
	title: string
	description?: string
	actions?: React.ReactNode
	className?: string
}) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, ease: "easeOut" }}
			className={cn(
				"flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
				className,
			)}
		>
			<div className="space-y-1.5">
				{eyebrow ? (
					<span className="inline-flex items-center gap-1.5 rounded-full border border-glass-border bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium uppercase tracking-widest text-text-secondary">
						{eyebrow}
					</span>
				) : null}
				<h1 className="text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
					{title}
				</h1>
				{description ? (
					<p className="text-sm text-text-secondary">{description}</p>
				) : null}
			</div>
			{actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
		</motion.div>
	)
}
