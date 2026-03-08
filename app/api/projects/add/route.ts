import { createProjectBodySchema } from "@/features/card/validation/validation";
import { ApiError, getErrorMessage } from "@/lib/api-error";
import cloudinary from "@/lib/cloudinary";
import { adminDb } from "@/server/firebase-admin/firebase-admin";
import { requireAdmin } from "@/server/requireAuth/requireAuth";
import { NextResponse } from "next/server";
import { Readable } from "stream";

const MAX_SIZE = 15 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

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
                {
                    resource_type: "image",
                    folder: "projects",
                },
                (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (!result?.secure_url || !result.public_id) {
                        reject(
                            new Error("No secure_url/public_id in response"),
                        );
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

export async function POST(req: Request) {
    const uploadedPublicIds: string[] = [];

    try {
        await requireAdmin(req);

        const formData = await req.formData();
        const payloadRaw = formData.get("payload");
        const files = formData
            .getAll("images")
            .filter((item): item is File => item instanceof File);

        if (typeof payloadRaw !== "string") {
            return NextResponse.json(
                {
                    message: "Missing payload",
                    status: 400,
                } as ApiError,
                { status: 400 },
            );
        }

        if (files.length < 1 || files.length > 5) {
            return NextResponse.json(
                {
                    message: "Upload 1 to 5 images",
                    status: 400,
                } as ApiError,
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

        const uploadedImageUrls: string[] = [];
        for (const file of files) {
            const uploaded = await uploadImage(file);
            uploadedImageUrls.push(uploaded.secureUrl);
            uploadedPublicIds.push(uploaded.publicId);
        }

        const parsed = createProjectBodySchema.safeParse({
            ...(json as Record<string, unknown>),
            imageUrls: uploadedImageUrls,
        });
        if (!parsed.success) {
            throw createHttpError("Validation error", 400);
        }

        const {
            translations,
            area,
            price,
            rentalYield,
            resaleYield,
            imageUrls,
            quantityOfApartments,
            bookingLink,
        } = parsed.data;

        const docRef = await adminDb.collection("projects").add({
            translations,
            area,
            price,
            rentalYield,
            resaleYield,
            imageUrls,
            quantityOfApartments,
            bookingLink,
            createdAt: new Date(),
        });

        return NextResponse.json(
            {
                id: docRef.id,
                translations,
                area,
                price,
                rentalYield,
                resaleYield,
                imageUrls,
                quantityOfApartments,
                bookingLink,
            },
            { status: 201 },
        );
    } catch (error: unknown) {
        console.error("Projects POST error:", error);

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
            err.status === 403 || err.status === 400 ? err.status : 500;

        return NextResponse.json(
            { message: getErrorMessage(error), status },
            { status },
        );
    }
}
