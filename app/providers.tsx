"use client"

import { Toaster } from "sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryProvider } from "@/lib/query-client"
import { SocketInit } from "@/components/shared/socket-init"
import { ThemeProvider } from "@/components/shared/theme-provider"
import { useThemeStore } from "@/store/theme-store"

function ThemedToaster() {
	const mode = useThemeStore((s) => s.mode)
	return (
		<Toaster
			theme={mode === "system" ? undefined : mode}
			position="top-right"
			className="font-sans"
			toastOptions={{
				className:
					"!border !rounded-2xl !shadow-float",
			}}
		/>
	)
}

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryProvider>
			<TooltipProvider delayDuration={200}>
				<ThemeProvider>
					{children}
					<SocketInit />
					<ThemedToaster />
				</ThemeProvider>
			</TooltipProvider>
		</QueryProvider>
	)
}
