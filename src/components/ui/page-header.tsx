import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const pageHeaderTitleVariants = cva(
  "font-display font-semibold tracking-[-0.05em] text-foreground",
  {
    variants: {
      level: {
        h1: "text-5xl leading-none md:text-7xl",
        h2: "text-4xl leading-none md:text-5xl",
        h3: "text-3xl leading-[1.02] md:text-4xl",
        h4: "text-2xl leading-[1.05] md:text-3xl",
        h5: "text-xl leading-[1.1] md:text-2xl",
        h6: "text-lg leading-[1.15] md:text-xl",
      },
    },
    defaultVariants: {
      level: "h4",
    },
  }
);

const pageHeaderDescriptionVariants = cva(
  "font-sans text-sm leading-relaxed tracking-[0.01em] text-muted-foreground md:text-base"
);

function PageHeader({ className, ...props }: React.ComponentProps<"section">) {
  return <section className={cn("mb-4", className)} {...props} />;
}
function PageHeaderTitle({
  className,
  level = "h4",
  as = "h2",
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof pageHeaderTitleVariants> & {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  }) {
  const Comp = as;

  return (
    <Comp
      className={cn(pageHeaderTitleVariants({ level }), className)}
      {...props}
    />
  );
}
function PageHeaderDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(pageHeaderDescriptionVariants(), className)}
      {...props}
    />
  );
}

export { PageHeader, PageHeaderTitle, PageHeaderDescription };
