"use client"
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/shared/section-heading"
import { STEPS } from "@/lib/data"

export default function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="container py-24 md:py-32">
      <SectionHeading
        eyebrow="How it works"
        title="From sign-up to a synced workspace in four steps"
        subtitle="Ripple was built so a new team can be productive within minutes — no infrastructure, no plugins, no friction."
      />

      <ol className="relative mt-16 grid grid-cols-1 gap-6 md:grid-cols-4">
        <div aria-hidden className="absolute inset-x-6 top-6 hidden h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent md:block" />
        {STEPS.map((s, i) => (
          <motion.li
            key={s.n}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="relative glass rounded-3xl p-6"
          >
            <div className="absolute -top-4 left-6 grid h-8 w-8 place-items-center rounded-xl accent-gradient text-xs font-bold text-bg shadow-glow">
              {s.n}
            </div>
            <h3 className="mt-2 text-base font-semibold">{s.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{s.desc}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}
