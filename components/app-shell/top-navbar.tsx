"use client"

import { Bell, Menu, Search, Plus } from "lucide-react"
import { useNotificationStore } from "@/store/notification-store"
import { useSidebarStore } from "@/store/sidebar-store"
import { useSocketStore } from "@/store/socket-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { UserMenu } from "./user-menu"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function TopNavbar() {
	const unread = useNotificationStore((s) => s.items.filter((n) => !n.read).length)
	const openDrawer = useNotificationStore((s) => s.setDrawer)
	const { setMobileOpen } = useSidebarStore()
	const status = useSocketStore((s) => s.status)

	const dotClass =
		status === "connected"
			? "bg-state-success"
			: status === "reconnecting" || status === "connecting"
				? "bg-state-warn"
				: "bg-state-danger"

	return (
		<header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-glass-border bg-bg-primary/70 px-4 backdrop-blur-2xl sm:px-6">
			<button
				type="button"
				onClick={() => setMobileOpen(true)}
				className="flex h-9 w-9 items-center justify-center rounded-xl border border-glass-border bg-white/[0.03] text-text-secondary transition-colors hover:bg-glass-hover lg:hidden"
				aria-label="Open menu"
			>
				<Menu className="h-4 w-4" />
			</button>

			<div className="relative hidden max-w-md flex-1 md:block">
				<Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
				<Input
					type="search"
					placeholder="Search rooms, people, messages…"
					className="pl-10 pr-16 h-10"
				/>
				<kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-glass-border bg-white/[0.05] px-1.5 py-0.5 text-[10px] font-medium text-text-muted">⌘K</kbd>
			</div>

			<div className="ml-auto flex items-center gap-2">
				<div className="hidden items-center gap-2 rounded-full border border-glass-border bg-white/[0.03] px-3 py-1.5 sm:flex">
					<span className={cn("h-2 w-2 rounded-full animate-pulseDot", dotClass)} />
					<span className="text-xs text-text-secondary capitalize">{status}</span>
				</div>

				<Button variant="secondary" size="sm" asChild className="hidden sm:inline-flex">
					<Link href="/rooms?create=1">
						<Plus className="h-4 w-4" />New room
					</Link>
				</Button>

				<button
					type="button"
					onClick={() => openDrawer(true)}
					className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-glass-border bg-white/[0.03] text-text-secondary transition-colors hover:bg-glass-hover hover:text-text-primary"
					aria-label="Open notifications"
				>
					<Bell className="h-4 w-4" />
					{unread > 0 ? (
						<Badge variant="accent" className="absolute -right-1.5 -top-1.5 h-5 min-w-5 justify-center px-1 py-0 text-[10px]">
							{unread > 9 ? "9+" : unread}
						</Badge>
					) : null}
				</button>

				<UserMenu />
			</div>
		</header>
	)
}
