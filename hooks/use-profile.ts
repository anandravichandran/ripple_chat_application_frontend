"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { usersApi } from "@/lib/api"
import { useAuthStore } from "@/store/auth-store"
import type { User } from "@/lib/types"

export function useProfile() {
	const token = useAuthStore((s) => s.token)
	return useQuery({
		queryKey: ["profile"],
		enabled: !!token,
		queryFn: () => usersApi.getMe(),
	})
}

export function useUpdateProfile() {
	const qc = useQueryClient()
	const setUser = useAuthStore((s) => s.setUser)
	return useMutation({
		mutationFn: (body: Partial<Pick<User, "name" | "bio" | "phone" | "status">>) =>
			usersApi.updateMe(body),
		onSuccess: (data) => {
			setUser(data)
			qc.invalidateQueries({ queryKey: ["profile"] })
		},
	})
}

export function useUpdateAvatar() {
	const qc = useQueryClient()
	const setUser = useAuthStore((s) => s.setUser)
	return useMutation({
		mutationFn: (file: File) => usersApi.updateAvatar(file),
		onSuccess: (data) => {
			setUser(data)
			qc.invalidateQueries({ queryKey: ["profile"] })
		},
	})
}

export function useSessions() {
	return useQuery({
		queryKey: ["sessions"],
		queryFn: () => usersApi.getSessions(),
		select: (d) => d.sessions,
	})
}
