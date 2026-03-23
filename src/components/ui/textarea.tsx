import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border border-transparent bg-input placeholder:text-muted-foreground flex field-sizing-content min-h-24 w-full rounded-[0.25rem] px-3 py-3 text-base shadow-[0_18px_36px_-28px_rgba(28,28,24,0.12)] transition-[background-color,box-shadow,border-color] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-border focus-visible:bg-surface-container-highest focus-visible:ring-4 focus-visible:ring-ring",
        "aria-invalid:border-destructive aria-invalid:ring-4 aria-invalid:ring-destructive/15",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
