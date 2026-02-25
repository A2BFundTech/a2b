"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "motion/react";
import { Separator } from "@/components/ui/separator";

const STEPS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

export function InvestmentLifecycle() {
    const locale = useLocale();
    const t = useTranslations("Lifecycle");

    return (
        <motion.section
            id="lifecycle"
            key={locale}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.25 }}
            className="py-10 md:py-20 bg-background"
        >
            <div className="container mx-auto px-4 md:max-w-5xl">
                <h2 className=" text-4xl md:text-5xl font-semibold text-[#917355] text-center mb-12 md:mb-16">
                    {t("main_title")}
                </h2>

                <div className="space-y-5 md:space-y-15">
                    {STEPS.map((step, index) => {
                        const isEven = step % 2 === 0;
                        const stepKey = `card_${step}` as const;
                        const number = step < 10 ? `0${step}` : String(step);

                        return (
                            <div key={step}>
                                <motion.div
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.15 }}
                                    transition={{
                                        duration: 0.1,
                                        delay: index * 0.05,
                                    }}
                                    className={`grid md:grid-cols-2 gap-5 md:gap-10 items-center ${isEven ? "md:grid-flow-dense" : ""}`}
                                >
                                    <div
                                        className={`order-2 md:order-0
                                        ${isEven ? "md:col-start-1 md:text-left" : "md:col-start-2 md:row-start-1 md:text-left"}
                                    `}
                                    >
                                        <h3 className=" text-xl md:text-2xl font-semibold text-foreground pb-2 border-b-2 border-[#917355]/30 inline-block">
                                            {t(`${stepKey}.title_card`)}
                                        </h3>
                                        <p className="mt-4 text-[#968c81] text-sm md:text-base leading-relaxed max-w-xl">
                                            {t(`${stepKey}.description_card`)}
                                        </p>
                                    </div>

                                    {/* Крупный номер */}
                                    <div
                                        className={`order-1 md:order-0
                                        ${
                                            isEven
                                                ? "md:col-start-2 md:row-start-1 flex items-center justify-start md:justify-end"
                                                : "md:col-start-1 md:row-start-1 flex items-center justify-start md:justify-start"
                                        }
                                    `}
                                    >
                                        <span
                                            className="text-[6rem] md:text-[10rem] pt-5 md:pt-0 leading-none select-none text-[#917355]/15"
                                            aria-hidden
                                        >
                                            {number}
                                        </span>
                                    </div>
                                </motion.div>
                                <Separator
                                    className="my-20 hidden md:block"
                                    decorative={true}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </motion.section>
    );
}
