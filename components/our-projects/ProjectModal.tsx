"use client";

import Image from "next/image";
import { X } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import type { Project } from "./types";
import { placeholderImages } from "@/lib/utils";

type ProjectModalProps = {
    project: Project;
    onClose: () => void;
};

/** Модалка: на мобилке — на весь экран, на десктопе — центрированное окно */
export function ProjectModal({ project, onClose }: ProjectModalProps) {
    const urls =
        project.imageUrls.length > 0
            ? project.imageUrls
            : placeholderImages(project.id);

    return (
        <div
            className="fixed inset-0 z-50 overflow-y-auto bg-background p-4 md:flex md:items-center md:justify-center md:bg-black/50 md:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={project.name}
            onClick={onClose}
        >
            <div
                className="w-full max-w-lg mx-auto md:max-w-2xl md:max-h-[90vh] md:overflow-y-auto md:rounded-xl md:shadow-xl md:bg-background md:border md:border-[#91735520]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sticky top-0 z-10 flex justify-end p-3 bg-background/95 backdrop-blur border-b border-[#91735520] rounded-t-xl md:rounded-t-xl">
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
                    <h2 className=" text-xl font-semibold text-foreground mb-2">
                        {project.name}
                    </h2>
                    <div className="aspect-4/3 rounded-xl overflow-hidden bg-[#F5F5DC] relative mb-4">
                        <Carousel
                            opts={{ align: "start", loop: true }}
                            orientation="horizontal"
                            className="w-full h-full"
                        >
                            <CarouselContent className="ml-0 h-full">
                                {urls.map((url, idx) => (
                                    <CarouselItem
                                        key={`${project.id}-${idx}`}
                                        className="pl-0 basis-full h-full"
                                    >
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={url}
                                                alt=""
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, 672px"
                                                unoptimized
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-2 size-8 border-0 bg-black/50 text-white hover:bg-black/70 disabled:opacity-30" />
                            <CarouselNext className="right-2 size-8 border-0 bg-black/50 text-white hover:bg-black/70 disabled:opacity-30" />
                        </Carousel>
                    </div>
                    <p className="text-[#968c81] text-sm leading-relaxed">
                        {project.description}
                    </p>
                </div>
            </div>
        </div>
    );
}
