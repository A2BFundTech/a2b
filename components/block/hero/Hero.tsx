"use client";

import { Button } from "../../ui/button";
import { useTranslations } from "next-intl";
import { scrollToSection } from "@/lib/utils";
import Image from "next/image";

export const Hero = () => {
    const t = useTranslations("Hero");

    return (
        <section
            id="hero"
            className="relative w-full overflow-hidden min-h-screen bg-black"
        >
            <Image
                src="/assets/images/hero6.webp"
                alt="Hero background"
                fill
                priority
                className="object-cover"
                sizes="100vw"
            />
            {/* <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/50 to-transparent"/> */}
            <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/40 to-black/10" />
            <div className="min-h-screen flex flex-col items-center h-full justify-center relative px-5 pt-15 md:pt-30">
                <div className="flex flex-col items-center justify-start gap-5 text-center max-w-2xl w-full mb-4 backdrop-blur-lg px-1 py-10 rounded-xl bg-white/10 border-gray-300/90 border-2">
                    <h1
                        className="font-bold text-white tracking-wide wrap-break-word leading-tight text-[2.5rem] md:text-[3.25rem] lg:text-[4.5rem]"
                    >
                        A2B
                    </h1>

                    <div className="text-white text-center md:text-base max-w-xl leading-relaxed wrap-break-word">
                        <h2 className="text-xl text-white md:text-3xl mb-1">{t("h2")}</h2>
                        <span className="text-white italic text-md md:text-xl max-w-1/2">
                            {t("h3")}
                        </span>
                    </div>
                </div>
                <Button
                    variant="custom"
                    className="mt-8 md:mt-10 shadow-xl py-5 px-8 text-base font-medium hover:scale-105 transition-transfor border-gray-300/90 border-2"
                    onClick={() => scrollToSection("contact")}
                >
                    {t("button")}
                </Button>
            </div>
        </section>
    );
};
