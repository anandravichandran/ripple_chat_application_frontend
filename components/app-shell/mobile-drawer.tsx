"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
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
	X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useSidebarStore } from "@/store/sidebar-store"
import { useAuthStore } from "@/store/auth-store"
import { UserAvatar } from "@/components/shared/user-avatar"

const items = [
	{ href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
	{ href: "/rooms", label: "Rooms", icon: Hash },
	{ href: "/messages", label: "Direct Messages", icon: MessageCircle },
	{ href: "/notifications", label: "Notifications", icon: Bell },
	{ href: "/settings", label: "Settings", icon: Settings },
	{ href: "/profile", label: "Profile", icon: User },
	{ href: "/admin", label: "Admin", icon: ShieldCheck },
]

export function MobileDrawer() {
	const { mobileOpen, setMobileOpen } = useSidebarStore()
	const pathname = usePathname()
	const user = useAuthStore((s) => s.user)
	const signOut = useAuthStore((s) => s.signOut)
	const router = useRouter()

	return (
		<AnimatePresence>
			{mobileOpen ? (
				<>
					<motion.div
						key="m-overlay"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md lg:hidden"
						onClick={() => setMobileOpen(false)}
					/>
					<motion.aside
						key="m-drawer"
						initial={{ x: "-100%" }}
						animate={{ x: 0 }}
						exit={{ x: "-100%" }}
						transition={{ type: "spring", stiffness: 260, damping: 30 }}
						className="fixed left-0 top-0 z-50 flex h-full w-[280px] flex-col border-r border-glass-border bg-[#0B0B0C]/95 backdrop-blur-2xl lg:hidden"
					>
						<div className="flex h-16 items-center gap-2 px-4">
							<span className="flex h-9 w-9 items-center justify-center rounded-2xl border border-accent-primary/30 bg-accent-primary/10 text-accent-primary">
								<Waves className="h-4 w-4" />
							</span>
							<span className="text-sm font-semibold tracking-tight">Ripple</span>
							<button
								onClick={() => setMobileOpen(false)}
								className="ml-auto flex h-8 w-8 items-center justify-center rounded-xl border border-glass-border bg-white/[0.03] text-text-muted hover:text-text-primary"
								aria-label="Close menu"
							>
								<X className="h-4 w-4" />
							</button>
						</div>

						<nav className="flex-1 space-y-1 px-3 py-3">
							{items.map((item) => {
								const Icon = item.icon
								const active = pathname === item.href || pathname.startsWith(item.href + "/")
								return (
									<Link
										key={item.href}
										href={item.href}
										onClick={() => setMobileOpen(false)}
										className={cn(
											"flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors",
											active
												? "bg-white/[0.06] text-text-primary"
												: "text-text-secondary hover:bg-glass-hover hover:text-text-primary",
										)}
									>
										<Icon className={cn("h-4 w-4", active ? "text-accent-primary" : "text-text-muted")} />
										{item.label}
									</Link>
								)
							})}
							<button
								onClick={() => {
									signOut()
									setMobileOpen(false)
									router.push("/")
								}}
								className="mt-2 flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-state-danger/10 hover:text-state-danger"
							>
								<LogOut className="h-4 w-4" />Sign out
							</button>
						</nav>

						{user ? (
							<div className="m-3 flex items-center gap-3 rounded-2xl border border-glass-border bg-white/[0.04] p-3">
								<UserAvatar initials={user.avatar} status={user.status} size="sm" />
								<div className="min-w-0 flex-1">
									<p className="truncate text-sm font-medium">{user.name}</p>
									<p className="truncate text-xs text-text-muted">{user.email}</p>
								</div>
							</div>
						) : null}
					</motion.aside>
				</>
			) : null}
		</AnimatePresence>
	)
}
