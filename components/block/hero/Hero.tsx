"use client";

import { Button } from "../../ui/button";
import { useLocale, useTranslations } from "next-intl";
import { scrollToSection } from "@/lib/utils";
import Image from "next/image";

export const Hero = () => {
    const t = useTranslations("Hero");
    const locale = useLocale();

    const titleSize = ["ru", "ua"].includes(locale)
        ? "text-[1.9rem] md:text-[3rem] lg:text-[3.5rem]"
        : "text-[2.25rem] md:text-[3.25rem] lg:text-[4rem]";

    return (
        <section
            id="hero"
            className="relative w-full overflow-hidden min-h-screen bg-black"
        >
            <Image
                src="/assets/images/herow8.webp"
                alt="Hero background"
                fill
                priority
                className="object-cover"
                sizes="100vw"
            />
            {/* <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/50 to-transparent"/> */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/60 to-black/30" />
            <div className="min-h-screen flex flex-col items-center px-4 pt-80  md:pt-64 relative  ">
                <div className="flex flex-col items-center text-center max-w-3xl mb-4 backdrop-blur-md p-4 md:rounded-xl bg-white/10">
                    <h1
                        className={`font-bold text-white tracking-wide ${titleSize} leading-tight`}
                    >
                        {t("title_line1")}
                    </h1>
                    <h1
                        className={`font-bold text-white tracking-wide ${titleSize} leading-tight`}
                    >
                        {t("title_line2")} {t("title_line3")}
                    </h1>
                </div>

                <p
                    className="text-white text-center md:text-base max-w-xl mb-8 md:mb-10 leading-relaxed"
                    style={{
                        textShadow:
                            "2px 2px 4px rgba(0,0,0,0.9), -1px -1px 0 rgba(0,0,0,0.9), 1px -1px 0 rgba(0,0,0,0.9), -1px 1px 0 rgba(0,0,0,0.9), 1px 1px 0 rgba(0,0,0,0.9)",
                    }}
                >
                    <span className="text-xl md:text-2xl">{t("h2")}.</span>
                    <br />
                    <span className="text-white italic text-md md:text-lg">
                        {t("h3")}
                    </span>
                </p>

                <Button
                    variant="custom"
                    className="mt-8 md:mt-10 shadow-xl py-5 px-8 text-base font-medium hover:scale-105 transition-transfor"
                    onClick={() => scrollToSection("contact")}
                >
                    {t("button")}
                </Button>
            </div>
        </section>
    );
};
