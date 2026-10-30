"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { adminMeta, adminNav } from "@/admin/config/nav";
import { clearAdminSession } from "@/admin/lib/session";
import { AdminNavIcon } from "@/components/admin/admin-icons";
import { cn } from "@/lib/utils";

export function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  const signOut = () => {
    clearAdminSession();
    onNavigate?.();
    router.replace("/admin/login");
  };

  return (
    <aside className="flex h-full w-64 flex-col border-r border-[#E8E8EE] bg-[#0F1438] text-white">
      <div className="flex h-16 items-center gap-3 border-b border-white/10 px-5">
        <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[#E81E62] font-heading-manrope text-sm font-extrabold">
          {adminMeta.shortName.slice(0, 1)}
        </span>
        <div>
          <p className="font-heading-manrope text-sm font-bold tracking-[-0.02em]">
            {adminMeta.name}
          </p>
          <p className="font-body-poppins text-[0.7rem] text-white/50">
            Content console
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {adminNav.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 font-body-poppins text-[0.875rem] transition-colors",
                active
                  ? "bg-white/10 text-white"
                  : "text-white/65 hover:bg-white/5 hover:text-white",
              )}
            >
              <AdminNavIcon name={item.icon} className="size-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-2 border-t border-white/10 p-4">
        <Link
          href="/"
          className="block rounded-xl bg-white/5 px-3 py-2.5 text-center font-body-poppins text-[0.8rem] text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          View website
        </Link>
        <button
          type="button"
          onClick={signOut}
          className="flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 font-body-poppins text-[0.8rem] text-white/55 transition-colors hover:bg-white/5 hover:text-white"
        >
          <LogOut className="size-3.5" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
