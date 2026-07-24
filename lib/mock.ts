import type {
	AdminUserRow,
	Conversation,
	Message,
	Notification,
	Room,
	Session,
	SystemLog,
	User,
} from "./types"

const hoursAgo = (h: number) => new Date(Date.now() - h * 60 * 60 * 1000).toISOString()
const minutesAgo = (m: number) => new Date(Date.now() - m * 60 * 1000).toISOString()
const daysAgo = (d: number) => new Date(Date.now() - d * 86400000).toISOString()

export const currentUser: User = {
	id: "u_me",
	username: "anand",
	name: "Anand Ravichandran",
	email: "anand@ripple.chat",
	avatar: "AR",
	status: "online",
	bio: "Building Ripple Chat. Coffee, code, and calm rooms.",
	phone: "+91 98765 43210",
	joinedAt: "2025-11-02",
	lastSeen: "just now",
	socials: [
		{ label: "Twitter", url: "https://twitter.com/ripplechat" },
		{ label: "GitHub", url: "https://github.com/ripplechat" },
	],
	role: "admin",
}

export const users: User[] = [
	currentUser,
	{ id: "u_1", username: "maya.k", name: "Maya Kapoor", email: "maya@ripple.chat", avatar: "MK", status: "online", joinedAt: "2025-08-14", lastSeen: "2m ago", role: "admin" },
	{ id: "u_2", username: "leo.t", name: "Leo Tanaka", email: "leo@ripple.chat", avatar: "LT", status: "idle", joinedAt: "2025-02-01", lastSeen: "14m ago", role: "user" },
	{ id: "u_3", username: "sana.a", name: "Sana Ahmed", email: "sana@ripple.chat", avatar: "SA", status: "online", joinedAt: "2024-11-11", lastSeen: "just now", role: "moderator" },
	{ id: "u_4", username: "noah.f", name: "Noah Fischer", email: "noah@ripple.chat", avatar: "NF", status: "dnd", joinedAt: "2025-04-05", lastSeen: "1h ago", role: "user" },
	{ id: "u_5", username: "ivy.p", name: "Ivy Park", email: "ivy@ripple.chat", avatar: "IP", status: "offline", joinedAt: "2025-06-19", lastSeen: "yesterday", role: "user" },
	{ id: "u_6", username: "kenji.o", name: "Kenji Ohara", email: "kenji@ripple.chat", avatar: "KO", status: "online", joinedAt: "2025-09-30", lastSeen: "5m ago", role: "user" },
	{ id: "u_7", username: "priya.s", name: "Priya Shah", email: "priya@ripple.chat", avatar: "PS", status: "online", joinedAt: "2025-05-20", lastSeen: "just now", role: "user" },
]

export const rooms: Room[] = [
	{ id: "r_design", name: "Design Systems", description: "Tokens, components, motion, everything craft.", icon: "🎨", visibility: "public", category: "Design", members: 248, online: 42, unread: 3, lastMessage: "shipped the new radius scale ✨", lastAuthor: "Maya", lastAt: "2m", pinned: true, tags: ["design", "tokens"], unreadFromMessageId: "m5" },
	{ id: "r_eng", name: "Engineering", description: "Realtime infra, sockets, and shipping.", icon: "⚙️", visibility: "public", category: "Engineering", members: 512, online: 88, unread: 12, lastMessage: "reconnect logic looking clean", lastAuthor: "Leo", lastAt: "just now", pinned: true, tags: ["eng"] },
	{ id: "r_product", name: "Product", description: "Roadmap, launches, customer stories.", icon: "🚀", visibility: "private", category: "Product", members: 34, online: 7, unread: 0, lastMessage: "draft of the Q3 review is up", lastAuthor: "Sana", lastAt: "18m", tags: ["product"] },
	{ id: "r_ideas", name: "Ideas", description: "Half-baked thoughts, welcome.", icon: "💡", visibility: "public", category: "General", members: 129, online: 21, unread: 1, lastMessage: "what if presence was ambient?", lastAuthor: "Noah", lastAt: "1h", recentlyJoined: true, tags: ["ideas"] },
	{ id: "r_random", name: "Random", description: "Off-topic, memes, and Friday demos.", icon: "🎲", visibility: "public", category: "Social", members: 640, online: 96, unread: 27, lastMessage: "this coffee setup is unreal ☕", lastAuthor: "Kenji", lastAt: "3m", tags: ["random"] },
	{ id: "r_support", name: "Support", description: "Help each other. Kindness first.", icon: "🛟", visibility: "public", category: "Support", members: 210, online: 18, unread: 4, lastMessage: "fixed! thanks for the walkthrough", lastAuthor: "Ivy", lastAt: "25m", recentlyJoined: true, tags: ["support"] },
	{ id: "r_launch", name: "Launch War Room", description: "Ripple 2.0 launch coordination.", icon: "🎯", visibility: "private", category: "Product", members: 12, online: 5, unread: 0, lastMessage: "final asset review moved to 3pm", lastAuthor: "Anand", lastAt: "2h", tags: ["launch"] },
	{ id: "r_music", name: "Music Club", description: "Sharing playlists between deep-work blocks.", icon: "🎧", visibility: "public", category: "Social", members: 87, online: 12, unread: 0, lastMessage: "new focus mix — 2 hours of ambient", lastAuthor: "Priya", lastAt: "4h", tags: ["music"] },
]

function buildMessages(roomId: string, seed: Omit<Message, "id">[]): Message[] {
	return seed.map((m, i) => ({ ...m, id: `${roomId}_m${i + 1}` }))
}

export const messagesByRoom: Record<string, Message[]> = {
	r_design: buildMessages("r_design", [
		{ authorId: "u_1", text: "Rolled the new radius scale into tokens. 24 for cards, 16 for inputs, 999 for pills.", at: hoursAgo(4), status: "seen", reactions: [{ emoji: "✨", count: 4, byMe: true }, { emoji: "🔥", count: 2, byMe: false }] },
		{ authorId: "u_3", text: "Loving the softer shadows too. Feels much more premium.", at: hoursAgo(3), status: "seen" },
		{ authorId: "u_me", text: "Pushed a Figma library update — @maya.k mind reviewing the motion specs?", at: hoursAgo(2), status: "seen", mentions: ["maya.k"] },
		{ authorId: "u_1", text: "On it — the stagger timings look great. Small nudge on the hero fade.", at: hoursAgo(1), status: "seen", replyTo: { author: "Anand", preview: "Pushed a Figma library update…" } },
		{ authorId: "u_6", text: "Attaching the audit — 42 components mapped.", at: minutesAgo(24), status: "seen", type: "file", fileName: "design-audit-v3.pdf", fileSize: "2.4 MB", pinned: true },
		{ authorId: "u_3", text: "Perfect timing 🙌 I'll share tomorrow's review agenda by EOD.", at: minutesAgo(12), status: "delivered" },
		{ authorId: "u_1", text: "shipped the new radius scale ✨", at: minutesAgo(2), status: "sent" },
	]),
	r_eng: buildMessages("r_eng", [
		{ authorId: "u_2", text: "Rewrote the reconnect back-off — capped at 8s with jitter.", at: hoursAgo(5), status: "seen" },
		{ authorId: "u_4", text: "Nice. Any impact on the socket heartbeat?", at: hoursAgo(4), status: "seen" },
		{ authorId: "u_2", text: "Slightly earlier ping. p95 latency down 40ms.", at: hoursAgo(3), status: "seen", reactions: [{ emoji: "🚀", count: 3, byMe: false }] },
		{ authorId: "u_me", text: "Let's canary this to 10% behind a flag.", at: hoursAgo(2), status: "seen" },
		{ authorId: "u_2", text: "reconnect logic looking clean", at: minutesAgo(1), status: "sent" },
	]),
	r_product: buildMessages("r_product", [
		{ authorId: "u_3", text: "Kicked off the Q3 review doc. Draft link in the thread.", at: hoursAgo(6), status: "seen" },
		{ authorId: "u_me", text: "Reviewing tonight. Add me as an editor?", at: hoursAgo(5), status: "seen" },
		{ authorId: "u_3", text: "draft of the Q3 review is up", at: minutesAgo(18), status: "delivered" },
	]),
	r_ideas: buildMessages("r_ideas", [
		{ authorId: "u_4", text: "what if presence was ambient?", at: hoursAgo(1), status: "seen" },
		{ authorId: "u_me", text: "Love it. Subtle glow around avatars, no explicit dot.", at: minutesAgo(38), status: "seen" },
	]),
	r_random: buildMessages("r_random", [
		{ authorId: "u_6", text: "this coffee setup is unreal ☕", at: minutesAgo(3), status: "delivered", type: "image" },
		{ authorId: "u_7", text: "Recipe or it didn't happen 😄", at: minutesAgo(2), status: "sent" },
	]),
	r_support: buildMessages("r_support", [
		{ authorId: "u_5", text: "Not sure why my messages weren't sending — turned out to be a VPN issue.", at: hoursAgo(1), status: "seen" },
		{ authorId: "u_3", text: "Yep, corporate proxies sometimes eat WebSocket upgrades. Glad it's fixed.", at: minutesAgo(40), status: "seen" },
		{ authorId: "u_5", text: "fixed! thanks for the walkthrough", at: minutesAgo(25), status: "delivered" },
	]),
	r_launch: buildMessages("r_launch", [
		{ authorId: "u_me", text: "final asset review moved to 3pm", at: hoursAgo(2), status: "seen" },
	]),
	r_music: buildMessages("r_music", [
		{ authorId: "u_7", text: "new focus mix — 2 hours of ambient", at: hoursAgo(4), status: "seen" },
	]),
}

