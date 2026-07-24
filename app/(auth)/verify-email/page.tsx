"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { ArrowRight, Mail } from "lucide-react"
import { AuthShell } from "@/components/auth/auth-shell"
import { Button } from "@/components/ui/button"
import { Loader } from "@/components/shared/loader"
import { useAuthStore } from "@/store/auth-store"

export default function VerifyEmailPage() {
	const router = useRouter()
	const params = useSearchParams()
	const email = params.get("email") ?? "you@company.com"
	const [code, setCode] = useState<string[]>(["", "", "", "", "", ""])
	const [loading, setLoading] = useState(false)
	const [seconds, setSeconds] = useState(30)
	const inputs = useRef<Array<HTMLInputElement | null>>([])

	useEffect(() => {
		inputs.current[0]?.focus()
	}, [])

	useEffect(() => {
		if (seconds <= 0) return
		const t = setInterval(() => setSeconds((s) => s - 1), 1000)
		return () => clearInterval(t)
	}, [seconds])

	const updateAt = (idx: number, v: string) => {
		const digit = v.replace(/\D/g, "").slice(-1)
		const next = [...code]
		next[idx] = digit
		setCode(next)
		if (digit && idx < 5) inputs.current[idx + 1]?.focus()
	}

	const onKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Backspace" && !code[idx] && idx > 0) inputs.current[idx - 1]?.focus()
	}

	const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
		if (!text) return
		e.preventDefault()
		const next = text.split("").concat(Array(6).fill("")).slice(0, 6)
		setCode(next)
		inputs.current[Math.min(text.length, 5)]?.focus()
	}

	const verifyEmail = useAuthStore((s) => s.verifyEmail)
	const resendOtp = useAuthStore((s) => s.resendOtp)

	const submit = async () => {
		if (code.some((d) => !d)) {
			toast.error("Enter the 6-digit code")
			return
		}
		setLoading(true)
		try {
			await verifyEmail(email, code.join(""))
			toast.success("Email verified", { description: "You can sign in now." })
			router.push("/login")
		} catch (err: unknown) {
			const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? "Verification failed"
			toast.error(msg)
		} finally {
			setLoading(false)
		}
	}

	return (
		<AuthShell
			title="Verify your email"
			subtitle={`We sent a 6-digit code to ${email}.`}
			footer={
				<>
					Wrong email?{" "}
					<Link href="/register" className="text-accent-primary hover:underline">
						Go back
					</Link>
				</>
			}
		>
			<motion.div
				initial={{ opacity: 0, scale: 0.98 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.4, ease: "easeOut" }}
				className="mb-6 flex items-center justify-center"
			>
				<div className="rounded-2xl border border-accent-primary/30 bg-accent-primary/[0.1] p-4">
					<Mail className="h-6 w-6 text-accent-primary" />
				</div>
			</motion.div>

			<div className="mb-6 flex justify-between gap-2">
				{code.map((d, i) => (
					<input
						key={i}
						ref={(el) => {
							inputs.current[i] = el
						}}
						value={d}
						onChange={(e) => updateAt(i, e.target.value)}
						onKeyDown={(e) => onKeyDown(i, e)}
						onPaste={onPaste}
						inputMode="numeric"
						autoComplete="one-time-code"
						maxLength={1}
						aria-label={`Digit ${i + 1}`}
						className="h-14 w-full rounded-2xl border border-glass-border bg-white/[0.03] text-center text-xl font-semibold tracking-widest text-text-primary focus:border-accent-primary/60 focus:outline-none focus:ring-2 focus:ring-accent-primary/30"
					/>
				))}
			</div>

			<Button size="lg" className="w-full" onClick={submit} disabled={loading}>
				{loading ? <Loader /> : null}
				Verify email
				<ArrowRight className="h-4 w-4" />
			</Button>

			<div className="mt-4 text-center text-sm text-text-muted">
			{seconds > 0 ? (
				<>Resend in <span className="text-text-secondary">{seconds}s</span></>
			) : (
				<button
					className="text-accent-primary hover:underline"
					onClick={async () => {
						try {
							await resendOtp(email)
							setSeconds(30)
							toast("Code resent", { description: `Check ${email}` })
						} catch {
							toast.error("Failed to resend code")
						}
					}}
				>
					Resend code
				</button>
			)}
			</div>
		</AuthShell>
	)
}
