import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-slate-900 text-white shadow-sm hover:-translate-y-0.5 hover:bg-slate-700 hover:shadow-md",
  secondary:
    "border border-slate-300 bg-white text-slate-800 hover:-translate-y-0.5 hover:bg-slate-100",
  danger: "bg-rose-600 text-white shadow-sm hover:-translate-y-0.5 hover:bg-rose-500",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-sm",
};

export function Button({ className, variant = "primary", size = "md", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition duration-200 disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}
