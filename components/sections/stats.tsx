"use client"
import { GlassCard } from "@/components/shared/glass-card"
import { AnimatedCounter } from "@/components/shared/animated-counter"
import { STATS } from "@/lib/data"

export default function Stats() {
  return (
    <section aria-label="Platform stats" className="container relative -mt-4 mb-20 md:mb-28">
      <GlassCard hover={false} className="grid grid-cols-2 gap-y-8 rounded-3xl p-8 md:grid-cols-4 md:p-10">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-3xl font-semibold text-fg md:text-4xl">
              <AnimatedCounter value={s.value} divisor={s.divisor} decimals={s.decimals} suffix={s.suffix} />
            </div>
            <div className="mt-1.5 text-xs uppercase tracking-widest text-fg-muted">{s.label}</div>
          </div>
        ))}
      </GlassCard>
    </section>
  )
}
