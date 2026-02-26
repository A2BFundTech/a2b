"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Building2, Wallet, CircleDollarSign, Hotel } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";

type PartnerKey =
    | "partner_1"
    | "partner_2"
    | "partner_3"
    | "partner_4"
    | "partner_5"
    | "partner_6";

type Partner =
    | { id: number; key: PartnerKey; icon: LucideIcon }
    | { id: number; key: PartnerKey; imageSrc: string };

const partners: Partner[] = [
    { id: 1, key: "partner_1", icon: Building2 },
    { id: 2, key: "partner_2", icon: Wallet },
    { id: 3, key: "partner_3", icon: Hotel },
    { id: 4, key: "partner_4", icon: CircleDollarSign },
    { id: 5, key: "partner_5", imageSrc: "/assets/images/partners/4Blogo.png" },
    { id: 6, key: "partner_6", imageSrc: "/assets/images/partners/hlius.png" },
];

export function OurPartners() {
    const t = useTranslations("OurPartners");

    return (
        <motion.section
            id="partners"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.25 }}
            className="py-10 md:py-20 bg-[#F7F5F2]"
        >
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-semibold text-[#917355] text-center mb-12 md:mb-16">
                    {t("title")}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-w-3xl mx-auto items-center justify-center">
                    {partners.map((p, index) => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.25, delay: index * 0.15 }}
                        >
                            <Card className="bg-[#ebe5df] border-0 flex flex-col items-center justify-center min-h-[180px] aspect-2/1 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                                <CardContent className="flex flex-col items-center justify-center h-full gap-4 p-2 flex-1 w-full">
                                    <div className="w-20 h-20 rounded-lg flex items-center justify-center shrink-0">
                                        {"imageSrc" in p ? (
                                            <Image
                                                src={p.imageSrc}
                                                alt={t(
                                                    `partners.${p.key}_name`,
                                                )}
                                                width={64}
                                                height={64}
                                                className="object-cover rounded-lg w-20 h-20"
                                            />
                                        ) : (
                                            <div className="w-20 h-20 rounded-lg bg-white/70 flex items-center justify-center shrink-0">
                                                <p.icon className="w-10 h-10 text-[#968c81]" />
                                            </div>
                                        )}
                                    </div>
                                    <span className="text-[#808080] text-[1rem] md:text-[1.1rem] text-center font-medium leading-tight">
                                        {t(`partners.${p.key}_name`)}
                                    </span>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
