"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import {
    X,
    Square,
    Banknote,
    TrendingUp,
    MapPin,
    BadgeCheck,
    FileText,
} from "lucide-react";
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

const statCardClass =
    "flex  justify-between items-center gap-2 rounded-lg border border-[#91735520] bg-[#faf9f7] px-2 py-3 text-center";

export function ProjectModal({ project, onClose }: ProjectModalProps) {
    const locale = useLocale() as ProjectLocale;
    const tModal = useTranslations("ProjectModal");

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

    const t = project.translations[locale];

    return (
        <div
            className="fixed inset-0 z-50 overflow-y-auto bg-black/60 md:flex md:items-center md:justify-center"
            role="dialog"
            aria-modal="true"
            aria-label={t.name}
            onClick={onClose}
        >
            <div
                className="w-full h-full max-w-2xl min-h-screen mx-auto md:max-w-4xl md:max-h-[80vh] overflow-y-auto shadow-2xl bg-background border border-[#91735525] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-4 py-3 md:px-6 bg-background/98 backdrop-blur-sm border-b border-[#91735520]">
                    <h2 className="text-xl md:text-2xl font-semibold text-foreground truncate">
                        {t.name}
                    </h2>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="shrink-0 rounded-full hover:bg-[#91735515]"
                        aria-label={tModal("close")}
                    >
                        <X className="size-5 text-[#917355]" />
                    </Button>
                </div>

                <div className="p-4 md:p-6 pb-8 space-y-6">
                    {/* Carousel */}
                    <div className="rounded-xl overflow-hidden   ">
                        <Carousel
                            opts={{ align: "start", loop: true }}
                            orientation="horizontal"
                            className="w-full"
                        >
                            <CarouselContent className="ml-0">
                                {urls.map((url, idx) => (
                                    <CarouselItem
                                        key={`${project.id}-${idx}`}
                                        className="pl-0 basis-full md:h-[420px]"
                                    >
                                        <div
                                            className="relative w-full aspect-4/3  md:max-h-[420px] cursor-zoom-in"
                                            onClick={() => setActiveImage(url)}
                                        >
                                            <Image
                                                src={url}
                                                alt=""
                                                fill
                                                className="object-contain"
                                                unoptimized
                                                sizes="(max-width: 768px) 100vw, 896px"
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-2 size-8 border-0 bg-black/50 text-white hover:bg-black/70 disabled:opacity-30 rounded-full" />
                            <CarouselNext className="right-2 size-8 border-0 bg-black/50 text-white hover:bg-black/70 disabled:opacity-30 rounded-full" />
                        </Carousel>
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className={statCardClass}>
                            <div className="flex items-center justify-center gap-2">
                                <Square className="md:size-4 text-[#917355]" />
                                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                                    {tModal("area")}
                                </span>
                            </div>
                            <span className="text-lg font-semibold text-[#917355]">
                                {project.area} m²
                            </span>
                        </div>
                        <div className={statCardClass}>
                            <div className="flex items-center justify-center gap-2">
                                <Banknote className="md:size-4 text-[#917355]" />
                                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                                    {tModal("price")}
                                </span>
                            </div>
                            <span className="text-lg font-semibold text-[#917355]">
                                {project.price} €
                            </span>
                        </div>
                        <div className={statCardClass}>
                            <div className="flex items-center justify-center gap-2">
                                <TrendingUp className="md:size-4 text-[#917355]" />
                                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                                    {tModal("rental_yield")}
                                </span>
                            </div>
                            <span className="text-lg font-semibold text-[#917355]">
                                {project.rentalYield}%
                            </span>
                        </div>
                        <div className={statCardClass}>
                            <div className="flex items-center justify-center gap-2">
                                <TrendingUp className="md:size-4 text-[#917355]" />
                                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                                    {tModal("resale_yield")}
                                </span>
                            </div>
                            <span className="text-lg font-semibold text-[#917355]">
                                +{" "}{project.resaleYield}%
                            </span>
                        </div>
                    </div>

                    {/* Location & Status */}
                    <div className="flex flex-wrap gap-2">
                        {t.location && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#91735512] px-3 py-1.5 text-sm text-foreground border border-[#91735520]">
                                <MapPin className="md:size-4 text-[#917355]" />
                                {t.location}
                            </span>
                        )}
                        {t.status && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#91735512] px-3 py-1.5 text-sm text-foreground border border-[#91735520]">
                                <BadgeCheck className="md:size-4 text-[#917355]" />
                                {t.status}
                            </span>
                        )}
                    </div>

                    {/* Description */}
                    {t.description && (
                        <div className="rounded-xl border border-[#91735520] bg-[#faf9f7] p-4 md:p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <FileText className="md:size-4 text-[#917355]" />
                                <h3 className="text-sm font-semibold uppercase tracking-wide text-[#917355]">
                                    {tModal("description")}
                                </h3>
                            </div>
                            <p className="text-[#4a4541] text-sm md:text-base leading-relaxed whitespace-pre-line">
                                {t.description}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Fullscreen image overlay */}
            {activeImage && (
                <div
                    className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center p-4"
                    onClick={() => setActiveImage(null)}
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4 z-10 text-white hover:bg-white/20 rounded-full"
                        onClick={(e) => {
                            e.stopPropagation();
                            setActiveImage(null);
                          }}
                        aria-label={tModal("close")}
                    >
                        <X className="size-8" />
                    </Button>
                    <div
                        className="relative w-full h-full max-w-5xl max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
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
        </div>
    );
}
