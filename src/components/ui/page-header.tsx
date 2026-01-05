import { cn } from "@/lib/utils";
import { Paragraph } from "./paragraph";

function PageHeader({ className, ...props }: React.ComponentProps<"section">) {
  return <section className={cn("mb-4", className)} {...props} />;
}
function PageHeaderTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return <h2 className={cn("text-xl font-bold", className)} {...props} />;
}
function PageHeaderDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return <Paragraph size="md" className={cn(className)} {...props} />;
}

export { PageHeader, PageHeaderTitle, PageHeaderDescription };
