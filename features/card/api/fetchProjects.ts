import type { Project } from "@/components/our-projects/types";

export async function fetchProjects(): Promise<Project[]> {
    const res = await fetch("/api/projects");

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(
            (err && typeof err.message === "string"
                ? err.message
                : "Failed to load projects"),
        );
    }

    return res.json();
}

