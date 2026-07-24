"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react"
import { AuthShell } from "@/components/auth/auth-shell"
import { FieldError } from "@/components/auth/field-error"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader } from "@/components/shared/loader"
import { PasswordStrength } from "@/components/shared/password-strength"
import { resetSchema, type ResetInput } from "@/lib/validation"

export default function ResetPasswordPage() {
	const router = useRouter()
	const [show, setShow] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		watch,
	} = useForm<ResetInput>({
		resolver: zodResolver(resetSchema),
		defaultValues: { password: "", confirm: "" },
	})

	const password = watch("password")

	const onSubmit = async () => {
		await new Promise((r) => setTimeout(r, 700))
		toast.success("Password updated", { description: "You can sign in now." })
		router.push("/login")
	}

	return (
		<AuthShell
			title="Set a new password"
			subtitle="Choose something strong. We'll sign you in after this."
			footer={
				<>
					Back to{" "}
					<Link href="/login" className="text-accent-primary hover:underline">sign in</Link>
				</>
			}
		>
			<div className="mb-6 flex justify-center">
				<div className="rounded-2xl border border-accent-secondary/30 bg-accent-secondary/[0.08] p-4">
					<ShieldCheck className="h-6 w-6 text-accent-secondary" />
				</div>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div>
					<Label htmlFor="password">New password</Label>
					<div className="relative mt-1.5">
						<Input
							id="password"
							type={show ? "text" : "password"}
							className="pr-11"
							{...register("password")}
						/>
						<button
							type="button"
							onClick={() => setShow((s) => !s)}
							className="absolute inset-y-0 right-3 flex items-center text-text-muted hover:text-text-primary"
						>
							{show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
						</button>
					</div>
					<FieldError message={errors.password?.message} />
					<div className="mt-2">
						<PasswordStrength value={password ?? ""} />
					</div>
				</div>

				<div>
					<Label htmlFor="confirm">Confirm password</Label>
					<Input
						id="confirm"
						type={show ? "text" : "password"}
						className="mt-1.5"
						{...register("confirm")}
					/>
					<FieldError message={errors.confirm?.message} />
				</div>

				<Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
					{isSubmitting ? <Loader /> : null}
					Update password
					<ArrowRight className="h-4 w-4" />
				</Button>
			</form>
		</AuthShell>
	)
}
