"use client"
import { motion } from "framer-motion"
import { ShieldCheck, Key, MailCheck, LockKeyhole, Route, RefreshCw, Database, Radio } from "lucide-react"
import { SectionHeading } from "@/components/shared/section-heading"
import { GlassCard } from "@/components/shared/glass-card"
import { SECURITY } from "@/lib/data"

const ICONS = [Key, LockKeyhole, MailCheck, ShieldCheck, Route, RefreshCw, Database, Radio]

export default function Security() {
  return (
    <section id="security" aria-labelledby="security-title" className="container py-24 md:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Security"
            title="Enterprise-grade security, built in from the first message"
            subtitle="Ripple is engineered by security-first practitioners. Every layer — from authentication to sockets to storage — is designed to be auditable, encrypted, and easy to reason about."
          />
          <div className="relative mt-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative mx-auto aspect-square w-full max-w-sm"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/25 via-transparent to-accent-cyan/10 blur-2xl" />
              <div className="absolute inset-6 rounded-full border border-border" />
              <div className="absolute inset-16 rounded-full border border-border" />
              <div className="absolute inset-24 rounded-full border border-border" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="glass grid h-24 w-24 place-items-center rounded-3xl shadow-glow">
                  <ShieldCheck className="h-10 w-10 text-accent" />
                </div>
              </div>
              {["AES-256", "Argon2id", "TLS 1.3", "OAuth 2.1"].map((t, i) => (
                <span
                  key={t}
                  className="absolute glass rounded-full px-2.5 py-1 text-[10px] font-medium text-fg-muted"
                  style={{ top: `${20 + i * 18}%`, left: i % 2 ? "78%" : "6%" }}
                >
                  {t}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {SECURITY.map((s, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
              >
                <GlassCard className="h-full p-5">
                  <div className="mb-3 grid h-9 w-9 place-items-center rounded-xl border border-border bg-white/[0.04]">
                    <Icon className="h-4 w-4 text-accent" />
                  </div>
                  <h3 className="text-sm font-semibold">{s.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-fg-muted">{s.desc}</p>
                </GlassCard>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
