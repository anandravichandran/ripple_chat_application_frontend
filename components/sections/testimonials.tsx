"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { SectionHeading } from "@/components/shared/section-heading"
import { GlassCard } from "@/components/shared/glass-card"
import { TESTIMONIALS } from "@/lib/data"

export default function Testimonials() {
  const [i, setI] = useState(0)
  const t = TESTIMONIALS[i]
  const prev = () => setI((v) => (v - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  const next = () => setI((v) => (v + 1) % TESTIMONIALS.length)

  return (
    <section aria-labelledby="testimonials-title" className="container py-24 md:py-32">
      <SectionHeading eyebrow="Loved by teams" title="Chosen by product and platform teams worldwide" />

      <div className="relative mx-auto mt-14 max-w-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
          >
            <GlassCard hover={false} className="p-8 md:p-10">
              <div className="flex gap-0.5 text-accent" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, k) => <Star key={k} className="h-4 w-4 fill-accent" />)}
              </div>
              <blockquote className="mt-5 font-display text-xl leading-relaxed text-fg md:text-2xl">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full accent-gradient text-bg font-semibold">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-fg-muted">{t.role}</div>
                </div>
              </figcaption>
            </GlassCard>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button onClick={prev} aria-label="Previous testimonial" className="grid h-10 w-10 place-items-center rounded-full glass glass-hover focus-ring"><ChevronLeft className="h-4 w-4" /></button>
          <div className="flex items-center gap-1.5">
            {TESTIMONIALS.map((_, k) => (
              <button key={k} aria-label={`Go to slide ${k + 1}`} aria-current={k === i} onClick={() => setI(k)}
                className={`h-1.5 rounded-full transition-all ${k === i ? "w-6 bg-accent" : "w-1.5 bg-white/20"}`} />
            ))}
          </div>
          <button onClick={next} aria-label="Next testimonial" className="grid h-10 w-10 place-items-center rounded-full glass glass-hover focus-ring"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>
    </section>
  )
}
