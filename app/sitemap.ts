import type { MetadataRoute } from "next";

const DEFAULT_SITE_URL = "https://a2b-group.com";
const LOCALES = ["en", "ru", "uk", "es"] as const;

function getBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL;
  return raw.replace(/\/+$/, "");
}

function localizedPath(locale: (typeof LOCALES)[number]): string {
  return `/${locale}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const now = new Date();

  return LOCALES.map((locale) => {
    const path = localizedPath(locale);
    const languages = Object.fromEntries(
      LOCALES.map((altLocale) => [altLocale, `${baseUrl}${localizedPath(altLocale)}`])
    );

    return {
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: locale === "en" ? 1 : 0.9,
      alternates: {
        languages: {
          ...languages,
          "x-default": `${baseUrl}/en`,
        },
      },
    };
  });
}
