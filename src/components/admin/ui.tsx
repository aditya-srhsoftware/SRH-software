import { cn } from "@/lib/utils";

export function AdminCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[#E8E8EE] bg-white shadow-[0_10px_30px_-24px_rgba(21,28,75,0.35)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function AdminPageIntro({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="font-heading-manrope text-2xl font-extrabold tracking-[-0.03em] text-[#151C4B]">
          {title}
        </h2>
        <p className="mt-1 max-w-xl font-body-poppins text-sm leading-relaxed text-[#6B7280]">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}

export function AdminButton({
  children,
  variant = "primary",
  className,
  type = "button",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors",
        variant === "primary" && "bg-[#151C4B] text-white hover:bg-[#1B2458]",
        variant === "secondary" &&
          "border border-[#E8E8EE] bg-white text-[#151C4B] hover:bg-[#F7F5F1]",
        variant === "ghost" && "text-[#5C5370] hover:bg-[#F7F5F1] hover:text-[#151C4B]",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function StatusPill({
  status,
}: {
  status: string;
}) {
  const tone =
    status === "Published" || status === "Live" || status === "Active" || status === "Replied"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
      : status === "Draft" || status === "Read"
        ? "bg-amber-50 text-amber-700 ring-amber-200"
        : status === "New" || status === "Scheduled"
          ? "bg-[#E81E62]/10 text-[#E81E62] ring-[#E81E62]/20"
          : "bg-[#F7F5F1] text-[#5C5370] ring-[#E8E8EE]";

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 font-body-poppins text-[0.7rem] font-semibold ring-1",
        tone,
      )}
    >
      {status}
    </span>
  );
}

export function AdminTable({
  headers,
  children,
}: {
  headers: string[];
  children: React.ReactNode;
}) {
  return (
    <AdminCard className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-[#E8E8EE] bg-[#FAFAFB]">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 font-heading-manrope text-[0.75rem] font-bold tracking-[-0.01em] text-[#6B7280] uppercase"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0F0F4]">{children}</tbody>
        </table>
      </div>
    </AdminCard>
  );
}

export function AdminField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-heading-manrope text-[0.8rem] font-bold text-[#151C4B]">
        {label}
      </span>
      {children}
    </label>
  );
}

export const adminInputClass =
  "h-11 w-full rounded-xl border border-[#E8E8EE] bg-[#F7F5F1] px-3.5 font-body-poppins text-sm text-[#151C4B] outline-none transition placeholder:text-[#A1A1AA] focus:border-[#E81E62]/40 focus:bg-white";
