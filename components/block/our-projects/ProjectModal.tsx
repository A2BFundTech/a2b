"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { X } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

import { placeholderImages } from "@/lib/utils";
import { Project } from "@/features/card/model/types";
import { useEffect, useState } from "react";
import { ProjectLocale } from "@/features/card/validation/validation";

type ProjectModalProps = {
    project: Project;
    onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
    const locale = useLocale() as ProjectLocale;

    const [activeImage, setActiveImage] = useState<string | null>(null);
    const urls =
        project.imageUrls.length > 0
            ? project.imageUrls
            : placeholderImages(project.id);

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <div
            className="fixed inset-0 z-50 overflow-y-auto bg-background p-4 md:flex md:items-center md:justify-center md:bg-black/50 md:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={project.translations[locale].name}
            onClick={onClose}
        >
            <div
                className="w-full max-w-lg mx-auto md:max-w-4xl md:max-h-[95vh] md:overflow-y-auto md:rounded-xl md:shadow-xl md:bg-background md:border md:border-[#91735520]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sticky top-0 z-10 flex justify-between p-3 bg-background/95 backdrop-blur border-b border-[#91735520] rounded-t-xl md:rounded-t-xl">
                    <h2 className=" text-2xl font-semibold text-foreground">
                        {project.translations[locale].name}
                    </h2>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="rounded-full"
                        aria-label="Close"
                    >
                        <X className="size-6" />
                    </Button>
                </div>
                <div className="p-4 pb-8">
                    <div className=" rounded-xl overflow-hidden bg-transparent relative mb-4">
                        <Carousel
                            opts={{ align: "start", loop: true }}
                            orientation="horizontal"
                            className="w-full h-full"
                        >
                            <CarouselContent className="ml-0 h-full">
                                {urls.map((url, idx) => (
                                    <CarouselItem
                                        key={`${project.id}-${idx}`}
                                        className="pl-0 basis-full w-full h-[380px] md:h-[450px]"
                                    >
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={url}
                                                alt=""
                                                fill
                                                className="object-contain "
                                                unoptimized
                                                onClick={() =>
                                                    setActiveImage(url)
                                                }
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-2 size-8 border-0 bg-black/50 text-white hover:bg-black/70 disabled:opacity-30" />
                            <CarouselNext className="right-2 size-8 border-0 bg-black/50 text-white hover:bg-black/70 disabled:opacity-30" />
                        </Carousel>
                    </div>
                    {activeImage && (
                        <div
                            className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4"
                            onClick={() => setActiveImage(null)}
                        >
                            <button
                                onClick={() => setActiveImage(null)}
                                className="absolute top-4 right-4 text-white"
                                aria-label="Close image"
                            >
                                <X className="size-8" />
                            </button>

                            <div className="relative w-full h-full max-w-5xl max-h-[90vh]">
                                <Image
                                    src={activeImage}
                                    alt=""
                                    fill
                                    className="object-contain"
                                    unoptimized
                                />
                            </div>
                        </div>
                    )}
                    <div>
                        <p>{project.area} m²</p>
                        <p>{project.price} €</p>
                        <p>{project.rentalYield}%</p>
                        <p>{project.resaleYield}%</p>
                        <p>{project.translations[locale].location}</p>
                        <p>{project.translations[locale].status}</p>
                        <p className="text-[#968c81] text-sm leading-relaxed">
                            {project.translations[locale].description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
