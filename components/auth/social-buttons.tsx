"use client"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"

function GoogleIcon() {
	return (
		<svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
			<path fill="#EA4335" d="M12 10.2v3.72h5.16c-.22 1.32-1.68 3.87-5.16 3.87A5.79 5.79 0 016.21 12 5.79 5.79 0 0112 6.21c1.83 0 3.06.78 3.76 1.45l2.55-2.47C16.71 3.68 14.6 2.7 12 2.7 6.86 2.7 2.7 6.86 2.7 12s4.16 9.3 9.3 9.3c5.36 0 8.9-3.76 8.9-9.06 0-.61-.07-1.08-.15-1.55L12 10.2z" />
		</svg>
	)
}

function GithubIcon() {
	return (
		<svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden fill="currentColor">
			<path d="M12 .5A11.5 11.5 0 00.5 12a11.5 11.5 0 007.86 10.94c.57.1.78-.25.78-.55v-2.06c-3.2.7-3.87-1.36-3.87-1.36-.52-1.31-1.28-1.66-1.28-1.66-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.72-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 015.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.58.24 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.26 5.69.41.35.78 1.05.78 2.12v3.15c0 .3.21.66.79.55A11.5 11.5 0 0023.5 12 11.5 11.5 0 0012 .5z" />
		</svg>
	)
}

export function SocialButtons() {
	const placeholder = () =>
		toast("Social login is placeholder in this build.", { description: "Wire an OAuth provider on the server." })
	return (
		<div className="grid grid-cols-2 gap-3">
			<Button variant="secondary" size="md" onClick={placeholder} type="button">
				<GoogleIcon />
				Google
			</Button>
			<Button variant="secondary" size="md" onClick={placeholder} type="button">
				<GithubIcon />
				GitHub
			</Button>
		</div>
	)
}

export function OrDivider() {
	return (
		<div className="my-6 flex items-center gap-3">
			<div className="h-px flex-1 bg-glass-border" />
			<span className="text-xs uppercase tracking-widest text-text-muted">or</span>
			<div className="h-px flex-1 bg-glass-border" />
		</div>
	)
}
