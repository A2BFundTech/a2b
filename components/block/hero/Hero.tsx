"use client";

import Image from "next/image";
import { Button } from "../../ui/button";
import { useLocale, useTranslations } from "next-intl";
import { scrollToSection } from "@/lib/utils";

export const Hero = () => {
    const t = useTranslations("Hero");

    const locale = useLocale();


    return (
        <section
            id="hero"
            className="relative w-full overflow-hidden min-h-screen"
        >
            <Image
                src="/assets/heroImg.webp"
                alt="Hero background"
                fill
                priority
                className="object-cover"
                sizes="100vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/40 to-transparent" />

            <div
                className={`absolute top-12 left-0 w-full h-full flex flex-col justify-center items-center gap-5  transition-all duration-700`}
            >
                <div className="flex flex-col justify-center items-center p-2 w-full mt-10">
                    <h1 className={`text-center font-semibold text-white tracking-wider ${["ru", "ua"].includes(locale) ? "text-[3rem]" : "text-[3.5rem]"}`}>
                        {t("title_line1")}
                    </h1>
                    <h1 className={`text-center font-semibold text-white tracking-wider ${["ru", "ua"].includes(locale) ? "text-[3rem]" : "text-[3.5rem]"}`}>
                        {t("title_line2")} {t("title_line3")}
                    </h1>
                </div>
                <div className="flex flex-col justify-center items-center gap-2 w-full bg-white/30 backdrop-blur-sm py-3">
                    <h2 className="text-lg font-semibold text-white text-center tracking-widest">
                        {t("h2")}
                    </h2>
                    <h3 className="text-md text-white text-center tracking-wide">
                        {t("h3")}
                    </h3>
                </div>
                <div>
                    <Button
                        variant="custom"
                        className="shadow-2xl shadow-black-50/50 cursor-pointer py-6 px-7 text-md"
                        onClick={() => scrollToSection("contact")}
                    >
                        {t("button")}
                    </Button>
                </div>
            </div>
        </section>
    );
};
