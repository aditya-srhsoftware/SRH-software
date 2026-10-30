"use client";

import Link from "next/link";
import { useEffect, useId, useRef } from "react";
import { ServiceIconTile } from "@/components/icons/service-icons";
import { serviceCategories } from "@/config/services";
import { useDisclosure } from "@/hooks/use-disclosure";
import { isCurrentPath } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type ServicesMegaMenuProps = {
  pathname: string;
  label: string;
  href: string;
  inverted?: boolean;
};

export function ServicesMegaMenu({
  pathname,
  label,
  href,
  inverted = false,
}: ServicesMegaMenuProps) {
  const { isOpen, open, close } = useDisclosure();
  const menuId = useId();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const current = isCurrentPath(pathname, href);

  const openMenu = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    open();
  };

  const scheduleClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }
    closeTimer.current = setTimeout(() => {
      close();
      closeTimer.current = null;
    }, 140);
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  return (
    <div
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
      onFocusCapture={openMenu}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          scheduleClose();
        }
      }}
    >
      <Link
        href={href}
        className={cn(
          "inline-flex items-center gap-1.5 py-3 text-sm font-semibold tracking-wide transition-colors duration-300 xl:text-base",
          inverted
            ? "text-foreground/80 hover:text-violet"
            : "text-white/80 hover:text-white",
          current && (inverted ? "text-violet" : "text-white"),
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={menuId}
        aria-current={current ? "page" : undefined}
      >
        <span
          className={cn(
            "border-b-2 border-transparent pb-1 transition-colors",
            current && "border-magenta",
          )}
        >
          {label}
        </span>
        <svg
          aria-hidden
          viewBox="0 0 12 12"
          className={cn(
            "h-3 w-3 transition-transform duration-300",
            isOpen && "rotate-180",
          )}
          fill="none"
        >
          <path
            d="M2.5 4.5 6 8l3.5-3.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      <div
        className={cn(
          "pointer-events-none fixed inset-x-0 top-16 z-50 opacity-0 transition-all duration-300 sm:top-[4.5rem] md:top-20",
          isOpen && "pointer-events-auto translate-y-0 opacity-100",
          !isOpen && "-translate-y-2",
        )}
        onMouseEnter={openMenu}
        onMouseLeave={scheduleClose}
      >
        <div className="mx-auto w-[min(72rem,calc(100vw-2rem))] pt-3">
          <div
            id={menuId}
            role="menu"
            aria-label="Services"
            aria-hidden={!isOpen}
            inert={isOpen ? undefined : true}
            className="overflow-hidden rounded-2xl border border-border bg-white shadow-[0_30px_80px_-28px_rgba(26,16,48,0.45)] sm:rounded-3xl"
          >
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-4 lg:gap-x-8 lg:p-8">
              {serviceCategories.map((category) => (
                <div key={category.id} className="min-w-0">
                  <h3 className="mb-3 text-[13px] font-bold leading-snug tracking-tight text-foreground sm:mb-4 sm:text-sm">
                    {category.label}
                  </h3>
                  <ul className="space-y-0.5">
                    {category.services.map((service) => {
                      const childCurrent = pathname === service.href;

                      return (
                        <li key={service.href}>
                          <Link
                            href={service.href}
                            role="menuitem"
                            className={cn(
                              "group flex items-start gap-2.5 rounded-xl px-1.5 py-2 transition-colors duration-200 hover:bg-muted sm:gap-3 sm:px-2 sm:py-2.5",
                              childCurrent && "bg-muted",
                            )}
                            aria-current={childCurrent ? "page" : undefined}
                            onClick={close}
                          >
                            <ServiceIconTile
                              name={service.icon}
                              size="sm"
                              className="mt-0.5"
                            />
                            <span
                              className={cn(
                                "min-w-0 flex-1 text-[13px] leading-snug text-foreground/80 transition-colors group-hover:text-violet sm:text-sm",
                                childCurrent && "font-medium text-violet",
                              )}
                            >
                              {service.label}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-start justify-between gap-2 border-t border-magenta/30 bg-lavender px-5 py-3 sm:flex-row sm:items-center sm:gap-4 sm:px-6 sm:py-3.5 lg:px-8">
              <p className="text-sm text-muted-foreground">
                Need help choosing a service?
              </p>
              <Link
                href={href}
                role="menuitem"
                className="shrink-0 text-sm font-semibold text-magenta transition-colors hover:text-violet"
                onClick={close}
              >
                View all services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
