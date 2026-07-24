import { format, formatDistanceToNowStrict, isToday, isYesterday } from "date-fns"

export function time(iso: string) {
	return format(new Date(iso), "h:mm a")
}

// Legacy alias.
export const friendlyTime = time

export function dayLabel(iso: string) {
	const d = new Date(iso)
	if (isToday(d)) return "Today"
	if (isYesterday(d)) return "Yesterday"
	return format(d, "EEEE, MMM d")
}

export function relative(iso: string) {
	try {
		return formatDistanceToNowStrict(new Date(iso), { addSuffix: true })
	} catch {
		return iso
	}
}

export function groupByDay<T extends { at: string }>(items: T[]) {
	const groups: Record<string, T[]> = {}
	for (const it of items) {
		const key = dayLabel(it.at)
		groups[key] ??= []
		groups[key].push(it)
	}
	return Object.entries(groups)
}
