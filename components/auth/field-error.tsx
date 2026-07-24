import { AlertCircle } from "lucide-react"

export function FieldError({ message }: { message?: string }) {
	if (!message) return null
	return (
		<p className="mt-1.5 flex items-center gap-1.5 text-xs text-state-danger">
			<AlertCircle className="h-3.5 w-3.5" />
			{message}
		</p>
	)
}
