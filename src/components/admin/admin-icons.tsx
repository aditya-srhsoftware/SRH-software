import {
  FileText,
  FolderKanban,
  ImageIcon,
  LayoutDashboard,
  Mail,
  Settings,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { AdminNavItem } from "@/admin/config/nav";

const iconMap: Record<AdminNavItem["icon"], LucideIcon> = {
  dashboard: LayoutDashboard,
  blogs: FileText,
  portfolio: FolderKanban,
  messages: Mail,
  services: Wrench,
  media: ImageIcon,
  settings: Settings,
};

export function AdminNavIcon({
  name,
  className,
}: {
  name: AdminNavItem["icon"];
  className?: string;
}) {
  const Icon = iconMap[name];
  return <Icon className={className} strokeWidth={1.75} />;
}
