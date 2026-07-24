"use client"

import { useEffect, useState } from "react"
import { animate, useInView, useMotionValue } from "framer-motion"
import { useRef } from "react"

export function AnimatedCounter({
	value,
	suffix = "",
	prefix = "",
	decimals = 0,
	duration = 1.4,
}: {
	value: number
	suffix?: string
	prefix?: string
	decimals?: number
	duration?: number
}) {
	const ref = useRef<HTMLSpanElement>(null)
	const inView = useInView(ref, { once: true, margin: "-40px" })
	const mv = useMotionValue(0)
	const [display, setDisplay] = useState("0")

	useEffect(() => {
		if (!inView) return
		const controls = animate(mv, value, {
			duration,
			ease: [0.16, 1, 0.3, 1],
			onUpdate: (v) => setDisplay(v.toFixed(decimals)),
		})
		return () => controls.stop()
	}, [inView, value, duration, mv, decimals])

	return (
		<span ref={ref}>
			{prefix}
			{display}
			{suffix}
		</span>
	)
}
