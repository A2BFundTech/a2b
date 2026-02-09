"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useInView } from "@/lib/use-in-view";
import type { LucideIcon } from "lucide-react";

type OurPartnersPartnerKey =
    | "partner_1"
    | "partner_2"
    | "partner_3"
    | "partner_4"
    | "partner_5"
    | "partner_6"
    | "partner_7"
    | "partner_8";

interface Partner {
    id: number;
    key: OurPartnersPartnerKey;
    icon: LucideIcon;
}

const partners: Partner[] = [
    { id: 1, key: "partner_1", icon: Building2 },
    { id: 2, key: "partner_2", icon: Building2 },
    { id: 3, key: "partner_3", icon: Building2 },
    { id: 4, key: "partner_4", icon: Building2 },
    { id: 5, key: "partner_5", icon: Building2 },
    { id: 6, key: "partner_6", icon: Building2 },
];
export function OurPartners() {
    const t = useTranslations("OurPartners");
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

    return (
        <section id="partners" ref={sectionRef} className="py-10 md:py-20 bg-[#F7F5F2]">
            <div className="container mx-auto px-4">
                <h2
                    className={`text-4xl md:text-5xl font-semibold text-[#917355] text-center mb-12 md:mb-16 transition-all duration-500 ${
                        isInView
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-5"
                    }`}
                >
                    {t("title")}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
                    {partners.map((p, index) => (
                        <Card
                            key={p.id}
                            className={`bg-[#ebe5df] border-0 flex flex-col items-center justify-center min-h-[140px] aspect-2/1 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 ${
                                isInView
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-6"
                            }`}
                            style={{
                                transitionDelay: isInView
                                    ? `${index * 100}ms`
                                    : "0ms",
                            }}
                        >
                            <CardContent className="flex flex-col items-center justify-center gap-3 p-6 flex-1 w-full">
                                <div className="w-14 h-14 rounded-lg bg-white/70 flex items-center justify-center shrink-0">
                                    <Building2 className="w-7 h-7 text-[#968c81]" />
                                </div>
                                <span className="text-[#808080] text-sm md:text-base text-center font-medium">
                                    {t(`partners.${p.key}`)}
                                </span>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
