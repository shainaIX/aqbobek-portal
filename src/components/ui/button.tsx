import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-label font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary-dark focus:ring-primary shadow-md hover:shadow-lg",
        secondary: "bg-secondary text-neutral-900 hover:bg-secondary-dark focus:ring-secondary shadow-md hover:shadow-lg",
        tertiary: "bg-tertiary text-neutral-900 hover:bg-tertiary-dark focus:ring-tertiary shadow-md hover:shadow-lg",
        inverted: "bg-neutral-900 text-white hover:bg-neutral-800 focus:ring-neutral-700 shadow-md hover:shadow-lg",
        outlined: "border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary bg-transparent",
        ghost: "text-neutral-700 hover:bg-neutral-100 focus:ring-neutral-300",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
        xl: "px-8 py-4 text-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };