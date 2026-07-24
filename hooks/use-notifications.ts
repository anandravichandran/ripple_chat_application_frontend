"use client"

import { useQuery } from "@tanstack/react-query"
import { notifications } from "@/lib/mock"

export function useNotifications() {
	return useQuery({
		queryKey: ["notifications"],
		queryFn: async () => {
			await new Promise((r) => setTimeout(r, 250))
			return notifications
		},
	})
}
