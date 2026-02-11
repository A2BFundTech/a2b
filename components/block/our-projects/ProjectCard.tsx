"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { ChevronRight } from "lucide-react";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import {
    Project
} from "@/features/card/model/types";
import { placeholderImages } from "@/lib/utils";
import { ProjectLocale } from "@/features/card/validation/validation";

type ProjectCardProps = {
    project: Project;
    className?: string;
    onClick?: () => void;
};

export function ProjectCard({ project, onClick }: ProjectCardProps) {
    const locale = useLocale() as ProjectLocale;
   
    const urls =
        project.imageUrls.length > 0
            ? project.imageUrls
            : placeholderImages(project.id);
    return (
        <Card
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : undefined}
            onClick={onClick}
            onKeyDown={
                onClick ? (e) => e.key === "Enter" && onClick() : undefined
            }
            className={
                "overflow-hidden gap-0 p-0 border-[#91735520] w-full h-[370px] flex flex-col shrink-0 " +
                (onClick
                    ? "cursor-pointer hover:shadow-md hover:-translate-y-0.5 duration-300 transition-all "
                    : "")
            }
        >
            <div
                className="w-full h-[280px] bg-[#F5F5DC] relative shrink-0"
                onClick={(e) => e.stopPropagation()}
            >
                <Carousel
                    opts={{ align: "start", loop: false }}
                    orientation="horizontal"
                    className="w-full h-full"
                >
                    <CarouselContent className="ml-0 h-full">
                        {urls.map((url, idx) => (
                            <CarouselItem
                                key={`${project.id}-${idx}`}
                                className="pl-0 basis-full h-[280px]"
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src={url}
                                        alt=""
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-1 size-6 border-0 bg-black/50 text-white hover:bg-black/70 hover:text-white disabled:opacity-30" />
                    <CarouselNext className="right-1 size-6 border-0 bg-black/50 text-white hover:bg-black/70 hover:text-white disabled:opacity-30" />
                </Carousel>
            </div>
            <CardHeader className="px-3 py-3 h-auto shrink-0 flex flex-row items-center justify-between gap-4">
                <div className="min-w-0 flex flex-col gap-2 justify-center items-start">
                    <CardTitle className=" text-sm leading-tight">
                        {project.translations[locale].name}
                    </CardTitle>
                    <CardDescription className="text-[#968c81] text-xs line-clamp-2">
                        {project.translations[locale].description}
                    </CardDescription>
                </div>
                <div className="h-full flex items-end jsustify-center">
                    {onClick && (
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="size-8 shrink-0 rounded-full border-[#91735540] text-[#917355] hover:bg-[#91735515] hover:text-[#917355]"
                            onClick={(e) => {
                                e.stopPropagation();
                                onClick();
                            }}
                            aria-label="Открыть"
                        >
                            <ChevronRight className="size-4" />
                        </Button>
                    )}
                </div>
            </CardHeader>
        </Card>
    );
}
