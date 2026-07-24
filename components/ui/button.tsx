"use client"
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-[15px] font-semibold transition-all duration-200 focus-ring disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "text-bg accent-gradient hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0",
        secondary:
          "glass glass-hover text-fg",
        ghost:
          "glass glass-hover text-fg",
        outline:
          "border border-border hover:border-border-hover text-fg bg-transparent",
        link: "text-accent hover:underline underline-offset-4",
        danger: "bg-state-danger/15 text-state-danger border border-state-danger/25 hover:bg-state-danger/25",
        gradient: "accent-gradient text-bg hover:shadow-glow",
      },
      size: {
        xs: "h-7 px-2.5 text-xs",
        sm: "h-9 px-4",
        md: "h-11 px-5",
        lg: "h-12 px-6",
        iconSm: "h-9 w-9 p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, loading, disabled, children, ...props }, ref) => {
    if (asChild) {
      const Comp = Slot
      return (
        <Comp
          ref={ref}
          className={cn(buttonVariants({ variant, size }), className)}
          {...props}
        >
          {children}
        </Comp>
      )
    }
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : null}
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"
export { buttonVariants }
