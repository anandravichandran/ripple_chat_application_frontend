"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Compass, ArrowRight } from "lucide-react"
import { FloatingShapes } from "@/components/shared/floating-shapes"
import { GlassCard } from "@/components/shared/glass-card"
import { Button } from "@/components/ui/button"

export default function NotFound() {
	return (
		<div className="relative flex min-h-screen items-center justify-center px-4">
			<FloatingShapes />
			<motion.div
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="relative w-full max-w-md"
			>
				<GlassCard tone="strong" className="p-9 text-center">
					<div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-accent-secondary/30 bg-accent-secondary/10">
						<Compass className="h-6 w-6 text-accent-secondary" />
					</div>
					<p className="text-xs uppercase tracking-widest text-text-muted">Error 404</p>
					<h1 className="mt-1 text-2xl font-semibold tracking-tight">Lost in the ripple</h1>
					<p className="mt-2 text-sm text-text-secondary">
						The page you're looking for doesn't exist or was moved. Let's get you back on track.
					</p>
					<div className="mt-7 flex flex-col gap-2 sm:flex-row sm:justify-center">
						<Button asChild size="lg">
							<Link href="/login">
								Go to login
								<ArrowRight className="h-4 w-4" />
							</Link>
						</Button>
						<Button asChild size="lg" variant="secondary">
							<Link href="/">Landing</Link>
						</Button>
					</div>
				</GlassCard>
			</motion.div>
		</div>
	)
}
