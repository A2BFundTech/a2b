import { updateProjectBodySchema } from "@/features/card/validation/validation";
import { ApiError, getErrorMessage } from "@/lib/api-error";
import cloudinary from "@/lib/cloudinary";
import { adminDb } from "@/server/firebase-admin/firebase-admin";
import { requireAdmin } from "@/server/requireAuth/requireAuth";
import { NextResponse } from "next/server";
import { Readable } from "stream";

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_IMAGES = 5;

type HttpError = Error & { status?: number };

function createHttpError(message: string, status: number): HttpError {
    const err = new Error(message) as HttpError;
    err.status = status;
    return err;
}

async function uploadImage(
    file: File,
): Promise<{ secureUrl: string; publicId: string }> {
    if (!ALLOWED_TYPES.includes(file.type)) {
        throw createHttpError(
            `Invalid type. Allowed: ${ALLOWED_TYPES.join(", ")}`,
            400,
        );
    }
    if (file.size > MAX_SIZE) {
        throw createHttpError(
            `File too large. Max ${MAX_SIZE / 1024 / 1024} MB`,
            400,
        );
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return new Promise<{ secureUrl: string; publicId: string }>(
        (resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: "image", folder: "projects" },
                (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (!result?.secure_url || !result.public_id) {
                        reject(new Error("No secure_url/public_id in response"));
                        return;
                    }
                    resolve({
                        secureUrl: result.secure_url,
                        publicId: result.public_id,
                    });
                },
            );
            Readable.from(buffer).pipe(uploadStream);
        },
    );
}

function getPublicIdFromUrl(url: string): string | null {
    try {
        const pathname = new URL(url).pathname;
        const uploadIndex = pathname.indexOf("/upload/");
        if (uploadIndex === -1) return null;

        let publicIdWithExt = pathname.slice(uploadIndex + "/upload/".length);
        publicIdWithExt = publicIdWithExt.replace(/^v\d+\//, "");

        const publicId = publicIdWithExt.replace(/\.[^/.]+$/, "");
        return publicId || null;
    } catch {
        return null;
    }
}

function deepMergeTranslations(
    existing: Record<string, Record<string, string>>,
    incoming: Record<string, Partial<Record<string, string>>>,
): Record<string, Record<string, string>> {
    const result = { ...existing };
    for (const locale of Object.keys(incoming)) {
        const inc = incoming[locale];
        if (!inc || typeof inc !== "object") continue;
        const base = result[locale] ?? {};
        const merged: Record<string, string> = { ...base };
        for (const [k, v] of Object.entries(inc)) {
            if (v !== undefined) merged[k] = v;
        }
        result[locale] = merged;
    }
    return result;
}

export async function PATCH(
    req: Request,
    context: { params: Promise<{ id: string }> },
) {
    const uploadedPublicIds: string[] = [];
    try {
        await requireAdmin(req);
        const { id } = await context.params;
        if (!id) {
            return NextResponse.json(
                { message: "Project id is required", status: 400 } as ApiError,
                { status: 400 },
            );
        }

        const docRef = adminDb.collection("projects").doc(id);
        const doc = await docRef.get();
        if (!doc.exists) {
            return NextResponse.json(
                { message: "Project not found", status: 404 } as ApiError,
                { status: 404 },
            );
        }

        const existing = doc.data() as Record<string, unknown>;
        const formData = await req.formData();
        const payloadRaw = formData.get("payload");
        const files = formData
            .getAll("images")
            .filter((item): item is File => item instanceof File);

        if (typeof payloadRaw !== "string") {
            return NextResponse.json(
                { message: "Missing payload", status: 400 } as ApiError,
                { status: 400 },
            );
        }

        let json: unknown;
        try {
            json = JSON.parse(payloadRaw);
        } catch {
            throw createHttpError("Invalid payload JSON", 400);
        }
        if (!json || typeof json !== "object" || Array.isArray(json)) {
            throw createHttpError("Payload must be an object", 400);
        }

        const parsed = updateProjectBodySchema.safeParse(json);
        if (!parsed.success) {
            throw createHttpError("Validation error", 400);
        }
        const payload = parsed.data;

        let imageUrls: string[] =
            (existing.imageUrls as string[] | undefined) ?? [];
        if (payload.imageUrls !== undefined) {
            imageUrls = payload.imageUrls;
        }
        const uploadedImageUrls: string[] = [];
        if (files.length > 0) {
            if (imageUrls.length + files.length > MAX_IMAGES) {
                throw createHttpError(
                    `Total images cannot exceed ${MAX_IMAGES}`,
                    400,
                );
            }
            for (const file of files) {
                const uploaded = await uploadImage(file);
                uploadedImageUrls.push(uploaded.secureUrl);
                uploadedPublicIds.push(uploaded.publicId);
            }
            imageUrls = [...imageUrls, ...uploadedImageUrls];
        }

        const update: Record<string, unknown> = {};
        if (payload.translations !== undefined) {
            update.translations = deepMergeTranslations(
                (existing.translations as Record<string, Record<string, string>>) ?? {},
                payload.translations as Record<string, Partial<Record<string, string>>>,
            );
        }
        if (payload.area !== undefined) update.area = payload.area;
        if (payload.price !== undefined) update.price = payload.price;
        if (payload.rentalYield !== undefined)
            update.rentalYield = payload.rentalYield;
        if (payload.resaleYield !== undefined)
            update.resaleYield = payload.resaleYield;
        if (payload.bookingLink !== undefined) update.bookingLink = payload.bookingLink;
        if (payload.imageUrls !== undefined || files.length > 0) {
            update.imageUrls = imageUrls;
        }
        if (payload.quantityOfApartments !== undefined) update.quantityOfApartments = payload.quantityOfApartments;
        
        if (Object.keys(update).length === 0) {
            const current = { ...existing, id: doc.id } as Record<string, unknown>;
            return NextResponse.json(current, { status: 200 });
        }

        if (update.imageUrls !== undefined) {
            const previousUrls =
                (existing.imageUrls as string[] | undefined) ?? [];
            const removedUrls = previousUrls.filter(
                (url) => !(imageUrls as string[]).includes(url),
            );
            const publicIdsToDelete = removedUrls
                .map((url) => getPublicIdFromUrl(url))
                .filter((id): id is string => Boolean(id));
            if (publicIdsToDelete.length > 0) {
                await Promise.allSettled(
                    publicIdsToDelete.map((publicId) =>
                        cloudinary.uploader.destroy(publicId, {
                            resource_type: "image",
                        }),
                    ),
                );
            }
        }

        await docRef.update(update);
        const updatedSnap = await docRef.get();
        const updatedData = updatedSnap.data() ?? {};
        return NextResponse.json(
            { id: doc.id, ...existing, ...updatedData },
            { status: 200 },
        );
    } catch (error: unknown) {
        console.error("Projects PATCH error:", error);
        if (uploadedPublicIds.length > 0) {
            await Promise.allSettled(
                uploadedPublicIds.map((publicId) =>
                    cloudinary.uploader.destroy(publicId, {
                        resource_type: "image",
                    }),
                ),
            );
        }
        const err = error as Error & { status?: number };
        const status =
            err.status === 403 || err.status === 400 || err.status === 404
                ? err.status
                : 500;
        return NextResponse.json(
            { message: getErrorMessage(error), status } as ApiError,
            { status },
        );
    }
}
