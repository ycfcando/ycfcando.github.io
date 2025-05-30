"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva("leading-none", {
  variants: {
    variant: {
      default:
        "bg-transparent data-[state=on]:text-accent-foreground data-[state=on]:font-bold transition-transform duration-300 hover:scale-110",
      outline:
        "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
      underline:
        "underline-offset-4 decoration-2 hover:underline font-normal data-[state=on]:underline data-[state=on]:font-semibold data-[state=on]:text-foreground",
      blod: "font-medium text-muted-foreground hover:text-primary hover:font-bold data-[state=on]:text-primary data-[state=on]:font-bold",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function Toggle({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, className }))}
      {...props}
    />
  );
}

function NavToggle({
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(
        toggleVariants({
          className: "text-nav-foreground h-7",
        })
      )}
      {...props}
    />
  );
}

export { Toggle, NavToggle, toggleVariants };
