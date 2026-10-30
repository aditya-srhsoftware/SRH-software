import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { mockActivity, mockStats } from "@/admin/data/mock";
import { AdminCard, AdminPageIntro } from "@/components/admin/ui";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function AdminDashboardPage() {
  return (
    <div>
      <AdminPageIntro
        title="Dashboard"
        description="Overview of site activity. Numbers are mock data until you connect your API."
        action={
          <Link
            href="/admin/messages"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-[#151C4B] px-4 text-sm font-semibold text-white hover:bg-[#1B2458]"
          >
            View messages
            <ArrowUpRight className="size-4" />
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {mockStats.map((stat) => (
          <AdminCard key={stat.label} className="p-5">
            <p className="font-body-poppins text-xs font-medium tracking-wide text-[#8B90A0] uppercase">
              {stat.label}
            </p>
            <p className="mt-3 font-heading-manrope text-3xl font-extrabold tracking-[-0.04em] text-[#151C4B]">
              {stat.value}
            </p>
            <p
              className={
                stat.tone === "up"
                  ? "mt-2 text-xs font-medium text-emerald-600"
                  : "mt-2 text-xs font-medium text-[#8B90A0]"
              }
            >
              {stat.change}
            </p>
          </AdminCard>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <AdminCard className="p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-heading-manrope text-base font-bold text-[#151C4B]">
              Recent activity
            </h3>
            <span className="text-xs text-[#8B90A0]">Mock feed</span>
          </div>
          <ul className="space-y-4">
            {mockActivity.map((item) => (
              <li
                key={item.id}
                className="flex items-start justify-between gap-4 border-b border-[#F0F0F4] pb-4 last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-body-poppins text-sm font-medium text-[#151C4B]">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-sm text-[#6B7280]">{item.detail}</p>
                </div>
                <span className="shrink-0 text-xs text-[#8B90A0]">{item.time}</span>
              </li>
            ))}
          </ul>
        </AdminCard>

        <AdminCard className="p-5 sm:p-6">
          <h3 className="font-heading-manrope text-base font-bold text-[#151C4B]">
            Quick links
          </h3>
          <div className="mt-4 grid gap-2">
            {[
              { href: "/admin/blogs", label: "Manage blogs" },
              { href: "/admin/portfolio", label: "Manage portfolio" },
              { href: "/admin/services", label: "Manage services" },
              { href: "/admin/settings", label: "Site settings" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between rounded-xl border border-[#E8E8EE] bg-[#F7F5F1]/70 px-4 py-3 text-sm font-medium text-[#151C4B] transition hover:border-[#D8D8DE] hover:bg-white"
              >
                {link.label}
                <ArrowUpRight className="size-4 text-[#8B90A0]" />
              </Link>
            ))}
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
