export function DayDivider({ label }: { label: string }) {
	return (
		<div className="my-4 flex items-center gap-3">
			<div className="h-px flex-1 bg-glass-border" />
			<span className="rounded-full border border-glass-border bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-text-muted">{label}</span>
			<div className="h-px flex-1 bg-glass-border" />
		</div>
	)
}

export function UnreadDivider({ count }: { count: number }) {
	return (
		<div className="my-4 flex items-center gap-3">
			<div className="h-px flex-1 bg-accent-primary/40" />
			<span className="rounded-full border border-accent-primary/40 bg-accent-primary/10 px-3 py-1 text-[11px] font-medium text-accent-primary">
				{count} unread {count === 1 ? "message" : "messages"}
			</span>
			<div className="h-px flex-1 bg-accent-primary/40" />
		</div>
	)
}
