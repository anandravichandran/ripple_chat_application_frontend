"use client"

import { create } from "zustand"
import type { Notification } from "@/lib/types"
import { notifications as seed } from "@/lib/mock"

type NotifState = {
	items: Notification[]
	drawerOpen: boolean
	setDrawer: (open: boolean) => void
	markAllRead: () => void
	markRead: (id: string) => void
	remove: (id: string) => void
	unreadCount: () => number
}

export const useNotificationStore = create<NotifState>((set, get) => ({
	items: seed,
	drawerOpen: false,
	setDrawer: (drawerOpen) => set({ drawerOpen }),
	markAllRead: () =>
		set((s) => ({ items: s.items.map((n) => ({ ...n, read: true })) })),
	markRead: (id) =>
		set((s) => ({ items: s.items.map((n) => (n.id === id ? { ...n, read: true } : n)) })),
	remove: (id) => set((s) => ({ items: s.items.filter((n) => n.id !== id) })),
	unreadCount: () => get().items.filter((n) => !n.read).length,
}))
