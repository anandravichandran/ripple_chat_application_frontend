"use client"

import Link from "next/link"
import { Plus, MessageCircle, Users, Search } from "lucide-react"
import { GlassCard } from "@/components/shared/glass-card"
import { Button } from "@/components/ui/button"

const actions = [
	{ label: "New room", icon: Plus, href: "/rooms?create=1", variant: "primary" as const },
	{ label: "New DM", icon: MessageCircle, href: "/messages", variant: "secondary" as const },
	{ label: "Invite people", icon: Users, href: "/settings", variant: "secondary" as const },
	{ label: "Search", icon: Search, href: "/rooms", variant: "secondary" as const },
]

export function QuickActions() {
	return (
		<GlassCard className="p-5">
			<div className="mb-4 flex items-center justify-between">
				<h3 className="text-sm font-semibold tracking-tight">Quick actions</h3>
				<span className="text-xs text-text-muted">Shortcuts</span>
			</div>
			<div className="grid grid-cols-2 gap-2">
				{actions.map(({ label, icon: Icon, href, variant }) => (
					<Button key={label} asChild variant={variant} size="md" className="justify-start">
						<Link href={href}>
							<Icon className="h-4 w-4" />
							{label}
						</Link>
					</Button>
				))}
			</div>
		</GlassCard>
	)
}
