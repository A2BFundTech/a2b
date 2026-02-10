import { auth } from "@/lib/firebase";

export async function deleteProject(id: string): Promise<void> {
    const user = auth.currentUser;
    if (!user) {
        throw new Error("Not authenticated");
    }

    const idToken = await user.getIdToken();

    const res = await fetch(`/api/projects?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(
            (err && typeof err.message === "string"
                ? err.message
                : "Failed to delete project"),
        );
    }
}

