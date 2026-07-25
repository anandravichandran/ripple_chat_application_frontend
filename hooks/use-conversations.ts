"use client"

import { useQuery } from "@tanstack/react-query"
import { roomsApi, messagesApi } from "@/lib/api"
import { useAuthStore } from "@/store/auth-store"
import type { Conversation, Message } from "@/lib/types"

export function useConversations() {
  const token = useAuthStore((s) => s.token)
  return useQuery({
    queryKey: ["conversations"],
    enabled: !!token,
    queryFn: async () => {
      const { rooms } = await roomsApi.list({ isDirect: "true", limit: 50 })
      return rooms.map(
        (r): Conversation => ({
          id: r.id,
          user: {
            id: r.id,
            username: r.name.toLowerCase().replace(/\s+/g, "."),
            name: r.name,
            email: "",
            avatar: r.icon || r.name.charAt(0).toUpperCase(),
            status: "offline",
            joinedAt: r.lastAt,
            lastSeen: r.lastAt,
          },
          lastMessage: r.lastMessage,
          lastAt: r.lastAt,
          unread: r.unread,
          pinned: r.pinned,
        }),
      )
    },
  })
}

export function useDmMessages(roomId: string) {
  const token = useAuthStore((s) => s.token)
  return useQuery({
    queryKey: ["dm-messages", roomId],
    enabled: !!token && !!roomId,
    queryFn: async () => {
      const { messages } = await messagesApi.list(roomId, { limit: 100 })
      return messages
    },
  })
}

export function useDmRoom(roomId: string) {
  const token = useAuthStore((s) => s.token)
  return useQuery({
    queryKey: ["dm-room", roomId],
    enabled: !!token && !!roomId,
    queryFn: () => roomsApi.get(roomId),
  })
}
