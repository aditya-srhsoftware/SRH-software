import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin/admin-login-form";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center bg-[#0F1438]">
          <span className="size-9 animate-pulse rounded-2xl bg-[#E81E62]" />
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
