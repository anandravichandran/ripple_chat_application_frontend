"use client"

import { useQuery } from "@tanstack/react-query"
import { usersApi } from "@/lib/api"

export function useUserSearch(q: string) {
	return useQuery({
		queryKey: ["users", q],
		enabled: q.trim().length > 0,
		queryFn: () => usersApi.search(q),
		select: (d) => d.users,
	})
}
