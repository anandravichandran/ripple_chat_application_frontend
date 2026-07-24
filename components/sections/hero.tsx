"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChatMockup } from "@/components/shared/chat-mockup"
import { NoiseGrid } from "@/components/shared/noise-grid"

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative pt-16 pb-24 md:pt-24 md:pb-32">
      <NoiseGrid />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />

      <div className="container grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs font-medium text-fg-muted">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Secure. Instant. Connected.
          </motion.div>

          <motion.h1 id="hero-title"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 font-display text-hero text-gradient">
            Real-Time Conversations<br />
            <span className="text-fg">Built For Modern Teams</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-5 max-w-xl text-subtitle text-fg-muted">
            Collaborate instantly using secure room-based messaging with live presence, typing indicators, and seamless communication that stays in sync across every device.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg"><Link href="/register">Start Chatting <ArrowRight className="h-4 w-4" /></Link></Button>
            <Button asChild size="lg" variant="ghost"><Link href="/register"><PlayCircle className="h-4 w-4" /> View Demo</Link></Button>
          </motion.div>

          <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-fg-muted">
            <li className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-success" /> 99.99% uptime</li>
            <li className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-accent" /> SOC 2 Type II</li>
            <li className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" /> Sub-100ms delivery</li>
          </motion.ul>
        </div>

        <div className="flex justify-center lg:justify-end">
          <ChatMockup />
        </div>
      </div>
    </section>
  )
}
