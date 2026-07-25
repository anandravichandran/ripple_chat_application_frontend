"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence, motion } from "framer-motion"
import { Lock, Globe, Upload, CheckCircle2, Sparkles } from "lucide-react"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { FieldError } from "@/components/auth/field-error"
import { createRoomSchema, type CreateRoomValues } from "@/lib/validation"
import { cn } from "@/lib/utils"
import { roomsApi } from "@/lib/api"

export function CreateRoomModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
	const [success, setSuccess] = useState(false)
	const {
		register,
		handleSubmit,
		reset,
		watch,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<CreateRoomValues>({
		resolver: zodResolver(createRoomSchema),
		defaultValues: { name: "", description: "", visibility: "public", password: "", icon: "✨" },
	})

	const visibility = watch("visibility")
	const icon = watch("icon")

	useEffect(() => {
		if (!open) {
			reset()
			setSuccess(false)
		}
	}, [open, reset])

	async function onSubmit(values: CreateRoomValues) {
		try {
			await roomsApi.create({
				name: values.name,
				description: values.description || undefined,
				icon: values.icon || undefined,
				visibility: values.visibility.toUpperCase() as "PUBLIC" | "PRIVATE",
				password: values.password || undefined,
			})
			setSuccess(true)
			toast.success(`“${values.name}” is ready`)
			setTimeout(() => onOpenChange(false), 1400)
		} catch {
			toast.error("Failed to create room")
		}
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-lg p-0">
				<AnimatePresence mode="wait">
					{success ? (
						<motion.div
							key="success"
							initial={{ opacity: 0, scale: 0.94 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0 }}
							className="flex flex-col items-center gap-3 p-10 text-center"
						>
							<motion.div
								initial={{ scale: 0.4, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								transition={{ type: "spring", stiffness: 220, damping: 14 }}
								className="flex h-16 w-16 items-center justify-center rounded-3xl border border-state-success/30 bg-state-success/10 text-state-success"
							>
								<CheckCircle2 className="h-8 w-8" />
							</motion.div>
							<h3 className="text-lg font-semibold tracking-tight">Room created</h3>
							<p className="max-w-sm text-sm text-text-secondary">Your new room is live. Invite teammates from the settings tab.</p>
						</motion.div>
					) : (
						<motion.form
							key="form"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onSubmit={handleSubmit(onSubmit)}
							className="p-6"
						>
							<DialogHeader>
								<div className="mb-1 inline-flex w-fit items-center gap-1.5 rounded-full border border-glass-border bg-white/[0.03] px-2.5 py-1 text-[11px] text-text-secondary">
									<Sparkles className="h-3 w-3 text-accent-primary" />New room
								</div>
								<DialogTitle>Create a room</DialogTitle>
								<DialogDescription>Spin up a space for a team, project, or side-quest.</DialogDescription>
							</DialogHeader>

							<div className="mt-5 space-y-4">
								<div className="flex items-center gap-3">
									<button
										type="button"
										className="group relative flex h-16 w-16 items-center justify-center rounded-2xl border border-glass-border bg-white/[0.04] text-2xl transition-colors hover:border-accent-primary/40"
										onClick={() => {
											const icons = ["✨", "🚀", "🎨", "🔒", "💡", "🎯", "🌊", "⚡"]
											setValue("icon", icons[Math.floor(Math.random() * icons.length)])
										}}
										aria-label="Randomize icon"
									>
										{icon}
										<span className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-glass-border bg-bg-primary text-text-muted">
											<Upload className="h-3 w-3" />
										</span>
									</button>
									<div className="flex-1 space-y-1.5">
										<Label htmlFor="name">Room name</Label>
										<Input id="name" placeholder="e.g. Design Systems" {...register("name")} />
										<FieldError message={errors.name?.message} />
									</div>
								</div>

								<div className="space-y-1.5">
									<Label htmlFor="description">Description</Label>
									<Textarea id="description" rows={3} placeholder="What is this room for?" {...register("description")} />
									<FieldError message={errors.description?.message} />
								</div>

								<div className="space-y-1.5">
									<Label>Visibility</Label>
									<div className="grid grid-cols-2 gap-2">
										{(["public", "private"] as const).map((v) => (
											<button
												key={v}
												type="button"
												onClick={() => setValue("visibility", v, { shouldValidate: true })}
												className={cn(
													"flex items-start gap-3 rounded-2xl border p-3 text-left transition-colors",
													visibility === v
														? "border-accent-primary/40 bg-accent-primary/[0.06]"
														: "border-glass-border bg-white/[0.02] hover:bg-glass-hover",
												)}
											>
												<div className="flex h-8 w-8 items-center justify-center rounded-lg border border-glass-border bg-white/[0.04]">
													{v === "public" ? <Globe className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
												</div>
												<div>
													<p className="text-sm font-medium capitalize">{v}</p>
													<p className="text-xs text-text-muted">
														{v === "public" ? "Anyone in your team can join." : "Invite-only. Password protected."}
													</p>
												</div>
											</button>
										))}
									</div>
								</div>

								{visibility === "private" ? (
									<div className="space-y-1.5">
										<Label htmlFor="password">Room password</Label>
										<Input id="password" type="password" placeholder="At least 6 characters" {...register("password")} />
										<FieldError message={errors.password?.message} />
									</div>
								) : null}
							</div>

							<div className="mt-6 flex items-center justify-end gap-2">
								<Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
								<Button type="submit" loading={isSubmitting}>Create room</Button>
							</div>
						</motion.form>
					)}
				</AnimatePresence>
			</DialogContent>
		</Dialog>
	)
}
