"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { ArrowRight } from "lucide-react"
import { AuthShell } from "@/components/auth/auth-shell"
import { FieldError } from "@/components/auth/field-error"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { forgotSchema, type ForgotInput } from "@/lib/validation"
import { authApi } from "@/lib/api"

export default function ForgotPasswordPage() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isSubmitSuccessful },
	} = useForm<ForgotInput>({
		resolver: zodResolver(forgotSchema),
		defaultValues: { email: "" },
	})

	const onSubmit = async (values: ForgotInput) => {
		await authApi.forgotPassword(values.email)
		toast.success("Check your inbox", { description: `Reset link sent to ${values.email}` })
	}

	return (
		<AuthShell
			title="Reset your password"
			subtitle="Enter your email and we'll send a secure reset link."
			footer={
				<>
					Remembered it?{" "}
					<Link href="/login" className="text-accent-primary hover:underline">Back to sign in</Link>
				</>
			}
		>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

				<Button type="submit" size="lg" className="w-full" loading={isSubmitting}>
					Send reset link
					<ArrowRight className="h-4 w-4" />
				</Button>

				{isSubmitSuccessful ? (
					<p className="rounded-2xl border border-accent-primary/25 bg-accent-primary/[0.08] px-4 py-3 text-center text-sm text-accent-primary">
						If an account exists, you'll receive an email shortly.
					</p>
				) : null}
			</form>
		</AuthShell>
	)
}
