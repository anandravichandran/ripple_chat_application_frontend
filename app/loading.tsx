import { FullPageLoader } from "@/components/shared/loader"
import { FloatingShapes } from "@/components/shared/floating-shapes"

export default function Loading() {
	return (
		<div className="relative min-h-screen">
			<FloatingShapes />
			<FullPageLoader label="Rippling…" />
		</div>
	)
}
