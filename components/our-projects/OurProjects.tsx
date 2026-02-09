"use client";

import { useState, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useInView } from "@/lib/use-in-view";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { ProjectCard } from "./ProjectCard";
import { ProjectCardCompact } from "./ProjectCardCompact";
import { ProjectModal } from "./ProjectModal";
import type { Project } from "./types";
import { placeholderImages } from "@/lib/utils";

export type { Project };

type OurProjectsProps = {
    projects: Project[];
};

const mockProjects: Project[] = [
    {
        id: "1",
        name: "Project 1",
        description: "Description 1",
        imageUrls: placeholderImages("1"),
    },
    {
        id: "2",
        name: "Project 2",
        description: "Description 2",
        imageUrls: placeholderImages("2"),
    },
    {
        id: "3",
        name: "Project 3",
        description: "Description 3",
        imageUrls: placeholderImages("3"),
    },
    {
        id: "4",
        name: "Project 4",
        description:
            "Description 4 with a long description that should be truncated.",
        imageUrls: placeholderImages("4"),
    },
    {
        id: "5",
        name: "Project 5",
        description: "Description 5",
        imageUrls: placeholderImages("5"),
    },
    {
        id: "6",
        name: "Project 6",
        description: "Description 6",
        imageUrls: placeholderImages("6"),
    },
];

export function OurProjects({ projects: projectsProp }: OurProjectsProps) {
    const locale = useLocale();
    const t = useTranslations("OurProjects");
    const projects = projectsProp.length > 0 ? projectsProp : mockProjects;
    const [modalProject, setModalProject] = useState<Project | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="py-10 md:py-20 relative"
            key={locale}
        >
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 mt-50 hidden md:block"></div>
            <div className="container mx-auto px-4">
                <h2
                    className={` text-4xl md:text-5xl font-semibold text-[#917355] text-center mb-12 md:mb-16 transition-all duration-300 `}
                >
                    {t("title")}
                </h2>

                <div className="md:hidden w-full mx-auto px-5 ">
                    <Carousel
                        opts={{ align: "start", loop: true }}
                        orientation="horizontal"
                        className="w-full relative"
                    >
                        <CarouselContent className="ml-0">
                            {projects.map((project, index) => (
                                <CarouselItem
                                    key={project.id}
                                    className="pl-0 basis-full"
                                >
                                    <div
                                        className={`transition-all duration-300 ${
                                            isInView
                                                ? "opacity-100 translate-y-0"
                                                : "opacity-0 translate-y-6"
                                        }`}
                                        style={{
                                            transitionDelay: isInView
                                                ? `${index * 150}ms`
                                                : "0ms",
                                        }}
                                    >
                                        <ProjectCardCompact
                                            project={project}
                                            onClick={() =>
                                                setModalProject(project)
                                            }
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-1 size-8 border-0 bg-black/50 text-white hover:bg-black/70 hover:text-white disabled:opacity-30" />
                        <CarouselNext className="right-1 size-8 border-0 bg-black/50 text-white hover:bg-black/70 hover:text-white disabled:opacity-30" />
                    </Carousel>
                </div>

                {modalProject && (
                    <ProjectModal
                        project={modalProject}
                        onClose={() => setModalProject(null)}
                    />
                )}

                {/* Планшет и десктоп: сетка */}
                <div className="hidden md:block md:max-w-[724px] lg:max-w-[1098px] mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 ">
                        {projects.map((project, index) => (
                            <div
                                key={project.id}
                                className={`transition-all duration-300 ${
                                    isInView
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-6"
                                }`}
                                style={{
                                    transitionDelay: isInView
                                        ? `${index * 100}ms`
                                        : "0ms",
                                }}
                            >
                                <ProjectCard
                                    project={project}
                                    className="w-full max-w-none h-[350px] justify-self-stretch"
                                    onClick={() => setModalProject(project)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
