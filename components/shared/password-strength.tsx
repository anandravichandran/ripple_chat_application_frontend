"use client"

import { passwordStrength } from "@/lib/validation"
import { cn } from "@/lib/utils"

const tones = [
	"bg-white/10",
	"bg-state-danger",
	"bg-state-warn",
	"bg-accent-secondary",
	"bg-accent-primary",
]

export function PasswordStrength({ value }: { value: string }) {
	const { score, label } = passwordStrength(value)
	return (
		<div className="space-y-1.5">
			<div className="flex gap-1">
				{[0, 1, 2, 3].map((i) => (
					<div
						key={i}
						className={cn(
							"h-1 flex-1 rounded-full transition-all",
							i < score ? tones[score] : "bg-white/[0.05]",
						)}
					/>
				))}
			</div>
			<p className="text-xs text-text-muted">
				Strength: <span className="text-text-secondary">{value ? label : "—"}</span>
			</p>
		</div>
	)
}
