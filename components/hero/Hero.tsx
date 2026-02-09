"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { scrollToSection } from "@/lib/utils";

export const Hero = () => {
    const t = useTranslations("Hero");

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
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/35 to-transparent" />

            <div
                className={`absolute top-12 left-0 w-full h-full flex flex-col justify-center items-center gap-5 px-4 transition-all duration-700`}
            >
                <div className="flex flex-col justify-center items-center ">
                    <h1 className="text-5xl text-center font-semibold text-white">
                        A2B PRIVATE{" "}
                    </h1>
                    <h1 className="text-5xl text-center font-semibold text-white">
                        EQUITY FUND
                    </h1>
                </div>
                <div className="flex flex-col justify-center items-center gap-2 w-full">
                    <h2 className="text-lg font-semibold text-[#dfd7d1] text-center">
                        {t("h2")}
                    </h2>
                    <h3 className="text-sm text-[#dad0c9] text-center italic">
                    {t("h3")}
                    </h3>
                </div>
                <div>
                    <Button
                        variant="custom"
                        className="shadow-2xl shadow-amber-50/50 cursor-pointer"
                        onClick={() => scrollToSection("contact")}
                    >
                        {t("button")}
                    </Button>
                </div>
            </div>
        </section>
    );
};
