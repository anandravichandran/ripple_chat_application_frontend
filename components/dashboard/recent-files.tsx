"use client"

import { motion } from "framer-motion"
import { GlassCard } from "@/components/shared/glass-card"
import { FileText, Image, FileArchive, File } from "lucide-react"
import { useRooms } from "@/hooks/use-rooms"

const fileIcons = [FileText, Image, FileArchive, File]

export function RecentFiles() {
	const rooms = useRooms()
	return (
		<GlassCard className="p-5">
			<div className="mb-4 flex items-center justify-between">
				<h3 className="flex items-center gap-2 text-sm font-semibold tracking-tight">
					<FileText className="h-4 w-4 text-accent-secondary" />Recent files
				</h3>
				<span className="text-xs text-text-muted">Across rooms</span>
			</div>
			<p className="text-sm text-text-muted">File sharing and attachment tracking coming soon.</p>
		</GlassCard>
	)
}
