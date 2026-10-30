import type { ServiceCategory, ServiceItem } from "@/types";

export const serviceCategories: ServiceCategory[] = [
  {
    id: "app-development",
    label: "App Development Services",
    description:
      "Native and cross-platform mobile products built for performance and scale.",
    services: [
      {
        slug: "android-application-development",
        label: "Android application development",
        description:
          "Reliable Android apps designed for modern devices and Google Play.",
        href: "/services/android-application-development",
        icon: "android",
      },
      {
        slug: "ios-application-development",
        label: "iOS Application Development",
        description:
          "Polished iPhone and iPad experiences that feel native to Apple platforms.",
        href: "/services/ios-application-development",
        icon: "ios",
      },
      {
        slug: "cross-platform-app-development",
        label: "Cross-Platform App Development",
        description:
          "One codebase that delivers consistent apps across iOS and Android.",
        href: "/services/cross-platform-app-development",
        icon: "crossPlatform",
      },
      {
        slug: "custom-application-development",
        label: "Custom Application Development",
        description:
          "Purpose-built applications shaped around your workflows and users.",
        href: "/services/custom-application-development",
        icon: "customApp",
      },
      {
        slug: "enterprise-application-development",
        label: "Enterprise Application Development",
        description:
          "Secure, scalable enterprise apps for complex teams and operations.",
        href: "/services/enterprise-application-development",
        icon: "enterprise",
      },
    ],
  },
  {
    id: "web-development",
    label: "Web Development Services",
    description:
      "Modern websites and web applications engineered for speed and growth.",
    services: [
      {
        slug: "web-application-development",
        label: "Web Application Development",
        description:
          "Secure, high-performing web apps built for real business use.",
        href: "/services/web-application-development",
        icon: "webApp",
      },
      {
        slug: "frontend-development",
        label: "Frontend Development",
        description:
          "Responsive interfaces with clean UI systems and strong accessibility.",
        href: "/services/frontend-development",
        icon: "frontend",
      },
      {
        slug: "backend-development",
        label: "Backend Development",
        description:
          "Stable APIs, databases, and services that keep products running.",
        href: "/services/backend-development",
        icon: "backend",
      },
      {
        slug: "full-stack-development",
        label: "Full-Stack Development",
        description:
          "End-to-end product delivery from interface to infrastructure.",
        href: "/services/full-stack-development",
        icon: "fullstack",
      },
      {
        slug: "java-app-development",
        label: "Java App Development",
        description:
          "Enterprise-grade Java applications for demanding business systems.",
        href: "/services/java-app-development",
        icon: "java",
      },
    ],
  },
  {
    id: "software-solutions",
    label: "Software Development Solutions",
    description:
      "Custom platforms, SaaS products, and integrations that power operations.",
    services: [
      {
        slug: "custom-software-development",
        label: "Custom Software Development",
        description:
          "Software designed around how your organization actually works.",
        href: "/services/custom-software-development",
        icon: "customSoftware",
      },
      {
        slug: "saas-application-development",
        label: "SaaS Application Development",
        description:
          "Multi-tenant SaaS products ready for billing, roles, and growth.",
        href: "/services/saas-application-development",
        icon: "saas",
      },
      {
        slug: "erp-crm-development",
        label: "ERP & CRM Development",
        description:
          "Connected ERP and CRM systems for sales, operations, and reporting.",
        href: "/services/erp-crm-development",
        icon: "erp",
      },
      {
        slug: "cloud-based-application-development",
        label: "Cloud-Based Application Development",
        description:
          "Cloud-native applications that scale with demand and stay resilient.",
        href: "/services/cloud-based-application-development",
        icon: "cloud",
      },
      {
        slug: "api-development-integration",
        label: "API Development & Integration",
        description:
          "Stable APIs and integrations that connect products, partners, and data.",
        href: "/services/api-development-integration",
        icon: "api",
      },
    ],
  },
  {
    id: "ui-ux-design",
    label: "UI/UX Design Services",
    description:
      "Research-led design that makes complex products clear and usable.",
    services: [
      {
        slug: "on-demand-ui-ux-designer",
        label: "On Demand UI/UX Designer",
        description:
          "Flexible design support for product teams that need senior craft on demand.",
        href: "/services/on-demand-ui-ux-designer",
        icon: "uiuxOnDemand",
      },
      {
        slug: "mobile-app-ui-design",
        label: "Mobile App UI Design",
        description:
          "Mobile interfaces that feel intuitive on every screen size.",
        href: "/services/mobile-app-ui-design",
        icon: "mobileUi",
      },
      {
        slug: "website-ui-ux-design",
        label: "Website UI/UX Design",
        description:
          "Website experiences that communicate clearly and convert visitors.",
        href: "/services/website-ui-ux-design",
        icon: "websiteUi",
      },
      {
        slug: "wireframing-prototyping",
        label: "Wireframing & Prototyping",
        description:
          "Fast prototypes that validate flows before engineering begins.",
        href: "/services/wireframing-prototyping",
        icon: "wireframe",
      },
      {
        slug: "user-research-usability-testing",
        label: "User Research & Usability Testing",
        description:
          "Research and testing that reveal what users need and where they struggle.",
        href: "/services/user-research-usability-testing",
        icon: "userResearch",
      },
    ],
  },
];

export const services: ServiceItem[] = serviceCategories.flatMap(
  (category) => category.services,
);

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getServiceCategoryById(id: string) {
  return serviceCategories.find((category) => category.id === id);
}
