"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { roomsApi } from "@/lib/api"
import type { Room } from "@/lib/types"

export function useRooms(params?: { q?: string; category?: string; visibility?: string; pinned?: boolean; recentlyJoined?: boolean }) {
	return useQuery({
		queryKey: ["rooms", params],
		queryFn: () => roomsApi.list(params),
		select: (d) => d.rooms,
	})
}

export function useRoom(id: string | undefined) {
	return useQuery({
		queryKey: ["room", id],
		enabled: !!id,
		queryFn: () => roomsApi.get(id!),
	})
}

export function useCreateRoom() {
	const qc = useQueryClient()
	return useMutation({
		mutationFn: (body: Parameters<typeof roomsApi.create>[0]) => roomsApi.create(body),
		onSuccess: () => { qc.invalidateQueries({ queryKey: ["rooms"] }) },
	})
}

export function useJoinRoom() {
	const qc = useQueryClient()
	return useMutation({
		mutationFn: ({ roomId, ...body }: { roomId: string; password?: string; inviteCode?: string }) =>
			roomsApi.join(roomId, body),
		onSuccess: () => { qc.invalidateQueries({ queryKey: ["rooms"] }) },
	})
}

export function useLeaveRoom() {
	const qc = useQueryClient()
	return useMutation({
		mutationFn: (roomId: string) => roomsApi.leave(roomId),
		onSuccess: () => { qc.invalidateQueries({ queryKey: ["rooms"] }) },
	})
}
