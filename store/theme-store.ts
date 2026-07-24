"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export type ThemeMode = "dark" | "light" | "system"
export type ThemeAccent = "lime" | "aqua" | "violet" | "peach"

type ThemeState = {
	mode: ThemeMode
	theme: ThemeMode // legacy alias
	accent: ThemeAccent
	setMode: (m: ThemeMode) => void
	setTheme: (m: ThemeMode) => void
	setAccent: (a: ThemeAccent) => void
}

export const useThemeStore = create<ThemeState>()(
	persist(
		(set) => ({
			mode: "dark",
			theme: "dark",
			accent: "lime",
			setMode: (mode) => set({ mode, theme: mode }),
			setTheme: (mode) => set({ mode, theme: mode }),
			setAccent: (accent) => set({ accent }),
		}),
		{ name: "ripple.theme" },
	),
)
