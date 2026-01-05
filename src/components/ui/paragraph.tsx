import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const paragraphVariants = cva("font-sans leading-relaxed", {
  variants: {
    variant: {
      default: "text-foreground",
      muted: "text-muted-foreground",
    },
    size: {
      xs: "text-xs",
      md: "text-md md:text-base",
      lg: "text-base md:text-lg",
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
  ...props
}: ParagraphProps) {
  return (
    <p
      className={cn(paragraphVariants({ variant, size, weight }), className)}
      {...props}
    />
  );
}

export { Paragraph };
