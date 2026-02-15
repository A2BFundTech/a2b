import createMiddleware from "next-intl/middleware";

export default createMiddleware({
    locales: ["en", "ru", "uk", "es"],
    defaultLocale: "en",
    localeDetection: true,
});

export const config = {
    matcher: ["/((?!api|_next|panel|auth|.*\\..*).*)"],
};
