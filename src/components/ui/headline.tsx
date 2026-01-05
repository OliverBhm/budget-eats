import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Headline styles are decoupled from the semantic HTML tag.
// You can render an h1 with the visual style of an h4, etc.
const headlineVariants = cva("font-sans font-semibold tracking-tight", {
  variants: {
    level: {
      h1: "text-4xl md:text-5xl",
      h2: "text-3xl md:text-4xl",
      h3: "text-2xl md:text-3xl",
      h4: "text-xl md:text-2xl",
      h5: "text-lg md:text-xl",
      h6: "text-base md:text-lg",
    },
    tone: {
      default: "text-foreground",
      muted: "text-muted-foreground",
    },
  },
  defaultVariants: {
    level: "h3",
    tone: "default",
  },
});

export interface HeadlineProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headlineVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

function Headline({
  as: Comp = "h2",
  level,
  tone,
  className,
  ...props
}: HeadlineProps) {
  return (
    <Comp
      className={cn(headlineVariants({ level, tone }), className)}
      {...props}
    />
  );
}

export { Headline };