// DM seed messages, keyed by conversation id.
export const dmMessages: Record<string, Message[]> = {
	c_1: buildMessages("c_1", [
		{ authorId: "u_1", text: "Hey! Do you have a minute to look at the motion spec?", at: hoursAgo(1), status: "seen" },
		{ authorId: "u_me", text: "Sure, drop it in.", at: minutesAgo(40), status: "seen" },
		{ authorId: "u_1", text: "Sharing the motion spec now", at: minutesAgo(2), status: "delivered" },
	]),
	c_2: buildMessages("c_2", [
		{ authorId: "u_4", text: "Ready for the sync at 4?", at: hoursAgo(1), status: "seen" },
		{ authorId: "u_me", text: "Perfect — see you at 4.", at: minutesAgo(18), status: "seen" },
	]),
	c_3: buildMessages("c_3", [
		{ authorId: "u_me", text: "pushed a fix on reconnect", at: hoursAgo(1), status: "seen" },
		{ authorId: "u_3", text: "Awesome, testing on staging now.", at: minutesAgo(50), status: "seen" },
	]),
	c_4: buildMessages("c_4", [
		{ authorId: "u_6", text: "Coffee ☕ later?", at: hoursAgo(3), status: "delivered" },
	]),
	c_5: buildMessages("c_5", [
		{ authorId: "u_5", text: "Thanks for the walkthrough 🙏", at: daysAgo(1), status: "seen" },
	]),
}

export const conversations: Conversation[] = [
	{ id: "c_1", user: users[1], lastMessage: "Sharing the motion spec now", lastAt: "2m", unread: 2, typing: true, pinned: true },
	{ id: "c_2", user: users[3], lastMessage: "Perfect — see you at 4.", lastAt: "18m", unread: 0 },
	{ id: "c_3", user: users[2], lastMessage: "You: pushed a fix on reconnect", lastAt: "1h", unread: 0 },
	{ id: "c_4", user: users[5], lastMessage: "Coffee ☕ later?", lastAt: "3h", unread: 1 },
	{ id: "c_5", user: users[4], lastMessage: "Thanks for the walkthrough 🙏", lastAt: "yesterday", unread: 0 },
]

export const notifications: Notification[] = [
	{ id: "n1", kind: "mention", title: "Maya Kapoor mentioned you", body: "in #design-systems — 'nudge on the hero fade'", at: minutesAgo(4), read: false, actor: { id: "u_1", name: "Maya Kapoor", avatar: "MK" }, roomId: "r_design" },
	{ id: "n2", kind: "reply", title: "Sana Ahmed replied to your thread", body: "'Loving the softer shadows too.'", at: hoursAgo(2), read: false, actor: { id: "u_3", name: "Sana Ahmed", avatar: "SA" } },
	{ id: "n3", kind: "message", title: "New message from Leo Tanaka", body: "'reconnect logic looking clean'", at: hoursAgo(3), read: false, actor: { id: "u_2", name: "Leo Tanaka", avatar: "LT" }, roomId: "r_eng" },
	{ id: "n4", kind: "invite", title: "You were invited to Product", body: "Private room · 34 members", at: hoursAgo(6), read: true, roomId: "r_product" },
	{ id: "n5", kind: "reaction", title: "Kenji Ohara reacted 🔥", body: "to your message in #engineering", at: hoursAgo(10), read: true, actor: { id: "u_6", name: "Kenji Ohara", avatar: "KO" } },
	{ id: "n6", kind: "room", title: "Ivy Park joined Support", body: "Say hi in #support.", at: daysAgo(1), read: true, actor: { id: "u_5", name: "Ivy Park", avatar: "IP" }, roomId: "r_support" },
	{ id: "n7", kind: "system", title: "New device signed in", body: "MacBook Pro · Bengaluru, IN", at: daysAgo(1), read: true },
	{ id: "n8", kind: "friend", title: "Ivy Park sent a friend request", body: "Accept to start chatting.", at: daysAgo(2), read: false, actor: { id: "u_5", name: "Ivy Park", avatar: "IP" } },
	{ id: "n9", kind: "mention", title: "Priya Shah mentioned you", body: "in #music-club — 'you'd love this playlist'", at: daysAgo(3), read: true, actor: { id: "u_7", name: "Priya Shah", avatar: "PS" }, roomId: "r_music" },
	{ id: "n10", kind: "message", title: "3 unread messages in Random", body: "Latest from Kenji Ohara.", at: daysAgo(5), read: true, actor: { id: "u_6", name: "Kenji Ohara", avatar: "KO" }, roomId: "r_random" },
]

