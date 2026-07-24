"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CTA() {
  return (
    <section id="get-started" aria-labelledby="cta-title" className="container pb-32 pt-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-[2rem] glass p-10 text-center md:p-16"
      >
        <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[720px] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-accent/10 to-transparent" />

        <h2 id="cta-title" className="mx-auto max-w-2xl font-display text-section text-gradient">
          Ready to chat with your team?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-subtitle text-fg-muted">
          Set up a workspace in under a minute. No credit card required. Cancel anytime.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg"><Link href="/register">Create Free Account <ArrowRight className="h-4 w-4" /></Link></Button>
          <Button asChild size="lg" variant="ghost"><Link href="/register">Contact Sales</Link></Button>
        </div>
      </motion.div>
    </section>
  )
}
