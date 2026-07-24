export type UserStatus = "online" | "idle" | "dnd" | "offline"

export interface User {
	id: string
	username: string
	name: string
	email: string
	avatar: string
	status: UserStatus
	bio?: string
	phone?: string
	joinedAt: string
	lastSeen?: string
	socials?: { label: string; url: string }[]
	role?: "user" | "moderator" | "admin"
}

export interface Room {
	id: string
	name: string
	description: string
	icon: string
	visibility: "public" | "private"
	category: string
	members: number
	online: number
	unread: number
	lastMessage: string
	lastAuthor: string
	lastAt: string
	lastActivity?: string
	pinned?: boolean
	recentlyJoined?: boolean
	unreadFromMessageId?: string
	tags?: string[]
}

export type MessageStatus = "sending" | "sent" | "delivered" | "seen" | "error"
export type MessageKind = "text" | "image" | "file" | "voice" | "gif"

export interface Reaction {
	emoji: string
	count: number
	byMe: boolean
}

export interface Message {
	id: string
	authorId: string
	text: string
	at: string
	type?: MessageKind
	status: MessageStatus
	reactions?: Reaction[]
	replyTo?: { author: string; preview: string }
	pinned?: boolean
	edited?: boolean
	fileName?: string
	fileSize?: string
	mentions?: string[]
}

export interface Conversation {
	id: string
	user: User
	lastMessage: string
	lastAt: string
	unread: number
	typing?: boolean
	pinned?: boolean
}

export type NotificationKind =
	| "mention"
	| "message"
	| "reply"
	| "invite"
	| "room"
	| "system"
	| "reaction"
	| "friend"

export interface Notification {
	id: string
	kind: NotificationKind
	title: string
	body: string
	at: string
	read: boolean
	actor?: Pick<User, "id" | "name" | "avatar">
	roomId?: string
}

// Legacy alias kept for any code that imported AppNotification.
export type AppNotification = Notification

export interface Session {
	id: string
	device: string
	type: "desktop" | "mobile" | "tablet"
	location: string
	at: string
	current: boolean
}

export interface AdminUserRow {
	id: string
	name: string
	email: string
	avatar: string
	status: UserStatus
	role: "user" | "moderator" | "admin"
	state: "active" | "suspended" | "invited"
	joined: string
}

export interface SystemLog {
	id: string
	level: "info" | "warn" | "error"
	at: string
	message: string
}
