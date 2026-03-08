import { auth } from "@/lib/firebase";
import { Project } from "../model/types";
import type { UpdateProjectInput } from "../model/types";

function buildPayload(input: UpdateProjectInput): Record<string, unknown> {
    const { id: _id, files: _files, ...rest } = input;
    const payload: Record<string, unknown> = {};
    if (rest.translations !== undefined) payload.translations = rest.translations;
    if (rest.area !== undefined) payload.area = rest.area;
    if (rest.price !== undefined) payload.price = rest.price;
    if (rest.rentalYield !== undefined) payload.rentalYield = rest.rentalYield;
    if (rest.resaleYield !== undefined) payload.resaleYield = rest.resaleYield;
    if (rest.imageUrls !== undefined) payload.imageUrls = rest.imageUrls;
    if (rest.quantityOfApartments !== undefined) payload.quantityOfApartments = rest.quantityOfApartments;
    if (rest.bookingLink !== undefined) payload.bookingLink = rest.bookingLink;
    return payload;
}

export async function updateProject(
    input: UpdateProjectInput,
): Promise<Project> {
    const user = auth.currentUser;
    if (!user) throw new Error("Not authenticated");

    const idToken = await user.getIdToken();
    const formData = new FormData();
    formData.set("payload", JSON.stringify(buildPayload(input)));

    const files = input.files ?? [];
    for (const file of files) {
        formData.append("images", file);
    }

    const res = await fetch(`/api/projects/${input.id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${idToken}` },
        body: formData,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        const message =
            typeof data?.message === "string"
                ? data.message
                : "Failed to update project";
        const error = new Error(message) as Error & { issues?: unknown };
        if (data?.issues) error.issues = data.issues;
        throw error;
    }

    return data as Project;
}
