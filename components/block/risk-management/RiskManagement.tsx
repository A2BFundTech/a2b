"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Calendar, Scale, FileSearch, Building2, Clock, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type RiskManagementItemKey = "item1" | "item2" | "item3" | "item4" | "item5";

interface RiskManagementItem {
    key: RiskManagementItemKey;
    icon: LucideIcon;
}

const items: RiskManagementItem[] = [
    { key: "item1", icon: Calendar },
    { key: "item2", icon: Scale },
    { key: "item3", icon: FileSearch },
    { key: "item4", icon: Building2 },
    { key: "item5", icon: Clock },
];

export function RiskManagement() {
    const t = useTranslations("RiskManagement");

    return (
        <motion.section
            id="risk-management"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.25 }}
            className="py-10 md:py-20 bg-[#F7F5F2]"
        >
            <div className="container mx-auto px-4">
                <h2 className=" text-4xl md:text-5xl  font-semibold text-[#917355] text-center mb-12 md:mb-16">
                    {t("title")}
                </h2>

                <div className="flex flex-col gap-4 md:gap-6 max-w-4xl mx-auto">
                    {items.map(({ key, icon: Icon }, index) => (
                        <motion.div
                            key={key}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{
                                duration: 0.25,
                                delay: index * 0.08,
                            }}
                        >
                            <Card className="bg-background border border-[#91735556] rounded-xl shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                            <CardContent className="flex flex-row items-start gap-4 md:gap-6 p-6 min-w-0">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <Icon
                                        className="w-5 h-5 text-primary"
                                        color="#917355"
                                    />
                                </div>
                                <div className="flex flex-col min-w-0 flex-1">
                                    <h3 className=" text-lg font-semibold text-foreground mb-2">
                                        {t(`${key}_title`)}
                                    </h3>
                                    {(() => {
                                        const description = t(
                                            `${key}_description`
                                        );
                                        const lines = description
                                            .split(/\n/)
                                            .map((s) => s.trim())
                                            .filter(Boolean);
                                        if (lines.length <= 1) {
                                            return (
                                                <p className="text-[#968c81] text-sm leading-relaxed">
                                                    {description}
                                                </p>
                                            );
                                        }
                                        return (
                                            <ul className="list-disc list-inside space-y-1.5 text-[#968c81] text-sm leading-relaxed">
                                                {lines.map((line, i) => (
                                                    <li key={i}>
                                                        {line.replace(
                                                            /^[;\-]\s*/,
                                                            ""
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        );
                                    })()}
                                </div>
                            </CardContent>
                        </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
