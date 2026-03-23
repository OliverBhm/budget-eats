import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function NativeSelect({ className, ...props }: React.ComponentProps<"select">) {
  return (
    <div
      className="group/native-select relative w-fit has-[select:disabled]:opacity-50"
      data-slot="native-select-wrapper"
    >
      <select
        data-slot="native-select"
        className={cn(
          "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground h-11 w-full min-w-0 appearance-none rounded-[0.25rem] border border-transparent bg-input px-3 py-2 pr-9 text-sm shadow-[0_18px_36px_-28px_rgba(28,28,24,0.12)] transition-[background-color,box-shadow,border-color] outline-none disabled:pointer-events-none disabled:cursor-not-allowed",
          "focus-visible:border-border focus-visible:bg-surface-container-highest focus-visible:ring-4 focus-visible:ring-ring",
          "aria-invalid:border-destructive aria-invalid:ring-4 aria-invalid:ring-destructive/15",
          className
        )}
        {...props}
      />
      <ChevronDownIcon
        className="text-muted-foreground pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 opacity-50 select-none"
        aria-hidden="true"
        data-slot="native-select-icon"
      />
    </div>
  )
}

function NativeSelectOption({ ...props }: React.ComponentProps<"option">) {
  return <option data-slot="native-select-option" {...props} />
}

function NativeSelectOptGroup({
  className,
  ...props
}: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn(className)}
      {...props}
    />
  )
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }
