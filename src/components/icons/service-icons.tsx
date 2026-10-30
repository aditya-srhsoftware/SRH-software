import type { LucideIcon } from "lucide-react";
import {
  AppWindow,
  Boxes,
  Building2,
  Cloud,
  Code2,
  Database,
  Frame,
  Layers,
  LayoutTemplate,
  MonitorSmartphone,
  Palette,
  PenTool,
  Puzzle,
  Server,
  Smartphone,
  TabletSmartphone,
  Users,
  Workflow,
} from "lucide-react";
import type { ServiceIconName } from "@/types";
import { cn } from "@/lib/utils";

export const serviceIcons: Record<ServiceIconName, LucideIcon> = {
  android: Smartphone,
  ios: TabletSmartphone,
  crossPlatform: MonitorSmartphone,
  customApp: AppWindow,
  enterprise: Building2,
  webApp: LayoutTemplate,
  frontend: Palette,
  backend: Server,
  fullstack: Layers,
  java: Code2,
  customSoftware: Puzzle,
  saas: Boxes,
  erp: Workflow,
  cloud: Cloud,
  api: Database,
  uiuxOnDemand: PenTool,
  mobileUi: Smartphone,
  websiteUi: Frame,
  wireframe: LayoutTemplate,
  userResearch: Users,
};

/** Brand-only icon tiles: purple, magenta, or neutral — no off-brand hues */
export const serviceIconStyles: Record<
  ServiceIconName,
  {
    tile: string;
    icon: string;
  }
> = {
  android: { tile: "bg-brand-50", icon: "text-brand-600" },
  ios: { tile: "bg-neutral-100", icon: "text-neutral-700" },
  crossPlatform: { tile: "bg-brand-100", icon: "text-brand-700" },
  customApp: { tile: "bg-magenta-50", icon: "text-magenta-500" },
  enterprise: { tile: "bg-brand-50", icon: "text-brand-800" },
  webApp: { tile: "bg-brand-100", icon: "text-brand-600" },
  frontend: { tile: "bg-magenta-50", icon: "text-magenta-600" },
  backend: { tile: "bg-brand-50", icon: "text-brand-700" },
  fullstack: { tile: "bg-brand-100", icon: "text-brand-600" },
  java: { tile: "bg-neutral-100", icon: "text-neutral-700" },
  customSoftware: { tile: "bg-brand-50", icon: "text-brand-800" },
  saas: { tile: "bg-magenta-50", icon: "text-magenta-500" },
  erp: { tile: "bg-brand-100", icon: "text-brand-700" },
  cloud: { tile: "bg-brand-50", icon: "text-brand-600" },
  api: { tile: "bg-neutral-100", icon: "text-brand-700" },
  uiuxOnDemand: { tile: "bg-magenta-50", icon: "text-magenta-600" },
  mobileUi: { tile: "bg-brand-100", icon: "text-brand-600" },
  websiteUi: { tile: "bg-magenta-50", icon: "text-magenta-500" },
  wireframe: { tile: "bg-neutral-100", icon: "text-neutral-600" },
  userResearch: { tile: "bg-brand-50", icon: "text-brand-700" },
};

export function ServiceIcon({
  name,
  className,
}: {
  name: ServiceIconName;
  className?: string;
}) {
  const Icon = serviceIcons[name] ?? PenTool;

  return <Icon aria-hidden className={className} strokeWidth={1.6} />;
}

export function ServiceIconTile({
  name,
  size = "md",
  className,
}: {
  name: ServiceIconName;
  size?: "sm" | "md";
  className?: string;
}) {
  const styles = serviceIconStyles[name] ?? {
    tile: "bg-brand-50",
    icon: "text-brand-600",
  };

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full border border-black/[0.04] transition-transform duration-300 group-hover:scale-105",
        size === "sm" ? "size-9" : "size-11",
        styles.tile,
        className,
      )}
    >
      <ServiceIcon
        name={name}
        className={cn(size === "sm" ? "size-4" : "size-5", styles.icon)}
      />
    </span>
  );
}
