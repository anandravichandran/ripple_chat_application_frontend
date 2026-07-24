"use client"

import { motion, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

type Props = HTMLMotionProps<"div"> & {
	hoverLift?: boolean
	tone?: "default" | "strong" | "subtle"
}

export function GlassCard({
	className,
	hoverLift,
	tone = "default",
	children,
	...rest
}: Props) {
	return (
		<motion.div
			whileHover={hoverLift ? { y: -4 } : undefined}
			transition={{ type: "spring", stiffness: 260, damping: 22 }}
			className={cn(
				"rounded-[24px] border shadow-glass backdrop-blur-xl",
				tone === "default" && "border-glass-border bg-glass",
				tone === "strong" && "border-glass-borderStrong bg-white/[0.06]",
				tone === "subtle" && "border-glass-border/60 bg-white/[0.02]",
				className,
			)}
			{...rest}
		>
			{children}
		</motion.div>
	)
}
