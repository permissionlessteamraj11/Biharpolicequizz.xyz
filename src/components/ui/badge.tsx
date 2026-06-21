import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning" | "destructive";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "border-transparent bg-primary text-white hover:bg-primary/80",
    secondary: "border-transparent bg-accent text-foreground hover:bg-accent/80",
    outline: "text-foreground border-border",
    success: "border-transparent bg-green-500/10 text-green-600 dark:text-green-400",
    warning: "border-transparent bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    destructive: "border-transparent bg-red-500/10 text-red-600 dark:text-red-400",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
