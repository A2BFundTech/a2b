import { Geist } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Providers } from "./providers";
import { Fraunces } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

export const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
};

const fraunces = Fraunces({
    subsets: ["latin", "latin-ext"],
    weight: ["300", "400", "500", "600", "700"],
    style: ["normal", "italic"],
    variable: "--font-fraunces",
});

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
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
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <meta name="msapplication-TileColor" content="#000000" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="black-translucent"
                />
            </head>
            <body
                className={`${geistSans.variable} ${fraunces.variable} antialiased`}
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
