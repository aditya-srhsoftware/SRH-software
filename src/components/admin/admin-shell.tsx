"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { adminNav } from "@/admin/config/nav";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import { cn } from "@/lib/utils";

function titleFromPath(pathname: string) {
  const match = adminNav.find((item) =>
    item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href),
  );
  return match?.label ?? "Admin";
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-dvh bg-[#F4F5F8] font-body-poppins text-[#151C4B]">
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64">
        <AdminSidebar />
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-[#0F1438]/50"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-64 shadow-2xl">
            <AdminSidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col lg:pl-64">
        <AdminTopbar
          title={titleFromPath(pathname)}
          onMenuClick={() => setMobileOpen(true)}
        />
        <div className={cn("mx-auto w-full max-w-7xl flex-1 p-4 sm:p-6")}>
          {children}
        </div>
      </div>
    </div>
  );
}
