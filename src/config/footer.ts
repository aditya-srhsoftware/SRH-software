import { serviceCategories } from "@/config/services";
import { siteConfig } from "@/config/site";

export const footerCompanyLinks = siteConfig.nav.filter(
  (item) => item.href !== "/services",
);

export const footerServiceLinks = serviceCategories.map((category) => ({
  label: category.label.replace(/ Services$/i, ""),
  href: category.services[0]?.href ?? "/services",
}));

export const footerSocialLinks = [
  {
    label: "GoodFirms",
    href: "https://www.goodfirms.co/company/srh-softwares",
    external: true,
  },
  {
    label: "DesignRush",
    href: "https://www.designrush.com/agency/profile/srh-software#reviews",
    external: true,
  },
] as const;

