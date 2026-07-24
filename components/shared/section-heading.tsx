import { cn } from "@/lib/utils"

export function SectionHeading({
	eyebrow,
	title,
	description,
	align = "left",
	className,
	actions,
}: {
	eyebrow?: string
	title: string
	description?: string
	align?: "left" | "center"
	className?: string
	actions?: React.ReactNode
}) {
	return (
		<div
			className={cn(
				"flex flex-col gap-2",
				align === "center" && "items-center text-center",
				actions && "sm:flex-row sm:items-end sm:justify-between",
				className,
			)}
		>
			<div className={cn(align === "center" ? "items-center" : "", "flex flex-col gap-2") }>
				{eyebrow ? (
					<span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent-primary/25 bg-accent-primary/[0.08] px-3 py-1 text-xs font-medium uppercase tracking-widest text-accent-primary">
						<span className="h-1.5 w-1.5 rounded-full bg-accent-primary shadow-[0_0_10px_2px_rgba(217,255,102,0.8)]" />
						{eyebrow}
					</span>
				) : null}
				<h2 className="text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
					{title}
				</h2>
				{description ? (
					<p className="max-w-2xl text-subtitle text-text-secondary">{description}</p>
				) : null}
			</div>
			{actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
		</div>
	)
}
