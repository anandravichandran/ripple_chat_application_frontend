import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
})

export const metadata: Metadata = {
	title: "Ripple Chat — Secure. Instant. Connected.",
	description:
		"Ripple Chat is a premium real-time messaging platform for teams. Rooms, DMs, presence, and end-to-end auth.",
	metadataBase: new URL("https://ripple.chat"),
	icons: { icon: "/favicon.ico" },
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" className={inter.variable}>
			<body className="min-h-screen bg-bg-primary font-sans text-text-primary antialiased selection:bg-accent-primary/30 selection:text-white">
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
