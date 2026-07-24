"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu, X, Waves } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NAV_LINKS } from "@/lib/data"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-1.5 focus:text-bg">Skip to content</a>
      <div className={cn("mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all", scrolled ? "glass shadow-glass" : "bg-transparent")}>
        <Link href="/" aria-label="Ripple Chat home" className="flex items-center gap-2 focus-ring">
          <span className="grid h-8 w-8 place-items-center rounded-xl accent-gradient text-bg"><Waves className="h-4 w-4" /></span>
          <span className="font-display text-[17px] font-semibold tracking-tight">Ripple Chat</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-full px-3.5 py-2 text-sm text-fg-muted transition-colors hover:text-fg focus-ring">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="ghost" size="sm"><Link href="/login">Login</Link></Button>
          <Button asChild size="sm"><Link href="/register">Get Started</Link></Button>
        </div>

        <button aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((v) => !v)} className="grid h-10 w-10 place-items-center rounded-xl glass md:hidden focus-ring">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="mx-auto mt-2 max-w-6xl md:hidden">
          <div className="glass mx-4 rounded-2xl p-4">
            <nav aria-label="Mobile" className="flex flex-col">
              {NAV_LINKS.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-2.5 text-sm text-fg-muted hover:bg-white/5 hover:text-fg">
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="mt-3 flex gap-2">
              <Button asChild variant="ghost" className="flex-1"><Link href="/login">Login</Link></Button>
              <Button asChild className="flex-1"><Link href="/register">Get Started</Link></Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
