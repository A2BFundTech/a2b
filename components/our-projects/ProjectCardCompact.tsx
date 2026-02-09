"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project } from "./types";
import { placeholderImages } from "@/lib/utils";

type ProjectCardCompactProps = {
    project: Project;
    onClick: () => void;
};

/** Компактная карточка для мобильного слайдера: одно фото + название + кнопка-стрелка */
export function ProjectCardCompact({ project, onClick }: ProjectCardCompactProps) {
    const urls =
        project.imageUrls.length > 0
            ? project.imageUrls
            : placeholderImages(project.id);
    const firstImage = urls[0];
    return (
        <div
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={(e) => e.key === "Enter" && onClick()}
            className="w-full h-[350px] flex flex-col rounded-xl overflow-hidden border border-[#91735520] bg-card shadow-sm text-left cursor-pointer"
        >
            <div className="w-full flex-1 min-h-0 relative bg-[#F5F5DC]">
                <Image
                    src={firstImage}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="100vw"
                    unoptimized
                />
            </div>
            <div className="px-3 py-2.5 shrink-0 bg-background flex flex-row items-center justify-between gap-2">
                <span className=" text-sm font-semibold text-foreground min-w-0 truncate flex-1">
                    {project.name}
                </span>
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
            </div>
        </div>
    );
}
