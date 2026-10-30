export type AdminNavItem = {
  href: string;
  label: string;
  icon:
    | "dashboard"
    | "blogs"
    | "portfolio"
    | "messages"
    | "services"
    | "media"
    | "settings";
};

export const adminNav: AdminNavItem[] = [
  { href: "/admin", label: "Dashboard", icon: "dashboard" },
  { href: "/admin/blogs", label: "Blogs", icon: "blogs" },
  { href: "/admin/portfolio", label: "Portfolio", icon: "portfolio" },
  { href: "/admin/messages", label: "Messages", icon: "messages" },
  { href: "/admin/services", label: "Services", icon: "services" },
  { href: "/admin/media", label: "Media", icon: "media" },
  { href: "/admin/settings", label: "Settings", icon: "settings" },
];

export const adminMeta = {
  name: "SRH Admin",
  shortName: "SRH",
};
