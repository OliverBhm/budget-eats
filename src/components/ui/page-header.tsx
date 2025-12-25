import { cn } from "@/lib/utils";

function PageHeader({ className, ...props }: React.ComponentProps<"section">) {
    return <section className={cn("mb-4", className)} {...props} />;
}
function PageHeaderTitle({ className, ...props }: React.ComponentProps<"h2">) {
    return <h2 className={cn("text-xl font-bold", className)} {...props} />;
}
function PageHeaderDescription({ className, ...props }: React.ComponentProps<"p">) {
    return <p className={cn("text-md", className)} {...props} />;
}

export { PageHeader, PageHeaderTitle, PageHeaderDescription };