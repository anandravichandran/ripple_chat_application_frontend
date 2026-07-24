"use client"

import { io, type Socket } from "socket.io-client"

let socket: Socket | null = null

export function getSocket(): Socket {
	if (socket) return socket
	const url = process.env.NEXT_PUBLIC_SOCKET_URL ?? ""
	socket = io(url, {
		autoConnect: false,
		reconnection: true,
		reconnectionDelay: 800,
		reconnectionDelayMax: 4000,
		transports: ["websocket"],
		auth: () => ({
			token:
				typeof window !== "undefined"
					? window.localStorage.getItem("ripple.token") ?? ""
					: "",
		}),
	})
	return socket
}

export function disconnectSocket() {
	socket?.disconnect()
	socket = null
}
