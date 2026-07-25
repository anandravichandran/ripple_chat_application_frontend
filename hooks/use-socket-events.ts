"use client"

import { useEffect, useRef } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { getSocket, connectSocket, disconnectSocket, SOCKET_EVENTS } from "@/lib/socket"
import { useSocketStore } from "@/store/socket-store"
import { useOnlineStore } from "@/store/online-store"
import { useRoomStore } from "@/store/room-store"
import { useAuthStore } from "@/store/auth-store"

export function useSocketEvents() {
	const setStatus = useSocketStore((s) => s.setStatus)
	const setLatency = useSocketStore((s) => s.setLatency)
	const addOnline = useOnlineStore((s) => s.add)
	const removeOnline = useOnlineStore((s) => s.remove)
	const setOnline = useOnlineStore((s) => s.setOnline)
	const setTyping = useRoomStore((s) => s.setTyping)
	const status = useAuthStore((s) => s.status)
	const qc = useQueryClient()
	const heartbeatRef = useRef<number>(0)

	useEffect(() => {
		if (status !== "authenticated") {
			disconnectSocket()
			setStatus("idle")
			return
		}

		setStatus("connecting")
		const socket = connectSocket()
		if (!socket) return

		const onConnect = () => {
			setStatus("connected")
			heartbeatRef.current = Date.now()
		}

		const onDisconnect = (reason: string) => {
			if (reason === "io server disconnect" || reason === "transport close") {
				setStatus("disconnected")
			} else {
				setStatus("reconnecting")
			}
		}

		const onReconnect = () => {
			setStatus("connected")
			heartbeatRef.current = Date.now()
		}

		const onReconnectAttempt = () => setStatus("reconnecting")
		const onConnectError = () => setStatus("disconnected")

		const onHeartbeat = () => {
			setLatency(Date.now() - (heartbeatRef.current || Date.now()))
			socket.emit(SOCKET_EVENTS.HEARTBEAT_ACK)
			heartbeatRef.current = Date.now()
		}

		const onUserOnline = ({ userId }: { userId: string }) => addOnline(userId)
		const onUserOffline = ({ userId }: { userId: string }) => removeOnline(userId)

		const onPresenceSync = ({ onlineIds }: { onlineIds: string[] }) => {
			if (onlineIds) setOnline(onlineIds)
		}

		const onReceiveMessage = () => {
			qc.invalidateQueries({ queryKey: ["messages"] })
			qc.invalidateQueries({ queryKey: ["rooms"] })
		}

		const onMessageEdited = () => qc.invalidateQueries({ queryKey: ["messages"] })
		const onMessageDeleted = () => qc.invalidateQueries({ queryKey: ["messages"] })
		const onMessageDelivered = () => qc.invalidateQueries({ queryKey: ["messages"] })
		const onMessageSeen = () => qc.invalidateQueries({ queryKey: ["messages"] })

		const onRoomCreated = () => qc.invalidateQueries({ queryKey: ["rooms"] })
		const onRoomUpdated = () => qc.invalidateQueries({ queryKey: ["rooms"] })
		const onRoomDeleted = () => qc.invalidateQueries({ queryKey: ["rooms"] })

		const onUserCreated = () => {
			qc.invalidateQueries({ queryKey: ["users"] })
			qc.invalidateQueries({ queryKey: ["admin"] })
		}
		const onUserUpdated = () => {
			qc.invalidateQueries({ queryKey: ["users"] })
			qc.invalidateQueries({ queryKey: ["admin"] })
		}

		const onTyping = ({ roomId, username }: { roomId: string; username: string }) => {
			setTyping(roomId, [username])
		}

		const onStopTyping = ({ roomId }: { roomId: string }) => {
			setTyping(roomId, [])
		}

		const onNotification = () => {
			qc.invalidateQueries({ queryKey: ["notifications"] })
		}

		socket.on(SOCKET_EVENTS.CONNECT, onConnect)
		socket.on(SOCKET_EVENTS.DISCONNECT, onDisconnect)
		socket.on(SOCKET_EVENTS.CONNECT_ERROR, onConnectError)
		socket.io.on("reconnect", onReconnect)
		socket.io.on("reconnect_attempt", onReconnectAttempt)
		socket.io.on("reconnect_error", onConnectError)
		socket.on(SOCKET_EVENTS.HEARTBEAT, onHeartbeat)
		socket.on(SOCKET_EVENTS.USER_ONLINE, onUserOnline)
		socket.on(SOCKET_EVENTS.USER_OFFLINE, onUserOffline)
		socket.on(SOCKET_EVENTS.PRESENCE_SYNC, onPresenceSync)
		socket.on(SOCKET_EVENTS.RECEIVE_MESSAGE, onReceiveMessage)
		socket.on(SOCKET_EVENTS.MESSAGE_EDITED, onMessageEdited)
		socket.on(SOCKET_EVENTS.MESSAGE_DELETED, onMessageDeleted)
		socket.on(SOCKET_EVENTS.MESSAGE_DELIVERED, onMessageDelivered)
		socket.on(SOCKET_EVENTS.MESSAGE_SEEN, onMessageSeen)
		socket.on(SOCKET_EVENTS.ROOM_CREATED, onRoomCreated)
		socket.on(SOCKET_EVENTS.ROOM_UPDATED, onRoomUpdated)
		socket.on(SOCKET_EVENTS.ROOM_DELETED, onRoomDeleted)
		socket.on(SOCKET_EVENTS.USER_CREATED, onUserCreated)
		socket.on(SOCKET_EVENTS.USER_UPDATED, onUserUpdated)
		socket.on(SOCKET_EVENTS.TYPING, onTyping)
		socket.on(SOCKET_EVENTS.STOP_TYPING, onStopTyping)
		socket.on(SOCKET_EVENTS.NOTIFICATION_NEW, onNotification)

		socket.connect()

		return () => {
			socket.off(SOCKET_EVENTS.CONNECT, onConnect)
			socket.off(SOCKET_EVENTS.DISCONNECT, onDisconnect)
			socket.off(SOCKET_EVENTS.CONNECT_ERROR, onConnectError)
			socket.io.off("reconnect", onReconnect)
			socket.io.off("reconnect_attempt", onReconnectAttempt)
			socket.io.off("reconnect_error", onConnectError)
			socket.off(SOCKET_EVENTS.HEARTBEAT, onHeartbeat)
			socket.off(SOCKET_EVENTS.USER_ONLINE, onUserOnline)
			socket.off(SOCKET_EVENTS.USER_OFFLINE, onUserOffline)
			socket.off(SOCKET_EVENTS.PRESENCE_SYNC, onPresenceSync)
			socket.off(SOCKET_EVENTS.RECEIVE_MESSAGE, onReceiveMessage)
			socket.off(SOCKET_EVENTS.MESSAGE_EDITED, onMessageEdited)
			socket.off(SOCKET_EVENTS.MESSAGE_DELETED, onMessageDeleted)
			socket.off(SOCKET_EVENTS.MESSAGE_DELIVERED, onMessageDelivered)
			socket.off(SOCKET_EVENTS.MESSAGE_SEEN, onMessageSeen)
			socket.off(SOCKET_EVENTS.ROOM_CREATED, onRoomCreated)
			socket.off(SOCKET_EVENTS.ROOM_UPDATED, onRoomUpdated)
			socket.off(SOCKET_EVENTS.ROOM_DELETED, onRoomDeleted)
			socket.off(SOCKET_EVENTS.TYPING, onTyping)
			socket.off(SOCKET_EVENTS.STOP_TYPING, onStopTyping)
			socket.off(SOCKET_EVENTS.NOTIFICATION_NEW, onNotification)
		}
	}, [status, setStatus, setLatency, addOnline, removeOnline, setOnline, setTyping, qc])
}
