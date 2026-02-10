import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject, type CreateProjectInput } from "../api/createProject";

export function useCreateProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: CreateProjectInput) => createProject(input),
        onSuccess: () => {
            // Обновляем список проектов после успешного создания
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });
}

