import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva(
  // 统一样式
  "text-sm",
  {
    variants: {
      variant: {
        muted: "text-muted-foreground font-normal",
      },
    },
    defaultVariants: {
      variant: "muted",
    },
  }
);

export function Text({
  children,
  variant,
  className,
}: React.ComponentProps<"text"> & VariantProps<typeof textVariants>) {
  return (
    <span className={cn(textVariants({ variant, className }))}>{children}</span>
  );
}
