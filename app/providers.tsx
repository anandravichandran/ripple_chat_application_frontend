"use client"

import { Toaster } from "sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryProvider } from "@/lib/query-client"

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryProvider>
			<TooltipProvider delayDuration={200}>
				{children}
				<Toaster
					theme="dark"
					position="top-right"
					className="font-sans"
					toastOptions={{
						className:
							"!bg-[#0F0F10]/95 !border !border-white/[0.08] !text-white !backdrop-blur-xl !rounded-2xl !shadow-float",
					}}
				/>
			</TooltipProvider>
		</QueryProvider>
	)
}
