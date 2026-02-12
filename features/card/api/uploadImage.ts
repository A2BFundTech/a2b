import { auth } from "@/lib/firebase";

export async function uploadImage(file: File): Promise<string> {
    const user = auth.currentUser;
    if (!user) {
        throw new Error("Not authenticated");
    }

    const idToken = await user.getIdToken();
    const formData = new FormData();
    formData.set("file", file);

    const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
        body: formData,
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(
            (err && typeof err.message === "string"
                ? err.message
                : "Upload failed"),
        );
    }

    const data = (await res.json()) as { url: string };
    return data.url;
}
