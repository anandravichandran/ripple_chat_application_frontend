"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Bell, Palette, Shield, User as UserIcon, Globe, Monitor, KeyRound, Trash2, Sun, Moon, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GlassCard } from "@/components/shared/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/shared/page-header"
import { useThemeStore } from "@/store/theme-store"
import { useAuthStore } from "@/store/auth-store"
import { useProfile, useUpdateProfile } from "@/hooks/use-profile"
import { cn } from "@/lib/utils"

export default function SettingsPage() {
	const user = useAuthStore((s) => s.user)
	const setUser = useAuthStore((s) => s.setUser)
	const updateProfile = useUpdateProfile()
	const { isLoading: profileLoading } = useProfile()

	const [name, setName] = useState(user?.name ?? "")
	const [username, setUsername] = useState(user?.username ?? "")
	const [email, setEmail] = useState(user?.email ?? "")
	const [phone, setPhone] = useState(user?.phone ?? "")
	const [bio, setBio] = useState(user?.bio ?? "")

	useEffect(() => {
		if (user) {
			setName(user.name ?? "")
			setUsername(user.username ?? "")
			setEmail(user.email ?? "")
			setPhone(user.phone ?? "")
			setBio(user.bio ?? "")
		}
	}, [user])

	const handleSave = useCallback(async () => {
		const body: Record<string, unknown> = {}
		if (name !== user?.name) body.name = name
		if (bio !== user?.bio) body.bio = bio || null
		if (phone !== user?.phone) body.phone = phone || null
		if (Object.keys(body).length === 0) { toast.info("No changes"); return }
		try {
			await updateProfile.mutateAsync(body as any)
			toast.success("Profile updated")
		} catch { toast.error("Failed to update profile") }
	}, [name, bio, phone, user, updateProfile])

	return (
		<div className="space-y-6">
			<PageHeader eyebrow="Preferences" title="Settings" description="Tune Ripple to match how you work." />

			<Tabs defaultValue="general">
				<TabsList>
					<TabsTrigger value="general"><UserIcon className="h-3.5 w-3.5" />General</TabsTrigger>
					<TabsTrigger value="appearance"><Palette className="h-3.5 w-3.5" />Appearance</TabsTrigger>
					<TabsTrigger value="notifications"><Bell className="h-3.5 w-3.5" />Notifications</TabsTrigger>
					<TabsTrigger value="privacy"><Shield className="h-3.5 w-3.5" />Privacy</TabsTrigger>
					<TabsTrigger value="security"><KeyRound className="h-3.5 w-3.5" />Security</TabsTrigger>
					<TabsTrigger value="danger"><Trash2 className="h-3.5 w-3.5" />Danger</TabsTrigger>
				</TabsList>

				<TabsContent value="general">
					<GlassCard className="p-6">
						<SectionTitle title="Your profile" description="Basic information visible across Ripple." />
						<div className="grid gap-4 sm:grid-cols-2">
							<div><Label>Display name</Label><Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" /></div>
							<div><Label>Username</Label><Input value={username} className="mt-1.5" disabled /></div>
							<div><Label>Email</Label><Input value={email} className="mt-1.5" disabled /></div>
							<div>
								<Label>Phone</Label>
								<Input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1.5" placeholder="+1 (555) 000-0000" />
							</div>
							<div className="sm:col-span-2">
								<Label>Bio</Label>
								<textarea
									rows={3}
									value={bio}
									onChange={(e) => setBio(e.target.value)}
									className="mt-1.5 w-full rounded-2xl border border-glass-border bg-white/[0.03] px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-primary/40 focus:outline-none"
								/>
							</div>
						</div>
						<Button className="mt-4" size="sm" onClick={handleSave} disabled={updateProfile.isPending}>
							{updateProfile.isPending && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
							Save changes
						</Button>
					</GlassCard>
				</TabsContent>

				<TabsContent value="appearance">
					<AppearanceSection />
				</TabsContent>

				<TabsContent value="notifications">
					<GlassCard className="p-6">
						<SectionTitle title="Notifications" description="Decide when Ripple gets to interrupt you." />
						<SwitchRow label="Desktop push notifications" description="Get notified about mentions and DMs." defaultChecked />
						<SwitchRow label="Email digest" description="Weekly summary of missed activity." defaultChecked />
						<SwitchRow label="Mobile notifications" description="Send alerts to Ripple mobile." defaultChecked />
						<SwitchRow label="Sound on new message" description="Subtle chime when a new message arrives." />
						<SwitchRow label="Do not disturb during focus hours" description="Silence pings from 9pm to 7am local time." defaultChecked />
					</GlassCard>
				</TabsContent>

				<TabsContent value="privacy">
					<GlassCard className="p-6">
						<SectionTitle title="Privacy" description="Control what teammates can see about you." />
						<SwitchRow label="Show online status" defaultChecked />
						<SwitchRow label="Show read receipts" defaultChecked />
						<SwitchRow label="Show typing indicators" defaultChecked />
						<SwitchRow label="Allow discovery by email" />
						<SwitchRow label="Share analytics with Ripple" defaultChecked />
					</GlassCard>
				</TabsContent>

				<TabsContent value="security">
					<div className="grid gap-6 lg:grid-cols-2">
						<GlassCard className="p-6">
							<SectionTitle title="Password" description="Update your password regularly." />
							<div className="space-y-3">
								<div><Label>Current password</Label><Input type="password" className="mt-1.5" /></div>
								<div><Label>New password</Label><Input type="password" className="mt-1.5" /></div>
								<div><Label>Confirm new password</Label><Input type="password" className="mt-1.5" /></div>
								<Button className="mt-2" onClick={() => toast.success("Password updated successfully")}>Update password</Button>
							</div>
						</GlassCard>
						<GlassCard className="p-6">
							<SectionTitle title="Two-factor authentication" description="Add a second layer of protection." />
							<SwitchRow label="Authenticator app" description="Requires a 6-digit code from Authy or 1Password." defaultChecked />
							<SwitchRow label="Backup codes" description="10 single-use recovery codes." />
							<SwitchRow label="Passkeys" description="Sign in with device biometrics." defaultChecked />
						</GlassCard>
					</div>
				</TabsContent>

				<TabsContent value="danger">
					<GlassCard className="border-state-danger/25 p-6">
						<SectionTitle title="Danger zone" description="Irreversible actions. Proceed with care." />
						<div className="flex flex-col gap-3 rounded-2xl border border-state-danger/25 bg-state-danger/[0.06] p-4 sm:flex-row sm:items-center sm:justify-between">
							<div>
								<p className="text-sm font-medium">Export account data</p>
								<p className="text-xs text-text-muted">Download a copy of everything Ripple stores about you.</p>
							</div>
							<Button variant="secondary" onClick={() => toast.success("Export requested — check your email")}>Request export</Button>
						</div>
						<div className="mt-3 flex flex-col gap-3 rounded-2xl border border-state-danger/25 bg-state-danger/[0.06] p-4 sm:flex-row sm:items-center sm:justify-between">
							<div>
								<p className="text-sm font-medium">Delete account</p>
								<p className="text-xs text-text-muted">Permanently remove your Ripple account and all associated data.</p>
							</div>
							<Button variant="danger" onClick={() => toast.error("Account deletion is irreversible — confirmation sent to your email")}>Delete account</Button>
						</div>
					</GlassCard>
				</TabsContent>
			</Tabs>
		</div>
	)
}

function SectionTitle({ title, description }: { title: string; description: string }) {
	return (
		<div className="mb-5">
			<h3 className="text-base font-semibold tracking-tight">{title}</h3>
			<p className="mt-1 text-sm text-text-muted">{description}</p>
		</div>
	)
}

function SwitchRow({ label, description, defaultChecked }: { label: string; description?: string; defaultChecked?: boolean }) {
	return (
		<div className="flex items-center justify-between gap-3 border-t border-glass-border py-3 first:border-t-0">
			<div>
				<p className="text-sm font-medium text-text-primary">{label}</p>
				{description ? <p className="text-xs text-text-muted">{description}</p> : null}
			</div>
			<Switch defaultChecked={defaultChecked} />
		</div>
	)
}

function AppearanceSection() {
	const { mode, setMode, accent, setAccent } = useThemeStore()
	const accents = [
		{ id: "lime", value: "#D9FF66" },
		{ id: "aqua", value: "#A8F5FF" },
		{ id: "violet", value: "#C4B5FD" },
		{ id: "peach", value: "#FBBF77" },
	] as const
	return (
		<div className="space-y-6">
			<GlassCard className="p-6">
				<SectionTitle title="Theme" description="Ripple ships with a premium dark theme. Light mode is available." />
				<div className="grid gap-3 sm:grid-cols-2">
					{(["dark", "light", "system"] as const).map((m) => (
						<motion.button
							key={m}
							type="button"
							whileHover={{ y: -2 }}
							onClick={() => setMode(m)}
							className={cn(
								"group relative overflow-hidden rounded-2xl border p-4 text-left transition-colors",
								mode === m ? "border-accent-primary/40 bg-accent-primary/[0.06]" : "border-glass-border bg-white/[0.02] hover:bg-glass-hover",
							)}
						>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<div className={cn("flex h-8 w-8 items-center justify-center rounded-xl border border-glass-border", m === "dark" ? "bg-[#0A0A0A]" : m === "light" ? "bg-white" : "bg-[#0A0A0A]/60")}> 
										{m === "dark" ? <Moon className="h-3.5 w-3.5 text-accent-primary" /> : m === "light" ? <Sun className="h-3.5 w-3.5 text-amber-500" /> : <Monitor className="h-3.5 w-3.5 text-accent-secondary" />}
									</div>
									<p className="text-sm font-medium capitalize">{m} mode</p>
								</div>
								{mode === m ? <Badge variant="accent">Selected</Badge> : null}
							</div>
							<div className={cn("mt-4 h-24 overflow-hidden rounded-xl border border-glass-border p-3", m === "dark" ? "bg-[#0A0A0A]" : m === "light" ? "bg-white text-black" : "bg-[#0A0A0A]/40")}> 
								<div className="flex items-center gap-2 text-xs">
									<span className="h-2 w-2 rounded-full bg-accent-primary" />
									<span className={m === "dark" ? "text-text-muted" : "text-neutral-500"}>Preview</span>
								</div>
								<div className="mt-2 space-y-1.5">
									<div className={cn("h-1.5 w-3/4 rounded-full", m === "dark" ? "bg-white/10" : m === "light" ? "bg-neutral-200" : "bg-white/10")} />
									<div className={cn("h-1.5 w-1/2 rounded-full", m === "dark" ? "bg-white/10" : m === "light" ? "bg-neutral-200" : "bg-white/10")} />
								</div>
							</div>
						</motion.button>
					))}
				</div>
			</GlassCard>
			<GlassCard className="p-6">
				<SectionTitle title="Accent color" description="A subtle pop of color across the interface." />
				<div className="flex flex-wrap items-center gap-3">
					{accents.map((a) => (
						<button
							key={a.id}
							type="button"
							onClick={() => setAccent(a.id as any)}
							className={cn(
								"h-10 w-10 rounded-2xl border transition-all",
								accent === a.id ? "ring-2 ring-offset-2 ring-offset-bg-primary" : "border-glass-border",
							)}
							style={{ backgroundColor: a.value, borderColor: a.value, boxShadow: accent === a.id ? `0 0 0 3px ${a.value}55` : undefined }}
							aria-label={a.id}
						/>
					))}
				</div>
			</GlassCard>
			<GlassCard className="p-6">
				<SectionTitle title="Interface density" description="Compact fits more; comfortable breathes more." />
				<SwitchRow label="Compact mode" description="Reduces vertical spacing across the app." />
				<SwitchRow label="Show avatars in threads" defaultChecked />
				<SwitchRow label="Animate background gradients" defaultChecked />
			</GlassCard>
		</div>
	)
}
