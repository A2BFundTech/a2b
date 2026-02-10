import { NextResponse } from "next/server";
import { Readable } from "stream";
import cloudinary from "@/lib/cloudinary";
import { ApiError, getErrorMessage } from "@/lib/api-error";
import { requireAdmin } from "@/server/requireAuth/requireAuth";

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(req: Request) {
    try {
        await requireAdmin(req);

        const formData = await req.formData();      
        const file = formData.get("file");

        if (!file || !(file instanceof File)) {
            return NextResponse.json(
                { message: "Missing file", status: 400 } as ApiError,
                { status: 400 },
            );
        }

        if (!ALLOWED_TYPES.includes(file.type)) {
            return NextResponse.json(
                {
                    message: `Invalid type. Allowed: ${ALLOWED_TYPES.join(", ")}`,
                    status: 400,
                } as ApiError,
                { status: 400 },
            );
        }

        if (file.size > MAX_SIZE) {
            return NextResponse.json(
                {
                    message: `File too large. Max ${MAX_SIZE / 1024 / 1024} MB`,
                    status: 400,
                } as ApiError,
                { status: 400 },
            );
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    resource_type: "image",
                    folder: "projects",
                },
                (err, result) => {
                    if (err) reject(err);
                    else if (result?.secure_url) resolve(result as { secure_url: string });
                    else reject(new Error("No secure_url in response"));
                },
            );
            const readable = Readable.from(buffer);
            readable.pipe(uploadStream);
        });

        return NextResponse.json({ url: result.secure_url }, { status: 200 });
    } catch (error: unknown) {
        console.error("Upload error:", error);
        const err = error as Error & { status?: number };
        const status = err.status === 403 ? 403 : 500;
        const message = getErrorMessage(error);
        return NextResponse.json(
            { message, status } as ApiError,
            { status },
        );
    }
}
