export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export type ServiceIconName =
  | "android"
  | "ios"
  | "crossPlatform"
  | "customApp"
  | "enterprise"
  | "webApp"
  | "frontend"
  | "backend"
  | "fullstack"
  | "java"
  | "customSoftware"
  | "saas"
  | "erp"
  | "cloud"
  | "api"
  | "uiuxOnDemand"
  | "mobileUi"
  | "websiteUi"
  | "wireframe"
  | "userResearch";

export type ServiceItem = {
  slug: string;
  label: string;
  description: string;
  href: string;
  icon: ServiceIconName;
};

export type ServiceCategory = {
  id: string;
  label: string;
  description: string;
  services: ServiceItem[];
};

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  nav: NavItem[];
  cta: NavItem;
};
