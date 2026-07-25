"use client"

import { motion } from "framer-motion"
import { Lock, Users, Pin, Bell, Search, MoreHorizontal, ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Room } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export function ChatHeader({ room, onToggleInfo }: { room: Room; onToggleInfo?: () => void }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: -6 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className="flex items-center gap-3 border-b border-glass-border bg-white/[0.02] px-4 py-3 sm:px-5"
		>
			<Button asChild variant="ghost" size="iconSm" className="lg:hidden">
				<Link href="/rooms" aria-label="Back to rooms"><ArrowLeft className="h-4 w-4" /></Link>
			</Button>
			<div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-glass-border bg-white/[0.04] text-lg">
				{room.icon}
			</div>
			<div className="min-w-0 flex-1">
				<div className="flex items-center gap-2">
					<h2 className="truncate text-base font-semibold text-text-primary">{room.name}</h2>
					{room.visibility === "private" ? (
						<span className="flex items-center gap-1 rounded-full border border-glass-border bg-white/[0.03] px-2 py-0.5 text-[10px] text-text-muted">
							<Lock className="h-2.5 w-2.5" />Private
						</span>
					) : null}
				</div>
				<p className="mt-0.5 flex items-center gap-2 text-xs text-text-muted">
					<span className="flex items-center gap-1"><Users className="h-3 w-3" />{room.members}</span>
					<span>·</span>
					<span className="flex items-center gap-1">
						<span className="h-1.5 w-1.5 rounded-full bg-state-success" />{room.online} online
					</span>
				</p>
			</div>
			<div className="hidden items-center gap-1 sm:flex">
				<Tooltip><TooltipTrigger asChild><Button variant="ghost" size="iconSm" aria-label="Search"><Search className="h-4 w-4" /></Button></TooltipTrigger><TooltipContent>Search in room</TooltipContent></Tooltip>
				<Tooltip><TooltipTrigger asChild><Button variant="ghost" size="iconSm" aria-label="Pinned"><Pin className="h-4 w-4" /></Button></TooltipTrigger><TooltipContent>Pinned messages</TooltipContent></Tooltip>
				<Tooltip><TooltipTrigger asChild><Button variant="ghost" size="iconSm" aria-label="Notifications"><Bell className="h-4 w-4" /></Button></TooltipTrigger><TooltipContent>Notifications</TooltipContent></Tooltip>
			</div>
			<Button variant="ghost" size="iconSm" onClick={onToggleInfo} aria-label="Room info"><MoreHorizontal className="h-4 w-4" /></Button>
		</motion.div>
	)
}
