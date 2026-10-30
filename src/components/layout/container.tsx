import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils";

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

/**
 * Standard page content shell.
 * Horizontal padding: 16 → 24 → 32. Max width: 100rem (matches navbar).
 */
export function Container<T extends ElementType = "div">({
  as,
  className,
  ...props
}: ContainerProps<T>) {
  const Comp = as ?? "div";

  return (
    <Comp
      className={cn(
        "mx-auto w-full max-w-[100rem] px-4 sm:px-6 lg:px-8",
        className,
      )}
      {...props}
    />
  );
}
