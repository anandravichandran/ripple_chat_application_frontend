"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Plus, Search, Hash } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/empty-state"
import { RoomCard } from "@/components/rooms/room-card"
import { RoomFilters, type RoomFilter } from "@/components/rooms/room-filters"
import { RoomSkeleton } from "@/components/rooms/room-skeleton"
import { CreateRoomModal } from "@/components/rooms/create-room-modal"
import { useRooms } from "@/hooks/use-rooms"

export default function RoomsPage() {
	const { data: rooms, isLoading } = useRooms()
	const [query, setQuery] = useState("")
	const [filter, setFilter] = useState<RoomFilter>("all")
	const [createOpen, setCreateOpen] = useState(false)
	const params = useSearchParams()
	const router = useRouter()

	useEffect(() => {
		if (params.get("create") === "1") {
			setCreateOpen(true)
			router.replace("/rooms")
		}
	}, [params, router])

	const list = useMemo(() => {
		const q = query.trim().toLowerCase()
		return (rooms ?? []).filter((r) => {
			const matchesQuery = !q || r.name.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)
			const matchesFilter =
				filter === "all"
					? true
					: filter === "public"
						? r.visibility === "public"
						: filter === "private"
							? r.visibility === "private"
							: filter === "pinned"
								? r.pinned
								: r.recentlyJoined
			return matchesQuery && matchesFilter
		})
	}, [rooms, query, filter])

	return (
		<div className="space-y-6">
			<PageHeader
				eyebrow="Rooms"
				title="Browse rooms"
				description="Jump into public spaces or spin up a private room for your team."
				actions={
					<Button onClick={() => setCreateOpen(true)}>
						<Plus className="h-4 w-4" />New room
					</Button>
				}
			/>

			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<div className="relative w-full sm:max-w-sm">
					<Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
					<Input
						type="search"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Search rooms…"
						className="pl-10"
					/>
				</div>
				<RoomFilters value={filter} onChange={setFilter} />
			</div>

			{isLoading ? (
				<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
					{Array.from({ length: 6 }).map((_, i) => (
						<RoomSkeleton key={i} />
					))}
				</div>
			) : list.length === 0 ? (
				<EmptyState
					icon={Hash}
					title="No rooms match"
					description="Try a different search or create a new room."
					action={<Button onClick={() => setCreateOpen(true)}><Plus className="h-4 w-4" />Create room</Button>}
				/>
			) : (
				<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
					{list.map((r, i) => (
						<RoomCard key={r.id} room={r} index={i} />
					))}
				</div>
			)}

			<CreateRoomModal open={createOpen} onOpenChange={setCreateOpen} />
		</div>
	)
}
