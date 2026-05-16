import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline";
  size?: "default" | "sm" | "lg";
}

export function Button({
  className,
  variant = "default",
  size = "default",
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95";
  const variants: Record<string, string> = {
    default: "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25 focus-visible:bg-blue-700",
    secondary: "bg-slate-700 text-slate-100 hover:bg-slate-600 hover:shadow-lg hover:shadow-slate-600/25 focus-visible:bg-slate-600",
    outline:
      "border border-slate-600 bg-transparent text-slate-100 hover:bg-blue-600/10 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/25 focus-visible:border-blue-500 focus-visible:bg-blue-600/10",
  };
  const sizes: Record<string, string> = {
    default: "h-11 px-5",
    sm: "h-9 px-3",
    lg: "h-12 px-6",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled}
      {...props}
    />
  );
}
