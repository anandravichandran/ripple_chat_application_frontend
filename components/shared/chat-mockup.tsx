"use client"
import { motion } from "framer-motion"
import { Circle, Send, Smile, Paperclip, Hash, CheckCheck } from "lucide-react"

const users = [
  { name: "Aarav", initials: "AV", color: "#D9FF66" },
  { name: "Lena", initials: "LN", color: "#A8F5FF" },
  { name: "Noor", initials: "NR", color: "#F5C5FF" },
  { name: "Ken", initials: "KO", color: "#FFD59E" },
]

export function ChatMockup() {
  return (
    <div className="relative w-full max-w-[540px]">
      <div aria-hidden className="absolute -inset-10 -z-10 rounded-[3rem] bg-gradient-to-tr from-accent/20 via-transparent to-accent-cyan/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="glass rounded-3xl p-4 shadow-glass"
      >
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4 text-fg-muted" />
            <span className="text-sm font-semibold">product-launch</span>
            <span className="ml-2 text-xs text-fg-muted">12 members</span>
          </div>
          <div className="flex -space-x-2">
            {users.map((u) => (
              <div key={u.name} className="h-6 w-6 rounded-full border border-bg text-[10px] font-semibold flex items-center justify-center" style={{ background: u.color, color: "#0A0A0A" }}>
                {u.initials}
              </div>
            ))}
          </div>
        </div>

        <ul className="mt-4 space-y-4">
          <Message initials="LN" color="#A8F5FF" name="Lena" time="09:41" text="Landing v3 is ready for review — added typing indicators & read receipts." read />
          <Message initials="AV" color="#D9FF66" name="Aarav" time="09:42" text="Beautiful. Ship it once QA signs off on the mobile flow." me />
          <Message initials="NR" color="#F5C5FF" name="Noor" time="09:43" text="Uploading the new spec now." attachment="ripple-spec-v3.pdf" />
        </ul>

        <div className="mt-4 flex items-center gap-2 text-xs text-fg-muted">
          <div className="flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulseDot" />
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulseDot [animation-delay:120ms]" />
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulseDot [animation-delay:240ms]" />
          </div>
          <span>Ken is typing…</span>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-2xl border border-border bg-white/[0.03] px-3 py-2.5">
          <Paperclip className="h-4 w-4 text-fg-muted" />
          <input aria-label="Message" placeholder="Message #product-launch" className="flex-1 bg-transparent text-sm outline-none placeholder:text-fg-muted" />
          <Smile className="h-4 w-4 text-fg-muted" />
          <button aria-label="Send" className="grid h-8 w-8 place-items-center rounded-full accent-gradient text-bg"><Send className="h-3.5 w-3.5" /></button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -24, y: 12 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="absolute -left-6 -bottom-8 glass rounded-2xl p-3 shadow-soft animate-float"
      >
        <div className="mb-2 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-fg-muted">
          <Circle className="h-2 w-2 fill-success text-success" /> Online now
        </div>
        <div className="flex -space-x-2">
          {users.map((u) => (
            <div key={u.name} className="h-7 w-7 rounded-full border-2 border-bg text-[11px] font-semibold flex items-center justify-center" style={{ background: u.color, color: "#0A0A0A" }}>
              {u.initials}
            </div>
          ))}
          <div className="h-7 w-7 rounded-full border-2 border-bg bg-white/10 text-[11px] font-semibold flex items-center justify-center text-fg-muted">+8</div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 24, y: -12 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute -right-4 -top-6 glass rounded-2xl p-3 pr-5 shadow-soft w-[220px] animate-float [animation-delay:1s]"
      >
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-xl accent-gradient text-bg">
            <CheckCheck className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-semibold">3 new messages</p>
            <p className="text-[11px] text-fg-muted">#design-crit · just now</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function Message({ initials, color, name, time, text, read, me, attachment }: {
  initials: string; color: string; name: string; time: string; text: string; read?: boolean; me?: boolean; attachment?: string
}) {
  return (
    <li className="flex gap-3">
      <div className="h-8 w-8 shrink-0 rounded-full text-[11px] font-semibold flex items-center justify-center" style={{ background: color, color: "#0A0A0A" }}>
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold">{name}</span>
          <span className="text-[11px] text-fg-muted">{time}</span>
        </div>
        <p className={`mt-0.5 text-sm ${me ? "text-fg" : "text-fg-muted"}`}>{text}</p>
        {attachment && (
          <div className="mt-1.5 inline-flex items-center gap-2 rounded-xl border border-border bg-white/[0.03] px-2.5 py-1.5 text-xs">
            <Paperclip className="h-3.5 w-3.5 text-accent" /> {attachment}
          </div>
        )}
        {read && (
          <div className="mt-1 flex items-center gap-1 text-[11px] text-accent">
            <CheckCheck className="h-3 w-3" /> Read by 8
          </div>
        )}
      </div>
    </li>
  )
}
