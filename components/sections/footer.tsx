import Link from "next/link"
import { Waves, Github, Twitter, Linkedin, Youtube } from "lucide-react"

const COLS = [
  { title: "Product", links: [{ label: "Features", href: "/#features" }, { label: "Security", href: "/#security" }, { label: "Pricing", href: "/#pricing" }, { label: "Changelog", href: "/register" }, { label: "Roadmap", href: "/register" }] },
  { title: "Company", links: [{ label: "About", href: "/#about" }, { label: "Careers", href: "/register" }, { label: "Press", href: "/register" }, { label: "Contact", href: "/register" }, { label: "Brand", href: "/register" }] },
  { title: "Resources", links: [{ label: "Blog", href: "/register" }, { label: "Guides", href: "/register" }, { label: "Community", href: "/register" }, { label: "Support", href: "/register" }, { label: "Status", href: "/register" }] },
  { title: "Developers", links: [{ label: "Documentation", href: "/register" }, { label: "API Reference", href: "/register" }, { label: "GitHub", href: "/register" }, { label: "SDKs", href: "/register" }, { label: "Webhooks", href: "/register" }] },
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
                { Icon: Twitter, label: "Twitter", href: "https://twitter.com/ripplechat" },
                { Icon: Github, label: "GitHub", href: "https://github.com/ripplechat" },
                { Icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/ripplechat" },
                { Icon: Youtube, label: "YouTube", href: "https://youtube.com/@ripplechat" },
              ].map(({ Icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid h-9 w-9 place-items-center rounded-full glass glass-hover focus-ring">
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
                    <li key={l.label}><Link href={l.href} className="text-fg-muted hover:text-fg">{l.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-fg-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Ripple Chat, Inc. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/login" className="hover:text-fg">Privacy</Link>
            <Link href="/login" className="hover:text-fg">Terms</Link>
            <Link href="/login" className="hover:text-fg">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
