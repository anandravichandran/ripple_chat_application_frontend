"use client"

import { motion } from "framer-motion"
import { Users, Hash, AlertTriangle, TrendingUp, Server, ShieldAlert, MoreHorizontal, Search } from "lucide-react"
import { GlassCard } from "@/components/shared/glass-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserAvatar } from "@/components/shared/user-avatar"
import { AnimatedCounter } from "@/components/shared/animated-counter"
import { PageHeader } from "@/components/shared/page-header"
import { adminUsers, rooms, systemLogs } from "@/lib/mock"

const kpis = [
	{ icon: Users, label: "Total users", value: 2841, delta: "+186 this week", tone: "text-accent-primary" },
	{ icon: Hash, label: "Active rooms", value: 214, delta: "12 created today", tone: "text-accent-secondary" },
	{ icon: AlertTriangle, label: "Open reports", value: 7, delta: "3 need review", tone: "text-state-warn" },
	{ icon: TrendingUp, label: "Messages / day", value: 48231, delta: "+9.3%", tone: "text-state-success" },
]

export default function AdminPage() {
	return (
		<div className="space-y-6">
			<PageHeader
				eyebrow="Admin"
				title="Ripple control panel"
				description="Watch health, manage users and rooms, review reports."
				actions={<Badge variant="outline">Read-only demo</Badge>}
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
					<TabsTrigger value="reports"><ShieldAlert className="h-3.5 w-3.5" />Reports</TabsTrigger>
					<TabsTrigger value="logs"><Server className="h-3.5 w-3.5" />System logs</TabsTrigger>
				</TabsList>

				<TabsContent value="users">
					<GlassCard className="p-0 overflow-hidden">
						<div className="flex items-center justify-between gap-3 border-b border-glass-border p-4">
							<div className="relative w-full max-w-sm">
								<Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
								<Input placeholder="Search users…" className="pl-10" />
							</div>
							<Button size="sm" variant="secondary">Invite user</Button>
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
									{adminUsers.map((u) => (
										<tr key={u.id} className="border-t border-glass-border transition-colors hover:bg-glass-hover">
											<td className="px-4 py-3">
												<div className="flex items-center gap-3">
													<UserAvatar initials={u.avatar} status={u.status} size="sm" />
													<div>
														<p className="font-medium text-text-primary">{u.name}</p>
														<p className="text-xs text-text-muted">{u.email}</p>
													</div>
												</div>
											</td>
											<td className="px-4 py-3">
												<Badge variant={u.role === "admin" ? "accent" : u.role === "moderator" ? "aqua" : "outline"} className="capitalize">{u.role}</Badge>
											</td>
											<td className="px-4 py-3">
												<Badge variant={u.state === "active" ? "success" : u.state === "suspended" ? "danger" : "warn"} className="capitalize">{u.state}</Badge>
											</td>
											<td className="px-4 py-3 text-text-muted">{u.joined}</td>
											<td className="px-4 py-3 text-right">
												<Button variant="ghost" size="iconSm" aria-label="More"><MoreHorizontal className="h-4 w-4" /></Button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</GlassCard>
				</TabsContent>

				<TabsContent value="rooms">
					<GlassCard className="overflow-hidden p-0">
						<div className="overflow-x-auto">
							<table className="w-full text-sm">
								<thead>
									<tr className="text-left text-[11px] uppercase tracking-widest text-text-muted">
										<th className="px-4 py-3">Room</th>
										<th className="px-4 py-3">Visibility</th>
										<th className="px-4 py-3">Members</th>
										<th className="px-4 py-3">Online</th>
										<th className="px-4 py-3">Category</th>
									</tr>
								</thead>
								<tbody>
									{rooms.map((r) => (
										<tr key={r.id} className="border-t border-glass-border">
											<td className="px-4 py-3">
												<div className="flex items-center gap-3">
													<span className="flex h-8 w-8 items-center justify-center rounded-xl border border-glass-border bg-white/[0.04] text-base">{r.icon}</span>
													<span className="font-medium">{r.name}</span>
												</div>
											</td>
											<td className="px-4 py-3"><Badge variant={r.visibility === "public" ? "outline" : "aqua"} className="capitalize">{r.visibility}</Badge></td>
											<td className="px-4 py-3">{r.members}</td>
											<td className="px-4 py-3 text-state-success">{r.online}</td>
											<td className="px-4 py-3 text-text-muted">{r.category}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</GlassCard>
				</TabsContent>

				<TabsContent value="reports">
					<GlassCard className="p-6">
						<div className="flex flex-col items-center gap-3 py-10 text-center">
							<div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-state-warn/25 bg-state-warn/10 text-state-warn">
								<ShieldAlert className="h-5 w-5" />
							</div>
							<h3 className="text-base font-semibold">Report queue is calm</h3>
							<p className="max-w-md text-sm text-text-secondary">Three low-severity reports pending. The rest of the queue is clear.</p>
							<Button variant="secondary" size="sm">Open queue</Button>
						</div>
					</GlassCard>
				</TabsContent>

				<TabsContent value="logs">
					<GlassCard className="p-5">
						<h3 className="mb-3 text-sm font-semibold tracking-tight">Recent system activity</h3>
						<ul className="space-y-2 font-mono text-xs">
							{systemLogs.map((l) => (
								<li key={l.id} className="flex items-center gap-3 rounded-xl border border-glass-border bg-white/[0.02] px-3 py-2">
									<span className={`h-1.5 w-1.5 rounded-full ${l.level === "error" ? "bg-state-danger" : l.level === "warn" ? "bg-state-warn" : "bg-state-success"}`} />
									<span className="text-text-muted">{l.at}</span>
									<span className="uppercase text-text-secondary">{l.level}</span>
									<span className="truncate text-text-primary">{l.message}</span>
								</li>
							))}
						</ul>
					</GlassCard>
				</TabsContent>
			</Tabs>
		</div>
	)
}
