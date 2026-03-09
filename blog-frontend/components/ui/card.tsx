import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/90 bg-white/90 p-5 shadow-sm backdrop-blur-sm transition",
        className,
      )}
      {...props}
    />
  );
}
