"use client"

import { useQuery } from "@tanstack/react-query"
import { messagesByRoom } from "@/lib/mock"
import type { Message } from "@/lib/types"

export function useMessages(roomId: string | undefined) {
	return useQuery({
		queryKey: ["messages", roomId],
		enabled: !!roomId,
		queryFn: async (): Promise<Message[]> => {
			await new Promise((r) => setTimeout(r, 300))
			return messagesByRoom[roomId ?? ""] ?? messagesByRoom.r_design
		},
	})
}
