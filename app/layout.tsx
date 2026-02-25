import { Geist } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Providers } from "./providers";
import { Fraunces } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { Metadata } from "next";
import { getMetadataForLocale } from "@/components/meta-data/meta-data";

export const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    themeColor: "#000000",
};

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();
    return getMetadataForLocale(locale);
  }

const fraunces = Fraunces({
    subsets: ["latin", "latin-ext"],
    weight: ["400", "600"],
    style: ["normal", "italic"],
    variable: "--font-fraunces",
});

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const locale = await getLocale();
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body
                className={`${fraunces.variable} antialiased`}
            >
                <Providers>
                    <NextIntlClientProvider locale={locale} messages={messages}>
                        {children}
                    </NextIntlClientProvider>
                    <Toaster richColors />
                </Providers>
            </body>
        </html>
    );
}
