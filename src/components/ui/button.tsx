import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "accent" | "ghost" | "glass";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-600 text-white shadow-[0_14px_34px_-14px_rgba(67,1,178,0.55)] hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-[0_18px_40px_-12px_rgba(67,1,178,0.45)]",
  secondary:
    "border border-brand-600 bg-white text-brand-600 hover:bg-brand-50",
  accent:
    "bg-magenta-500 text-white shadow-[0_14px_34px_-14px_rgba(224,16,96,0.45)] hover:-translate-y-0.5 hover:bg-magenta-600",
  ghost: "hover:bg-white/10",
  glass:
    "border border-white/30 bg-white/10 text-white backdrop-blur-md hover:-translate-y-0.5 hover:bg-white/18 hover:border-white/50",
};

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full px-6 text-sm font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
