"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Eye, EyeOff, ArrowRight } from "lucide-react"
import { AuthShell } from "@/components/auth/auth-shell"
import { OrDivider, SocialButtons } from "@/components/auth/social-buttons"
import { FieldError } from "@/components/auth/field-error"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Loader } from "@/components/shared/loader"
import { loginSchema, type LoginInput } from "@/lib/validation"
import { useAuthStore } from "@/store/auth-store"

export default function LoginPage() {
	const router = useRouter()
	const signIn = useAuthStore((s) => s.signIn)
	const [showPassword, setShowPassword] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setValue,
		watch,
	} = useForm<LoginInput>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: "", password: "", remember: true },
	})

	const onSubmit = async (values: LoginInput) => {
		await new Promise((r) => setTimeout(r, 700))
		signIn({ email: values.email })
		toast.success("Welcome back", { description: "You're signed in." })
		router.push("/dashboard")
	}

	return (
		<AuthShell
			title="Welcome back"
			subtitle="Sign in to continue to Ripple Chat."
			footer={
				<>
					New to Ripple?{" "}
					<Link href="/register" className="text-accent-primary hover:underline">
						Create an account
					</Link>
				</>
			}
		>
			<SocialButtons />
			<OrDivider />

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div>
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						type="email"
						autoComplete="email"
						placeholder="you@company.com"
						className="mt-1.5"
						aria-invalid={!!errors.email}
						{...register("email")}
					/>
					<FieldError message={errors.email?.message} />
				</div>

				<div>
					<div className="flex items-center justify-between">
						<Label htmlFor="password">Password</Label>
						<Link
							href="/forgot-password"
							className="text-xs text-text-muted hover:text-text-primary"
						>
							Forgot password?
						</Link>
					</div>
					<div className="relative mt-1.5">
						<Input
							id="password"
							type={showPassword ? "text" : "password"}
							autoComplete="current-password"
							placeholder="••••••••"
							className="pr-11"
							aria-invalid={!!errors.password}
							{...register("password")}
						/>
						<button
							type="button"
							onClick={() => setShowPassword((s) => !s)}
							className="absolute inset-y-0 right-3 flex items-center text-text-muted hover:text-text-primary"
							aria-label={showPassword ? "Hide password" : "Show password"}
						>
							{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
						</button>
					</div>
					<FieldError message={errors.password?.message} />
				</div>

				<div className="flex items-center justify-between pt-1">
					<label className="flex items-center gap-2.5">
						<Switch
							checked={!!watch("remember")}
							onCheckedChange={(v) => setValue("remember", v)}
						/>
						<span className="text-sm text-text-secondary">Keep me signed in</span>
					</label>
				</div>

				<Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
					{isSubmitting ? <Loader /> : null}
					Sign in
					<ArrowRight className="h-4 w-4" />
				</Button>

				<p className="pt-2 text-center text-xs text-text-muted">
					By signing in you agree to our{" "}
					<Link href="#" className="underline hover:text-text-primary">Terms</Link> and{" "}
					<Link href="#" className="underline hover:text-text-primary">Privacy Policy</Link>.
				</p>
			</form>
		</AuthShell>
	)
}
