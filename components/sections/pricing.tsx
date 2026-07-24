"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { Check } from "lucide-react"
import { SectionHeading } from "@/components/shared/section-heading"
import { GlassCard } from "@/components/shared/glass-card"
import { Button } from "@/components/ui/button"
import { PLANS } from "@/lib/data"
import { cn } from "@/lib/utils"

export default function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="container py-24 md:py-32">
      <SectionHeading
        eyebrow="Pricing"
        title="Fair pricing that scales with your team"
        subtitle="Start free forever. Upgrade when you need private rooms, unlimited history, or enterprise controls."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {PLANS.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <GlassCard
              hover={!p.highlight}
              className={cn(
                "relative flex h-full flex-col p-7",
                p.highlight && "border-accent/30 shadow-glow before:absolute before:inset-0 before:-z-10 before:rounded-3xl before:bg-gradient-to-br before:from-accent/10 before:to-transparent"
              )}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full accent-gradient px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-bg shadow-glow">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-fg-muted">{p.tag}</p>
              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="font-display text-4xl font-semibold">{p.price}</span>
                <span className="text-sm text-fg-muted">/ {p.cadence}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-fg-muted">
                    <span className="mt-0.5 grid h-4 w-4 place-items-center rounded-full accent-gradient text-bg">
                      <Check className="h-2.5 w-2.5" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Button asChild variant={p.highlight ? "primary" : "ghost"} className="mt-8">
                <Link href="#get-started">{p.cta}</Link>
              </Button>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
