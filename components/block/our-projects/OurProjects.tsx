"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "./ProjectCard";
import { ProjectCardCompact } from "./ProjectCardCompact";
import { ProjectModal } from "./ProjectModal";
import { Project } from "@/features/card/model/types";
import { useProjects } from "@/features/card/hooks/useProjects";
import { AnimatePresence, motion } from "motion/react";
import { Loader, Loader2 } from "lucide-react";

const INITIAL_COUNT = 3;

export function OurProjects() {
    const locale = useLocale();
    const t = useTranslations("OurProjects");

    const { data: projects = [], isLoading } = useProjects();

    const [modalProject, setModalProject] = useState<Project | null>(null);
    const [showAll, setShowAll] = useState(false);

    const hasMore = projects.length > INITIAL_COUNT;
    const visibleProjects = showAll
        ? projects
        : projects.slice(0, INITIAL_COUNT);


    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader2 className="size-10 animate-spin" />
            </div>
        )
    }


    return (
        <section
            id="projects"
            className="py-10 md:py-20 relative"
            key={locale}
        >
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-semibold text-[#917355] text-center mb-12 md:mb-16 transition-all duration-200">
                    {t("title")}
                </h2>

                {/* Mobile: stack */}
                <div className="md:hidden w-full mx-auto px-5 space-y-4 transition-all duration-300">
                    <AnimatePresence initial={false}>
                        {visibleProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                viewport={{ once: true, amount: 0.15 }}
                                transition={{
                                    duration: 0.25,
                                    delay: index * 0.08,
                                }}
                            >
                                <ProjectCardCompact
                                    project={project}
                                    onClick={() => setModalProject(project)}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {hasMore && (
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() => setShowAll((p) => !p)}
                        >
                            {showAll
                                ? t("hide")
                                : t("show_more", {
                                      count: projects.length - INITIAL_COUNT,
                                  })}
                        </Button>
                    )}
                </div>

                {modalProject && (
                    <ProjectModal
                        project={modalProject}
                        onClose={() => setModalProject(null)}
                    />
                )}

                {/* Tablet/Desktop: grid */}
                <div className="hidden md:block md:max-w-[724px] lg:max-w-[1098px] mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        <AnimatePresence initial={false}>
                            {visibleProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -12 }}
                                    viewport={{ once: true, amount: 0.15 }}
                                    transition={{
                                        duration: 0.25,
                                        delay: index * 0.08,
                                    }}
                                >
                                    <ProjectCard
                                        project={project}
                                        className="w-full max-w-none h-[350px] justify-self-stretch"
                                        onClick={() => setModalProject(project)}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {hasMore && (
                        <div className="mt-8 flex justify-center">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setShowAll((p) => !p)}
                            >
                                {showAll
                                    ? t("hide")
                                    : t("show_more", {
                                          count:
                                              projects.length - INITIAL_COUNT,
                                      })}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
