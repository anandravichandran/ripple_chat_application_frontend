"use client"
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/shared/section-heading"
import { GlassCard } from "@/components/shared/glass-card"
import { FEATURES } from "@/lib/data"

export default function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="container py-24 md:py-32">
      <SectionHeading
        eyebrow="Features"
        title="Everything your team needs to talk, ship, and stay in sync"
        subtitle="A cohesive real-time platform designed for focused conversations, thoughtful async, and secure collaboration across every workspace."
      />

      <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {FEATURES.map((f, i) => (
          <motion.li
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.03 }}
          >
            <GlassCard gradientBorder className="group h-full p-6 hover:-translate-y-1 hover:shadow-glow">
              <div className="mb-5 grid h-11 w-11 place-items-center rounded-2xl border border-border bg-white/[0.04] transition-colors group-hover:border-accent/30">
                <f.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="text-[15px] font-semibold text-fg">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{f.desc}</p>
            </GlassCard>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
