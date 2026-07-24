import Link from "next/link"
import { Waves, Github, Twitter, Linkedin, Youtube } from "lucide-react"

const COLS = [
  { title: "Product", links: ["Features", "Security", "Pricing", "Changelog", "Roadmap"] },
  { title: "Company", links: ["About", "Careers", "Press", "Contact", "Brand"] },
  { title: "Resources", links: ["Blog", "Guides", "Community", "Support", "Status"] },
  { title: "Developers", links: ["Documentation", "API Reference", "GitHub", "SDKs", "Webhooks"] },
]

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-bg-elevated">
      <div className="container py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-xl accent-gradient text-bg"><Waves className="h-4 w-4" /></span>
              <span className="font-display text-lg font-semibold">Ripple Chat</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg-muted">
              Secure, real-time messaging for modern teams. Built for focus, designed to disappear.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[
                { Icon: Twitter, label: "Twitter" },
                { Icon: Github, label: "GitHub" },
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Youtube, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label} className="grid h-9 w-9 place-items-center rounded-full glass glass-hover focus-ring">
                  <Icon className="h-4 w-4 text-fg-muted" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {COLS.map((c) => (
              <div key={c.title}>
                <p className="mb-3 text-[11px] uppercase tracking-widest text-fg-muted">{c.title}</p>
                <ul className="space-y-2 text-sm">
                  {c.links.map((l) => (
                    <li key={l}><Link href="#" className="text-fg-muted hover:text-fg">{l}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-fg-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Ripple Chat, Inc. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="#" className="hover:text-fg">Privacy</Link>
            <Link href="#" className="hover:text-fg">Terms</Link>
            <Link href="#" className="hover:text-fg">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
