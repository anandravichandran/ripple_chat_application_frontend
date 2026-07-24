"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Sparkles, ArrowRight, Hash } from "lucide-react"
import { GlassCard } from "@/components/shared/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuthStore } from "@/store/auth-store"

export function WelcomeCard() {
	const user = useAuthStore((s) => s.user)
	const hour = new Date().getHours()
	const greet = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"
	return (
		<motion.div
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.45, ease: "easeOut" }}
		>
			<GlassCard tone="strong" className="relative overflow-hidden p-7 sm:p-8">
				<div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent-primary/15 blur-3xl" />
				<div aria-hidden className="pointer-events-none absolute -left-20 -bottom-24 h-64 w-64 rounded-full bg-accent-secondary/15 blur-3xl" />
				<div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
					<div className="space-y-3">
						<Badge variant="accent">
							<Sparkles className="h-3 w-3" />New this week
						</Badge>
						<h1 className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
							{greet}, <span className="accent-text">{user?.name.split(" ")[0] ?? "there"}</span>
						</h1>
						<p className="max-w-xl text-subtitle text-text-secondary">
							You have 3 unread mentions, 12 messages waiting, and one review at 4:30 PM. Ripples are moving.
						</p>
					</div>
					<div className="flex flex-wrap items-center gap-2">
						<Button asChild size="lg">
							<Link href="/rooms">
								<Hash className="h-4 w-4" />Browse rooms
							</Link>
						</Button>
						<Button asChild variant="secondary" size="lg">
							<Link href="/rooms/r_design">
								Jump into Design Systems<ArrowRight className="h-4 w-4" />
							</Link>
						</Button>
					</div>
				</div>
			</GlassCard>
		</motion.div>
	)
}
