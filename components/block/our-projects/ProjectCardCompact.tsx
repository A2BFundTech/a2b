"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Project, getProjectName } from "@/features/card/model/types";

type ProjectCardCompactProps = {
    project: Project;
    onClick: () => void;
};

export function ProjectCardCompact({
    project,
    onClick,
}: ProjectCardCompactProps) {
    const locale = useLocale();
    const name = getProjectName(project, locale);
    const urls = project.imageUrls.length > 0 ? project.imageUrls : [];
    const firstUrl = urls[0];

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={(e) => e.key === "Enter" && onClick()}
            className="w-full h-[350px] flex flex-col rounded-xl overflow-hidden border border-[#91735520] bg-card shadow-sm text-left cursor-pointer"
        >
            <div className="w-full flex-1 h-[580px] min-h-0 relative bg-[#F5F5DC]">
                {firstUrl ? (
                    <Image
                        src={firstUrl}
                        alt=""
                        fill
                        className="object-cover"
                        unoptimized
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
                        No image
                    </div>
                )}
            </div>
            <div className="px-3 py-2.5 shrink-0 bg-background flex flex-row items-center justify-between gap-2">
                <span className=" text-sm font-semibold text-foreground min-w-0 truncate flex-1">
                    {name}
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
