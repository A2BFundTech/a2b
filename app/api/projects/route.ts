import { NextResponse } from "next/server";
import { adminDb } from "@/server/firebase-admin/firebase-admin";
import { ApiError, getErrorMessage } from "@/lib/api-error";
import { requireAdmin } from "@/server/requireAuth/requireAuth";
import type { Project } from "@/components/our-projects/types";

// GET /api/projects – публичный список проектов
export async function GET() {
    try {
        const snapshot = await adminDb.collection("projects").orderBy("name").get();

        const projects: Project[] = snapshot.docs.map((doc) => {
            const data = doc.data() as Partial<Project>;
            return {
                id: doc.id,
                name: data.name ?? "",
                description: data.description ?? "",
                imageUrls: Array.isArray(data.imageUrls) ? data.imageUrls : [],
            };
        });

        return NextResponse.json(projects, { status: 200 });
    } catch (error: unknown) {
        console.error("Projects GET error:", error);
        const message = getErrorMessage(error);

        return NextResponse.json(
            {
                message,
                status: 500,
            } as ApiError,
            { status: 500 },
        );
    }
}

// POST /api/projects – создание проекта (только для админа)
export async function POST(req: Request) {
    try {
        await requireAdmin(req);

        const body = await req.json();
        const { name, description, imageUrls } = body as {
            name?: string;
            description?: string;
            imageUrls?: string[];
        };

        if (!name || !description) {
            return NextResponse.json(
                {
                    message: "Name and description are required",
                    status: 400,
                } as ApiError,
                { status: 400 },
            );
        }

        const urls = Array.isArray(imageUrls) ? imageUrls : [];
        if (urls.length > 5) {
            return NextResponse.json(
                {
                    message: "Maximum 5 images per project",
                    status: 400,
                } as ApiError,
                { status: 400 },
            );
        }

        const docRef = await adminDb.collection("projects").add({
            name,
            description,
            imageUrls: urls,
            createdAt: new Date(),
        });

        const project: Project = {
            id: docRef.id,
            name,
            description,
            imageUrls: urls,
        };

        return NextResponse.json(project, { status: 201 });
    } catch (error: unknown) {
        console.error("Projects POST error:", error);

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

