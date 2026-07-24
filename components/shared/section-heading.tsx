"use client"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type Props = { eyebrow?: string; title: string; subtitle?: string; align?: "left" | "center"; className?: string }

export function SectionHeading({ eyebrow, title, subtitle, align = "center", className }: Props) {
  return (
    <div className={cn("flex flex-col gap-4", align === "center" ? "items-center text-center" : "items-start text-left", className)}>
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="glass rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide text-fg-muted"
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="text-section font-display text-gradient max-w-3xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="max-w-2xl text-subtitle text-fg-muted"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
