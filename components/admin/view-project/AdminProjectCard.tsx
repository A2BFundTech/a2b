"use client";

import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2, PencilLine, Loader2 } from "lucide-react";
import { useDeleteProject } from "@/features/card/hooks/useDeleteProject";
import { Project } from "@/features/card/model/types";
import { useLocale } from "next-intl";
import { ProjectLocale } from "@/features/card/validation/validation";
import { useState } from "react";
import { EditProjectModal } from "./EditProjectModal";

type AdminProjectCardProps = {
    project: Project;
};

export function AdminProjectCard({ project }: AdminProjectCardProps) {
    const locale = useLocale() as ProjectLocale;
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const urls = project.imageUrls.length > 0 ? project.imageUrls : [];

    const { mutate: deleteProject, isPending } = useDeleteProject();

    return (
        <Card className="gap-0 p-0 border-[#91735520] w-full h-full rounded-none max-w-[300px] hover:tr">
            {urls.length > 0 ? (
                <Carousel
                    opts={{ align: "start", loop: true }}
                    orientation="horizontal"
                    className="w-full h-[200px]"
                >
                    <CarouselContent className="">
                        {urls.map((url, idx) => (
                            <CarouselItem
                                key={`${project.id}-${idx}`}
                                className="w-full h-[200px]"
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src={url}
                                        fill
                                        alt=""
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
            ) : (
                <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">
                    No images
                </div>
            )}
            <CardHeader className="px-3 py-3 shrink-0 grid-cols-[1fr_auto] grid-rows-1 gap-x-2 gap-y-0">
                <CardTitle className="text-sm leading-tight min-w-0 wrap-break-word">
                    {project.translations[locale].name}
                </CardTitle>
                <CardAction className="flex gap-2 row-span-1 items-center justify-center h-full">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleOpen}
                        aria-label="Edit"
                    >
                        <PencilLine />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => deleteProject(project.id)}
                        disabled={isPending}
                        aria-label="Delete"
                    >
                        {isPending ? (
                            <Loader2 className="size-4 animate-spin" />
                        ) : (
                            <Trash2 />
                        )}
                    </Button>
                </CardAction>
            </CardHeader>
            {isOpen ? (
                <EditProjectModal
                    onClose={() => setIsOpen(false)}
                    project={project}
                />
            ) : null}
        </Card>
    );
}
