"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import {
    Sun,
    Users,
    Shield,
    TrendingUp,
    Building,
    Thermometer,
    Award,
    Globe,
} from "lucide-react";
import { LuDot } from "react-icons/lu";
import { useInView } from "@/lib/use-in-view";

export function Spain() {
    const t = useTranslations("Spain");
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

    return (
        <section
            id="spain"
            ref={sectionRef}
            className={`py-20 bg-[#F7F5F2] transition-all duration-500 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
        >
            <div className="container mx-auto px-4">
                <h2 className=" text-4xl md:text-5xl font-semibold text-[#917355] text-center mb-16">
                    {t("title")}
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    <div className="bg-background rounded-xl p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Globe className="w-5 h-5 text-primary" color="#917355"/>
                            </div>
                            <h3 className=" text-xl font-semibold text-foreground">
                                {t("subtitle")}
                            </h3>
                        </div>
                        <p className=" mb-4 ">
                            {t("intro")}
                        </p>
                        <ul className="space-y-2 text-[#968c81] italic">
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-1"><LuDot size={25} color="#917355" /></span>
                                <span>{t("people")}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-1"><LuDot size={25} color="#917355" /></span>
                                <span>{t("fact_0")}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-1"><LuDot size={25} color="#917355" /></span>
                                <span>{t("fact_1")}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-1"><LuDot size={25} color="#917355" /></span>
                                <span>{t("fact_2")}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Economy Card */}
                    <div className="bg-background rounded-xl p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-primary" color="#917355" />
                            </div>
                            <h3 className=" text-xl font-semibold text-foreground">
                                {t("economy_title")}
                            </h3>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-secondary/50 rounded-lg p-4">
                                <p className="text-sm  mb-1">
                                    {t("fact_3")}
                                </p>
                                <p className="text-2xl font-semibold text-[#968c81] font-sans">
                                    {t("fact_3_value")}
                                </p>
                            </div>
                            <div className="bg-secondary/50 rounded-lg p-4">
                                <p className="text-sm  mb-1">
                                    {t("fact_4")}
                                </p>
                                <p className="text-2xl font-semibold text-[#968c81] font-sans">
                                    {t("fact_4_value")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Climate Card */}
                    <div className="bg-background rounded-xl p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Sun className="w-5 h-5 text-primary" color="#917355"/>
                            </div>
                            <h3 className=" text-xl font-semibold text-foreground">
                                {t("climate_title")}
                            </h3>
                        </div>
                        <p className="text-[#968c81] mb-4">
                            {t("climate_0")}
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-secondary/50 rounded-lg p-3 text-center">
                                <Thermometer className="w-5 h-5 text-primary mx-auto mb-1" color="#2B2B2B"/>
                                <p className="text-xs">
                                    {t("summer_temperature")}
                                </p>
                                <p className="font-semibold text-[#968c81] font-sans">
                                    {t("summer_temperature_value")}
                                </p>
                            </div>
                            <div className="bg-secondary/50 rounded-lg p-3 text-center">
                                <Thermometer className="w-5 h-5 text-primary mx-auto mb-1" color="#2B2B2B"/>
                                <p className="text-xs">
                                    {t("winter_temperature")}
                                </p>
                                <p className="font-semibold text-[#968c81] font-sans">
                                    {t("winter_temperature_value")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Award Banner */}
                <div className="bg-[#C6B38E] text-primary-foreground rounded-xl p-6 mb-12 flex items-center justify-center gap-4 text-center">
                    <Award className="w-8 h-8 md:w-12 md:h-12 shrink-0" />
                    <div className="">
                        <p className="text-lg md:text-xl font-semibold tracking-widest italic">
                            {t("expat_line")}
                        </p>
                        <p className="text-primary-foreground/90 text-sm mt-1">
                            {t("expat_sub")}
                        </p>
                    </div>
                </div>

                {/* Investor Benefits */}
                <div>
                    <h3 className=" text-2xl md:text-3xl font-semibold text-[#917355] text-center mb-8">
                        {t("investor_title")}
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-background rounded-xl p-5 text-center shadow-sm">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                                <Building className="w-6 h-6 text-primary" color="#917355"/>
                            </div>
                            <p className="text-foreground font-medium">
                                {t("investor_0")}
                            </p>
                        </div>
                        <div className="bg-background rounded-xl p-5 text-center shadow-sm">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                                <Users className="w-6 h-6 text-primary" color="#917355"/>
                            </div>
                            <p className="text-foreground font-medium">
                                {t("investor_1")}
                            </p>
                        </div>
                        <div className="bg-background rounded-xl p-5 text-center shadow-sm">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                                <Shield className="w-6 h-6 text-primary" color="#917355"/>
                            </div>
                            <p className="text-foreground font-medium">
                                {t("investor_2")}
                            </p>
                        </div>
                        <div className="bg-background rounded-xl p-5 text-center shadow-sm">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                                <TrendingUp className="w-6 h-6 text-primary" color="#917355"/>
                            </div>
                            <p className="text-foreground font-medium">
                                {t("investor_3")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
