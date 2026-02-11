import { NextResponse } from "next/server";
import { adminDb } from "@/server/firebase-admin/firebase-admin";
import { ApiError, getErrorMessage } from "@/lib/api-error";
import { requireAdmin } from "@/server/requireAuth/requireAuth";
import cloudinary from "@/lib/cloudinary";

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


export async function DELETE(req: Request) {
    try {
        await requireAdmin(req);

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                {
                    message: "Project id is required",
                    status: 400,
                } as ApiError,
                { status: 400 },
            );
        }

        const docRef = adminDb.collection("projects").doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return NextResponse.json(
                {
                    message: "Project not found",
                    status: 404,
                } as ApiError,
                { status: 404 },
            );
        }

        const data = doc.data() as { imageUrls?: unknown };
        const imageUrls = Array.isArray(data.imageUrls) ? data.imageUrls : [];
        const publicIds = imageUrls
            .filter((url): url is string => typeof url === "string")
            .map((url) => getPublicIdFromUrl(url))
            .filter((id): id is string => Boolean(id));

        if (publicIds.length > 0) {
            await Promise.allSettled(
                publicIds.map((publicId) =>
                    cloudinary.uploader.destroy(publicId, { resource_type: "image" }),
                ),
            );
        }

        await docRef.delete();

        return new NextResponse(null, { status: 204 });
    } catch (error: unknown) {
        console.error("Projects DELETE error:", error);

        const err = error as Error & { status?: number };
        const status = err.status === 403 ? 403 : 500;
        const message = getErrorMessage(error);

        return NextResponse.json(
            {
                message,
                status,
            } as ApiError,
            { status },
        );
    }
}

