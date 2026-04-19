"use client";

import { useTranslations } from "next-intl";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import OrbitImages from "@/components/OrbitImages";
import { Search, Scale, Users } from "lucide-react";
import { IoHammerOutline } from "react-icons/io5";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { useIsMobile } from "@/hooks/use-mobile";

type SocialLink = {
    key: "facebook" | "instagram" | "linkedin";
    icon: LucideIcon;
    href: string;
};

const MEMBER_IDS = [1, 2, 3, 4] as const;

const contactEmail = 'contact@a2b-group.com'

const socialLinks: readonly SocialLink[] = [
    { key: "facebook", icon: Facebook, href: "#" },
    { key: "instagram", icon: Instagram, href: "#" },
    { key: "linkedin", icon: Linkedin, href: "#" },
];
const iconItems = [
    <Search key="selection" className="w-full h-full text-[#917355]" />,
    <Scale key="legal" className="w-full h-full text-[#917355]" />,
    <IoHammerOutline key="hammer" className="w-full h-full text-[#917355]" />,
    <MdOutlineCalendarMonth
        key="calendar"
        className="w-full h-full text-[#917355]"
    />,
    <HiOutlineBuildingOffice2
        key="building"
        className="w-full h-full text-[#917355]"
    />,
    <Users key="users" className="w-full h-full text-[#917355]" />,
].map((Icon, i) => (
    <div
        key={i}
        className="w-full h-full rounded-full bg-[#F7F5F2]  flex items-center justify-center"
    >
        {Icon}
    </div>
));

export function Footer() {
    const t = useTranslations("Footer");
    const isMobile = useIsMobile();

    return (
        <footer id="footer" className="bg-[#F7F5F2] py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="font-heading text-3xl md:text-4xl font-semibold text-[#917355] text-left border-b border-[#917355] pb-2">
                    {t("title")}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0 justify-between items-center py-10">
                    <div className="grid grid-cols-1 gap-4 md:gap-6 max-w-4xl md:ml-5">
                        {MEMBER_IDS.map((id) => (
                            <div key={id}>
                                <p className="font-heading text-[1.1rem] md:text-xl font-semibold text-[#917355]">
                                    {t(`member_${id}_name`)}
                                </p>
                                <p className="text-[#968c81] text-[1rem] mt-1 ml-1">
                                    {t(`member_${id}_phone`)}
                                </p>
                            </div>
                        ))}
                        <div className="flex flex-col items-start justifu-center gap-1">
                            <p className="text-[#968c81] text-[1rem] mt-1 ml-1">
                                {contactEmail}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center w-full">
                        {isMobile ? (
                            <div className="flex flex-col items-center justify-center bg-[#F7F5F2] p-4 rounded-xl border border-[#917355]">
                                <h1 className="font-heading text-4xl md:text-5xl font-semibold text-[#917355] ">
                                    A2B
                                </h1>
                            </div>
                        ) : (
                            <OrbitImages
                                items={iconItems}
                                shape="circle"
                                radiusX={340}
                                radiusY={80}
                                rotation={-8}
                                duration={30}
                                itemSize={155}
                                responsive={true}
                                radius={380}
                                direction="normal"
                                fill
                                paused={true}
                                centerContent={
                                    <h1 className="font-heading text-5xl md:text-5xl font-semibold text-[#917355] underline">
                                        A2B
                                    </h1>
                                }
                            />
                        )}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mx-auto pt-6 border-t border-[#917355]/20">
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
