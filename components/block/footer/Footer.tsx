"use client";

import { useTranslations } from "next-intl";
import {
    MapPin,
    Phone,
    Mail,
    Facebook,
    Instagram,
    Linkedin,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

type ContactItem = {
    key: "address" | "phone" | "email";
    icon: LucideIcon;
    line1Key: string;
    line2Key: string;
};

type SocialLink = {
    key: "facebook" | "instagram" | "linkedin";
    icon: LucideIcon;
    href: string;
};

const contactItems: readonly ContactItem[] = [
    {
        key: "address",
        icon: MapPin,
        line1Key: "address_line1",
        line2Key: "address_line2",
    },
    {
        key: "phone",
        icon: Phone,
        line1Key: "phone_line1",
        line2Key: "phone_line2",
    },
    {
        key: "email",
        icon: Mail,
        line1Key: "email_line1",
        line2Key: "email_line2",
    },
];

const socialLinks: readonly SocialLink[] = [
    { key: "facebook", icon: Facebook, href: "#" },
    { key: "instagram", icon: Instagram, href: "#" },
    { key: "linkedin", icon: Linkedin, href: "#" },
];

export function Footer() {
    const t = useTranslations("Footer");

    return (
        <footer id="footer" className="bg-[#F7F5F2] py-12 md:py-16">
            <div className="container mx-auto px-4">
                {/* Заголовок и карточки контактов */}
                <h2 className="font-heading text-3xl md:text-4xl font-semibold text-[#917355] text-center mb-10 md:mb-12">
                    {t("title")}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto mb-14 md:mb-16">
                    {contactItems.map(
                        ({ key, icon: Icon, line1Key, line2Key }) => (
                            <Card
                                key={key}
                                className="bg-[#ebe5df]/80 border-0 rounded-xl shadow-sm flex flex-col items-center justify-center text-center"
                            >
                                <CardContent className="flex flex-col items-center gap-2 p-6 w-full">
                                    <div className="w-10 h-10 rounded-full bg-[#917355]/10 flex items-center justify-center shrink-0">
                                        <Icon className="w-5 h-5 text-[#917355]" />
                                    </div>
                                    <p className="font-heading text-sm font-semibold text-[#917355]">
                                        {t(`${key}_label`)}
                                    </p>
                                    <p className="text-[#968c81] text-sm leading-relaxed">
                                        {t(line1Key)}
                                        <br />
                                        {t(line2Key)}
                                    </p>
                                </CardContent>
                            </Card>
                        )
                    )}
                </div>

                {/* Нижний блок: текст слева, иконки соцсетей справа */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 max-w-4xl mx-auto pt-6 border-t border-[#917355]/20">
                    <div>
                        <p className="font-heading text-lg md:text-xl font-semibold text-[#917355]">
                            {t("social_title")}
                        </p>
                        <p className="text-[#968c81] text-sm mt-1">
                            {t("social_subtitle")}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {socialLinks.map(({ key, icon: Icon, href }) => (
                            <a
                                key={key}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 rounded-full bg-[#ebe5df]/80 flex items-center justify-center text-[#917355] hover:bg-[#917355]/10 transition-colors"
                                aria-label={key}
                            >
                                <Icon className="w-5 h-5" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
