"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { readAdminSession } from "@/admin/lib/session";

export function AdminAuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const session = readAdminSession();
    if (!session) {
      const next = encodeURIComponent(pathname || "/admin");
      router.replace(`/admin/login?next=${next}`);
      return;
    }
    setReady(true);
  }, [pathname, router]);

  if (!ready) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#F4F5F8]">
        <div className="flex flex-col items-center gap-3">
          <span className="size-9 animate-pulse rounded-2xl bg-[#151C4B]" />
          <p className="font-body-poppins text-sm text-[#8B90A0]">
            Checking session…
          </p>
        </div>
      </div>
    );
  }

  return children;
}
