"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ChevronDown } from "lucide-react";
import logo from "@/assets/images/logo.png";
import { ServicesMegaMenu } from "@/components/layout/services-mega-menu";
import { ButtonLink } from "@/components/ui/button-link";
import { serviceCategories } from "@/config/services";
import { siteConfig } from "@/config/site";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { useDisclosure } from "@/hooks/use-disclosure";
import { useScrolled } from "@/hooks/use-scrolled";
import { isCurrentPath } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const scrolled = useScrolled(20);
  const mobile = useDisclosure();
  const servicesMenu = useDisclosure(false);
  const { close: closeMobile } = mobile;
  const { close: closeServices, isOpen: servicesOpen } = servicesMenu;
  const isHome = pathname === "/";
  const solid = scrolled || !isHome || mobile.isOpen;

  useBodyScrollLock(mobile.isOpen);

  useEffect(() => {
    closeMobile();
    closeServices();
  }, [pathname, closeMobile, closeServices]);

  useEffect(() => {
    if (!mobile.isOpen) closeServices();
  }, [mobile.isOpen, closeServices]);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        closeMobile();
        closeServices();
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [closeMobile, closeServices]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]">
      <div
        className={cn(
          "border-b transition-all duration-500",
          solid
            ? "border-white/25 bg-[rgba(26,16,48,0.78)] shadow-[0_16px_48px_-24px_rgba(26,16,48,0.85)] backdrop-blur-xl"
            : "border-white/25 bg-transparent shadow-none",
        )}
      >
        <div className="ds-container grid h-16 grid-cols-[1fr_auto] items-center gap-4 sm:h-[4.5rem] md:h-20 lg:grid-cols-[1fr_auto_1fr]">
          <Link
            href="/"
            aria-label="SRH Software"
            className="inline-flex w-fit items-center rounded-lg bg-white px-2.5 py-1.5 shadow-[0_8px_24px_-16px_rgba(26,16,48,0.6)] transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:rounded-xl sm:px-3 sm:py-2"
          >
            <Image
              src={logo}
              alt="SRH Software"
              priority
              width={140}
              height={45}
              className="h-7 w-auto max-h-7 sm:h-8 sm:max-h-8 md:h-9 md:max-h-9"
              style={{ width: "auto" }}
            />
          </Link>

          <nav
            className="hidden items-center justify-center gap-4 lg:flex xl:gap-6 2xl:gap-7"
            aria-label="Main"
          >
            {siteConfig.nav.map((item) =>
              item.children ? (
                <ServicesMegaMenu
                  key={item.href}
                  pathname={pathname}
                  label={item.label}
                  href={item.href}
                />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center py-3 text-sm font-semibold tracking-wide text-white/80 transition-colors duration-300 hover:text-white xl:text-base",
                    isCurrentPath(pathname, item.href) && "text-white",
                  )}
                  aria-current={
                    isCurrentPath(pathname, item.href) ? "page" : undefined
                  }
                >
                  <span
                    className={cn(
                      "border-b-2 border-transparent pb-1 transition-colors",
                      isCurrentPath(pathname, item.href) && "border-magenta",
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center justify-end gap-2 sm:gap-3">
            <ButtonLink
              href={siteConfig.cta.href}
              variant="nav"
              className="hidden h-9 px-4 text-[11px] font-semibold uppercase tracking-[0.14em] lg:inline-flex xl:h-10 xl:px-5 xl:text-xs"
              aria-current={
                isCurrentPath(pathname, siteConfig.cta.href)
                  ? "page"
                  : undefined
              }
            >
              {siteConfig.cta.label}
            </ButtonLink>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:hidden"
              aria-expanded={mobile.isOpen}
              aria-controls="mobile-nav"
              aria-label={mobile.isOpen ? "Close menu" : "Open menu"}
              onClick={mobile.toggle}
            >
              <span className="sr-only">
                {mobile.isOpen ? "Close menu" : "Open menu"}
              </span>
              <span className="relative block h-3.5 w-5">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-0.5 w-5 rounded-full bg-white transition-all duration-300",
                    mobile.isOpen && "top-1.5 rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-1.5 h-0.5 w-5 rounded-full bg-white transition-all duration-300",
                    mobile.isOpen && "scale-x-0 opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-3 h-0.5 w-5 rounded-full bg-white transition-all duration-300",
                    mobile.isOpen && "top-1.5 -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-0 top-16 z-40 bg-[rgba(26,16,48,0.96)] backdrop-blur-xl transition-all duration-500 sm:top-[4.5rem] md:top-20 lg:hidden",
          mobile.isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        aria-hidden={!mobile.isOpen}
        inert={mobile.isOpen ? undefined : true}
      >
        <nav
          className="ds-container flex h-[calc(100dvh-4rem)] flex-col overflow-y-auto overscroll-contain py-6 sm:h-[calc(100dvh-4.5rem)] md:h-[calc(100dvh-5rem)]"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1 pb-8">
            {siteConfig.nav.map((item) => {
              const current = isCurrentPath(pathname, item.href);
              const isServices = item.href === "/services";

              return (
                <li key={item.href}>
                  {isServices ? (
                    <>
                      <div
                        className={cn(
                          "flex items-center rounded-2xl transition-colors",
                          (current || servicesOpen) && "bg-white/10",
                        )}
                      >
                        <Link
                          href={item.href}
                          className={cn(
                            "min-w-0 flex-1 px-4 py-3.5 text-base font-semibold text-white/80 transition-colors hover:text-white",
                            current && "text-white",
                          )}
                          aria-current={current ? "page" : undefined}
                          tabIndex={mobile.isOpen ? 0 : -1}
                          onClick={mobile.close}
                        >
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          className="mr-1.5 inline-flex size-10 shrink-0 items-center justify-center rounded-xl text-white/55 transition-colors hover:bg-white/10 hover:text-white"
                          aria-expanded={servicesOpen}
                          aria-controls="mobile-services-submenu"
                          aria-label={
                            servicesOpen
                              ? "Collapse services menu"
                              : "Expand services menu"
                          }
                          tabIndex={mobile.isOpen ? 0 : -1}
                          onClick={servicesMenu.toggle}
                        >
                          <ChevronDown
                            aria-hidden
                            className={cn(
                              "size-5 transition-transform duration-300",
                              servicesOpen && "rotate-180",
                            )}
                            strokeWidth={2}
                          />
                        </button>
                      </div>
                      <div
                        id="mobile-services-submenu"
                        className={cn(
                          "grid transition-[grid-template-rows] duration-300 ease-out",
                          servicesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                        )}
                        aria-hidden={!servicesOpen}
                      >
                        <div className="min-h-0 overflow-hidden">
                          <div
                            className={cn(
                              "mb-2 ml-2 max-h-[min(42dvh,17.5rem)] space-y-3 overflow-y-auto overscroll-contain border-l border-white/15 py-1 pl-2 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.28)_transparent] sm:ml-3 sm:max-h-[min(46dvh,20rem)] sm:pl-3",
                              !servicesOpen && "pointer-events-none",
                            )}
                          >
                            {serviceCategories.map((category) => (
                              <div key={category.id}>
                                <p className="sticky top-0 z-[1] bg-[rgba(26,16,48,0.96)] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45 backdrop-blur-sm sm:px-3 sm:text-[11px]">
                                  {category.label}
                                </p>
                                <ul className="grid gap-1">
                                  {category.services.map((service) => (
                                    <li key={service.href}>
                                      <Link
                                        href={service.href}
                                        className={cn(
                                          "block rounded-xl px-2 py-2 text-sm text-white/65 transition-colors hover:text-white sm:px-3",
                                          pathname === service.href &&
                                            "font-medium text-white",
                                        )}
                                        aria-current={
                                          pathname === service.href
                                            ? "page"
                                            : undefined
                                        }
                                        tabIndex={
                                          mobile.isOpen && servicesOpen ? 0 : -1
                                        }
                                        onClick={mobile.close}
                                      >
                                        {service.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "block rounded-2xl px-4 py-3.5 text-base font-semibold text-white/80 transition-colors hover:bg-white/8 hover:text-white",
                        current && "bg-white/10 text-white",
                      )}
                      aria-current={current ? "page" : undefined}
                      tabIndex={mobile.isOpen ? 0 : -1}
                      onClick={mobile.close}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          <ButtonLink
            href={siteConfig.cta.href}
            variant="primary"
            className="mt-auto h-12 w-full uppercase tracking-[0.14em]"
            tabIndex={mobile.isOpen ? 0 : -1}
            onClick={mobile.close}
          >
            {siteConfig.cta.label}
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
