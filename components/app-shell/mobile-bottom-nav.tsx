"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Hash, MessageCircle, Bell, User } from "lucide-react"
import { useNotificationStore } from "@/store/notification-store"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const items = [
	{ href: "/dashboard", label: "Home", icon: LayoutDashboard },
	{ href: "/rooms", label: "Rooms", icon: Hash },
	{ href: "/messages", label: "DMs", icon: MessageCircle },
	{ href: "/notifications", label: "Alerts", icon: Bell, badge: true },
	{ href: "/profile", label: "Me", icon: User },
]

export function MobileBottomNav() {
	const pathname = usePathname()
	const unread = useNotificationStore((s) => s.items.filter((n) => !n.read).length)
	return (
		<nav className="fixed inset-x-0 bottom-3 z-30 mx-3 flex items-center justify-around rounded-full border border-glass-border bg-[#0B0B0C]/85 p-1.5 backdrop-blur-2xl shadow-float lg:hidden">
			{items.map((item) => {
				const Icon = item.icon
				const active = pathname === item.href || pathname.startsWith(item.href + "/")
				return (
					<Link
						key={item.href}
						href={item.href}
						className={cn(
							"relative flex flex-1 flex-col items-center gap-0.5 rounded-full px-2 py-1.5 text-[11px] transition-colors",
							active ? "bg-white/[0.08] text-text-primary" : "text-text-muted",
						)}
					>
						<Icon className={cn("h-4 w-4", active && "text-accent-primary")} />
						<span>{item.label}</span>
						{item.badge && unread > 0 ? (
							<Badge variant="accent" className="absolute right-2 top-1 h-4 min-w-4 justify-center px-1 py-0 text-[9px]">
								{unread > 9 ? "9+" : unread}
							</Badge>
						) : null}
					</Link>
				)
			})}
		</nav>
	)
}
