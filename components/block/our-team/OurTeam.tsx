"use client";

import Image from "next/image";
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

type MemberId = 1 | 2 | 3 | 4;

const MEMBER_IDS: readonly MemberId[] = [1, 2, 3, 4];

const MEMBER_IMAGE_PATHS: Record<MemberId, string> = {
    1: "/assets/images/team/usenin.jpg",
    2: "/assets/images/team/usenin.jpg",
    3: "/assets/images/team/usenin.jpg",
    4: "/assets/images/team/andres.jpg",
};

function TeamCard({
    id,
    t,
}: {
    id: (typeof MEMBER_IDS)[number];
    t: (key: string) => string;
}) {
    return (
        <Card className="bg-background border border-[#91735556] rounded-xl shadow-sm flex flex-col items-center transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
            <CardContent className="flex flex-col items-center p-6 w-full min-w-0">
                <div className="relative w-32 h-32  rounded-full bg-[#ebe5df] shrink-0 mb-4 overflow-hidden">
                    <Image
                        src={MEMBER_IMAGE_PATHS[id]}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 96px, 112px"
                        onError={(e) => {
                            e.currentTarget.style.display = "none";
                            const placeholder = e.currentTarget.nextElementSibling;
                            if (placeholder) (placeholder as HTMLElement).style.display = "flex";
                        }}
                    />
                    <div
                        className="absolute inset-0 bg-[#ebe5df] flex items-center justify-center"
                        aria-hidden
                        style={{ display: "none" }}
                    >
                        <span className="text-[#968c81] text-2xl font-medium">
                            {t(`member_${id}_name`).charAt(0)}
                        </span>
                    </div>
                </div>
                <p className="text-[#917355] text-base md:text-lg font-semibold  mb-1">
                    {t(`member_${id}_name`)}
                </p>
                <p className="text-[#968c81] text-sm text-center">
                    {t(`member_${id}_role`)}
                </p>
                <p className="text-[#968c81] text-sm text-center">
                    {t(`member_${id}_second_role`)}
                </p>
            </CardContent>
        </Card>
    );
}

export function OurTeam() {
    const t = useTranslations("OurTeam");

    return (
        <motion.section
            id="team"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.25 }}
            className="py-10 md:py-20 bg-[#F7F5F2]"
        >
            <div className="container mx-auto px-4">
                <h2 className=" text-4xl md:text-5xl font-semibold text-[#917355] text-center mb-12 md:mb-16">
                    {t("title")}
                </h2>

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
                                    <motion.div
                                        initial={{ opacity: 0, y: 24 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.15 }}
                                        transition={{
                                            duration: 0.25,
                                            delay: index * 0.08,
                                        }}
                                    >
                                        <TeamCard id={id} t={t} />
                                    </motion.div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="-left-9 size-8 border-0 bg-black/50 text-white hover:bg-black/70 hover:text-white disabled:opacity-30" />
                        <CarouselNext className="-right-9 size-8 border-0 bg-black/50 text-white hover:bg-black/70 hover:text-white disabled:opacity-30" />
                    </Carousel>
                </div>

                <div className="hidden md:block max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {MEMBER_IDS.map((id, index) => (
                            <motion.div
                                key={id}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.15 }}
                                transition={{
                                    duration: 0.25,
                                    delay: index * 0.08,
                                }}
                            >
                                <TeamCard id={id} t={t} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
