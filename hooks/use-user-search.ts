"use client"

import { useQuery } from "@tanstack/react-query"
import { users } from "@/lib/mock"

export function useUserSearch(q: string) {
	return useQuery({
		queryKey: ["users", q],
		queryFn: async () => {
			await new Promise((r) => setTimeout(r, 150))
			const n = q.trim().toLowerCase()
			if (!n) return users
			return users.filter(
				(u) =>
					u.name.toLowerCase().includes(n) ||
					u.username.toLowerCase().includes(n) ||
					u.email.toLowerCase().includes(n),
			)
		},
	})
}
