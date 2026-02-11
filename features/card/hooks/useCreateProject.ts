import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "../api/createProject";
import type { CreateProjectInput } from "../model/types";

export function useCreateProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: CreateProjectInput) => createProject(input),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["projects"],
                refetchType: "all",
            });
        },
    });
}

