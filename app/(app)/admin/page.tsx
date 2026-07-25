"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Users, Hash, AlertTriangle, TrendingUp, Server, ShieldAlert, MoreHorizontal, Search, Trash2, Ban, Shield, UserCheck, ClipboardList, Eye, XCircle, CheckCircle, BarChart3 } from "lucide-react"
import { GlassCard } from "@/components/shared/glass-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserAvatar } from "@/components/shared/user-avatar"
import { AnimatedCounter } from "@/components/shared/animated-counter"
import { PageHeader } from "@/components/shared/page-header"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { adminApi, auditApi, reportsApi } from "@/lib/api"
import type { User } from "@/lib/types"

function useAdminUsers(params: { q?: string; role?: string; status?: string; page?: number; limit?: number }) {
	return useQuery({
		queryKey: ["admin", "users", params],
		queryFn: () => adminApi.listUsers(params),
	})
}

function useAnalytics(days = 30) {
	return useQuery({
		queryKey: ["admin", "analytics", days],
		queryFn: () => adminApi.getAnalytics(days),
	})
}

function useAuditLogs(params: { page?: number; limit?: number }) {
	return useQuery({
		queryKey: ["admin", "audit", params],
		queryFn: () => auditApi.list(params),
	})
}

function useReports(params: { status?: string; page?: number; limit?: number }) {
	return useQuery({
		queryKey: ["admin", "reports", params],
		queryFn: () => reportsApi.list(params),
	})
}

const REPORT_TARGET_LABELS: Record<string, string> = { user: "User", message: "Message", room: "Room" }
const REPORT_STATUS_VARIANTS: Record<string, "warn" | "danger" | "success" | "outline"> = { OPEN: "warn", INVESTIGATING: "danger", RESOLVED: "success", DISMISSED: "outline" }

