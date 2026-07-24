"use client"

import { useEffect } from "react"
import { getSocket } from "@/lib/socket"
import { useSocketStore } from "@/store/socket-store"

// Optional: opt-in wiring to a real socket.io server via NEXT_PUBLIC_SOCKET_URL.
// Safe no-op if no URL is provided.
export function useSocketEvents() {
	const setStatus = useSocketStore((s) => s.setStatus)
	useEffect(() => {
		if (!process.env.NEXT_PUBLIC_SOCKET_URL) return
		const s = getSocket()
		s.on("connect", () => setStatus("connected"))
		s.on("disconnect", () => setStatus("disconnected"))
		s.io.on("reconnect_attempt", () => setStatus("reconnecting"))
		setStatus("connecting")
		s.connect()
		return () => {
			s.off("connect")
			s.off("disconnect")
			s.io.off("reconnect_attempt")
		}
	}, [setStatus])
}
