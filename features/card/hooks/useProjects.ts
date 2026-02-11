import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "../api/fetchProjects";
import { Project } from "../model/types";

export function useProjects() {
    return useQuery<Project[]>({
        queryKey: ["projects"],
        queryFn: fetchProjects,
        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
}

