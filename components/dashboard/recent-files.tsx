"use client"

import { motion } from "framer-motion"
import { GlassCard } from "@/components/shared/glass-card"
import { FileText, Download } from "lucide-react"
import { recentFiles } from "@/lib/mock"

export function RecentFiles() {
	return (
		<GlassCard className="p-5">
			<div className="mb-4 flex items-center justify-between">
				<h3 className="text-sm font-semibold tracking-tight">Recent files</h3>
				<span className="text-xs text-text-muted">Across rooms</span>
			</div>
			<ul className="space-y-2">
				{recentFiles.map((f, i) => (
					<motion.li
						key={f.id}
						initial={{ opacity: 0, y: 4 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.03 * i }}
						className="flex items-center gap-3 rounded-xl border border-glass-border bg-white/[0.02] p-3"
					>
						<div className="flex h-9 w-9 items-center justify-center rounded-xl border border-glass-border bg-white/[0.04]">
							<FileText className="h-4 w-4 text-accent-secondary" />
						</div>
						<div className="min-w-0 flex-1">
							<p className="truncate text-sm font-medium">{f.name}</p>
							<p className="truncate text-xs text-text-muted">{f.room} · {f.size} · {f.at}</p>
						</div>
						<button type="button" className="flex h-8 w-8 items-center justify-center rounded-lg border border-glass-border bg-white/[0.03] text-text-muted transition-colors hover:text-text-primary">
							<Download className="h-3.5 w-3.5" />
						</button>
					</motion.li>
				))}
			</ul>
		</GlassCard>
	)
}
