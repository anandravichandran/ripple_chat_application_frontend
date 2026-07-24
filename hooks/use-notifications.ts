"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { notificationsApi } from "@/lib/api"

export function useNotifications(params?: { filter?: string; page?: number }) {
	return useQuery({
		queryKey: ["notifications", params],
		queryFn: () => notificationsApi.list(params),
	})
}

export function useMarkNotificationRead() {
	const qc = useQueryClient()
	return useMutation({
		mutationFn: (id: string) => notificationsApi.markRead(id),
		onSuccess: () => { qc.invalidateQueries({ queryKey: ["notifications"] }) },
	})
}

export function useMarkAllNotificationsRead() {
	const qc = useQueryClient()
	return useMutation({
		mutationFn: () => notificationsApi.markAllRead(),
		onSuccess: () => { qc.invalidateQueries({ queryKey: ["notifications"] }) },
	})
}
