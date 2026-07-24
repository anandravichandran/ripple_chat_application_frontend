"use client"

import { useQuery } from "@tanstack/react-query"
import { currentUser } from "@/lib/mock"

export function useProfile() {
	return useQuery({
		queryKey: ["profile"],
		queryFn: async () => {
			await new Promise((r) => setTimeout(r, 200))
			return currentUser
		},
	})
}
