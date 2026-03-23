import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "type-label-sm inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full px-2.5 py-1 whitespace-nowrap [&>svg]:size-3 [&>svg]:pointer-events-none transition-[background-color,box-shadow] focus-visible:ring-4 focus-visible:ring-ring",
  {
    variants: {
      variant: {
        default:
          "bg-primary-fixed text-on-primary-fixed [a&]:hover:bg-[#c3f5d9]",
        secondary:
          "bg-secondary-container text-[color:var(--on-secondary-container)] [a&]:hover:bg-[#ffa654]",
        destructive:
          "bg-destructive text-primary-foreground [a&]:hover:bg-[#c45b49] focus-visible:ring-destructive/20",
        outline:
          "bg-surface-container-low text-foreground ring-1 ring-border/60 [a&]:hover:bg-surface-container-highest",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
