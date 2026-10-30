import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils";

type SectionSize = "sm" | "md" | "lg";

type SectionProps<T extends ElementType = "section"> = {
  as?: T;
  size?: SectionSize;
  /** Clears the fixed header on inner pages */
  clearHeader?: boolean;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

const sizeClasses: Record<SectionSize, string> = {
  sm: "py-12 lg:py-16",
  md: "py-16 lg:py-20",
  lg: "py-20 lg:py-24",
};

/**
 * Standard vertical section rhythm.
 * sm = 48/64 · md = 64/80 · lg = 80/96
 */
export function Section<T extends ElementType = "section">({
  as,
  size = "md",
  clearHeader = false,
  className,
  ...props
}: SectionProps<T>) {
  const Comp = as ?? "section";

  return (
    <Comp
      className={cn(
        sizeClasses[size],
        clearHeader && "pt-24 sm:pt-28 lg:pt-32",
        className,
      )}
      {...props}
    />
  );
}
