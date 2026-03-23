import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium tracking-[0.01em] transition-[background-color,box-shadow,transform] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:ring-4 focus-visible:ring-ring aria-invalid:ring-destructive/20",
  {
    variants: {
      variant: {
        default:
          "bg-linear-to-r from-primary via-primary to-primary-container text-primary-foreground shadow-[0_32px_64px_-32px_rgba(28,28,24,0.16)] hover:from-primary-container hover:via-primary hover:to-primary",
        destructive:
          "bg-destructive text-primary-foreground shadow-[0_28px_56px_-30px_rgba(184,77,58,0.28)] hover:bg-destructive/90",
        outline:
          "bg-input text-foreground ring-1 ring-border/70 hover:bg-surface-container-highest hover:text-foreground",
        secondary:
          "bg-surface-container-highest text-secondary-foreground hover:bg-surface-container-high",
        ghost: "text-foreground hover:bg-surface-container-low hover:text-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-11 px-5 py-3 has-[>svg]:px-4",
        sm: "h-9 gap-1.5 px-4 has-[>svg]:px-3",
        lg: "h-12 px-7 py-3.5 has-[>svg]:px-5",
        icon: "size-11",
        "icon-sm": "size-9",
        "icon-lg": "size-12",
      },
      state: {
        active: "ring-2 ring-secondary/35",
        inactive: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  state = "inactive",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, state, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
