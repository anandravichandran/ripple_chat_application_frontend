"use client"

import { create } from "zustand"

type OnlineState = {
	onlineIds: Set<string>
	setOnline: (ids: string[]) => void
	add: (id: string) => void
	remove: (id: string) => void
}

export const useOnlineStore = create<OnlineState>((set) => ({
	onlineIds: new Set(["u_me", "u_1", "u_3", "u_6"]),
	setOnline: (ids) => set({ onlineIds: new Set(ids) }),
	add: (id) =>
		set((s) => {
			const next = new Set(s.onlineIds)
			next.add(id)
			return { onlineIds: next }
		}),
	remove: (id) =>
		set((s) => {
			const next = new Set(s.onlineIds)
			next.delete(id)
			return { onlineIds: next }
		}),
}))
