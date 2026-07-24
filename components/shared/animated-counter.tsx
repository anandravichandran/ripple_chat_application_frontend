"use client"
import { useEffect, useRef, useState } from "react"
import { useInView, useMotionValue, useSpring } from "framer-motion"

type Props = { value: number; divisor?: number; decimals?: number; suffix?: string; duration?: number }

export function AnimatedCounter({ value, divisor = 1, decimals = 0, suffix = "", duration = 1.8 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { duration: duration * 1000, bounce: 0 })
  const [display, setDisplay] = useState("0")

  useEffect(() => { if (inView) mv.set(value) }, [inView, mv, value])
  useEffect(() => {
    return spring.on("change", (v) => {
      const scaled = v / divisor
      setDisplay(scaled.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }))
    })
  }, [spring, divisor, decimals])

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      <span className="text-accent">{suffix}</span>
    </span>
  )
}
