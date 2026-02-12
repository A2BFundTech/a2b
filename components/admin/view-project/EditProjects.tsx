import { AdminProjectCard } from "@/components/admin/view-project/AdminProjectCard";
import { useProjects } from "@/features/card/hooks/useProjects";
import type { Project } from "@/features/card/model/types";

export const EditProjects = () => {
    const { data: projects = [], isPending } = useProjects();

    return (
        <section className=" w-full h-full  overflow-auto md:rounded-lg border bg-white p-4 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold">Projects</h2>
            {isPending && projects.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                    Loading projects...
                </p>
            ) : projects.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                    No projects yet.
                </p>
            ) : (
                <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(300px,300px))] p-2 justify-center">
                    {projects.map((project: Project) => (
                        <AdminProjectCard
                            key={project.id}
                            project={project}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};
