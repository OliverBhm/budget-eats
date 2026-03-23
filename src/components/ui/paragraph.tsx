import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const paragraphVariants = cva("font-sans leading-relaxed tracking-[0.01em]", {
  variants: {
    variant: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      inverse: "text-primary-foreground",
      spotlight: "text-[color:var(--on-secondary-container)]",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-sm md:text-base",
      lg: "text-base md:text-lg",
      "label-sm": "type-label-sm leading-[1.2]",
      "label-md": "type-label-md leading-[1.2]",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {}

function Paragraph({
  className,
  variant,
  size,
  weight,
  as,
  ...props
}: ParagraphProps & {
  as?: "p" | "span" | "div";
}) {
  const Comp = as ?? "p";

  return (
    <Comp
      className={cn(paragraphVariants({ variant, size, weight }), className)}
      {...props}
    />
  );
}

export { Paragraph };
