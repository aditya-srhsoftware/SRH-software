"use client";

import { Bell, Menu, Search } from "lucide-react";

export function AdminTopbar({
  title,
  onMenuClick,
}: {
  title: string;
  onMenuClick?: () => void;
}) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-[#E8E8EE] bg-white/90 px-4 backdrop-blur-md sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="inline-flex size-10 items-center justify-center rounded-xl border border-[#E8E8EE] text-[#151C4B] lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="size-4" />
      </button>

      <div className="min-w-0 flex-1">
        <h1 className="truncate font-heading-manrope text-lg font-extrabold tracking-[-0.03em] text-[#151C4B]">
          {title}
        </h1>
      </div>

      <div className="hidden max-w-xs flex-1 md:block">
        <label className="relative block">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#8B90A0]" />
          <input
            type="search"
            placeholder="Search…"
            className="h-10 w-full rounded-xl border border-[#E8E8EE] bg-[#F7F5F1] pr-3 pl-10 font-body-poppins text-sm text-[#151C4B] outline-none placeholder:text-[#A1A1AA] focus:border-[#E81E62]/40 focus:bg-white"
          />
        </label>
      </div>

      <button
        type="button"
        className="relative inline-flex size-10 items-center justify-center rounded-xl border border-[#E8E8EE] text-[#151C4B]"
        aria-label="Notifications"
      >
        <Bell className="size-4" />
        <span className="absolute top-2.5 right-2.5 size-1.5 rounded-full bg-[#E81E62]" />
      </button>

      <div className="flex items-center gap-2 rounded-xl border border-[#E8E8EE] bg-[#F7F5F1] py-1.5 pr-3 pl-1.5">
        <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[#151C4B] font-heading-manrope text-xs font-bold text-white">
          A
        </span>
        <span className="hidden font-body-poppins text-sm font-medium text-[#151C4B] sm:inline">
          Admin
        </span>
      </div>
    </header>
  );
}
