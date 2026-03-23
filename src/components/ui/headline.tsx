import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Headline styles are decoupled from the semantic HTML tag.
// You can render an h1 with the visual style of an h4, etc.
const headlineVariants = cva("font-display font-semibold text-foreground tracking-[-0.05em]", {
  variants: {
    level: {
      h1: "text-5xl leading-none md:text-7xl",
      h2: "text-4xl leading-none md:text-5xl",
      h3: "text-3xl leading-[1.02] md:text-4xl",
      h4: "text-2xl leading-[1.05] md:text-3xl",
      h5: "text-xl leading-[1.1] md:text-2xl",
      h6: "text-lg leading-[1.15] md:text-xl",
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
