"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Camera, Mail, Phone, Calendar, Clock, Github, Twitter, Linkedin, Globe, KeyRound, LogOut, Monitor, Smartphone, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { GlassCard } from "@/components/shared/glass-card"
import { UserAvatar } from "@/components/shared/user-avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PageHeader } from "@/components/shared/page-header"
import { useAuthStore } from "@/store/auth-store"
import { useSessions, useUpdateProfile, useUpdateAvatar, useUpdateBanner } from "@/hooks/use-profile"

export default function ProfilePage() {
	const router = useRouter()
	const user = useAuthStore((s) => s.user)
	const setUser = useAuthStore((s) => s.setUser)
	const { data: sessions = [] } = useSessions()

	const updateProfile = useUpdateProfile()
	const updateAvatar = useUpdateAvatar()
	const updateBanner = useUpdateBanner()

	const [name, setName] = useState(user?.name ?? "")
	const [username, setUsername] = useState(user?.username ?? "")
	const [email, setEmail] = useState(user?.email ?? "")
	const [phone, setPhone] = useState(user?.phone ?? "")
	const [bio, setBio] = useState(user?.bio ?? "")
	const [twitter, setTwitter] = useState("")
	const [github, setGithub] = useState("")
	const [linkedin, setLinkedin] = useState("")
	const [website, setWebsite] = useState("")

	useEffect(() => {
		if (user) {
			setName(user.name ?? "")
			setUsername(user.username ?? "")
			setEmail(user.email ?? "")
			setPhone(user.phone ?? "")
			setBio(user.bio ?? "")
			if (user.socials) {
				for (const s of user.socials) {
					if (s.label === "twitter") setTwitter(s.url)
					if (s.label === "github") setGithub(s.url)
					if (s.label === "linkedin") setLinkedin(s.url)
					if (s.label === "website") setWebsite(s.url)
				}
			}
		}
	}, [user])

	const avatarInputRef = useRef<HTMLInputElement>(null)
	const bannerInputRef = useRef<HTMLInputElement>(null)

	const handleAvatarClick = useCallback(() => {
		avatarInputRef.current?.click()
	}, [])

	const handleBannerClick = useCallback(() => {
		bannerInputRef.current?.click()
	}, [])

	const handleAvatarChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return
		try {
			await updateAvatar.mutateAsync(file)
			toast.success("Avatar updated")
		} catch {
			toast.error("Failed to update avatar")
		}
		if (e.target) e.target.value = ""
	}, [updateAvatar])

	const handleBannerChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return
		try {
			await updateBanner.mutateAsync(file)
			toast.success("Banner updated")
		} catch {
			toast.error("Failed to update banner")
		}
		if (e.target) e.target.value = ""
	}, [updateBanner])

	const handleSave = useCallback(async () => {
		const socials: Record<string, string> = {}
		if (twitter) socials.twitter = twitter
		if (github) socials.github = github
		if (linkedin) socials.linkedin = linkedin
		if (website) socials.website = website

		const body: Record<string, unknown> = {}
		if (name !== user?.name) body.name = name
		if (bio !== user?.bio) body.bio = bio || null
		if (phone !== user?.phone) body.phone = phone || null
		if (Object.keys(socials).length > 0) body.socials = socials

		if (Object.keys(body).length === 0) {
			toast.info("No changes to save")
			return
		}

		try {
			await updateProfile.mutateAsync(body as any)
			toast.success("Profile updated")
		} catch {
			toast.error("Failed to update profile")
		}
	}, [name, bio, phone, twitter, github, linkedin, website, user, updateProfile])

	const isSaving = updateProfile.isPending
	const isUploadingAvatar = updateAvatar.isPending
	const isUploadingBanner = updateBanner.isPending

	return (
		<div className="space-y-6">
			<PageHeader eyebrow="Account" title="Your profile" description="Manage how the rest of Ripple sees you." />

			<motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
				<GlassCard tone="strong" className="overflow-hidden p-0">
					<div
						className="relative h-40 cursor-pointer bg-gradient-to-br from-accent-primary/40 via-accent-secondary/30 to-accent-primary/10"
						style={user?.bannerUrl ? { backgroundImage: `url(${user.bannerUrl})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
						onClick={handleBannerClick}
					>
						{!user?.bannerUrl ? (
							<div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(217,255,102,0.35),transparent_55%),radial-gradient(circle_at_85%_60%,rgba(168,245,255,0.28),transparent_60%)]" />
						) : null}
						<button type="button" className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-glass-border bg-black/40 px-3 py-1.5 text-xs text-text-primary backdrop-blur hover:bg-black/60" onClick={(e) => { e.stopPropagation(); handleBannerClick() }}>
							{isUploadingBanner ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Camera className="h-3.5 w-3.5" />}
							{isUploadingBanner ? "Uploading..." : "Change banner"}
						</button>
						<input ref={bannerInputRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="hidden" onChange={handleBannerChange} />
					</div>
					<div className="relative -mt-14 flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-end sm:justify-between">
						<div className="flex items-end gap-4">
							<div className="relative cursor-pointer group" onClick={handleAvatarClick}>
								<UserAvatar src={user?.avatar} initials={user?.name?.charAt(0)?.toUpperCase() ?? "?"} status={user?.status ?? "offline"} size="xl" ring />
								<div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
									{isUploadingAvatar ? <Loader2 className="h-5 w-5 animate-spin text-white" /> : <Camera className="h-5 w-5 text-white" />}
								</div>
							</div>
							<input ref={avatarInputRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="hidden" onChange={handleAvatarChange} />
							<div>
								<div className="flex items-center gap-2">
									<h2 className="text-xl font-semibold tracking-tight">{user?.name ?? "User"}</h2>
									<Badge variant="accent">Pro</Badge>
								</div>
								<p className="text-sm text-text-muted">@{user?.username ?? "user"} · {user?.email ?? ""}</p>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<Button variant="secondary" size="sm" onClick={() => toast.info("Profile preview coming soon")}>Preview profile</Button>
							<Button size="sm" onClick={handleSave} disabled={isSaving}>
								{isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
								{isSaving ? "Saving..." : "Save changes"}
							</Button>
						</div>
					</div>

					<div className="grid gap-6 p-6 pt-0 lg:grid-cols-3">
						<div className="lg:col-span-2 space-y-5">
							<div className="grid gap-4 sm:grid-cols-2">
								<Field label="Display name" value={name} onChange={setName} />
								<Field label="Username" value={username} onChange={setUsername} disabled />
								<Field label="Email" value={email} icon={<Mail className="h-3.5 w-3.5" />} disabled />
								<Field label="Phone" value={phone} onChange={setPhone} icon={<Phone className="h-3.5 w-3.5" />} />
							</div>
							<div>
								<Label>Bio</Label>
								<textarea
									rows={3}
									value={bio}
									onChange={(e) => setBio(e.target.value)}
									className="mt-1.5 w-full rounded-2xl border border-glass-border bg-white/[0.03] px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-primary/40 focus:outline-none"
								/>
							</div>
							<div>
								<Label>Social links</Label>
								<div className="mt-1.5 grid gap-2 sm:grid-cols-2">
									<Social icon={<Github className="h-3.5 w-3.5" />} placeholder="github.com/username" value={github} onChange={setGithub} />
									<Social icon={<Twitter className="h-3.5 w-3.5" />} placeholder="@username" value={twitter} onChange={setTwitter} />
									<Social icon={<Linkedin className="h-3.5 w-3.5" />} placeholder="in/username" value={linkedin} onChange={setLinkedin} />
									<Social icon={<Globe className="h-3.5 w-3.5" />} placeholder="example.com" value={website} onChange={setWebsite} />
								</div>
							</div>
						</div>

						<div className="space-y-4">
							<GlassCard tone="subtle" className="p-4">
								<h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-muted">At a glance</h3>
								<Line icon={<Clock className="h-3.5 w-3.5" />} label="Last seen" value="Active now" />
								<Line icon={<Calendar className="h-3.5 w-3.5" />} label="Joined" value={user?.joinedAt ? new Date(user.joinedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "Unknown"} />
								<Line icon={<Mail className="h-3.5 w-3.5" />} label="Timezone" value="Asia / Calcutta" />
							</GlassCard>
							<GlassCard tone="subtle" className="p-4">
								<h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-text-muted"><KeyRound className="h-3.5 w-3.5" />Password</h3>
								<p className="text-xs text-text-secondary">Last changed 3 months ago.</p>
								<Button variant="secondary" size="sm" className="mt-3 w-full" onClick={() => router.push("/settings")}>Change password</Button>
							</GlassCard>
						</div>
					</div>
				</GlassCard>
			</motion.div>

			<div className="grid gap-6 lg:grid-cols-2">
				<GlassCard className="p-5">
					<h3 className="mb-4 text-sm font-semibold tracking-tight">Connected devices</h3>
					<ul className="space-y-3">
						{sessions.map((s) => (
							<li key={s.id} className="flex items-center gap-3 rounded-2xl border border-glass-border bg-white/[0.02] p-3">
								<div className="flex h-9 w-9 items-center justify-center rounded-xl border border-glass-border bg-white/[0.04] text-text-secondary">
									{s.type === "desktop" ? <Monitor className="h-4 w-4" /> : <Smartphone className="h-4 w-4" />}
								</div>
								<div className="min-w-0 flex-1">
									<p className="truncate text-sm font-medium">{s.device}</p>
									<p className="text-[11px] text-text-muted">{s.location} · {s.at}</p>
								</div>
								{s.current ? (
									<Badge variant="success">Current</Badge>
								) : (
									<Button variant="ghost" size="sm" className="text-state-danger hover:bg-state-danger/10" onClick={() => toast.success("Session signed out")}><LogOut className="h-3.5 w-3.5" />Sign out</Button>
								)}
							</li>
						))}
					</ul>
				</GlassCard>

				<GlassCard className="p-5">
					<h3 className="mb-4 text-sm font-semibold tracking-tight">Active sessions</h3>
					<div className="space-y-3 text-sm">
						<div className="rounded-2xl border border-glass-border bg-white/[0.02] p-3">
							<p className="font-medium">Chrome on macOS</p>
							<p className="text-[11px] text-text-muted">Bangalore · IP 103.24.xx.xx · Session started 2h ago</p>
						</div>
						<div className="rounded-2xl border border-glass-border bg-white/[0.02] p-3">
							<p className="font-medium">Ripple iOS</p>
							<p className="text-[11px] text-text-muted">Bangalore · iPhone 15 · Session started yesterday</p>
						</div>
						<Button variant="secondary" size="sm" className="w-full" onClick={() => toast.success("Other sessions signed out")}>Sign out of all other sessions</Button>
					</div>
				</GlassCard>
			</div>
		</div>
	)
}

function Field({ label, value, onChange, icon, disabled }: { label: string; value: string; onChange?: (v: string) => void; icon?: React.ReactNode; disabled?: boolean }) {
	return (
		<div>
			<Label>{label}</Label>
			<div className="relative mt-1.5">
				{icon ? <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">{icon}</span> : null}
				<Input value={value} onChange={(e) => onChange?.(e.target.value)} className={icon ? "pl-9" : undefined} disabled={disabled} />
			</div>
		</div>
	)
}

function Social({ icon, placeholder, value, onChange }: { icon: React.ReactNode; placeholder: string; value: string; onChange: (v: string) => void }) {
	return (
		<div className="relative">
			<span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">{icon}</span>
			<Input placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className="pl-9" />
		</div>
	)
}

function Line({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
	return (
		<div className="flex items-center justify-between py-1.5 text-sm">
			<span className="flex items-center gap-2 text-text-muted">{icon}{label}</span>
			<span className="text-text-primary">{value}</span>
		</div>
	)
}