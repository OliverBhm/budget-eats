import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  "text-card-foreground flex flex-col rounded-[1.5rem] border border-transparent",
  {
    variants: {
      variant: {
        default:
          "bg-card shadow-[0_32px_64px_-36px_rgba(28,28,24,0.12)]",
        surface: "bg-surface-container shadow-none",
        nested: "bg-surface-container-low shadow-none",
        lifted:
          "bg-surface-container-lowest shadow-[0_32px_64px_-36px_rgba(28,28,24,0.12)]",
        accent:
          "bg-primary text-primary-foreground shadow-[0_32px_64px_-36px_rgba(15,82,56,0.34)]",
        spotlight:
          "bg-secondary-container text-[color:var(--on-secondary-container)] shadow-[0_24px_48px_-30px_rgba(102,49,0,0.28)]",
        glass: "agrarian-panel bg-popover",
      },
      spacing: {
        default: "gap-6 py-6",
        compact: "gap-4 py-4",
        roomy: "gap-8 py-8",
        flush: "gap-0 py-0",
      },
    },
    defaultVariants: {
      variant: "default",
      spacing: "default",
    },
  }
)

function Card({
  className,
  variant,
  spacing,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      className={cn(
        cardVariants({ variant, spacing }),
        className,
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("font-display text-[1.75rem] leading-none font-semibold tracking-[-0.05em]", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm leading-relaxed", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  cardVariants,
}
