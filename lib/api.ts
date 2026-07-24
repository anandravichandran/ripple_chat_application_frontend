import axios from "axios"
import type { User, Room, Message, MessageKind, Notification, Session, UserStatus } from "./types"

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL ?? "/api",
	withCredentials: true,
	timeout: 20000,
})

// ---- 401 refresh interceptor ----
let isRefreshing = false
let failedQueue: Array<{ resolve: (t: string) => void; reject: (e: unknown) => void }> = []

function processQueue(error: unknown, token: string | null = null) {
	failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token!)))
	failedQueue = []
}

api.interceptors.request.use((config) => {
	if (typeof window !== "undefined") {
		const token = localStorage.getItem("ripple.token")
		if (token) config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

api.interceptors.response.use(
	(r) => r,
	async (error) => {
		const req = error?.config
		if (error?.response?.status !== 401 || req?._retry || typeof window === "undefined") {
			return Promise.reject(error)
		}
		if (isRefreshing) {
			return new Promise<string>((resolve, reject) => {
				failedQueue.push({ resolve, reject })
			}).then((token) => {
				req.headers.Authorization = `Bearer ${token}`
				return api(req)
			})
		}
		req._retry = true
		isRefreshing = true
		try {
			const { data } = await api.post("/auth/refresh")
			const newToken = data.data.accessToken
			localStorage.setItem("ripple.token", newToken)
			document.cookie = `ripple.token=${newToken};path=/;max-age=86400;SameSite=Lax`
			processQueue(null, newToken)
			req.headers.Authorization = `Bearer ${newToken}`
			return api(req)
		} catch (err) {
			processQueue(err, null)
			localStorage.removeItem("ripple.token")
			document.cookie = "ripple.token=;path=/;max-age=0"
			window.location.href = "/login"
			return Promise.reject(err)
		} finally {
			isRefreshing = false
		}
	},
)

// ---- type helpers ----
type BackendUser = {
	id: string; name: string; username: string; email: string; avatarUrl: string | null
	bio: string | null; phone: string | null; socials: Record<string, string> | null
	role: "USER" | "MODERATOR" | "ADMIN"; status: "ONLINE" | "IDLE" | "DND" | "OFFLINE"
	isVerified: boolean; lastSeen: string; lastLoginAt: string | null; createdAt: string
}

type BackendRoomItem = {
	id: string; name: string; icon: string | null; description: string | null
	category: string | null; visibility: "PUBLIC" | "PRIVATE"; isDirect: boolean
	members: number; unread: number; pinned: boolean; recentlyJoined: boolean
	role: "OWNER" | "MODERATOR" | "MEMBER" | null
	lastMessage: string | null; lastAuthor: string | null; lastActivity: string | null
	createdAt: string
}

type BackendMessage = {
	id: string; text: string | null; type: "TEXT" | "IMAGE" | "FILE" | "SYSTEM"
	createdAt: string; edited: boolean; editedAt: string | null
	deliveredAt: string | null; seenAt: string | null
	pinned: boolean; deletedAt: string | null
	author: { id: string; name: string; username: string; avatarUrl: string | null }
	attachments: Array<{ id: string; url: string; fileName: string; fileType: string; fileSize: number }>
	reactions: Array<{ emoji: string; user: { id: string; name: string } }>
	replyTo: { id: string; text: string | null; author: { id: string; name: string } } | null
}

type BackendNotification = {
	id: string; kind: string; title: string; body: string | null
	read: boolean; createdAt: string
	actor: { id: string; name: string; avatarUrl: string | null } | null
	roomId: string | null; messageId: string | null
}

type BackendSession = {
	id: string; ip: string | null; userAgent: string | null; lastActiveAt: string
	createdAt: string; current: boolean; device: { id: string; type: string; name: string | null } | null
}

type PaginatedMeta = { total: number; page: number; limit: number; totalPages: number; hasNextPage: boolean }

// ---- mappers ----
function toUser(b: BackendUser): User {
	return {
		id: b.id, name: b.name, username: b.username, email: b.email,
		avatar: b.avatarUrl ?? "", bio: b.bio ?? undefined, phone: b.phone ?? undefined,
		status: b.status.toLowerCase() as UserStatus,
		role: b.role.toLowerCase() as User["role"],
		joinedAt: b.createdAt, lastSeen: b.lastSeen,
		socials: b.socials ? Object.entries(b.socials).map(([label, url]) => ({ label, url })) : undefined,
	}
}

function toRoom(b: BackendRoomItem): Room {
	return {
		id: b.id, name: b.name, icon: b.icon ?? "", description: b.description ?? "",
		category: b.category ?? "", visibility: b.visibility.toLowerCase() as "public" | "private",
		members: b.members, online: 0, unread: b.unread,
		lastMessage: b.lastMessage ?? "", lastAuthor: b.lastAuthor ?? "", lastAt: b.lastActivity ?? b.createdAt,
		pinned: b.pinned, recentlyJoined: b.recentlyJoined,
	}
}

function toMessage(b: BackendMessage): Message {
	const kindMap: Record<string, MessageKind> = { TEXT: "text", IMAGE: "image", FILE: "file", SYSTEM: "text" }
	return {
		id: b.id, authorId: b.author.id, text: b.text ?? "", at: b.createdAt,
		type: kindMap[b.type] ?? "text", status: b.deliveredAt ? "delivered" : "sent",
		pinned: b.pinned, edited: b.edited, mentions: [],
		reactions: b.reactions.map((r) => ({ emoji: r.emoji, count: 1, byMe: false })),
		replyTo: b.replyTo ? { author: b.replyTo.author.name, preview: b.replyTo.text ?? "" } : undefined,
	}
}

function toNotification(b: BackendNotification): Notification {
	return {
		id: b.id, kind: b.kind.toLowerCase() as Notification["kind"],
		title: b.title, body: b.body ?? "", at: b.createdAt, read: b.read,
		actor: b.actor ? { id: b.actor.id, name: b.actor.name, avatar: b.actor.avatarUrl ?? "" } : undefined,
		roomId: b.roomId ?? undefined,
	}
}

function toSession(b: BackendSession): Session {
	return {
		id: b.id, device: b.device?.name ?? b.userAgent ?? "Unknown",
		type: (b.device?.type?.toLowerCase() ?? "desktop") as Session["type"],
		location: b.ip ?? "", at: b.lastActiveAt, current: b.current,
	}
}

function extractData<T>(response: { data: { success: boolean; data: T } }): T {
	return response.data.data
}

// ---- Auth API ----
export const authApi = {
	register: (body: { name: string; username: string; email: string; password: string }) =>
		api.post("/auth/register", body).then(extractData<{ id: string; email: string; username: string }>),

	verifyEmail: (email: string, code: string) =>
		api.post("/auth/verify-email", { email, code }).then(extractData<{ verified: boolean }>),

	resendOtp: (email: string) =>
		api.post("/auth/resend-otp", { email }).then(extractData<{ sent: boolean }>),

	login: (email: string, password: string) =>
		api.post("/auth/login", { email, password }).then((res) => {
			const { user, accessToken } = extractData<{ user: BackendUser; accessToken: string }>(res)
			return { user: toUser(user), accessToken }
		}),

	refresh: () =>
		api.post("/auth/refresh").then((res) => {
			const { user, accessToken } = extractData<{ user: BackendUser; accessToken: string }>(res)
			return { user: toUser(user), accessToken }
		}),

	logout: () => api.post("/auth/logout").then(extractData<{ loggedOut: boolean }>),

	forgotPassword: (email: string) =>
		api.post("/auth/forgot-password", { email }).then(extractData<{ sent: boolean }>),

	resetPassword: (token: string, password: string) =>
		api.post("/auth/reset-password", { token, password }).then(extractData<{ reset: boolean }>),
}

// ---- Users API ----
export const usersApi = {
	getMe: () => api.get("/users/me").then((res) => toUser(extractData<BackendUser>(res))),

	updateMe: (body: Partial<Pick<User, "name" | "bio" | "phone" | "status">>) =>
		api.patch("/users/me", body).then((res) => toUser(extractData<BackendUser>(res))),

	updateAvatar: (file: File) => {
		const fd = new FormData()
		fd.append("avatar", file)
		return api.patch("/users/avatar", fd).then((res) => toUser(extractData<BackendUser>(res)))
	},

	search: (q: string, page = 1, limit = 20) =>
		api.get("/users/search", { params: { q, page, limit } }).then((res) => {
			const d = extractData<{ items: BackendUser[]; meta: PaginatedMeta }>(res)
			return { users: d.items.map(toUser), meta: d.meta }
		}),

	getSessions: () =>
		api.get("/users/me/sessions").then((res) => {
			const d = extractData<{ sessions: BackendSession[] }>(res)
			return { sessions: d.sessions.map(toSession) }
		}),
}

// ---- Rooms API ----
export const roomsApi = {
	create: (body: { name: string; description?: string; icon?: string; category?: string; visibility?: string; password?: string }) =>
		api.post("/rooms", body).then(extractData),

	list: (params?: { q?: string; category?: string; visibility?: string; pinned?: boolean; recentlyJoined?: boolean; page?: number; limit?: number }) =>
		api.get("/rooms", { params }).then((res) => {
			const d = extractData<{ items: BackendRoomItem[]; meta: PaginatedMeta }>(res)
			return { rooms: d.items.map(toRoom), meta: d.meta }
		}),

	get: (id: string): Promise<Record<string, unknown>> =>
		api.get(`/rooms/${id}`).then((r) => r.data.data as Record<string, unknown>),

	update: (id: string, body: Record<string, unknown>) =>
		api.patch(`/rooms/${id}`, body).then(extractData),

	delete: (id: string) =>
		api.delete(`/rooms/${id}`).then(extractData),

	join: (id: string, body?: { password?: string; inviteCode?: string }) =>
		api.post(`/rooms/${id}/join`, body ?? {}).then(extractData),

	leave: (id: string) =>
		api.post(`/rooms/${id}/leave`).then(extractData),
}

// ---- Messages API ----
export const messagesApi = {
	list: (roomId: string, params?: { cursor?: string; limit?: number; q?: string }) =>
		api.get(`/rooms/${roomId}/messages`, { params }).then((res) => {
			const d = extractData<{ items: BackendMessage[]; nextCursor: string | null }>(res)
			return { messages: d.items.map(toMessage), nextCursor: d.nextCursor }
		}),

	create: (roomId: string, body: { text?: string; type?: string; replyToId?: string; mentions?: string[] }) =>
		api.post(`/rooms/${roomId}/messages`, body).then(extractData),

	pinned: (roomId: string) =>
		api.get(`/rooms/${roomId}/messages/pinned`).then((res) => {
			const d = extractData<{ items: BackendMessage[] }>(res)
			return d.items.map(toMessage)
		}),

	uploadAttachment: (roomId: string, file: File) => {
		const fd = new FormData()
		fd.append("file", file)
		return api.post(`/rooms/${roomId}/messages/attachments`, fd).then(extractData)
	},

	edit: (id: string, body: { text?: string; pinned?: boolean }) =>
		api.patch(`/messages/${id}`, body).then(extractData),

	delete: (id: string) =>
		api.delete(`/messages/${id}`).then(extractData),

	react: (id: string, emoji: string) =>
		api.post(`/messages/${id}/reactions`, { emoji }).then(extractData),

	markDelivered: (id: string) =>
		api.post(`/messages/${id}/delivered`).then(extractData),
}

// ---- Notifications API ----
export const notificationsApi = {
	list: (params?: { filter?: string; page?: number; limit?: number }) =>
		api.get("/notifications", { params }).then((res) => {
			const d = extractData<{ items: BackendNotification[]; unreadCount: number; meta: PaginatedMeta }>(res)
			return { notifications: d.items.map(toNotification), unreadCount: d.unreadCount, meta: d.meta }
		}),

	markAllRead: () =>
		api.patch("/notifications/read-all").then(extractData<{ read: boolean }>),

	markRead: (id: string) =>
		api.patch(`/notifications/${id}/read`).then(extractData),

	delete: (id: string) =>
		api.delete(`/notifications/${id}`).then(extractData),
}

// ---- Health ----
export const healthApi = {
	check: () => api.get("/health").then(extractData),
}
