"use client"

import { useSocketEvents } from "@/hooks/use-socket-events"

export function SocketInit() {
	useSocketEvents()
	return null
}
