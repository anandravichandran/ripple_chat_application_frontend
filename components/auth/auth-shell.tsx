"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Waves } from "lucide-react"
import { GlassCard } from "@/components/shared/glass-card"
import { FloatingShapes } from "@/components/shared/floating-shapes"

export function AuthShell({
	title,
	subtitle,
	children,
	footer,
}: {
	title: string
	subtitle?: string
	children: React.ReactNode
	footer?: React.ReactNode
}) {
	return (
		<div className="relative flex min-h-screen items-center justify-center px-4 py-12">
			<FloatingShapes />
			<div className="relative w-full max-w-md">
				<motion.div
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: "easeOut" }}
					className="mb-8 flex items-center justify-center"
				>
					<Link
						href="/"
						className="group flex items-center gap-2 text-text-secondary transition-colors hover:text-text-primary"
					>
						<span className="flex h-8 w-8 items-center justify-center rounded-xl border border-glass-border bg-accent-primary/10 text-accent-primary">
							<Waves className="h-4 w-4" />
						</span>
						<span className="text-sm font-semibold tracking-tight text-text-primary">Ripple Chat</span>
					</Link>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
				>
					<GlassCard tone="strong" className="p-8 sm:p-9">
						<div className="mb-7 text-center">
							<h1 className="text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
								{title}
							</h1>
							{subtitle ? (
								<p className="mt-1.5 text-sm text-text-secondary">{subtitle}</p>
							) : null}
						</div>
						{children}
					</GlassCard>
				</motion.div>

				{footer ? (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.25 }}
						className="mt-6 text-center text-sm text-text-muted"
					>
						{footer}
					</motion.div>
				) : null}
			</div>
		</div>
	)
}
