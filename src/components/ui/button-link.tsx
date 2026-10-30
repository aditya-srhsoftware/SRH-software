import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type ButtonLinkVariant = "primary" | "secondary" | "accent" | "glass" | "nav";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonLinkVariant;
};

const variantClasses: Record<ButtonLinkVariant, string> = {
  primary:
    "bg-brand-600 text-white shadow-[0_14px_34px_-14px_rgba(67,1,178,0.55)] hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-[0_18px_40px_-12px_rgba(67,1,178,0.45)] before:pointer-events-none before:absolute before:inset-0 before:translate-x-[-120%] before:bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.28),transparent)] before:transition-transform before:duration-700 hover:before:translate-x-[120%]",
  secondary:
    "border border-brand-600 bg-white text-brand-600 hover:bg-brand-50",
  accent:
    "bg-magenta-500 text-white shadow-[0_14px_34px_-14px_rgba(224,16,96,0.45)] hover:-translate-y-0.5 hover:bg-magenta-600",
  glass:
    "border border-white/30 bg-white/10 text-white backdrop-blur-md hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/18",
  nav: "bg-magenta-500 text-white shadow-[0_10px_24px_-12px_rgba(224,16,96,0.55)] hover:bg-magenta-600",
};

export function ButtonLink({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-6 text-sm font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