export default function AdminPage() {
	const qc = useQueryClient()
	const [search, setSearch] = useState("")
	const [page, setPage] = useState(1)
	const [reportPage, setReportPage] = useState(1)
	const [reportFilter, setReportFilter] = useState("")
	const [resolutionText, setResolutionText] = useState("")
	const [resolveId, setResolveId] = useState<string | null>(null)

	const { data: analytics } = useAnalytics()
	const { data: usersData, isLoading } = useAdminUsers({ q: search || undefined, page, limit: 10 })
	const { data: auditData } = useAuditLogs({ page: 1, limit: 50 })
	const { data: reportsData } = useReports({ status: reportFilter || undefined, page: reportPage, limit: 10 })

	const updateRoleMutation = useMutation({
		mutationFn: ({ id, role }: { id: string; role: string }) => adminApi.updateUserRole(id, role),
		onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin"] }); toast.success("Role updated") },
		onError: () => toast.error("Failed to update role"),
	})

	const suspendMutation = useMutation({
		mutationFn: (id: string) => adminApi.suspendUser(id),
		onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin"] }); toast.success("User suspended") },
		onError: () => toast.error("Failed to suspend user"),
	})

	const unsuspendMutation = useMutation({
		mutationFn: (id: string) => adminApi.unsuspendUser(id),
		onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin"] }); toast.success("User unsuspended") },
		onError: () => toast.error("Failed to unsuspend user"),
	})

	const deleteMutation = useMutation({
		mutationFn: (id: string) => adminApi.deleteUser(id),
		onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin"] }); toast.success("User deleted") },
		onError: () => toast.error("Failed to delete user"),
	})

	const resolveReportMutation = useMutation({
		mutationFn: ({ id, resolution }: { id: string; resolution: string }) => reportsApi.resolve(id, resolution),
		onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin", "reports"] }); toast.success("Report resolved"); setResolveId(null); setResolutionText("") },
		onError: () => toast.error("Failed to resolve report"),
	})

	const dismissReportMutation = useMutation({
		mutationFn: (id: string) => reportsApi.dismiss(id),
		onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin", "reports"] }); toast.success("Report dismissed") },
		onError: () => toast.error("Failed to dismiss report"),
	})

	const kpis = [
		{ icon: Users, label: "Total users", value: analytics?.totalUsers ?? 0, delta: `${analytics?.newUsersToday ?? 0} joined today`, tone: "text-accent-primary" },
		{ icon: Hash, label: "Active rooms", value: analytics?.totalRooms ?? 0, delta: `${analytics?.roomsToday ?? 0} created today`, tone: "text-accent-secondary" },
		{ icon: AlertTriangle, label: "Online now", value: analytics?.onlineUsers ?? 0, delta: `${analytics?.activeUsers ?? 0} active this month`, tone: "text-state-warn" },
		{ icon: TrendingUp, label: "Messages / day", value: analytics?.messagesToday ?? 0, delta: `${analytics?.totalMessages?.toLocaleString() ?? 0} total`, tone: "text-state-success" },
	]

	const users = usersData?.users ?? []
	const meta = usersData?.meta
	const auditItems = auditData?.items ?? []
	const reports = reportsData?.items ?? []
	const reportMeta = reportsData?.meta

	return (
		<div className="space-y-6">
			<PageHeader
				eyebrow="Admin"
				title="Ripple control panel"
				description="Watch health, manage users and rooms, moderate reports, review audit logs."
			/>

			<div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
				{kpis.map((k, i) => {
					const Icon = k.icon
					return (
						<motion.div key={k.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i }}>
							<GlassCard hoverLift className="p-5">
								<div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-2xl border border-glass-border bg-white/[0.04] ${k.tone}`}>
									<Icon className="h-4 w-4" />
								</div>
								<p className="text-xs uppercase tracking-widest text-text-muted">{k.label}</p>
								<p className="mt-1 text-2xl font-semibold tracking-tight"><AnimatedCounter value={k.value} /></p>
								<p className="text-xs text-text-secondary">{k.delta}</p>
							</GlassCard>
						</motion.div>
					)
				})}
			</div>

			<Tabs defaultValue="users">
				<TabsList>
					<TabsTrigger value="users"><Users className="h-3.5 w-3.5" />Users</TabsTrigger>
					<TabsTrigger value="rooms"><Hash className="h-3.5 w-3.5" />Rooms</TabsTrigger>
					<TabsTrigger value="charts"><BarChart3 className="h-3.5 w-3.5" />Charts</TabsTrigger>
					<TabsTrigger value="reports"><ShieldAlert className="h-3.5 w-3.5" />Reports</TabsTrigger>
					<TabsTrigger value="audit"><ClipboardList className="h-3.5 w-3.5" />Audit log</TabsTrigger>
				</TabsList>

				<TabsContent value="users">
					<GlassCard className="p-0 overflow-hidden">
						<div className="flex items-center justify-between gap-3 border-b border-glass-border p-4">
							<div className="relative w-full max-w-sm">
								<Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
								<Input placeholder="Search users…" className="pl-10" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }} />
							</div>
							<Button size="sm" variant="secondary" onClick={() => toast.success("Invite link copied")}>Invite user</Button>
						</div>
						<div className="overflow-x-auto">
							<table className="w-full text-sm">
								<thead>
									<tr className="text-left text-[11px] uppercase tracking-widest text-text-muted">
										<th className="px-4 py-3">Member</th>
										<th className="px-4 py-3">Role</th>
										<th className="px-4 py-3">Status</th>
										<th className="px-4 py-3">Joined</th>
										<th className="px-4 py-3" />
									</tr>
								</thead>
								<tbody>
									{isLoading && <tr><td colSpan={5} className="px-4 py-8 text-center text-text-muted">Loading users…</td></tr>}
									{!isLoading && users.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-text-muted">No users found</td></tr>}
									{users.map((u: User) => (
										<tr key={u.id} className="border-t border-glass-border transition-colors hover:bg-glass-hover">
											<td className="px-4 py-3">
												<div className="flex items-center gap-3">
													<UserAvatar src={u.avatar} initials={u.name?.charAt(0)?.toUpperCase()} status={u.status} size="sm" />
													<div>
														<p className="font-medium text-text-primary">{u.name}</p>
														<p className="text-xs text-text-muted">{u.email}</p>
													</div>
												</div>
											</td>
											<td className="px-4 py-3">
												<Badge variant={u.role === "admin" ? "accent" : u.role === "moderator" ? "aqua" : "outline"} className="capitalize">{u.role ?? "user"}</Badge>
											</td>
											<td className="px-4 py-3">
												<Badge variant={u.status === "online" ? "success" : "outline"} className="capitalize">{u.status}</Badge>
											</td>
											<td className="px-4 py-3 text-text-muted">{new Date(u.joinedAt).toLocaleDateString()}</td>
											<td className="px-4 py-3 text-right">
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button variant="ghost" size="iconSm" aria-label="More"><MoreHorizontal className="h-4 w-4" /></Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent align="end" className="w-44">
														<DropdownMenuItem onClick={() => updateRoleMutation.mutate({ id: u.id, role: "moderator" })}>
															<Shield className="mr-2 h-4 w-4" /> Make moderator
														</DropdownMenuItem>
														<DropdownMenuItem onClick={() => updateRoleMutation.mutate({ id: u.id, role: "admin" })}>
															<Shield className="mr-2 h-4 w-4" /> Make admin
														</DropdownMenuItem>
														<DropdownMenuItem onClick={() => updateRoleMutation.mutate({ id: u.id, role: "user" })}>
															<UserCheck className="mr-2 h-4 w-4" /> Demote to user
														</DropdownMenuItem>
														<DropdownMenuSeparator />
														<DropdownMenuItem onClick={() => suspendMutation.mutate(u.id)}>
															<Ban className="mr-2 h-4 w-4" /> Suspend
														</DropdownMenuItem>
														<DropdownMenuItem onClick={() => unsuspendMutation.mutate(u.id)}>
															<UserCheck className="mr-2 h-4 w-4" /> Unsuspend
														</DropdownMenuItem>
														<DropdownMenuSeparator />
														<DropdownMenuItem className="text-state-danger" onClick={() => { if (confirm("Delete this user permanently?")) deleteMutation.mutate(u.id) }}>
															<Trash2 className="mr-2 h-4 w-4" /> Delete
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						{meta && meta.totalPages > 1 && (
							<div className="flex items-center justify-between border-t border-glass-border px-4 py-3">
								<p className="text-xs text-text-muted">{meta.total} total users</p>
								<div className="flex gap-2">
									<Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</Button>
									<Button variant="outline" size="sm" disabled={page >= meta.totalPages} onClick={() => setPage((p) => p + 1)}>Next</Button>
								</div>
							</div>
						)}
					</GlassCard>
				</TabsContent>

				<TabsContent value="rooms">
					<GlassCard className="p-6">
						<div className="flex flex-col items-center gap-3 py-10 text-center">
							<div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-glass-border bg-white/[0.04] text-text-muted">
								<Hash className="h-5 w-5" />
							</div>
							<h3 className="text-base font-semibold">{analytics?.totalRooms ?? 0} rooms total</h3>
							<p className="max-w-md text-sm text-text-secondary">
								Top room: {(analytics?.topRooms as { name?: string; messages?: number }[])?.[0]?.name ?? "N/A"} &mdash; {(analytics?.topRooms as { messages?: number }[])?.[0]?.messages ?? 0} messages.
							</p>
							<div className="mt-2 w-full max-w-md space-y-1.5 text-left text-sm">
								{(analytics?.topRooms as { name: string; messages: number; members: number }[] | undefined)?.map((r, i) => (
									<div key={r.name} className="flex items-center justify-between rounded-lg border border-glass-border px-3 py-2">
										<span className="font-medium">#{r.name}</span>
										<span className="text-xs text-text-muted">{r.messages} msgs &middot; {r.members} members</span>
									</div>
								))}
							</div>
						</div>
					</GlassCard>
				</TabsContent>

				<TabsContent value="charts">
					<div className="grid gap-4 md:grid-cols-2">
						{(["users", "messages", "rooms"] as const).map((metric) => (
							<GlassCard key={metric} className="p-5">
								<h3 className="mb-4 text-sm font-semibold capitalize tracking-tight">{metric} over time</h3>
								<div className="flex items-end gap-[3px] h-32">
									{(analytics?.timeSeries ?? []).slice(-14).map((d, i) => {
										const vals = metric === "users" ? d.users : metric === "messages" ? d.messages : d.rooms
										const maxVal = Math.max(...(analytics?.timeSeries ?? []).slice(-14).map((x) => metric === "users" ? x.users : metric === "messages" ? x.messages : x.rooms), 1)
										const pct = (vals / maxVal) * 100
										return (
											<div key={d.date} className="group relative flex-1">
												<div
													className="w-full rounded-t-sm transition-all duration-300"
													style={{
														height: `${Math.max(pct, 2)}%`,
														backgroundColor: metric === "users" ? "var(--color-accent-primary, #6366f1)" : metric === "messages" ? "var(--color-accent-secondary, #22d3ee)" : "var(--color-accent, #a78bfa)",
													}}
												/>
												<div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
													{d.date}: {vals.toLocaleString()}
												</div>
											</div>
										)
									})}
								</div>
								<div className="mt-2 flex justify-between text-[10px] text-text-muted">
									<span>{(analytics?.timeSeries ?? []).slice(-14)[0]?.date ?? ""}</span>
									<span>{(analytics?.timeSeries ?? []).slice(-14).slice(-1)[0]?.date ?? ""}</span>
								</div>
							</GlassCard>
						))}
					</div>
				</TabsContent>

				<TabsContent value="reports">
					<GlassCard className="p-0 overflow-hidden">
						<div className="flex items-center gap-3 border-b border-glass-border p-4">
							<Select value={reportFilter} onValueChange={(v) => { setReportFilter(v); setReportPage(1) }}>
								<SelectTrigger className="w-40">
									<SelectValue placeholder="All statuses" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="">All statuses</SelectItem>
									<SelectItem value="OPEN">Open</SelectItem>
									<SelectItem value="INVESTIGATING">Investigating</SelectItem>
									<SelectItem value="RESOLVED">Resolved</SelectItem>
									<SelectItem value="DISMISSED">Dismissed</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="overflow-x-auto">
							<table className="w-full text-sm">
								<thead>
									<tr className="text-left text-[11px] uppercase tracking-widest text-text-muted">
										<th className="px-4 py-3">Reporter</th>
										<th className="px-4 py-3">Target</th>
										<th className="px-4 py-3">Reason</th>
										<th className="px-4 py-3">Status</th>
										<th className="px-4 py-3">Date</th>
										<th className="px-4 py-3" />
									</tr>
								</thead>
								<tbody>
									{reports.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-text-muted">No reports</td></tr>}
									{reports.map((r: { id: string; reporter?: { name?: string; avatarUrl?: string | null } | null; targetType?: string; targetId?: string; reason?: string; status?: string; createdAt?: string }) => (
										<tr key={r.id} className="border-t border-glass-border transition-colors hover:bg-glass-hover">
											<td className="px-4 py-3">
												<div className="flex items-center gap-2">
													<UserAvatar src={r.reporter?.avatarUrl} initials={r.reporter?.name?.charAt(0)?.toUpperCase()} size="xs" />
													<span className="text-xs">{r.reporter?.name ?? "Unknown"}</span>
												</div>
											</td>
											<td className="px-4 py-3">
												<Badge variant="outline" className="text-xs">{REPORT_TARGET_LABELS[r.targetType ?? ""] ?? r.targetType}</Badge>
												<span className="ml-1.5 text-xs text-text-muted">{r.targetId?.slice(0, 8)}…</span>
											</td>
											<td className="px-4 py-3 text-xs max-w-[200px] truncate">{r.reason}</td>
											<td className="px-4 py-3">
												<Badge variant={REPORT_STATUS_VARIANTS[r.status ?? ""] ?? "outline"} className="text-[10px] uppercase">{r.status}</Badge>
											</td>
											<td className="px-4 py-3 text-xs text-text-muted">{r.createdAt ? new Date(r.createdAt).toLocaleDateString() : ""}</td>
											<td className="px-4 py-3 text-right">
												{r.status === "OPEN" && (
													<div className="flex gap-1">
														<Button variant="ghost" size="iconSm" onClick={() => setResolveId(r.id)} title="Resolve"><CheckCircle className="h-3.5 w-3.5 text-state-success" /></Button>
														<Button variant="ghost" size="iconSm" onClick={() => dismissReportMutation.mutate(r.id)} title="Dismiss"><XCircle className="h-3.5 w-3.5 text-text-muted" /></Button>
													</div>
												)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						{reportMeta && reportMeta.totalPages > 1 && (
							<div className="flex items-center justify-between border-t border-glass-border px-4 py-3">
								<p className="text-xs text-text-muted">{reportMeta.total} total reports</p>
								<div className="flex gap-2">
									<Button variant="outline" size="sm" disabled={reportPage <= 1} onClick={() => setReportPage((p) => p - 1)}>Previous</Button>
									<Button variant="outline" size="sm" disabled={reportPage >= reportMeta.totalPages} onClick={() => setReportPage((p) => p + 1)}>Next</Button>
								</div>
							</div>
						)}
					</GlassCard>
				</TabsContent>

				<TabsContent value="audit">
					<GlassCard className="p-0 overflow-hidden">
						<div className="overflow-x-auto">
							<table className="w-full text-sm">
								<thead>
									<tr className="text-left text-[11px] uppercase tracking-widest text-text-muted">
										<th className="px-4 py-3">Action</th>
										<th className="px-4 py-3">Actor</th>
										<th className="px-4 py-3">Target</th>
										<th className="px-4 py-3">Details</th>
										<th className="px-4 py-3">When</th>
									</tr>
								</thead>
								<tbody>
									{auditItems.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-text-muted">No audit logs</td></tr>}
									{auditItems.map((entry: { id: string; action?: string; actor?: { id?: string; name?: string; username?: string; avatarUrl?: string | null } | null; targetType?: string | null; targetId?: string | null; metadata?: Record<string, unknown> | null; createdAt?: string }) => (
										<tr key={entry.id} className="border-t border-glass-border font-mono text-xs">
											<td className="px-4 py-3">
												<Badge variant="outline" className="text-[10px] uppercase">{entry.action?.replace(/_/g, " ")}</Badge>
											</td>
											<td className="px-4 py-3">
												<div className="flex items-center gap-2">
													<UserAvatar src={entry.actor?.avatarUrl} initials={entry.actor?.name?.charAt(0)?.toUpperCase()} size="xs" />
													<span>{entry.actor?.name ?? "System"}</span>
												</div>
											</td>
											<td className="px-4 py-3 text-text-muted">
												{entry.targetType && <Badge variant="default" className="text-[10px] bg-white/[0.04]">{entry.targetType}</Badge>}
												{entry.targetId && <span className="ml-1">{entry.targetId.slice(0, 8)}…</span>}
											</td>
											<td className="px-4 py-3 text-text-muted max-w-[200px] truncate">{entry.metadata ? JSON.stringify(entry.metadata).slice(0, 60) : "—"}</td>
											<td className="px-4 py-3 text-text-muted whitespace-nowrap">{entry.createdAt ? new Date(entry.createdAt).toLocaleString() : ""}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</GlassCard>
				</TabsContent>
			</Tabs>

			{resolveId && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setResolveId(null)}>
					<GlassCard className="w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
						<h3 className="mb-3 text-sm font-semibold">Resolve report</h3>
						<Input placeholder="Resolution notes…" value={resolutionText} onChange={(e) => setResolutionText(e.target.value)} className="mb-4" />
						<div className="flex justify-end gap-2">
							<Button variant="outline" size="sm" onClick={() => setResolveId(null)}>Cancel</Button>
							<Button size="sm" disabled={!resolutionText.trim()} onClick={() => resolveReportMutation.mutate({ id: resolveId, resolution: resolutionText.trim() })}>Resolve</Button>
						</div>
					</GlassCard>
				</div>
			)}
		</div>
	)
}
