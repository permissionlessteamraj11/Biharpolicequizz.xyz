import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number; // 0 to 100
  className?: string;
  showValue?: boolean;
}

export function ProgressBar({ value, className, showValue }: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-center mb-1">
        {showValue && (
          <span className="text-xs font-medium text-muted-foreground">
            {Math.round(clampedValue)}%
          </span>
        )}
      </div>
      <div className="h-2 w-full bg-accent rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
