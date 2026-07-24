"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Lock, ArrowRight } from "lucide-react"
import { FloatingShapes } from "@/components/shared/floating-shapes"
import { GlassCard } from "@/components/shared/glass-card"
import { Button } from "@/components/ui/button"

export default function UnauthorizedPage() {
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
					<div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-state-danger/30 bg-state-danger/10">
						<Lock className="h-6 w-6 text-state-danger" />
					</div>
					<h1 className="text-2xl font-semibold tracking-tight">Access restricted</h1>
					<p className="mt-2 text-sm text-text-secondary">
						You need to sign in to view this page. If you think this is a mistake, contact your workspace admin.
					</p>
					<div className="mt-7 flex flex-col gap-2 sm:flex-row sm:justify-center">
						<Button asChild size="lg">
							<Link href="/login">
								Sign in
								<ArrowRight className="h-4 w-4" />
							</Link>
						</Button>
						<Button asChild size="lg" variant="secondary">
							<Link href="/">Back to home</Link>
						</Button>
					</div>
				</GlassCard>
			</motion.div>
		</div>
	)
}
