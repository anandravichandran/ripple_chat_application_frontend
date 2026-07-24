"use client"

import { create } from "zustand"

type RoomState = {
	currentRoomId: string | null
	typingByRoom: Record<string, string[]>
	setCurrentRoom: (id: string | null) => void
	setTyping: (roomId: string, users: string[]) => void
}

export const useRoomStore = create<RoomState>((set) => ({
	currentRoomId: null,
	typingByRoom: {},
	setCurrentRoom: (currentRoomId) => set({ currentRoomId }),
	setTyping: (roomId, users) =>
		set((s) => ({ typingByRoom: { ...s.typingByRoom, [roomId]: users } })),
}))
