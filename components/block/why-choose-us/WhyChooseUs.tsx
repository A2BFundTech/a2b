"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    CalendarCheck,
    ShieldCheck,
    Search,
    Hammer,
    Building2,
    ShieldAlert,
    HandCoins,
    LucideIcon,
} from "lucide-react";
import { DotPattern } from "../../ui/dot-pattern";

type WhyChooseUsItemKey =
    | "experience"
    | "transparency"
    | "sourcing"
    | "development"
    | "management"
    | "risks"
    | "invest_together";

interface WhyChooseUsItem {
    key: WhyChooseUsItemKey;
    icon: LucideIcon;
}

const items: WhyChooseUsItem[] = [
    { key: "experience", icon: CalendarCheck },
    { key: "transparency", icon: ShieldCheck },
    { key: "sourcing", icon: Search },
    { key: "development", icon: Hammer },
    { key: "management", icon: Building2 },
    { key: "risks", icon: ShieldAlert },
    { key: "invest_together", icon: HandCoins },
];

export function WhyChooseUs() {
    const t = useTranslations("WhyChooseUs");

    return (
        <motion.section
            id="why-choose-us"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.25 }}
            className="py-10 md:py-20 bg-[#F7F5F2] relative"
        >
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none hidden md:block">
                <DotPattern
                    cr={2}
                    width={25}
                    height={25}
                    className="text-white my-3 "
                />
            </div>

            <div className="container mx-auto px-4 z-2 relative">
                <h2 className=" text-4xl md:text-5xl font-semibold text-[#917355] text-center mb-12 md:mb-16">
                    {t("title")}
                </h2>

                <Accordion
                    type="single"
                    collapsible
                    className="mx-auto max-w-2xl bg-background rounded-xl border shadow-sm overflow-hidden "
                >
                    {items.map(({ key, icon: Icon }) => (
                        <AccordionItem
                            key={key}
                            value={key}
                            className="px-4 md:px-6 bg-white"
                        >
                            <AccordionTrigger className="text-left  text-base md:text-lg font-semibold text-foreground hover:no-underline py-5 gap-3 [&>svg]:shrink-0">
                                <span className="flex items-center gap-3">
                                    <span className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <Icon
                                            className="w-4 h-4 text-primary"
                                            color="#917355"
                                        />
                                    </span>
                                    {t(`${key}.title`)}
                                </span>
                            </AccordionTrigger>
                            <AccordionContent className="text-[#968c81] pb-5">
                                {t(`${key}.description`)}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </motion.section>
    );
}
