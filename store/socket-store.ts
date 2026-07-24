"use client"

import { create } from "zustand"

export type SocketConnState = "idle" | "connecting" | "connected" | "reconnecting" | "disconnected"

type SocketState = {
	status: SocketConnState
	latencyMs: number | null
	setStatus: (s: SocketConnState) => void
	setLatency: (n: number | null) => void
}

export const useSocketStore = create<SocketState>((set) => ({
	status: "idle",
	latencyMs: null,
	setStatus: (status) => set({ status }),
	setLatency: (latencyMs) => set({ latencyMs }),
}))
