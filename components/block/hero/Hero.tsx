"use client";

import { Button } from "../../ui/button";
import { useTranslations } from "next-intl";
import { scrollToSection } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";

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

            <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />

            <div className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-44 pt-20">
                <div className="flex flex-col items-start max-w-xl gap-6">

                    <motion.div
                        className="flex items-center gap-4"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <div className="w-1 h-12 bg-amber-400 rounded-full" />
                        <span className="text-amber-400 text-5xl font-semibold tracking-[0.25em] uppercase">
                            A2B
                        </span>
                    </motion.div>

                    <motion.h1
                        className="text-white font-bold leading-tight text-5xl md:text-6xl lg:text-6xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                    >
                        {t("h2")}
                    </motion.h1>

                    <motion.p
                        className="text-white italic text-xl md:text-2xl leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    >
                        {t("h3")}
                    </motion.p>

                    {/* Кнопка */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
                    >
                        <Button
                            variant="custom"
                            className="mt-2 py-5 px-8 text-base font-medium  hover:scale-105 transition-all"
                            onClick={() => scrollToSection("contact")}
                        >
                            {t("button")}
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};