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
        ghost:
          "glass glass-hover text-fg",
        outline:
          "border border-border hover:border-border-hover text-fg bg-transparent",
        link: "text-accent hover:underline underline-offset-4",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-5",
        lg: "h-12 px-6",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  }
)
Button.displayName = "Button"
export { buttonVariants }
