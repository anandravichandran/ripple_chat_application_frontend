"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Eye, EyeOff, ArrowRight, Check } from "lucide-react"
import { AuthShell } from "@/components/auth/auth-shell"
import { OrDivider, SocialButtons } from "@/components/auth/social-buttons"
import { FieldError } from "@/components/auth/field-error"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader } from "@/components/shared/loader"
import { PasswordStrength } from "@/components/shared/password-strength"
import { registerSchema, type RegisterInput } from "@/lib/validation"

export default function RegisterPage() {
	const router = useRouter()
	const [showPassword, setShowPassword] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		watch,
		setValue,
	} = useForm<RegisterInput>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			username: "",
			email: "",
			password: "",
			confirm: "",
			terms: false as unknown as true,
		},
	})

	const password = watch("password")
	const terms = watch("terms")

	const onSubmit = async (values: RegisterInput) => {
		await new Promise((r) => setTimeout(r, 700))
		toast.success("Account created", { description: "We sent a verification code to " + values.email })
		router.push(`/verify-email?email=${encodeURIComponent(values.email)}`)
	}

	return (
		<AuthShell
			title="Create your account"
			subtitle="Start collaborating in secure real-time rooms."
			footer={
				<>
					Already have an account?{" "}
					<Link href="/login" className="text-accent-primary hover:underline">
						Sign in
					</Link>
				</>
			}
		>
			<SocialButtons />
			<OrDivider />

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div className="grid grid-cols-2 gap-3">
					<div className="col-span-2 sm:col-span-1">
						<Label htmlFor="name">Full name</Label>
						<Input id="name" placeholder="Ada Lovelace" className="mt-1.5" {...register("name")} />
						<FieldError message={errors.name?.message} />
					</div>
					<div className="col-span-2 sm:col-span-1">
						<Label htmlFor="username">Username</Label>
						<Input id="username" placeholder="ada" className="mt-1.5" {...register("username")} />
						<FieldError message={errors.username?.message} />
					</div>
				</div>

				<div>
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						type="email"
						autoComplete="email"
						placeholder="you@company.com"
						className="mt-1.5"
						{...register("email")}
					/>
					<FieldError message={errors.email?.message} />
				</div>

				<div>
					<Label htmlFor="password">Password</Label>
					<div className="relative mt-1.5">
						<Input
							id="password"
							type={showPassword ? "text" : "password"}
							placeholder="At least 8 characters"
							className="pr-11"
							{...register("password")}
						/>
						<button
							type="button"
							onClick={() => setShowPassword((s) => !s)}
							className="absolute inset-y-0 right-3 flex items-center text-text-muted hover:text-text-primary"
						>
							{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
						type={showPassword ? "text" : "password"}
						className="mt-1.5"
						{...register("confirm")}
					/>
					<FieldError message={errors.confirm?.message} />
				</div>

				<label className="mt-1 flex items-start gap-2.5">
					<button
						type="button"
						onClick={() => setValue("terms", !terms as unknown as true, { shouldValidate: true })}
						className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-md border transition-colors ${
							terms
								? "border-accent-primary bg-accent-primary text-black"
								: "border-glass-borderStrong bg-white/[0.03]"
						}`}
						aria-checked={!!terms}
						role="checkbox"
					>
						{terms ? <Check className="h-3 w-3" /> : null}
					</button>
					<span className="text-xs text-text-secondary">
						I agree to the{" "}
						<Link href="#" className="underline hover:text-text-primary">Terms of Service</Link> and{" "}
						<Link href="#" className="underline hover:text-text-primary">Privacy Policy</Link>.
					</span>
				</label>
				<FieldError message={errors.terms?.message as string | undefined} />

				<Button type="submit" size="lg" className="mt-1 w-full" disabled={isSubmitting}>
					{isSubmitting ? <Loader /> : null}
					Create account
					<ArrowRight className="h-4 w-4" />
				</Button>
			</form>
		</AuthShell>
	)
}
