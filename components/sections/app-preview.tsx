"use client"
import { motion } from "framer-motion"
import { Hash, Users, Bell, Settings, User2, Search } from "lucide-react"
import { SectionHeading } from "@/components/shared/section-heading"
import { GlassCard } from "@/components/shared/glass-card"

export default function AppPreview() {
  return (
    <section aria-labelledby="preview-title" className="container py-24 md:py-32">
      <SectionHeading
        eyebrow="A closer look"
        title="An interface designed for focus"
        subtitle="Every surface — from the room list to notifications — is tuned for readability, speed, and calm."
      />

      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="md:col-span-4">
          <GlassCard className="h-full overflow-hidden p-0">
            <div className="flex h-[380px]">
              <aside className="hidden w-56 border-r border-border p-4 md:block">
                <div className="mb-3 flex items-center gap-2 rounded-xl bg-white/[0.03] px-2.5 py-1.5 text-xs text-fg-muted">
                  <Search className="h-3.5 w-3.5" /> Search rooms
                </div>
                <p className="px-1 pb-1 text-[10px] uppercase tracking-widest text-fg-muted">Rooms</p>
                <ul className="space-y-1 text-sm">
                  {["product-launch", "design-crit", "eng-standup", "random"].map((r, i) => (
                    <li key={r} className={`flex items-center gap-2 rounded-lg px-2 py-1.5 ${i === 0 ? "bg-white/[0.06] text-fg" : "text-fg-muted hover:bg-white/[0.04]"}`}>
                      <Hash className="h-3.5 w-3.5" /> {r}
                    </li>
                  ))}
                </ul>
              </aside>
              <div className="flex-1 p-5">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <div className="flex items-center gap-2 text-sm font-semibold"><Hash className="h-4 w-4 text-fg-muted" /> product-launch</div>
                  <div className="flex items-center gap-1.5 text-xs text-fg-muted"><Users className="h-3.5 w-3.5" /> 12 online</div>
                </div>
                <div className="mt-4 space-y-3 text-sm">
                  <p><span className="font-semibold">Lena</span> <span className="text-fg-muted">Wireframes look great — I love the new empty state.</span></p>
                  <p><span className="font-semibold">Aarav</span> <span className="text-fg-muted">Merged. Rolling to canary at 14:00 UTC.</span></p>
                  <p><span className="font-semibold">Noor</span> <span className="text-fg-muted">🎉 Congrats team!</span></p>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.05 }} className="md:col-span-2">
          <GlassCard className="h-full p-6">
            <p className="mb-3 text-[10px] uppercase tracking-widest text-fg-muted">Mobile</p>
            <div className="mx-auto flex h-[320px] w-[180px] flex-col rounded-[28px] border border-border bg-black/40 p-3">
              <div className="flex items-center justify-between text-[10px] text-fg-muted">
                <span>9:41</span><span>●●●</span>
              </div>
              <div className="mt-3 space-y-2 text-[11px]">
                <div className="self-start rounded-2xl bg-white/[0.06] px-3 py-1.5">Ping when live 🙌</div>
                <div className="ml-auto w-max rounded-2xl accent-gradient px-3 py-1.5 text-bg">Deploying now.</div>
                <div className="self-start rounded-2xl bg-white/[0.06] px-3 py-1.5 text-fg-muted">Ken is typing…</div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="md:col-span-2">
          <GlassCard className="h-full p-6">
            <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-widest text-fg-muted"><Bell className="h-3 w-3" /> Notifications</div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-accent" /><div><p className="font-medium">Mention in #design-crit</p><p className="text-xs text-fg-muted">Lena mentioned you · 2m</p></div></li>
              <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-accent-cyan" /><div><p className="font-medium">Kaia sent you a DM</p><p className="text-xs text-fg-muted">Direct message · 6m</p></div></li>
              <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-white/30" /><div><p className="font-medium">Room invite: growth</p><p className="text-xs text-fg-muted">From Marcus · 1h</p></div></li>
            </ul>
          </GlassCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }} className="md:col-span-2">
          <GlassCard className="h-full p-6">
            <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-widest text-fg-muted"><User2 className="h-3 w-3" /> Profile</div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-full accent-gradient text-bg font-semibold">AV</div>
              <div>
                <p className="text-sm font-semibold">Aarav Venkatesh</p>
                <p className="text-xs text-fg-muted">Product engineer · UTC+5:30</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs">
              <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-fg-muted">🟢 Available</span>
              <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-fg-muted">Focus mode</span>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="md:col-span-2">
          <GlassCard className="h-full p-6">
            <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-widest text-fg-muted"><Settings className="h-3 w-3" /> Preferences</div>
            <ul className="space-y-3 text-sm">
              <Toggle label="Read receipts" on />
              <Toggle label="Typing indicators" on />
              <Toggle label="Sound notifications" />
              <Toggle label="Compact density" on />
            </ul>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}

function Toggle({ label, on }: { label: string; on?: boolean }) {
  return (
    <li className="flex items-center justify-between">
      <span className="text-fg-muted">{label}</span>
      <span className={`relative inline-flex h-5 w-9 items-center rounded-full ${on ? "bg-accent" : "bg-white/[0.08]"}`}>
        <span className={`inline-block h-4 w-4 rounded-full bg-bg transition-transform ${on ? "translate-x-4" : "translate-x-1"}`} />
      </span>
    </li>
  )
}
