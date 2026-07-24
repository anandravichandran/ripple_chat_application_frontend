"use client"

import { useQuery } from "@tanstack/react-query"
import { rooms } from "@/lib/mock"
import type { Room } from "@/lib/types"

async function fetchRooms(): Promise<Room[]> {
	await new Promise((r) => setTimeout(r, 350))
	return rooms
}

export function useRooms() {
	return useQuery({ queryKey: ["rooms"], queryFn: fetchRooms })
}

export function useRoom(id: string | undefined) {
	return useQuery({
		queryKey: ["room", id],
		enabled: !!id,
		queryFn: async () => {
			await new Promise((r) => setTimeout(r, 200))
			return rooms.find((r) => r.id === id) ?? null
		},
	})
}
