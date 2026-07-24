"use client"
import { motion, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

type Props = HTMLMotionProps<"div"> & {
  hover?: boolean
  hoverLift?: boolean
  gradientBorder?: boolean
  tone?: "strong" | "subtle" | "default"
}

export function GlassCard({ className, hover = true, hoverLift, gradientBorder = false, tone, children, ...props }: Props) {
  return (
    <motion.div
      className={cn(
        "relative rounded-3xl glass shadow-glass",
        hover && !hoverLift && "glass-hover transition-colors duration-300",
        hoverLift && "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-float",
        gradientBorder && "before:absolute before:inset-0 before:-z-10 before:rounded-3xl before:p-[1px] before:bg-gradient-to-br before:from-accent/40 before:via-transparent before:to-accent-cyan/30 before:opacity-0 hover:before:opacity-100 before:transition-opacity",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
