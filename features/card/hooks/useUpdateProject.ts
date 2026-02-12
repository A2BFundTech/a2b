import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "../api/updateProject";
import type { UpdateProjectInput } from "../model/types";

export function useUpdateProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: UpdateProjectInput) => updateProject(input),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["projects"],
                refetchType: "all",
            });
        },
    });
}
