"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
	LayoutDashboard,
	Hash,
	MessageCircle,
	Bell,
	Settings,
	User,
	ShieldCheck,
	LogOut,
	Waves,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useSidebarStore } from "@/store/sidebar-store"
import { useAuthStore } from "@/store/auth-store"
import { useNotificationStore } from "@/store/notification-store"
import { UserAvatar } from "@/components/shared/user-avatar"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { useProfileDrawer } from "@/store/profile-drawer-store"
import { useRouter } from "next/navigation"

const items = [
	{ href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
	{ href: "/rooms", label: "Rooms", icon: Hash },
	{ href: "/messages", label: "Direct Messages", icon: MessageCircle },
	{ href: "/notifications", label: "Notifications", icon: Bell, badge: true },
	{ href: "/settings", label: "Settings", icon: Settings },
	{ href: "/profile", label: "Profile", icon: User },
	{ href: "/admin", label: "Admin", icon: ShieldCheck },
]

export function SidebarNav() {
	const pathname = usePathname()
	const router = useRouter()
	const { collapsed, toggleCollapsed } = useSidebarStore()
	const user = useAuthStore((s) => s.user)
	const signOut = useAuthStore((s) => s.logout)
	const unread = useNotificationStore((s) => s.items.filter((n) => !n.read).length)
	const { openProfile } = useProfileDrawer()

	const active = (href: string) => pathname === href || pathname.startsWith(href + "/")

	return (
		<aside
			className={cn(
				"sticky top-0 z-30 hidden h-screen shrink-0 flex-col border-r border-glass-border bg-bg-primary/60 backdrop-blur-2xl lg:flex",
				collapsed ? "w-[76px]" : "w-[264px]",
			)}
		>
			<div className="flex h-16 items-center gap-2.5 px-4">
				<Link href="/dashboard" className="flex items-center gap-2.5">
					<span className="flex h-9 w-9 items-center justify-center rounded-2xl border border-accent-primary/30 bg-accent-primary/10 text-accent-primary">
						<Waves className="h-4 w-4" />
					</span>
					{!collapsed ? (
						<span className="text-sm font-semibold tracking-tight">Ripple</span>
					) : null}
				</Link>
				<button
					type="button"
					onClick={toggleCollapsed}
					className="ml-auto flex h-8 w-8 items-center justify-center rounded-xl border border-glass-border bg-white/[0.03] text-text-muted transition-colors hover:bg-glass-hover hover:text-text-primary"
					aria-label="Toggle sidebar"
				>
					{collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
				</button>
			</div>

			<nav className="flex-1 space-y-1 px-3 py-3">
				{items.map((item, i) => {
					const Icon = item.icon
					const isActive = active(item.href)
					return (
						<Tooltip key={item.href} disableHoverableContent={!collapsed}>
							<TooltipTrigger asChild>
								<Link
									href={item.href}
									className={cn(
										"group relative flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors",
										isActive
											? "bg-white/[0.06] text-text-primary"
											: "text-text-secondary hover:bg-glass-hover hover:text-text-primary",
									)}
								>
									{isActive ? (
										<motion.span
											layoutId="sidebar-active"
											className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-accent-primary"
										/>
									) : null}
									<Icon
										className={cn(
											"h-4 w-4 shrink-0",
											isActive ? "text-accent-primary" : "text-text-muted group-hover:text-text-primary",
										)}
									/>
									{!collapsed ? <span className="truncate">{item.label}</span> : null}
									{!collapsed && item.badge && unread > 0 ? (
										<Badge variant="accent" className="ml-auto">{unread}</Badge>
									) : null}
								</Link>
							</TooltipTrigger>
							{collapsed ? (
								<TooltipContent side="right">{item.label}</TooltipContent>
							) : null}
						</Tooltip>
					)
				})}

				<div className="my-3 h-px bg-glass-border" />

				<Tooltip disableHoverableContent={!collapsed}>
					<TooltipTrigger asChild>
						<button
							onClick={() => {
								signOut()
								router.push("/")
							}}
							className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-state-danger/[0.08] hover:text-state-danger"
						>
							<LogOut className="h-4 w-4 shrink-0" />
							{!collapsed ? <span>Sign out</span> : null}
						</button>
					</TooltipTrigger>
					{collapsed ? <TooltipContent side="right">Sign out</TooltipContent> : null}
				</Tooltip>
			</nav>

			{user ? (
				<button type="button" className="m-3 flex w-[calc(100%-24px)] items-center gap-3 rounded-2xl border border-glass-border bg-white/[0.04] p-3 text-left transition-colors hover:bg-glass-hover" onClick={() => openProfile(user.id)}>
					<UserAvatar src={user.avatar} initials={user.name?.charAt(0)?.toUpperCase()} status={user.status} size="sm" />
					{!collapsed ? (
						<div className="min-w-0 flex-1">
							<p className="truncate text-sm font-medium text-text-primary">{user.name}</p>
							<p className="truncate text-xs text-text-muted">{user.email}</p>
						</div>
					) : null}
				</button>
			) : null}
		</aside>
	)
}
