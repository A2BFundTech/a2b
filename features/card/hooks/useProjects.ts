import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "../api/fetchProjects";
import { Project } from "../model/types";

export function useProjects() {
    return useQuery<Project[]>({
        queryKey: ["projects"],
        queryFn: fetchProjects,
    });
}

