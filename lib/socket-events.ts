export const SOCKET_EVENTS = {
	CONNECT: "connect",
	DISCONNECT: "disconnect",
	CONNECT_ERROR: "connect_error",
	HEARTBEAT: "heartbeat",
	HEARTBEAT_ACK: "heartbeatAck",

	JOIN_ROOM: "joinRoom",
	LEAVE_ROOM: "leaveRoom",
	ROOM_CREATED: "roomCreated",
	ROOM_UPDATED: "roomUpdated",
	ROOM_DELETED: "roomDeleted",
	MEMBER_JOINED: "memberJoined",
	MEMBER_LEFT: "memberLeft",

	SEND_MESSAGE: "sendMessage",
	RECEIVE_MESSAGE: "receiveMessage",
	MESSAGE_EDITED: "messageEdited",
	MESSAGE_DELETED: "messageDeleted",
	MESSAGE_DELIVERED: "messageDelivered",
	MESSAGE_SEEN: "messageSeen",

	TYPING: "typing",
	STOP_TYPING: "stopTyping",

	USER_CREATED: "userCreated",
	USER_UPDATED: "userUpdated",
	USER_ONLINE: "userOnline",
	USER_OFFLINE: "userOffline",
	PRESENCE_SYNC: "presenceSync",

	NOTIFICATION_NEW: "notification:new",

	SOCKET_ERROR: "socketError",
} as const
