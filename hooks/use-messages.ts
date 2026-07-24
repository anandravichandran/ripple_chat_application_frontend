"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { messagesApi } from "@/lib/api"

export function useMessages(roomId: string | undefined) {
	return useQuery({
		queryKey: ["messages", roomId],
		enabled: !!roomId,
		queryFn: () => messagesApi.list(roomId!),
		select: (d) => d.messages,
	})
}

export function useSendMessage(roomId: string) {
	const qc = useQueryClient()
	return useMutation({
		mutationFn: (body: { text?: string; type?: string; replyToId?: string; mentions?: string[] }) =>
			messagesApi.create(roomId, body),
		onSuccess: () => { qc.invalidateQueries({ queryKey: ["messages", roomId] }) },
	})
}

export function useEditMessage() {
	const qc = useQueryClient()
	return useMutation({
		mutationFn: ({ id, ...body }: { id: string; text?: string; pinned?: boolean }) =>
			messagesApi.edit(id, body),
		onSuccess: () => { qc.invalidateQueries({ queryKey: ["messages"] }) },
	})
}

export function useDeleteMessage() {
	const qc = useQueryClient()
	return useMutation({
		mutationFn: (id: string) => messagesApi.delete(id),
		onSuccess: () => { qc.invalidateQueries({ queryKey: ["messages"] }) },
	})
}

export function useReactToMessage() {
	const qc = useQueryClient()
	return useMutation({
		mutationFn: ({ id, emoji }: { id: string; emoji: string }) => messagesApi.react(id, emoji),
		onSuccess: () => { qc.invalidateQueries({ queryKey: ["messages"] }) },
	})
}