export const sessions: Session[] = [
	{ id: "s1", device: "MacBook Pro 14”", type: "desktop", location: "Bengaluru, IN", at: "Active now", current: true },
	{ id: "s2", device: "iPhone 15 Pro", type: "mobile", location: "Bengaluru, IN", at: "2h ago", current: false },
	{ id: "s3", device: "Windows Desktop (Edge)", type: "desktop", location: "Chennai, IN", at: "3d ago", current: false },
	{ id: "s4", device: "iPad Air", type: "tablet", location: "Mumbai, IN", at: "1w ago", current: false },
]

export const recentFiles = [
	{ id: "f1", name: "design-audit-v3.pdf", size: "2.4 MB", room: "Design Systems", at: "12m" },
	{ id: "f2", name: "reconnect-flow.png", size: "812 KB", room: "Engineering", at: "1h" },
	{ id: "f3", name: "Q3-review-draft.docx", size: "1.1 MB", room: "Product", at: "3h" },
	{ id: "f4", name: "launch-brief.md", size: "14 KB", room: "Product", at: "yesterday" },
]

export const recentMentions = [
	{ id: "me1", by: "Maya Kapoor", room: "Design Systems", text: "nudge on the hero fade", at: "4m" },
	{ id: "me2", by: "Leo Tanaka", room: "Engineering", text: "can you review the socket auth PR?", at: "1h" },
	{ id: "me3", by: "Sana Ahmed", room: "Product", text: "pulled you into the review", at: "3h" },
]

export const upcomingMeetings = [
	{ id: "um1", title: "Design Review", at: "Today · 4:30 PM", attendees: 6 },
	{ id: "um2", title: "Realtime infra sync", at: "Tomorrow · 11:00 AM", attendees: 4 },
	{ id: "um3", title: "Q3 Retrospective", at: "Fri · 3:00 PM", attendees: 12 },
]

export const adminUsers: AdminUserRow[] = [
	{ id: "u_me", name: "Anand Ravichandran", email: "anand@ripple.chat", avatar: "AR", status: "online", role: "admin", state: "active", joined: "Nov 02, 2025" },
	{ id: "u_1", name: "Maya Kapoor", email: "maya@ripple.chat", avatar: "MK", status: "online", role: "admin", state: "active", joined: "Aug 14, 2025" },
	{ id: "u_3", name: "Sana Ahmed", email: "sana@ripple.chat", avatar: "SA", status: "online", role: "moderator", state: "active", joined: "Nov 11, 2024" },
	{ id: "u_2", name: "Leo Tanaka", email: "leo@ripple.chat", avatar: "LT", status: "idle", role: "user", state: "active", joined: "Feb 01, 2025" },
	{ id: "u_4", name: "Noah Fischer", email: "noah@ripple.chat", avatar: "NF", status: "dnd", role: "user", state: "active", joined: "Apr 05, 2025" },
	{ id: "u_6", name: "Kenji Ohara", email: "kenji@ripple.chat", avatar: "KO", status: "online", role: "user", state: "active", joined: "Sep 30, 2025" },
	{ id: "u_7", name: "Priya Shah", email: "priya@ripple.chat", avatar: "PS", status: "online", role: "user", state: "invited", joined: "May 20, 2025" },
	{ id: "u_5", name: "Ivy Park", email: "ivy@ripple.chat", avatar: "IP", status: "offline", role: "user", state: "suspended", joined: "Jun 19, 2025" },
]

export const systemLogs: SystemLog[] = [
	{ id: "l1", level: "info", at: "12:04:22", message: "socket.connected · u_1 · sid=8f2e" },
	{ id: "l2", level: "warn", at: "12:03:58", message: "rate.limit.near · room=r_random · 92%" },
	{ id: "l3", level: "info", at: "12:03:41", message: "message.sent · room=r_design" },
	{ id: "l4", level: "error", at: "12:02:10", message: "auth.refresh.failed · user=u_5 (retried)" },
	{ id: "l5", level: "info", at: "12:01:04", message: "room.created · name='launch-war-room'" },
	{ id: "l6", level: "info", at: "11:58:22", message: "user.verified · user=u_6" },
	{ id: "l7", level: "warn", at: "11:52:11", message: "presence.lag · region=ap-south-1 · +180ms" },
	{ id: "l8", level: "info", at: "11:48:07", message: "deploy.completed · sha=a1b2c3d" },
]
