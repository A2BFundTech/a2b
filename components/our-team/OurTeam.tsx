"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { useInView } from "@/lib/use-in-view";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

type MemberId = 1 | 2 | 3 | 4;

const MEMBER_IDS: readonly MemberId[] = [1, 2, 3, 4];

function TeamCard({
    id,
    isInView,
    index,
    t,
}: {
    id: (typeof MEMBER_IDS)[number];
    isInView: boolean;
    index: number;
    t: (key: string) => string;
}) {
    return (
        <Card
            className={`bg-background border border-[#91735556] rounded-xl shadow-sm flex flex-col items-center transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
                isInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
            }`}
            style={{
                transitionDelay: isInView ? `${index * 60}ms` : "0ms",
            }}
        >
            <CardContent className="flex flex-col items-center p-6 w-full min-w-0">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#ebe5df] flex items-center justify-center shrink-0 mb-4" />
                <p className="text-[#917355] text-base md:text-lg font-semibold text-center mb-1">
                    {t(`member_${id}_name`)}
                </p>
                <p className="text-[#968c81] text-sm text-center">
                    {t(`member_${id}_role`)}
                </p>
            </CardContent>
        </Card>
    );
}

export function OurTeam() {
    const t = useTranslations("OurTeam");
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

    return (
        <section
            id="team"
            ref={sectionRef}
            className={`py-10 md:py-20 bg-[#F7F5F2] transition-all duration-200 ${
                isInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
            }`}
        >
            <div className="container mx-auto px-4">
                <h2 className=" text-4xl md:text-5xl font-semibold text-[#917355] text-center mb-12 md:mb-16">
                    {t("title")}
                </h2>

                {/* Мобильная версия: карусель, одна карточка */}
                <div className="md:hidden w-full mx-auto px-7">
                    <Carousel
                        opts={{ align: "start", loop: true }}
                        orientation="horizontal"
                        className="w-full relative"
                    >
                        <CarouselContent className="ml-0 gap-2">
                            {MEMBER_IDS.map((id, index) => (
                                <CarouselItem
                                    key={id}
                                    className="pl-0 basis-full"
                                >
                                    <TeamCard
                                        id={id}
                                        isInView={isInView}
                                        index={index}
                                        t={t}
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="-left-9 size-8 border-0 bg-black/50 text-white hover:bg-black/70 hover:text-white disabled:opacity-30" />
                        <CarouselNext className="-right-9 size-8 border-0 bg-black/50 text-white hover:bg-black/70 hover:text-white disabled:opacity-30" />
                    </Carousel>
                </div>

                {/* Планшет и десктоп: сетка, шире контейнер */}
                <div className="hidden md:block max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {MEMBER_IDS.map((id, index) => (
                            <TeamCard
                                key={id}
                                id={id}
                                isInView={isInView}
                                index={index}
                                t={t}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
