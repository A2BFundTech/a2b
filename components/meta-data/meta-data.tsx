import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { metaByLocale } from "./meta-messages";

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();
    const meta = metaByLocale[locale] ?? metaByLocale.en;

    const title = meta.title;
    const description = meta.description;
    const ogTitle = meta.ogTitle;
    const ogDescription = meta.ogDescription;

    const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL ?? "https://a2b-fund.vercel.app";
    
    const localeMap: Record<string, string> = {
        ru: "ru_RU",
        en: "en_US",
        uk: "uk_UA",
        es: "es_ES",
    };

    return {
        title,
        description,
        
        keywords: "real estate, investment, Spain, A2B Fund, недвижимость, инвестиции, аппартаменты, Valencia",
        authors: [{ name: "A2B Fund" }],
        creator: "A2B Fund",
        publisher: "A2B Fund",
        
        icons: {
            icon: [
                { url: "/favicon.ico" },
                { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
                { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
            ],
            apple: [
                { url: "/apple-icon.png", sizes: "180x180" },
            ],
        },
        
        manifest: "/site.webmanifest",

        themeColor: "#000000",

        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        
        // Open Graph
        openGraph: {
            type: "website",
            locale: localeMap[locale] || "en_US",
            alternateLocale: Object.values(localeMap).filter(l => l !== localeMap[locale]),
            url: `${baseUrl}/${locale}`,
            siteName: "A2B Fund",
            title: ogTitle,
            description: ogDescription,
            images: [
                {
                    url: `${baseUrl}/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: ogTitle,
                    type: "image/jpeg",
                },
            ],
        },
        
        // Twitter Card
        twitter: {
            card: "summary_large_image",
            title: ogTitle,
            description: ogDescription,
            images: [`${baseUrl}/twitter-image.png`],
            creator: "@a2bfund",
            site: "@a2bfund",
        },
        
        alternates: {
            canonical: `${baseUrl}/${locale}`,
            languages: {
                en: `${baseUrl}/en`,
                ru: `${baseUrl}/ru`,
                uk: `${baseUrl}/uk`,
                es: `${baseUrl}/es`,
                "x-default": `${baseUrl}/en`,
            },
        },

        category: "finance",
        classification: "Business",
    };
}