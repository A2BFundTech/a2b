import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "../api/fetchProjects";
import type { Project } from "@/components/our-projects/types";

export function useProjects() {
    return useQuery<Project[]>({
        queryKey: ["projects"],
        queryFn: fetchProjects,
    });
}

