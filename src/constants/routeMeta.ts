export interface PageMetaConfig {
  title: string;
  description: string;
  /** Path segment only, e.g. "/about" — canonical is built from SITE_ORIGIN */
  path: string;
  ogImage?: string;
  noIndex?: boolean;
}

export const SITE_ORIGIN = "https://saranganiresources.com";
export const SITE_NAME = "Sarangani Resources Corporation";
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/assets/home/home-hero.jpg`;

const titleSuffix = ` | ${SITE_NAME}`;

export const ROUTE_META: Record<string, PageMetaConfig> = {
  "/": {
    path: "/",
    title: `${SITE_NAME} | Premium PEZA Economic Zones & Commercial Leasing`,
    description:
      "Discover premium PEZA-registered economic zones in South Cotabato, Philippines. SRC offers world-class commercial leasing, industrial facilities, and investor-friendly resources for your business expansion.",
    ogImage: DEFAULT_OG_IMAGE,
  },
  "/about": {
    path: "/about",
    title: `About Us${titleSuffix}`,
    description:
      "Learn about Sarangani Resources Corporation — a PEZA-registered developer delivering world-class economic zones and commercial facilities in SOCCSKSARGEN.",
    ogImage: DEFAULT_OG_IMAGE,
  },
  "/properties": {
    path: "/properties",
    title: `Properties & Economic Zones${titleSuffix}`,
    description:
      "Explore SRC's PEZA-registered industrial zones, commercial facilities, and investment-ready properties across South Cotabato.",
    ogImage: DEFAULT_OG_IMAGE,
  },
  "/for-sale": {
    path: "/for-sale",
    title: `Properties For Sale${titleSuffix}`,
    description:
      "Browse available commercial and industrial properties for sale within SRC's PEZA-registered economic zones.",
    ogImage: DEFAULT_OG_IMAGE,
  },
  "/leasing": {
    path: "/leasing",
    title: `Commercial Leasing${titleSuffix}`,
    description:
      "Lease premium commercial and industrial spaces in SRC's PEZA economic zones with competitive rates and full PEZA incentive eligibility.",
    ogImage: DEFAULT_OG_IMAGE,
  },
  "/resources": {
    path: "/resources",
    title: `Investor Resources${titleSuffix}`,
    description:
      "Access PEZA incentive guides, tax holiday information, and investment resources for businesses expanding into SOCCSKSARGEN.",
    ogImage: DEFAULT_OG_IMAGE,
  },
  "/contact": {
    path: "/contact",
    title: `Contact Us${titleSuffix}`,
    description:
      "Get in touch with Sarangani Resources Corporation to schedule a consultation or inquire about PEZA economic zone opportunities.",
    ogImage: DEFAULT_OG_IMAGE,
  },
  "/credits": {
    path: "/credits",
    title: `Team & Credits${titleSuffix}`,
    description:
      "Meet the team behind the Sarangani Resources Corporation corporate website.",
    ogImage: DEFAULT_OG_IMAGE,
    noIndex: true,
  },
};

export function resolveRouteMeta(pathname: string): PageMetaConfig {
  const normalized =
    pathname.endsWith("/") && pathname.length > 1
      ? pathname.slice(0, -1)
      : pathname;

  const known = ROUTE_META[normalized];
  if (known) return known;

  if (normalized !== "/") {
    return {
      path: normalized,
      title: `Page Not Found | ${SITE_NAME}`,
      description: ROUTE_META["/"].description,
      ogImage: DEFAULT_OG_IMAGE,
      noIndex: true,
    };
  }

  return ROUTE_META["/"];
}
