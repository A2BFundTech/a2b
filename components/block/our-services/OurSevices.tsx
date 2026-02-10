"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Search, Scale, Languages, Building2, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type OurServicesItemKey = "selection" | "legal" | "translation" | "management" | "sale";

interface OurServicesItem {
    key: OurServicesItemKey;
    icon: LucideIcon;
}

const services: OurServicesItem[] = [
    { key: "selection", icon: Search },
    { key: "legal", icon: Scale },
    { key: "translation", icon: Languages },
    { key: "management", icon: Building2 },
    { key: "sale", icon: TrendingUp },
];

export const OurSevices = () => {
    const t = useTranslations("OurServices");

    return (
        <motion.section
            id="services"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.25 }}
            className="py-10 md:py-20 min-h-screen md:min-h-0"
        >
            <div className="container mx-auto px-4 max-w-5xl">
                <h2 className=" text-4xl md:text-5xl font-semibold text-[#917355] text-center mb-16">
                    {t("title")}
                </h2>

                <div className="grid md:grid-cols-2 gap-6 ">
                    {services.map(({ key, icon: Icon }) => (
                        <div
                            key={key}
                            className={`rounded-xl p-6 shadow-sm border border-[#91735556] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ${key === "sale" ? "md:col-span-2" : ""}`}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Icon
                                        className="w-5 h-5 text-primary"
                                        color="#917355"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground">
                                    {t(`${key}.title`)}
                                </h3>
                            </div>
                            <p className="text-[#968c81]">
                                {t(`${key}.description`)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};
