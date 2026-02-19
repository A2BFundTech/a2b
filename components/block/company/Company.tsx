"use client";

import { IoHammerOutline } from "react-icons/io5";
import { MdOutlineCalendarMonth } from "react-icons/md"; 
import { HiOutlineBuildingOffice2 } from "react-icons/hi2"; 
import { BiSearchAlt } from "react-icons/bi"; 
import { MdOutlineApartment } from "react-icons/md";
import { HiOutlineShieldCheck } from "react-icons/hi2"; 
import { TbReportAnalytics } from "react-icons/tb"; 
import { RiHandCoinLine } from "react-icons/ri"; 

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

type Cards = {
    icon: React.ReactNode;
    titleKey: string;
    descKey: string;
}


const cards: Cards[] = [
    {
        icon: <MdOutlineCalendarMonth size={40} color="#917355"/>,
        titleKey: "card1.title", // 10+ лет
        descKey: "card1.description",
    },
    {
        icon: <HiOutlineBuildingOffice2 size={40} color="#917355"/>,
        titleKey: "card2.title", // 70+ проектов
        descKey: "card2.description",
    },
    {
        icon: <BiSearchAlt size={40} color="#917355"/>,
        titleKey: "card3.title", // Подбор объектов
        descKey: "card3.description",
    },
    {
        icon: <IoHammerOutline size={40} color="#917355"/>,
        titleKey: "card4.title", // Строительство
        descKey: "card4.description",
    },
    {
        icon: <MdOutlineApartment size={40} color="#917355"/>,
        titleKey: "card5.title", // Управление
        descKey: "card5.description",
    },
    {
        icon: <HiOutlineShieldCheck size={40} color="#917355"/>,
        titleKey: "card6.title", // Минимизация рисков
        descKey: "card6.description",
    },
    {
        icon: <TbReportAnalytics size={40} color="#917355"/>,
        titleKey: "card7.title", // Прозрачность
        descKey: "card7.description",
    },
    {
        icon: <RiHandCoinLine size={40} color="#917355"/>,
        titleKey: "card8.title", // Собственный капитал
        descKey: "card8.description",
    },
];

export const Company = () => {
    const t = useTranslations("Company");

    return (
        <motion.section
            id="company"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.25 }}
            className="relative w-full overflow-hidden py-15 p-3 flex flex-col justify-center items-center"
        >
            <div className="flex flex-col gap-20 items-center justify-center">
                <div className="flex flex-col gap-4 items-center justify-center">
                    <h2 className="text-4xl font-bold text-[#917355]">{t("titile")}</h2>
                    <p className="text-md text-center md:max-w-2xl">{t("description")}</p>
                </div>
                <div className="md:hidden w-full max-w-xs">
                    <Carousel
                        opts={{ align: "start", loop: false }}
                        orientation="vertical"
                        className="w-full h-[400px]"
                    >
                        <CarouselContent className="-mt-4 h-[400px]">
                            {cards.map((card, idx) => (
                                <CarouselItem key={idx} className="pt-4 basis-1/2">
                                    <Card className="w-full h-[180px] px-4 py-4">
                                        <CardContent className="flex flex-col w-full h-full items-center justify-center p-0">
                                            <div className="flex flex-col items-center justify-center gap-2 text-center">
                                                <p>{card.icon}</p>
                                                <h3 className="text-lg font-bold">{t(card.titleKey)}</h3>
                                                <p className="text-md text-[#968c81]">{t(card.descKey)}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>

                {/* Horizontal carousel — desktop */}
                <div className="hidden md:block w-full max-w-4xl px-6">
                    <Carousel
                        opts={{ align: "start", loop: true }}
                        orientation="horizontal"
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4 w-auto">
                            {cards.map((card, idx) => (
                                <CarouselItem key={idx} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/4">
                                    <Card className="w-full h-[215px] px-4 py-4">
                                        <CardContent className="flex flex-col w-full h-full items-center justify-start p-0">
                                            <div className="flex flex-col items-center justify-center gap-2 text-center">
                                                <p>{card.icon}</p>
                                                <h3 className="text-lg font-semibold">{t(card.titleKey)}</h3>
                                                <p className="text-md text-[#968c81]">{t(card.descKey)}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
                <p className="text-md text-center md:max-w-2xl italic">{t('description2')}</p>
            </div>
        </motion.section>
    );
};
