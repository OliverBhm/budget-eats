import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const editorialSectionVariants = cva("rounded-[2rem] px-6 md:px-8", {
  variants: {
    variant: {
      plain: "",
      low: "bg-surface-container-low",
      surface: "bg-surface-container",
    },
    spacing: {
      default: "py-6 md:py-8",
      roomy: "py-8 md:py-10",
    },
  },
  defaultVariants: {
    variant: "plain",
    spacing: "default",
  },
});

function EditorialSection({
  className,
  variant,
  spacing,
  ...props
}: React.ComponentProps<"section"> &
  VariantProps<typeof editorialSectionVariants>) {
  return (
    <section
      className={cn(editorialSectionVariants({ variant, spacing }), className)}
      {...props}
    />
  );
}

function EditorialEyebrow({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "font-sans text-xs font-semibold leading-[1.2] tracking-[0.22em] text-muted-foreground uppercase",
        className
      )}
      {...props}
    />
  );
}

const editorialIntroTitleVariants = cva(
  "font-display font-semibold tracking-[-0.05em] text-foreground",
  {
    variants: {
      scale: {
        hero: "text-5xl leading-none md:text-7xl",
        display: "text-4xl leading-none md:text-5xl",
        headline: "text-3xl leading-[1.02] md:text-4xl",
      },
    },
    defaultVariants: {
      scale: "display",
    },
  }
);

function EditorialIntro({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("space-y-4", className)} {...props} />;
}

function EditorialIntroTitle({
  className,
  scale,
  as: Comp = "h2",
  ...props
}: React.ComponentProps<"h2"> &
  VariantProps<typeof editorialIntroTitleVariants> & {
    as?: "h1" | "h2" | "h3" | "h4";
  }) {
  return (
    <Comp
      className={cn(editorialIntroTitleVariants({ scale }), className)}
      {...props}
    />
  );
}

function EditorialIntroDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg", className)}
      {...props}
    />
  );
}

const editorialStatVariants = cva(
  "rounded-[1.5rem] border border-transparent px-5 py-5",
  {
  variants: {
    tone: {
        default:
          "bg-surface-container-lowest text-foreground shadow-[0_32px_64px_-36px_rgba(28,28,24,0.12)]",
        accent:
          "bg-primary text-primary-foreground shadow-[0_32px_64px_-36px_rgba(15,82,56,0.34)]",
        spotlight:
          "bg-secondary-container text-[color:var(--on-secondary-container)] shadow-[0_24px_48px_-30px_rgba(102,49,0,0.28)]",
        surface: "bg-surface-container text-foreground shadow-none",
    },
    offset: {
      none: "",
      down: "sm:translate-y-6",
      up: "sm:-translate-y-5",
      softDown: "sm:translate-y-5 md:translate-y-0 xl:translate-y-5",
      softUp: "sm:-translate-y-3 md:translate-y-0 xl:-translate-y-3",
    },
  },
  defaultVariants: {
    tone: "default",
    offset: "none",
  },
});

function EditorialStat({
  className,
  tone,
  offset,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof editorialStatVariants>) {
  return (
    <div
      className={cn(editorialStatVariants({ tone, offset }), className)}
      {...props}
    />
  );
}

function EditorialStatLabel({
  className,
  tone = "default",
  ...props
}: React.ComponentProps<"p"> & Pick<VariantProps<typeof editorialStatVariants>, "tone">) {
  return (
    <p
      className={cn(
        "font-sans text-xs font-semibold leading-[1.2] tracking-[0.18em] uppercase",
        tone === "accent"
          ? "text-primary-foreground/70"
          : tone === "spotlight"
            ? "text-[color:var(--on-secondary-container)]/72"
            : "text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

function EditorialStatValue({
  className,
  tone = "default",
  as: Comp = "p",
  ...props
}: React.ComponentProps<"p"> &
  Pick<VariantProps<typeof editorialStatVariants>, "tone"> & {
    as?: "p" | "div" | "span";
  }) {
  return (
    <Comp
      className={cn(
        "mt-3 font-display text-4xl leading-none tracking-[-0.06em]",
        tone === "accent"
          ? "text-primary-foreground"
          : tone === "spotlight"
            ? "text-[color:var(--on-secondary-container)]"
            : "text-foreground",
        className
      )}
      {...props}
    />
  );
}

function EditorialStatDescription({
  className,
  tone = "default",
  ...props
}: React.ComponentProps<"p"> & Pick<VariantProps<typeof editorialStatVariants>, "tone">) {
  return (
    <p
      className={cn(
        "mt-2 text-sm leading-relaxed",
        tone === "accent"
          ? "text-primary-foreground/80"
          : tone === "spotlight"
            ? "text-[color:var(--on-secondary-container)]/78"
            : "text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

export {
  EditorialEyebrow,
  EditorialIntro,
  EditorialIntroDescription,
  EditorialIntroTitle,
  EditorialSection,
  EditorialStat,
  EditorialStatDescription,
  EditorialStatLabel,
  EditorialStatValue,
};