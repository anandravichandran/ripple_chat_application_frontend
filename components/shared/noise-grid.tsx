export function NoiseGrid({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 grid-bg opacity-60 ${className}`} />
  )
}
