"use client"

import { cn } from "@/lib/utils"

export type RoomFilter = "all" | "public" | "private" | "pinned" | "recent"

const filters: { id: RoomFilter; label: string; count?: number }[] = [
	{ id: "all", label: "All" },
	{ id: "public", label: "Public" },
	{ id: "private", label: "Private" },
	{ id: "pinned", label: "Pinned" },
	{ id: "recent", label: "Recently joined" },
]

export function RoomFilters({ value, onChange }: { value: RoomFilter; onChange: (v: RoomFilter) => void }) {
	return (
		<div className="flex flex-wrap gap-1.5 rounded-full border border-glass-border bg-white/[0.03] p-1">
			{filters.map((f) => (
				<button
					key={f.id}
					type="button"
					onClick={() => onChange(f.id)}
					className={cn(
						"rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
						value === f.id
							? "bg-white/[0.08] text-text-primary"
							: "text-text-secondary hover:bg-glass-hover hover:text-text-primary",
					)}
				>
					{f.label}
				</button>
			))}
		</div>
	)
}
