"use client"

import { useState, useRef, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { useRouter, useParams } from "next/navigation"
import { Search, MessageSquare, Hash, Loader2, X, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { GlassCard } from "@/components/shared/glass-card"
import { messagesApi } from "@/lib/api"

export function GlobalSearch() {
	const [open, setOpen] = useState(false)
	const [query, setQuery] = useState("")
	const inputRef = useRef<HTMLInputElement>(null)
	const router = useRouter()
	const params = useParams()
	const currentRoomId = params?.id as string | undefined

	const { data, isLoading } = useQuery({
		queryKey: ["search-global", query, currentRoomId],
		queryFn: () => messagesApi.searchGlobal({ q: query, roomId: currentRoomId, limit: 10 }),
		enabled: query.length >= 2,
	})

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === "k") {
				e.preventDefault()
				setOpen((v) => !v)
			}
			if (e.key === "Escape") setOpen(false)
		}
		window.addEventListener("keydown", handler)
		return () => window.removeEventListener("keydown", handler)
	}, [])

	useEffect(() => {
		if (open) setTimeout(() => inputRef.current?.focus(), 50)
	}, [open])

	const results = data?.items ?? []

	return (
		<>
			<button
				onClick={() => setOpen(true)}
				className="flex w-full items-center gap-2 rounded-xl border border-glass-border bg-white/[0.03] px-3.5 py-2 text-left text-sm text-text-muted transition-colors hover:bg-glass-hover"
			>
				<Search className="h-4 w-4 shrink-0" />
				<span className="flex-1">Search messages…</span>
				<kbd className="hidden rounded-md border border-glass-border bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-text-muted md:inline">⌘K</kbd>
			</button>

			{open && (
				<div className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh]" onClick={() => setOpen(false)}>
					<div className="w-full max-w-xl" onClick={(e) => e.stopPropagation()}>
						<GlassCard className="p-0 overflow-hidden">
							<div className="relative">
								<Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
								<Input
									ref={inputRef}
									placeholder="Search messages across all rooms…"
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									className="border-0 bg-transparent pl-11 pr-10 text-base focus-visible:ring-0"
								/>
								{query && (
									<button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary">
										<X className="h-4 w-4" />
									</button>
								)}
							</div>

							{isLoading && (
								<div className="flex items-center justify-center gap-2 px-4 py-8 text-sm text-text-muted">
									<Loader2 className="h-4 w-4 animate-spin" /> Searching…
								</div>
							)}

							{!isLoading && query.length >= 2 && results.length === 0 && (
								<div className="px-4 py-8 text-center text-sm text-text-muted">No messages found</div>
							)}

							{results.length > 0 && (
								<div className="max-h-80 overflow-y-auto border-t border-glass-border">
									{results.map((msg: { id: string; text?: string | null; roomId?: string; author?: { name?: string } | null; room?: { name?: string } | null; createdAt?: string }) => (
										<button
											key={msg.id}
											className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-glass-hover"
											onClick={() => { router.push(`/chat/${msg.roomId}`); setOpen(false) }}
										>
											<MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-text-muted" />
											<div className="min-w-0 flex-1">
												<p className="truncate text-sm font-medium text-text-primary">{msg.text}</p>
												<p className="flex items-center gap-1 text-xs text-text-muted">
													{msg.author?.name ?? "Unknown"}
													{msg.room && <><ArrowRight className="h-3 w-3" />{msg.room.name}</>}
												</p>
											</div>
											{msg.createdAt && (
												<span className="shrink-0 text-[11px] text-text-muted">{new Date(msg.createdAt).toLocaleDateString()}</span>
											)}
										</button>
									))}
								</div>
							)}

							{query.length < 2 && (
								<div className="border-t border-glass-border px-4 py-3 text-xs text-text-muted">
									Type at least 2 characters to search across all your rooms.
								</div>
							)}
						</GlassCard>
					</div>
				</div>
			)}
		</>
	)
}
