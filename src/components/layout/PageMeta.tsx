import { useEffect } from "react";
import { useLocation } from "react-router";
import {
  resolveRouteMeta,
  SITE_ORIGIN,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
} from "@/constants/routeMeta";

function upsertMeta(
  attribute: "name" | "property",
  key: string,
  content: string,
) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(
    `link[rel="${rel}"]`,
  );

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

export function PageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = resolveRouteMeta(pathname);
    const canonicalUrl = `${SITE_ORIGIN}${meta.path === "/" ? "/" : meta.path}`;
    const ogImage = meta.ogImage ?? DEFAULT_OG_IMAGE;
    const robotsContent = meta.noIndex
      ? "noindex, nofollow"
      : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

    document.title = meta.title;

    upsertMeta("name", "title", meta.title);
    upsertMeta("name", "description", meta.description);
    upsertMeta("name", "robots", robotsContent);

    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:title", meta.title);
    upsertMeta("property", "og:description", meta.description);
    upsertMeta("property", "og:image", ogImage);
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:locale", "en_PH");

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:url", canonicalUrl);
    upsertMeta("name", "twitter:title", meta.title);
    upsertMeta("name", "twitter:description", meta.description);
    upsertMeta("name", "twitter:image", ogImage);

    upsertLink("canonical", canonicalUrl);
  }, [pathname]);

  return null;
}
