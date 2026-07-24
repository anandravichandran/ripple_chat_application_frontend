"use client"

import { create } from "zustand"

export type SocketConnState =
	| "idle"
	| "connecting"
	| "connected"
	| "reconnecting"
	| "disconnected"

type SocketState = {
	status: SocketConnState
	latencyMs: number | null
	setStatus: (s: SocketConnState) => void
	setLatency: (n: number | null) => void
	reconnect: () => void
}

export const useSocketStore = create<SocketState>((set) => ({
	status: "connected",
	latencyMs: 42,
	setStatus: (status) => set({ status }),
	setLatency: (latencyMs) => set({ latencyMs }),
	reconnect: () => {
		set({ status: "reconnecting" })
		setTimeout(() => set({ status: "connected", latencyMs: 42 }), 1200)
	},
}))
