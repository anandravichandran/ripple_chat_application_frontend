import type { Metadata, Viewport } from "next"
import { Inter, Plus_Jakarta_Sans } from "next/font/google"
import { Providers } from "./providers"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" })

export const metadata: Metadata = {
  title: "Ripple Chat — Secure. Instant. Connected.",
  description:
    "Ripple Chat is a real-time messaging platform for modern teams. Secure room-based chat, live presence, typing indicators, read receipts, and encrypted authentication.",
  keywords: ["real-time chat", "team messaging", "secure chat", "SaaS", "collaboration"],
  openGraph: {
    title: "Ripple Chat — Secure. Instant. Connected.",
    description: "Real-time conversations built for modern teams.",
    type: "website",
  },
}

export const viewport: Viewport = { themeColor: "#0A0A0A", width: "device-width", initialScale: 1 }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="min-h-screen bg-bg text-fg antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
