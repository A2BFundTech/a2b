import { NextResponse } from "next/server";
import { adminDb } from "@/server/firebase-admin/firebase-admin";
import { ApiError, getErrorMessage } from "@/lib/api-error";
import { requireAdmin } from "@/server/requireAuth/requireAuth";
import { PROJECT_LOCALES, Project, ProjectLocale, ProjectTranslations } from "@/features/card/model/types";


function parseTranslations(body: unknown): ProjectTranslations | null {
    const t = body as Record<string, unknown> | undefined;
    if (!t || typeof t !== "object") return null;
    const translations = t.translations as Record<string, unknown> | undefined;
    if (!translations || typeof translations !== "object") return null;
    const result = {} as ProjectTranslations;
    for (const locale of PROJECT_LOCALES) {
        const loc = translations[locale] as Record<string, unknown> | undefined;
        if (
            !loc ||
            typeof loc !== "object" ||
            typeof loc.name !== "string" ||
            typeof loc.description !== "string"
        ) {
            return null;
        }
        const name = (loc.name as string).trim();
        const description = (loc.description as string).trim();
        if (!name || !description) return null;
        result[locale as ProjectLocale] = { name, description };
    }
    return result;
}

// GET /api/projects – публичный список проектов
export async function GET() {
    try {
        const snapshot = await adminDb
            .collection("projects")
            .orderBy("createdAt", "desc")
            .get();

        const projects: Project[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            const translations = data.translations as ProjectTranslations | undefined;
            const imageUrls = Array.isArray(data.imageUrls) ? data.imageUrls : [];
            const tr: ProjectTranslations = {} as ProjectTranslations;
            for (const locale of PROJECT_LOCALES) {
                const loc = translations?.[locale as ProjectLocale];
                tr[locale as ProjectLocale] = {
                    name: loc?.name ?? "",
                    description: loc?.description ?? "",
                };
            }
            return {
                id: doc.id,
                translations: tr,
                imageUrls,
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
        const translations = parseTranslations(body);
        const imageUrlsRaw = (body as { imageUrls?: unknown }).imageUrls;

        if (!translations) {
            return NextResponse.json(
                {
                    message:
                        "translations required for all locales: en, ru, ua, es (each: name, description)",
                    status: 400,
                } as ApiError,
                { status: 400 },
            );
        }

        const urls = Array.isArray(imageUrlsRaw) ? imageUrlsRaw : [];
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
            translations,
            imageUrls: urls,
            createdAt: new Date(),
        });

        const project: Project = {
            id: docRef.id,
            translations,
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

// DELETE /api/projects?id=... – удаление проекта (только для админа)
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

