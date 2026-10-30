"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import {
  clearAdminSession,
  readAdminSession,
  writeAdminSession,
} from "@/admin/lib/session";
import { adminInputClass, AdminCard, AdminField } from "@/components/admin/ui";
import { cn } from "@/lib/utils";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("admin@srhsoftwares.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (readAdminSession()) {
      router.replace("/admin");
    }
  }, [router]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setError("Enter your email and password to continue.");
      return;
    }

    if (!trimmedEmail.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }

    setSubmitting(true);

    // UI-only gate — accept any non-empty credentials for now
    window.setTimeout(() => {
      writeAdminSession(trimmedEmail);
      const next = searchParams.get("next");
      const target =
        next && next.startsWith("/admin") && !next.startsWith("/admin/login")
          ? next
          : "/admin";
      router.replace(target);
    }, 450);
  };

  return (
    <div className="relative flex min-h-dvh overflow-hidden bg-[#0F1438]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,30,98,0.22),transparent_45%),radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.08),transparent_40%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-10 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-16">
        <div className="hidden text-white lg:block">
          <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-[#E81E62] font-heading-manrope text-xl font-extrabold shadow-[0_18px_40px_-18px_rgba(232,30,98,0.9)]">
            S
          </span>
          <h1 className="mt-8 max-w-[12ch] font-heading-manrope text-[clamp(2.4rem,4vw,3.4rem)] font-extrabold leading-[1.05] tracking-[-0.04em]">
            Sign in to SRH Admin
          </h1>
          <p className="mt-5 max-w-md font-body-poppins text-[1.05rem] leading-relaxed text-white/65">
            Manage blogs, portfolio, messages, and site content from one place.
            Auth is UI-only for now — connect your backend when ready.
          </p>
          <ul className="mt-8 space-y-3 font-body-poppins text-sm text-white/55">
            {[
              "Dashboard overview",
              "Content & media tools",
              "Contact inbox preview",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <span className="size-1.5 rounded-full bg-[#E81E62]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">
          <div className="mb-6 text-center lg:hidden">
            <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-[#E81E62] font-heading-manrope text-lg font-extrabold text-white">
              S
            </span>
            <h1 className="mt-4 font-heading-manrope text-2xl font-extrabold tracking-[-0.03em] text-white">
              SRH Admin
            </h1>
            <p className="mt-2 font-body-poppins text-sm text-white/55">
              Sign in to continue
            </p>
          </div>

          <AdminCard className="p-6 sm:p-8">
            <div className="mb-6 hidden lg:block">
              <h2 className="font-heading-manrope text-xl font-extrabold tracking-[-0.03em] text-[#151C4B]">
                Welcome back
              </h2>
              <p className="mt-1 font-body-poppins text-sm text-[#6B7280]">
                Enter your credentials to open the panel.
              </p>
            </div>

            <form className="space-y-4" onSubmit={onSubmit}>
              <AdminField label="Email">
                <div className="relative">
                  <Mail className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#8B90A0]" />
                  <input
                    type="email"
                    name="email"
                    autoComplete="username"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="admin@srhsoftwares.com"
                    className={cn(adminInputClass, "pl-10")}
                  />
                </div>
              </AdminField>

              <AdminField label="Password">
                <div className="relative">
                  <Lock className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#8B90A0]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter password"
                    className={cn(adminInputClass, "pr-11 pl-10")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 rounded-lg p-1 text-[#8B90A0] hover:text-[#151C4B]"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </AdminField>

              <div className="flex items-center justify-between gap-3 pt-1">
                <label className="inline-flex items-center gap-2 font-body-poppins text-xs text-[#6B7280]">
                  <input
                    type="checkbox"
                    className="size-3.5 rounded border-[#D8D8DE] accent-[#151C4B]"
                  />
                  Remember this device
                </label>
                <span className="font-body-poppins text-xs font-medium text-[#8B90A0]">
                  Forgot password?
                </span>
              </div>

              {error ? (
                <p className="rounded-xl bg-[#E81E62]/8 px-3 py-2 font-body-poppins text-xs text-[#E81E62]">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#151C4B] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#1B2458] disabled:opacity-70"
              >
                {submitting ? "Signing in…" : "Sign in"}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>

            <div className="mt-6 flex items-center justify-between gap-3 border-t border-[#F0F0F4] pt-5">
              <Link
                href="/"
                className="font-body-poppins text-xs font-medium text-[#6B7280] hover:text-[#151C4B]"
              >
                ← Back to website
              </Link>
              <button
                type="button"
                onClick={() => {
                  clearAdminSession();
                  setPassword("");
                  setError("");
                }}
                className="font-body-poppins text-xs text-[#8B90A0] hover:text-[#151C4B]"
              >
                Clear session
              </button>
            </div>
          </AdminCard>

          <p className="mt-5 text-center font-body-poppins text-[0.7rem] text-white/40">
            Preview mode accepts any email + password. Swap this for real auth later.
          </p>
        </div>
      </div>
    </div>
  );
}
