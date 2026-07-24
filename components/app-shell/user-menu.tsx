"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogOut, Settings, User as UserIcon, ShieldCheck, HelpCircle } from "lucide-react"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserAvatar } from "@/components/shared/user-avatar"
import { useAuthStore } from "@/store/auth-store"
import { toast } from "sonner"

export function UserMenu() {
	const user = useAuthStore((s) => s.user)
	const signOut = useAuthStore((s) => s.signOut)
	const router = useRouter()

	if (!user) return null

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					type="button"
					className="group flex items-center gap-2.5 rounded-full border border-glass-border bg-white/[0.03] py-1 pl-1 pr-3 transition-colors hover:bg-glass-hover"
				>
					<UserAvatar initials={user.avatar} status={user.status} size="sm" />
					<span className="hidden text-sm text-text-primary sm:inline">{user.name.split(" ")[0]}</span>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-64">
				<div className="flex items-center gap-3 p-2">
					<UserAvatar initials={user.avatar} status={user.status} size="md" />
					<div className="min-w-0">
						<p className="truncate text-sm font-medium text-text-primary">{user.name}</p>
						<p className="truncate text-xs text-text-muted">{user.email}</p>
					</div>
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuLabel>Account</DropdownMenuLabel>
				<DropdownMenuItem asChild>
					<Link href="/profile"><UserIcon className="h-4 w-4" />Profile</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href="/settings"><Settings className="h-4 w-4" />Settings</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href="/admin"><ShieldCheck className="h-4 w-4" />Admin</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => toast("Help center coming soon")}>
					<HelpCircle className="h-4 w-4" />Help & support
				</DropdownMenuItem>
			<DropdownMenuItem
				danger
				onClick={() => {
					signOut()
					toast.success("Signed out")
					router.push("/")
				}}
			>
					<LogOut className="h-4 w-4" />Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
