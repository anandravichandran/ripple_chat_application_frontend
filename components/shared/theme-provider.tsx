"use client"

import { useEffect } from "react"
import { useThemeStore } from "@/store/theme-store"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const { mode, accent } = useThemeStore()

	useEffect(() => {
		const resolved = mode === "system"
			? (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark")
			: mode
		document.documentElement.setAttribute("data-theme", resolved)
		document.documentElement.style.colorScheme = resolved
	}, [mode])

	useEffect(() => {
		document.documentElement.setAttribute("data-accent", accent)
	}, [accent])

	useEffect(() => {
		const mq = window.matchMedia("(prefers-color-scheme: light)")
		const handler = () => {
			if (mode === "system") {
				document.documentElement.setAttribute("data-theme", mq.matches ? "light" : "dark")
			}
		}
		mq.addEventListener("change", handler)
		return () => mq.removeEventListener("change", handler)
	}, [mode])

	return <>{children}</>
}
