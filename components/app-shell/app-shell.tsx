"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { SidebarNav } from "./sidebar-nav"
import { TopNavbar } from "./top-navbar"
import { NotificationDrawer } from "./notification-drawer"
import { MobileDrawer } from "./mobile-drawer"
import { MobileBottomNav } from "./mobile-bottom-nav"
import { FloatingShapes } from "@/components/shared/floating-shapes"
import { FullPageLoader } from "@/components/shared/loader"
import { useAuthStore } from "@/store/auth-store"

export function AppShell({ children }: { children: React.ReactNode }) {
	const router = useRouter()
	const { user, status } = useAuthStore()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	useEffect(() => {
		if (!mounted) return
		if (status === "unauthenticated") {
			router.replace("/login")
		}
	}, [status, mounted, router])

	if (!mounted || status === "idle") {
		return (
			<div className="relative min-h-screen">
				<FloatingShapes />
				<FullPageLoader label="Rippling…" />
			</div>
		)
	}

	if (status === "unauthenticated") {
		return (
			<div className="relative min-h-screen">
				<FloatingShapes />
				<FullPageLoader label="Redirecting…" />
			</div>
		)
	}

	return (
		<div className="relative min-h-screen">
			<FloatingShapes />
			<div className="relative flex">
				<SidebarNav />
				<div className="flex min-h-screen min-w-0 flex-1 flex-col">
					<TopNavbar />
					<motion.main
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.35, ease: "easeOut" }}
						className="flex-1 px-4 pb-24 pt-6 sm:px-6 lg:px-10 lg:pb-10 lg:pt-8"
					>
						{children}
					</motion.main>
				</div>
			</div>
			<MobileBottomNav />
			<MobileDrawer />
			<NotificationDrawer />
		</div>
	)
}
