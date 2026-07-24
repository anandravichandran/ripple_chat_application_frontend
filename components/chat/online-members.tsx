"use client"

import { useOnlineStore } from "@/store/online-store"
import { GlassCard } from "@/components/shared/glass-card"

export function OnlineMembers() {
	const count = useOnlineStore((s) => s.onlineIds.size)
	return (
		<div className="hidden w-72 shrink-0 border-l border-glass-border bg-white/[0.02] xl:block">
			<div className="sticky top-0 h-full overflow-y-auto p-4">
				<GlassCard className="p-4">
					<h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
						Online · {count}
					</h3>
					<p className="mt-3 text-sm text-text-secondary">
						Online presence is synced via socket.
					</p>
				</GlassCard>
			</div>
		</div>
	)
}
