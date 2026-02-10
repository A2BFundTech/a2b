import { auth } from "@/lib/firebase";
import { Project, ProjectTranslations } from "../model/types";


export type CreateProjectInput = {
    translations: ProjectTranslations;
    imageUrls: string[];
};

export async function createProject(
    input: CreateProjectInput,
): Promise<Project> {
    const user = auth.currentUser;
    if (!user) {
        throw new Error("Not authenticated");
    }

    const idToken = await user.getIdToken();

    const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(input),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(
            (err && typeof err.message === "string"
                ? err.message
                : "Failed to create project"),
        );
    }

    return res.json();
}
