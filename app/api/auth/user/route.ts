import { NextResponse } from "next/server";
import { ApiError, getErrorMessage } from "@/lib/api-error";
import { requireAuth } from "@/server/requireAuth/requireAuth";

export async function GET(req: Request) {
    try {
        const decoded = await requireAuth(req);
        const uid = decoded.uid;
        const isAdmin = Boolean(decoded.admin);

        return NextResponse.json(
            {
                uid,
                email: decoded.email ?? null,
                isAdmin,
            },
            { status: 200 },
        );
    } catch (error: unknown) {
        console.error("Auth error:", error);

        const err = error as Error & { status?: number };
        const status = err.status === 403 ? 403 : 500;
        const errorMessage = getErrorMessage(error);

        return NextResponse.json(
            {
                message: errorMessage,
                code: err && "code" in err ? (err as Error & { code?: string }).code : undefined,
                status,
            } as ApiError,
            { status },
        );
    }
}
